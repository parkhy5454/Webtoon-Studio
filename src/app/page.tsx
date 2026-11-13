"use client";

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Crown,
  Database,
  Heart,
  Layers,
  MessageSquare,
  PenTool,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { CommentItem, SubscriptionItem, WebtoonItem } from "@/lib/seed-data";
import { DEFAULT_COMMENTS, DEFAULT_WEBTOONS } from "@/lib/seed-data";

type TabId = "hero" | "viewer" | "membership" | "community" | "creator" | "admin";

declare global {
  interface Window {
    PortOne?: {
      requestIssueBillingKey: (params: Record<string, unknown>) => Promise<{
        code?: string;
        message?: string;
        billingKey?: string;
      }>;
    };
  }
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [webtoons, setWebtoons] = useState<WebtoonItem[]>(DEFAULT_WEBTOONS);
  const [selectedId, setSelectedId] = useState<string>("seoul-moon");
  const [viewerMode, setViewerMode] = useState<"cuts" | "script">("cuts");

  const [comments, setComments] = useState<CommentItem[]>(DEFAULT_COMMENTS);
  const [commName, setCommName] = useState("");
  const [commTier, setCommTier] = useState("달동네 스페셜");
  const [commText, setCommText] = useState("");

  // Subscription Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTierName, setModalTierName] = useState("달동네 스페셜");
  const [modalTierPrice, setModalTierPrice] = useState(4900);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [referralInput, setReferralInput] = useState("");
  const [submittingPay, setSubmittingPay] = useState(false);

  // Admin / Subscriptions state
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>([]);
  const [summary, setSummary] = useState({
    totalSubscriptions: 142,
    monthlyRevenueKrw: 142 * 4900,
    creatorShareKrw: Math.round(142 * 4900 * 0.4),
    platformShareKrw: Math.round(142 * 4900 * 0.6),
  });

  // Creator Studio Form
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("드라마");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [publishing, setPublishing] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const selectedWebtoon =
    webtoons.find((w) => w.id === selectedId) || webtoons[0] || DEFAULT_WEBTOONS[0];

  function showToast(msg: string) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  }

  async function loadInitialData() {
    try {
      const res = await fetch("/api/webtoons");
      const data = await res.json();
      if (Array.isArray(data.webtoons) && data.webtoons.length > 0) {
        setWebtoons(data.webtoons);
        setSelectedId(data.webtoons[0].id);
      }
      setDbConnected(Boolean(data.connected));
    } catch {
      setDbConnected(false);
    }
  }

  async function loadComments(webtoonId: string) {
    try {
      const res = await fetch(`/api/comments?webtoonId=${encodeURIComponent(webtoonId)}`);
      const data = await res.json();
      if (Array.isArray(data.comments)) {
        setComments(data.comments);
      }
    } catch {
      // keep fallback
    }
  }

  async function loadSubscriptions() {
    try {
      const res = await fetch("/api/subscriptions");
      const data = await res.json();
      if (data.summary) setSummary(data.summary);
      if (Array.isArray(data.subscriptions)) setSubscriptions(data.subscriptions);
    } catch {
      // keep fallback
    }
  }

  useEffect(() => {
    loadInitialData();
    loadSubscriptions();
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadComments(selectedId);
    }
  }, [selectedId]);

  async function handleLike() {
    setWebtoons((prev) =>
      prev.map((w) => (w.id === selectedWebtoon.id ? { ...w, likes: w.likes + 1 } : w))
    );
    try {
      await fetch(`/api/webtoons/${encodeURIComponent(selectedWebtoon.id)}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      showToast(`《${selectedWebtoon.title}》에 좋아요를 눌렀습니다!`);
    } catch {
      showToast("좋아요가 반영되었습니다.");
    }
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commName.trim() || !commText.trim()) return;
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webtoonId: selectedWebtoon.id,
          authorName: commName.trim(),
          tierBadge: commTier,
          content: commText.trim(),
        }),
      });
      const data = await res.json();
      if (data.comment) {
        setComments((prev) => [data.comment, ...prev]);
      }
      setCommText("");
      showToast("소중한 응원 메시지가 등록되었습니다!");
    } catch {
      showToast("댓글 등록 중 오류가 발생했습니다.");
    }
  }

  function openSubscribeModal(tierName: string, priceKrw: number) {
    setModalTierName(tierName);
    setModalTierPrice(priceKrw);
    setModalOpen(true);
  }

  async function processSubscription() {
    setSubmittingPay(true);
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;
    const nameToUse = customerName.trim() || "달빛 독자";
    const emailToUse = customerEmail.trim() || "reader@example.com";

    let billingKey: string | undefined;

    try {
      if (
        window.PortOne &&
        storeId &&
        channelKey &&
        !storeId.startsWith("store-your-") &&
        !channelKey.startsWith("channel-key-your-")
      ) {
        const response = await window.PortOne.requestIssueBillingKey({
          storeId,
          channelKey,
          billingKeyMethod: "CARD",
          issueName: `${modalTierName} 월정액 구독`,
          customer: {
            customerId: `user_${Date.now()}`,
            fullName: nameToUse,
            email: emailToUse,
          },
        });

        if (response.code != null) {
          showToast(`결제가 취소되었습니다: ${response.message || "취소됨"}`);
          setSubmittingPay(false);
          return;
        }
        billingKey = response.billingKey;
      }

      const res = await fetch("/api/payments/portone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billingKey,
          webtoonId: selectedWebtoon.id,
          customerName: nameToUse,
          customerEmail: emailToUse,
          tierName: modalTierName,
          priceKrw: modalTierPrice,
          referralCode: referralInput.trim() || null,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setModalOpen(false);
        await loadSubscriptions();
        await loadInitialData();
        showToast(
          `${modalTierName} (월 ${modalTierPrice.toLocaleString()}원) 구독이 완료되었습니다!`
        );
      } else {
        showToast(data.error || "결제 처리에 실패했습니다.");
      }
    } catch {
      showToast("결제 요청 중 오류가 발생했습니다.");
    } finally {
      setSubmittingPay(false);
    }
  }

  async function handlePublishWebtoon(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) {
      showToast("작품명과 작가명을 입력해 주세요.");
      return;
    }
    setPublishing(true);
    try {
      const res = await fetch("/api/webtoons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          author: newAuthor.trim(),
          genre: newGenre,
          subtitle: newSubtitle.trim(),
          description: newDesc.trim(),
          poster: "/images/poster-seoul-moon.jpg",
          ep1Title: "제1화: 프롤로그",
        }),
      });
      const data = await res.json();
      if (res.ok && data.webtoon) {
        setWebtoons((prev) => [...prev, data.webtoon]);
        setSelectedId(data.webtoon.id);
        setNewTitle("");
        setNewAuthor("");
        setNewSubtitle("");
        setNewDesc("");
        setActiveTab("hero");
        showToast(`신작 《${data.webtoon.title}》이(가) 등록되었습니다!`);
      } else {
        showToast(data.error || "작품 등록 실패");
      }
    } catch {
      showToast("작품 등록 중 오류가 발생했습니다.");
    } finally {
      setPublishing(false);
    }
  }

  const navItems: { id: TabId; label: string }[] = [
    { id: "hero", label: "작품 소개" },
    { id: "viewer", label: "웹툰 뷰어" },
    { id: "membership", label: "멤버십 구독" },
    { id: "community", label: "팬덤 커뮤니티" },
    { id: "creator", label: "작가 스튜디오" },
    { id: "admin", label: "정산/관리" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-gray-800/80 bg-gray-950/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h1 className="text-sm md:text-base font-black tracking-tight text-white">
                달빛 웹툰 스튜디오
              </h1>
              <div className="flex items-center space-x-2 text-[11px]">
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full border ${
                    dbConnected
                      ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/70"
                      : "bg-amber-950/80 text-amber-300 border-amber-700/70"
                  }`}
                >
                  <Database className="w-3 h-3" />
                  <span>{dbConnected ? "Neon DB 연결됨" : "로컬 프리뷰 모드"}</span>
                </span>
              </div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === item.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/70"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 space-y-10">
        {/* WEBTOON SWITCHER */}
        {webtoons.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-semibold mr-1">연재 작품 선택:</span>
            {webtoons.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelectedId(w.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
                  w.id === selectedWebtoon.id
                    ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                《{w.title}》 · {w.author}
              </button>
            ))}
          </div>
        )}

        {/* TAB: HERO */}
        {activeTab === "hero" && (
          <section className="space-y-10 animate-fade-in">
            <div className="glass-panel rounded-3xl border border-indigo-500/30 p-6 md:p-10 glow-effect grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="inline-block text-xs font-bold text-amber-300 bg-amber-950/70 border border-amber-700/60 px-3 py-1 rounded-full">
                  {selectedWebtoon.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                  {selectedWebtoon.title}
                </h2>
                <p className="text-indigo-300 font-semibold text-sm md:text-base">
                  {selectedWebtoon.subtitle}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedWebtoon.description}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-3 text-center">
                    <div className="text-[11px] text-gray-400">분량</div>
                    <div className="text-sm font-black text-white mt-0.5">
                      {selectedWebtoon.stats?.eps || "100화 완결"}
                    </div>
                  </div>
                  <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-3 text-center">
                    <div className="text-[11px] text-gray-400">회당 컷수</div>
                    <div className="text-sm font-black text-amber-300 mt-0.5">
                      {selectedWebtoon.stats?.cuts || "50~60컷"}
                    </div>
                  </div>
                  <div className="bg-gray-900/90 border border-gray-800 rounded-2xl p-3 text-center">
                    <div className="text-[11px] text-gray-400">멤버십 혜택</div>
                    <div className="text-sm font-black text-emerald-300 mt-0.5">
                      {selectedWebtoon.stats?.perk || "2주 선공개"}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("viewer")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm transition shadow-lg flex items-center space-x-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>제1화 무료 감상하기</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("membership")}
                    className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-amber-300 font-bold text-sm border border-amber-500/40 transition flex items-center space-x-2"
                  >
                    <Crown className="w-4 h-4" />
                    <span>멤버십 구독하기</span>
                  </button>
                  <button
                    onClick={handleLike}
                    className="px-4 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-rose-400 font-bold text-sm border border-gray-800 transition flex items-center space-x-1.5"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{selectedWebtoon.likes}</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <img
                  src={selectedWebtoon.poster}
                  alt={selectedWebtoon.title}
                  className="rounded-2xl w-full max-h-[420px] object-cover shadow-2xl border border-gray-700"
                />
              </div>
            </div>

            {/* CHARACTERS */}
            {selectedWebtoon.characters && selectedWebtoon.characters.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white flex items-center space-x-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>주요 등장인물</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {selectedWebtoon.characters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="glass-panel rounded-2xl border border-gray-800 p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${ch.badgeClass}`}
                        >
                          {ch.badge}
                        </span>
                        <span className="text-[11px] text-gray-500">{ch.ref}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white">{ch.name}</h4>
                        <p className="text-xs text-indigo-300">{ch.role}</p>
                      </div>
                      <blockquote className="text-xs text-gray-300 italic bg-gray-900/80 p-3 rounded-xl border-l-2 border-indigo-500">
                        {ch.quote}
                      </blockquote>
                      <div className="text-xs text-gray-400 space-y-1 pt-1">
                        <p>
                          <strong className="text-gray-200">특징:</strong> {ch.trait}
                        </p>
                        <p>
                          <strong className="text-gray-200">욕망:</strong> {ch.desire}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* TAB: VIEWER */}
        {activeTab === "viewer" && (
          <section className="space-y-6 animate-fade-in">
            <div className="glass-panel rounded-2xl border border-gray-800 p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">{selectedWebtoon.ep1_title}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{selectedWebtoon.ep1_subtitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewerMode("cuts")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewerMode === "cuts"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  원고 컷 뷰어
                </button>
                <button
                  onClick={() => setViewerMode("script")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    viewerMode === "script"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  콘티 스크립트
                </button>
              </div>
            </div>

            {viewerMode === "cuts" ? (
              <div className="max-w-2xl mx-auto space-y-6">
                {(selectedWebtoon.cuts || []).map((cut, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-xl"
                  >
                    <img
                      src={cut.img}
                      alt={`웹툰 컷 ${i + 1}`}
                      className="w-full object-cover"
                    />
                    <div className="p-4 text-xs text-gray-300 border-t border-gray-800">
                      {cut.caption}
                    </div>
                  </div>
                ))}

                <div className="glass-panel rounded-2xl border border-amber-500/40 p-6 text-center space-y-3">
                  <Crown className="w-8 h-8 text-amber-300 mx-auto" />
                  <h3 className="text-lg font-black text-white">
                    {selectedWebtoon.ep2_title} (멤버십 선공개)
                  </h3>
                  <p className="text-xs text-gray-400">
                    월 2,900원 멤버십으로 2주 빠른 선공개 원고를 바로 감상하세요.
                  </p>
                  <button
                    onClick={() => setActiveTab("membership")}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-950 font-black text-xs transition"
                  >
                    멤버십 요금제 보기
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {(selectedWebtoon.script_lines || []).map((line, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl border border-gray-800 p-5 space-y-2"
                  >
                    <span className="text-xs font-bold text-indigo-400">{line.cut}</span>
                    <p className="text-sm text-gray-200">{line.scene}</p>
                    <p className="text-xs text-amber-300 bg-gray-900 p-3 rounded-xl border border-gray-800">
                      {line.dialogue}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* TAB: MEMBERSHIP */}
        {activeTab === "membership" && (
          <section className="space-y-8 animate-fade-in">
            <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-700">
                  6 : 4 창작자 상생 모델
                </span>
                <h3 className="text-lg font-black text-white">
                  구독료 60% 플랫폼 · 40% 작가 직접 배분
                </h3>
                <p className="text-xs text-gray-400">
                  독자가 월 ₩4,900을 구독하면 ₩2,940은 플랫폼 운영에,{" "}
                  <strong className="text-emerald-300">₩1,960(40%)은 작품 작가</strong>에게
                  투명하게 정산됩니다.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("admin")}
                className="px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition"
              >
                실시간 정산 현황 보기
              </button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                공식 멤버십 요금제 선택
              </h2>
              <p className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto">
                포털 수수료 없이 작가에게 직접 후원하고, 모든 연재 작품의 선공개 원고와 비하인드
                콘티 혜택을 누리세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tier 1 */}
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                    BASIC
                  </span>
                  <h3 className="text-2xl font-bold text-white">달빛 라이트</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-white">월 2,900</span>
                    <span className="text-gray-400 text-xs">원</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-800 pt-4">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-indigo-400" />
                      <span>전 작품 1주일 최신화 미리보기</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-indigo-400" />
                      <span>멤버십 독자 전용 댓글 작성</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-indigo-400" />
                      <span>HD 고화질 모바일 뷰어 제공</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => openSubscribeModal("달빛 라이트", 2900)}
                  className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-sm border border-gray-700 transition"
                >
                  구독하기
                </button>
              </div>

              {/* Tier 2 */}
              <div className="glass-panel p-6 rounded-3xl border-2 border-indigo-500 glow-effect space-y-6 flex flex-col justify-between relative bg-gradient-to-b from-indigo-950/40 to-gray-950">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow">
                  POPULAR CHOICE
                </div>
                <div className="space-y-4">
                  <span className="inline-block bg-indigo-950 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-700">
                    SPECIAL
                  </span>
                  <h3 className="text-2xl font-bold text-white">달동네 스페셜</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-amber-300">월 4,900</span>
                    <span className="text-gray-400 text-xs">원</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-200 border-t border-indigo-500/30 pt-4">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>전 작품 2주 선공개 원고 무제한 열람</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>작가 비하인드 콘티 & 미공개 러프 스케치</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>스페셜 독자 배지 & 월간 Q&A 참여</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => openSubscribeModal("달동네 스페셜", 4900)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg transition"
                >
                  지금 구독 시작하기
                </button>
              </div>

              {/* Tier 3 */}
              <div className="glass-panel p-6 rounded-3xl border border-amber-500/40 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="inline-block bg-amber-950 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-700">
                    VIP PATRON
                  </span>
                  <h3 className="text-2xl font-bold text-white">VIP 후원자</h3>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-white">월 9,900</span>
                    <span className="text-gray-400 text-xs">원</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-gray-300 border-t border-gray-800 pt-4">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>달동네 스페셜 모든 혜택 포함</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>단행본/굿즈 우선 구매 및 20% 할인</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>엔딩 크레딧 VIP 후원자 닉네임 등재</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => openSubscribeModal("VIP 후원자", 9900)}
                  className="w-full py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-sm border border-amber-500/50 transition"
                >
                  VIP 후원하기
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TAB: COMMUNITY */}
        {activeTab === "community" && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-indigo-400" />
                <span>《{selectedWebtoon.title}》 팬덤 커뮤니티</span>
              </h2>
            </div>

            <form
              onSubmit={handleAddComment}
              className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="닉네임 (예: 옥탑방달빛)"
                  value={commName}
                  onChange={(e) => setCommName(e.target.value)}
                  required
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <select
                  value={commTier}
                  onChange={(e) => setCommTier(e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="달빛 라이트">달빛 라이트</option>
                  <option value="달동네 스페셜">달동네 스페셜</option>
                  <option value="VIP 후원자">VIP 후원자</option>
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="작가님과 작품에 대한 응원 메시지를 남겨주세요..."
                value={commText}
                onChange={(e) => setCommText(e.target.value)}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  응원글 등록하기
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-gray-900/90 rounded-xl border border-gray-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xs text-white">{c.author_name}</span>
                      <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                        {c.tier_badge}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {new Date(c.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{c.content}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB: CREATOR STUDIO */}
        {activeTab === "creator" && (
          <section className="space-y-6 animate-fade-in">
            <div className="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4">
              <div className="flex items-center space-x-2">
                <PenTool className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-black text-white">작가 스튜디오 — 신작 등록</h2>
              </div>
              <p className="text-xs text-gray-400">
                신규 웹툰을 등록하면 Neon PostgreSQL 데이터베이스에 즉시 저장되고 구독 서비스에
                노출됩니다.
              </p>

              <form onSubmit={handlePublishWebtoon} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="작품명 (예: 네오 서울의 밤)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="작가명"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                    className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="드라마">드라마</option>
                    <option value="SF/스릴러">SF/스릴러</option>
                    <option value="로맨스">로맨스</option>
                    <option value="판타지">판타지</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="한 줄 카피 (부제목)"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <textarea
                  rows={3}
                  placeholder="작품 시놉시스 설명"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={publishing}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition"
                >
                  {publishing ? "등록 중..." : "작품 등록 및 연재 시작"}
                </button>
              </form>
            </div>
          </section>
        )}

        {/* TAB: ADMIN / REVENUE SPLIT */}
        {activeTab === "admin" && (
          <section className="space-y-6 animate-fade-in">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-black text-white">실시간 구독 & 6:4 정산 대시보드</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-gray-800">
                <div className="text-xs text-gray-400">총 활성 구독</div>
                <div className="text-2xl font-black text-white mt-1">
                  {summary.totalSubscriptions.toLocaleString()}건
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-gray-800">
                <div className="text-xs text-gray-400">월 누적 구독 매출</div>
                <div className="text-2xl font-black text-amber-300 mt-1">
                  ₩{summary.monthlyRevenueKrw.toLocaleString()}
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30">
                <div className="text-xs text-emerald-300">작가 정산금 (40%)</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  ₩{summary.creatorShareKrw.toLocaleString()}
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30">
                <div className="text-xs text-indigo-300">플랫폼 운영 (60%)</div>
                <div className="text-2xl font-black text-indigo-400 mt-1">
                  ₩{summary.platformShareKrw.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-gray-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>최근 구독 결제 내역 (Neon DB)</span>
              </h3>
              {subscriptions.length === 0 ? (
                <p className="text-xs text-gray-500 py-4">
                  아직 DB에 기록된 신규 구독 결제가 없습니다. 멤버십 탭에서 테스트 결제를
                  진행해 보세요.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="text-gray-400 border-b border-gray-800">
                      <tr>
                        <th className="py-2 pr-4">구독자</th>
                        <th className="py-2 pr-4">요금제</th>
                        <th className="py-2 pr-4">결제금액</th>
                        <th className="py-2 pr-4">작가 배분(40%)</th>
                        <th className="py-2">상태</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/60">
                      {subscriptions.map((s) => (
                        <tr key={s.id}>
                          <td className="py-2.5 pr-4 text-white font-semibold">
                            {s.customer_name}
                          </td>
                          <td className="py-2.5 pr-4 text-indigo-300">{s.tier_name}</td>
                          <td className="py-2.5 pr-4">₩{s.price_krw.toLocaleString()}</td>
                          <td className="py-2.5 pr-4 text-emerald-400">
                            ₩{s.creator_share_krw.toLocaleString()}
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* SUBSCRIBE MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel max-w-md w-full p-6 rounded-3xl border border-indigo-500/40 space-y-5 relative animate-fade-in">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-900/80 text-amber-300 rounded-full flex items-center justify-center mx-auto border border-indigo-500">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">{modalTierName} 구독</h3>
              <p className="text-xs text-gray-400">
                월{" "}
                <span className="text-amber-300 font-bold">
                  {modalTierPrice.toLocaleString()}
                </span>
                원으로 작가님을 직접 후원합니다.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="구독자 이름 (예: 홍길동)"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
              <input
                type="email"
                placeholder="이메일 (영수증 수신용)"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
              <input
                type="text"
                placeholder="친구 추천 코드 (선택사항)"
                value={referralInput}
                onChange={(e) => setReferralInput(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-2 bg-gray-900 p-4 rounded-xl border border-gray-800 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>결제 수단</span>
                <span className="text-emerald-400 font-semibold">
                  카카오페이 / 토스 / 신용카드 (포트원 V2)
                </span>
              </div>
              <div className="flex justify-between text-gray-300 pt-2 border-t border-gray-800">
                <span>최종 결제 금액</span>
                <strong className="text-amber-400 text-sm">
                  월 {modalTierPrice.toLocaleString()}원
                </strong>
              </div>
            </div>

            <button
              onClick={processSubscription}
              disabled={submittingPay}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-lg"
            >
              {submittingPay ? "결제 처리 중..." : "결제 및 멤버십 시작하기"}
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 bg-indigo-600 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 z-50 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-amber-300" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* FOOTER (PG 심사 대비 사업자 정보 영역 포함) */}
      <footer className="border-t border-gray-900 py-8 bg-gray-950 text-center text-xs text-gray-500 space-y-2 px-4">
        <div className="flex items-center justify-center space-x-1.5 text-gray-400 font-semibold">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>© 2026 달빛 웹툰 스튜디오. All rights reserved.</span>
        </div>
        <p className="text-[11px] text-gray-600">
          상호명: [상호명 입력] | 대표자: [대표자명] | 사업자등록번호: [000-00-00000] |
          통신판매업신고: [제2026-서울강남-0000호]
        </p>
        <p className="text-[11px] text-gray-600">
          사업장 소재지: [사업장 주소] | 고객센터: [이메일 / 연락처] | 이용약관 · 개인정보처리방침 ·
          환불규정
        </p>
      </footer>
    </div>
  );
}
