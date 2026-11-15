"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  PlaySquare,
  Crown,
  MessageSquare,
  Settings,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  X,
  CreditCard,
  Eye,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Heart,
  Send,
  Star,
  Calendar,
  Layers,
} from "lucide-react";

type TabType = "intro" | "viewer" | "membership" | "community" | "settings";

interface Episode {
  id: number;
  title: string;
  subtitle: string;
  releaseDate: string;
  isFree: boolean;
  cutsCount: number;
  thumbnailColor: string;
}

interface CommunityPost {
  id: number;
  author: string;
  badge: string;
  content: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
}

const TOTAL_EPISODES = 100;
const ADMIN_DEFAULT_PIN = "2026";

const EPISODES: Episode[] = Array.from({ length: TOTAL_EPISODES }, (_, idx) => {
  const epNum = idx + 1;
  const isFree = epNum <= 5;
  const colors = [
    "from-indigo-600 to-purple-700",
    "from-emerald-600 to-teal-700",
    "from-rose-600 to-orange-700",
    "from-sky-600 to-blue-700",
    "from-amber-600 to-red-700",
  ];
  return {
    id: epNum,
    title: `제 ${epNum}화`,
    subtitle:
      epNum === 1
        ? "서울의 달빛 아래 시작된 인연 (50컷 특별판)"
        : epNum <= 5
        ? `프롤로그 아크 - 운명의 갈림길 (${epNum}/5)`
        : `본편 시즌 ${Math.ceil((epNum - 5) / 25)} - 숨겨진 진실 #${epNum - 5}`,
    releaseDate: `2026.${String(((epNum - 1) % 12) + 1).padStart(2, "0")}.${String(
      ((epNum * 3) % 28) + 1
    ).padStart(2, "0")}`,
    isFree,
    cutsCount: epNum === 1 ? 50 : 42 + (epNum % 15),
    thumbnailColor: colors[idx % colors.length],
  };
});

const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 1,
    author: "달빛산책자",
    badge: "멤버십 구독자",
    content: "1화 50컷 연출 몰입감 미쳤네요... 6화부터 멤버십 결제하고 밤새 정주행 중입니다!",
    createdAt: "2시간 전",
    likes: 42,
  },
  {
    id: 2,
    author: "스튜디오PD",
    badge: "제작진",
    content: "전체 100화 완결 아카이브가 오픈되었습니다. 1~5화는 무료로 감상하실 수 있습니다.",
    createdAt: "1일 전",
    likes: 89,
  },
  {
    id: 3,
    author: "서울야경",
    badge: "독자",
    content: "90년대 감성이랑 현대 판타지 작화가 너무 잘 어울려요. 다음 시즌 외전도 기대합니다.",
    createdAt: "3일 전",
    likes: 27,
  },
];

export default function ToonStudiosPage() {
  const [activeTab, setActiveTab] = useState<TabType>("intro");
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdminReviewMode, setIsAdminReviewMode] = useState<boolean>(false);

  // Admin PIN state
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pendingEpisode, setPendingEpisode] = useState<Episode | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<boolean>(false);

  // Viewer active episode
  const [selectedEpisode, setSelectedEpisode] = useState<Episode>(EPISODES[0]);
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [episodeFilter, setEpisodeFilter] = useState<"all" | "free" | "locked">("all");

  // Community state
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState<string>("");

  // Restore saved states
  useEffect(() => {
    try {
      const savedMember = localStorage.getItem("ts_is_member");
      const savedAdmin = localStorage.getItem("ts_is_admin_review");
      if (savedMember === "true") setIsMember(true);
      if (savedAdmin === "true") setIsAdminReviewMode(true);
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateMembership = (status: boolean) => {
    setIsMember(status);
    try {
      localStorage.setItem("ts_is_member", String(status));
    } catch {
      // ignore
    }
  };

  const updateAdminReviewMode = (status: boolean) => {
    setIsAdminReviewMode(status);
    try {
      localStorage.setItem("ts_is_admin_review", String(status));
    } catch {
      // ignore
    }
  };

  const canAccessEpisode = (ep: Episode) => {
    if (ep.isFree) return true;
    if (isMember) return true;
    if (isAdminReviewMode) return true;
    return false;
  };

  const handleOpenEpisode = (ep: Episode) => {
    if (canAccessEpisode(ep)) {
      setSelectedEpisode(ep);
      setActiveTab("viewer");
      setIsReaderOpen(true);
    } else {
      setPendingEpisode(ep);
      setShowPaymentModal(true);
    }
  };

  const handleCompletePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      updateMembership(true);
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setPaymentSuccessToast(true);
      if (pendingEpisode) {
        setSelectedEpisode(pendingEpisode);
        setActiveTab("viewer");
        setIsReaderOpen(true);
        setPendingEpisode(null);
      }
      setTimeout(() => setPaymentSuccessToast(false), 4000);
    }, 800);
  };

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_DEFAULT_PIN) {
      updateAdminReviewMode(true);
      setPinInput("");
      setPinError("");
    } else {
      setPinError("PIN 번호가 일치하지 않습니다. (기본 PIN: 2026)");
    }
  };

  const handleDisableAdminMode = () => {
    updateAdminReviewMode(false);
    setPinInput("");
    setPinError("");
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const badge = isAdminReviewMode
      ? "관리자(검수)"
      : isMember
      ? "멤버십 구독자"
      : "일반 독자";
    const newPost: CommunityPost = {
      id: Date.now(),
      author: isAdminReviewMode ? "스튜디오 관리자" : "독자 회원",
      badge,
      content: newPostContent.trim(),
      createdAt: "방금 전",
      likes: 1,
      liked: true,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const filteredEpisodes = EPISODES.filter((ep) => {
    if (episodeFilter === "free") return ep.isFree;
    if (episodeFilter === "locked") return !canAccessEpisode(ep);
    return true;
  });

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "intro", label: "작품 소개", icon: <BookOpen className="w-5 h-5" /> },
    { id: "viewer", label: "웹툰 뷰어", icon: <PlaySquare className="w-5 h-5" /> },
    { id: "membership", label: "멤버십", icon: <Crown className="w-5 h-5" /> },
    { id: "community", label: "커뮤니티", icon: <MessageSquare className="w-5 h-5" /> },
    { id: "settings", label: "설정", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-24">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center font-extrabold text-sm text-white shrink-0">
              TS
            </div>
            <h1 className="font-bold text-base sm:text-lg tracking-tight text-white truncate">
              툰스튜디오스
            </h1>

            {/* 헤더 관리자 검수중 배지 */}
            {isAdminReviewMode && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                관리자 검수중
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isMember ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <Crown className="w-3 h-3 text-emerald-400" />
                멤버십 활성
              </span>
            ) : (
              <button
                onClick={() => setActiveTab("membership")}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-violet-600/90 hover:bg-violet-500 text-white transition"
              >
                <Crown className="w-3 h-3" />
                멤버십
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Payment Toast */}
      {paymentSuccessToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-950/95 border border-emerald-500/50 text-emerald-100 shadow-2xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs sm:text-sm">
            <p className="font-bold">멤버십 결제가 완료되었습니다!</p>
            <p className="text-emerald-300 text-xs">
              6~100화 모든 유료 회차 잠금이 자동 해제되었습니다.
            </p>
          </div>
        </div>
      )}

      {/* Main Content Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-5">
        {/* TAB 1: 작품 소개 (Intro & Episode Directory) */}
        {activeTab === "intro" && (
          <div className="space-y-6">
            {/* Hero Cover Card */}
            <section className="rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  오리지널 완결작
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  1~5화 무료 · 6~100화 멤버십
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  서울의 달빛 연대기
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  1990년대 서울의 밤거리에서 시작된 두 청춘의 엇갈린 운명과 숨겨진
                  초자연적 비밀을 그린 대서사 웹툰. 1화 50컷 특별 연출판을 포함해 총
                  100화 전편이 공개되었습니다.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    9.94
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">독자 평점</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                  <div className="flex items-center justify-center gap-1 text-white font-bold text-sm">
                    <Layers className="w-4 h-4 text-violet-400" />
                    총 100화
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">완결 아카이브</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-center">
                  <div className="flex items-center justify-center gap-1 text-emerald-300 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    1~5화 무료
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">즉시 감상</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={() => handleOpenEpisode(EPISODES[0])}
                  className="flex-1 py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 transition flex items-center justify-center gap-2"
                >
                  <PlaySquare className="w-4 h-4" />
                  1화 무료 첫화보기 (50컷)
                </button>
                {!isMember && !isAdminReviewMode && (
                  <button
                    onClick={() => {
                      setPendingEpisode(EPISODES[5]);
                      setShowPaymentModal(true);
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    <Crown className="w-4 h-4 text-amber-400" />
                    6~100화 잠금 해제
                  </button>
                )}
              </div>
            </section>

            {/* Episode List Section */}
            <section className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setEpisodeFilter("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      episodeFilter === "all"
                        ? "bg-slate-800 text-white border-slate-600"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    전체 ({TOTAL_EPISODES})
                  </button>
                  <button
                    onClick={() => setEpisodeFilter("free")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      episodeFilter === "free"
                        ? "bg-slate-800 text-white border-slate-600"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    무료 (1~5화)
                  </button>
                  <button
                    onClick={() => setEpisodeFilter("locked")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      episodeFilter === "locked"
                        ? "bg-slate-800 text-white border-slate-600"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    잠금 ({EPISODES.filter((ep) => !canAccessEpisode(ep)).length})
                  </button>
                </div>

                <span className="text-xs text-slate-400">
                  열람 가능{" "}
                  <strong className="text-white">
                    {EPISODES.filter((ep) => canAccessEpisode(ep)).length}
                  </strong>
                  /{TOTAL_EPISODES}화
                </span>
              </div>

              <div className="space-y-2">
                {filteredEpisodes.map((ep) => {
                  const unlocked = canAccessEpisode(ep);
                  return (
                    <button
                      key={ep.id}
                      onClick={() => handleOpenEpisode(ep)}
                      className={`w-full text-left p-3 rounded-xl border transition flex items-center gap-3.5 ${
                        unlocked
                          ? "bg-slate-900/90 border-slate-800 hover:border-slate-600"
                          : "bg-slate-900/40 border-slate-800/70 hover:border-violet-500/40"
                      }`}
                    >
                      <div
                        className={`relative w-14 h-14 rounded-lg bg-gradient-to-br ${ep.thumbnailColor} flex flex-col items-center justify-center shrink-0 overflow-hidden`}
                      >
                        <span className="text-xs font-bold text-white">
                          EP.{ep.id}
                        </span>
                        <span className="text-[10px] text-white/80">
                          {ep.cutsCount}컷
                        </span>
                        {!unlocked && (
                          <div className="absolute inset-0 bg-slate-950/70 flex items-center justify-center">
                            <Lock className="w-4 h-4 text-slate-200" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-sm text-white">
                            {ep.title}
                          </span>
                          {ep.isFree ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                              무료
                            </span>
                          ) : isAdminReviewMode && !isMember ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              검수 해제
                            </span>
                          ) : isMember ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              멤버십 해제
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                              멤버십 잠금
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 truncate">
                          {ep.subtitle}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {ep.releaseDate}
                        </p>
                      </div>

                      <div className="shrink-0 text-slate-400">
                        {unlocked ? (
                          <Eye className="w-4 h-4 text-violet-400" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: 웹툰 뷰어 (Webtoon Viewer) */}
        {activeTab === "viewer" && (
          <div className="space-y-4">
            {/* Viewer Control Bar */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
              <button
                disabled={selectedEpisode.id <= 1}
                onClick={() => {
                  const prev = EPISODES[selectedEpisode.id - 2];
                  if (prev) handleOpenEpisode(prev);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                이전화
              </button>

              <div className="text-center min-w-0">
                <p className="font-bold text-sm text-white truncate">
                  {selectedEpisode.title}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  {selectedEpisode.subtitle}
                </p>
              </div>

              <button
                disabled={selectedEpisode.id >= TOTAL_EPISODES}
                onClick={() => {
                  const next = EPISODES[selectedEpisode.id];
                  if (next) handleOpenEpisode(next);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1"
              >
                다음화
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Episode Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[1, 2, 3, 4, 5, 6, 10, 25, 50, 100].map((num) => {
                const ep = EPISODES[num - 1];
                const unlocked = canAccessEpisode(ep);
                const isCurrent = selectedEpisode.id === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleOpenEpisode(ep)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border shrink-0 flex items-center gap-1 transition ${
                      isCurrent
                        ? "bg-violet-600 text-white border-violet-500"
                        : unlocked
                        ? "bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500"
                        : "bg-slate-900/50 text-slate-400 border-slate-800"
                    }`}
                  >
                    {!unlocked && <Lock className="w-3 h-3 text-amber-400" />}
                    {num}화
                  </button>
                );
              })}
            </div>

            {/* Viewer Stream */}
            {canAccessEpisode(selectedEpisode) ? (
              <div className="space-y-4">
                <div
                  className={`p-6 rounded-2xl bg-gradient-to-br ${selectedEpisode.thumbnailColor} text-center space-y-1.5 shadow-lg`}
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/30 text-white">
                    {selectedEpisode.isFree
                      ? "무료 공개 회차"
                      : isAdminReviewMode
                      ? "관리자 검수 모드 열람중"
                      : "멤버십 인증 열람중"}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedEpisode.title}
                  </h3>
                  <p className="text-xs text-white/90">
                    {selectedEpisode.subtitle} · 총 {selectedEpisode.cutsCount}컷
                  </p>
                </div>

                {Array.from({ length: 6 }, (_, idx) => (
                  <div
                    key={idx}
                    className="h-64 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <span className="text-[11px] font-mono text-slate-500 mb-1.5">
                      SCENE #{idx + 1} / {selectedEpisode.cutsCount} CUTS
                    </span>
                    <p className="text-sm font-medium text-slate-200">
                      {selectedEpisode.title} 고해상도 세로 스크롤 원고 영역
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      웹툰 뷰어 렌더링 캔버스
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">
                    {selectedEpisode.title}는 멤버십 전용 회차입니다
                  </h3>
                  <p className="text-xs text-slate-400">
                    1~5화는 무료로 제공되며, 6~100화는 멤버십 결제 완료 시 즉시 잠금 해제됩니다.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPendingEpisode(selectedEpisode);
                    setShowPaymentModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold transition"
                >
                  멤버십 결제하고 즉시 열람하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: 멤버십 (Membership) */}
        {activeTab === "membership" && (
          <div className="space-y-5">
            <section className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-slate-900 via-violet-950/30 to-slate-900 p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                    <Crown className="w-3.5 h-3.5" />
                    TOON STUDIOS ALL-PASS
                  </span>
                  <h2 className="text-xl font-extrabold text-white pt-1">
                    툰스튜디오스 프리미엄 멤버십
                  </h2>
                  <p className="text-xs text-slate-300">
                    결제 완료 즉시 6화~100화 전체 잠금 회차가 자동으로 해제됩니다.
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                    isMember
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isMember ? "구독중" : "미구독"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-slate-200">
                    월간 올패스 구독권
                  </span>
                  <div>
                    <span className="text-2xl font-extrabold text-white">
                      4,900원
                    </span>
                    <span className="text-xs text-slate-400"> / 월</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    1~5화 무료 + 6~100화 유료 회차 즉시 자동 잠금 해제
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    감독판 50컷 스페셜 에피소드 및 비하인드 콘티 열람
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    커뮤니티 전용 멤버십 배지 부여
                  </li>
                </ul>
              </div>

              {isMember ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-2">
                    <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                    현재 멤버십 권한이 활성화되어 1~100화 전체를 자유롭게 감상할 수 있습니다.
                  </div>
                  <button
                    onClick={() => updateMembership(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
                  >
                    멤버십 해지하기 (잠금 상태 테스트용)
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setPendingEpisode(null);
                    setShowPaymentModal(true);
                  }}
                  className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-lg shadow-violet-600/25 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  멤버십 결제하고 6~100화 자동 해제하기
                </button>
              )}
            </section>
          </div>
        )}

        {/* TAB 4: 커뮤니티 (Community) */}
        {activeTab === "community" && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3">
              <h2 className="text-base font-bold text-white">독자 커뮤니티</h2>
              <form onSubmit={handleAddPost} className="flex gap-2">
                <input
                  type="text"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="작품 감상평이나 응원 댓글을 남겨주세요..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold flex items-center gap-1.5 shrink-0 transition"
                >
                  <Send className="w-4 h-4" />
                  등록
                </button>
              </form>
            </div>

            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">
                        {post.author}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-violet-300 border border-slate-700">
                        {post.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {post.createdAt}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {post.content}
                  </p>
                  <div className="pt-1">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg border transition ${
                        post.liked
                          ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          post.liked ? "fill-rose-400 text-rose-400" : ""
                        }`}
                      />
                      좋아요 {post.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: 설정 (Settings - 최상단 관리자 전용 검수 모드 포함) */}
        {activeTab === "settings" && (
          <div className="space-y-5">
            {/* 설정 탭 최상단: 관리자 전용 검수 모드 */}
            <section className="rounded-2xl border border-amber-500/40 bg-slate-900 p-5 sm:p-6 shadow-lg space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-bold text-white">
                      관리자 전용 검수 모드
                    </h2>
                    {isAdminReviewMode && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        검수중 활성
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    기본 PIN(2026) 입력 시 잠금이 해제되어 결제 없이 1~100화 전체 회차를 검수할 수 있습니다.
                  </p>
                </div>
              </div>

              {isAdminReviewMode ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-200 flex items-center gap-1.5">
                      <Unlock className="w-4 h-4 text-amber-400" />
                      1~100화 전체 검수 잠금이 해제되었습니다
                    </p>
                    <p className="text-xs text-amber-300/80">
                      상단 헤더에 &apos;관리자 검수중&apos; 배지가 표시됩니다.
                    </p>
                  </div>
                  <button
                    onClick={handleDisableAdminMode}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 shrink-0 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    검수 모드 해제
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdminPinSubmit} className="space-y-2.5">
                  <label className="block text-xs font-medium text-slate-300">
                    관리자 PIN 번호 입력 (기본 PIN: 2026)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={8}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        if (pinError) setPinError("");
                      }}
                      placeholder="PIN 입력 (기본값: 2026)"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-extrabold transition shrink-0"
                    >
                      검수 잠금 해제
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      {pinError}
                    </p>
                  )}
                </form>
              )}
            </section>

            {/* 일반 계정 및 권한 상태 요약 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-bold text-white">열람 권한 및 앱 설정</h3>
              <div className="divide-y divide-slate-800 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-400">무료 공개 범위</span>
                  <span className="font-semibold text-sky-300">1화 ~ 5화</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-400">멤버십 잠금 범위</span>
                  <span className="font-semibold text-slate-200">
                    6화 ~ 100화 ({isMember ? "결제 완료 · 해제됨" : "잠금 상태"})
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-400">관리자 검수 상태</span>
                  <span
                    className={`font-semibold ${
                      isAdminReviewMode ? "text-amber-300" : "text-slate-400"
                    }`}
                  >
                    {isAdminReviewMode ? "활성화됨 (1~100화 열람 가능)" : "비활성"}
                  </span>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Membership Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    멤버십 전용 회차 잠금 안내
                  </h3>
                  <p className="text-xs text-slate-400">
                    {pendingEpisode
                      ? `${pendingEpisode.title}부터는 멤버십 결제가 필요합니다.`
                      : "6화~100화 전체 잠금 해제"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">툰스튜디오스 올패스 멤버십</span>
                <span className="font-bold text-white">4,900원 / 월</span>
              </div>
              <p className="text-xs text-slate-400">
                결제 완료 즉시 6화~100화 모든 회차 잠금이 자동으로 해제됩니다.
              </p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium transition"
              >
                취소
              </button>
              <button
                onClick={handleCompletePayment}
                disabled={isProcessingPayment}
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 transition"
              >
                <CreditCard className="w-4 h-4" />
                {isProcessingPayment ? "결제 처리중..." : "결제 완료하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Reader Overlay (Optional quick view) */}
      {isReaderOpen && canAccessEpisode(selectedEpisode) && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
          <div className="h-14 px-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                onClick={() => setIsReaderOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="font-bold text-sm text-white truncate">
                {selectedEpisode.title} - {selectedEpisode.subtitle}
              </span>
              {isAdminReviewMode && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                  관리자 검수중
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                disabled={selectedEpisode.id <= 1}
                onClick={() => {
                  const prev = EPISODES[selectedEpisode.id - 2];
                  if (prev) handleOpenEpisode(prev);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                이전
              </button>
              <button
                disabled={selectedEpisode.id >= TOTAL_EPISODES}
                onClick={() => {
                  const next = EPISODES[selectedEpisode.id];
                  if (next) {
                    if (canAccessEpisode(next)) {
                      setSelectedEpisode(next);
                    } else {
                      setIsReaderOpen(false);
                      setPendingEpisode(next);
                      setShowPaymentModal(true);
                    }
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 text-xs flex items-center gap-1"
              >
                다음
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
            <div className="w-full max-w-xl space-y-5">
              <div
                className={`p-7 rounded-2xl bg-gradient-to-br ${selectedEpisode.thumbnailColor} text-center space-y-1.5`}
              >
                <p className="text-[11px] uppercase tracking-widest text-white/80">
                  TOON STUDIOS ORIGINAL
                </p>
                <h3 className="text-2xl font-extrabold text-white">
                  {selectedEpisode.title}
                </h3>
                <p className="text-xs text-white/90">{selectedEpisode.subtitle}</p>
              </div>

              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-400 p-6 text-center"
                >
                  <span className="text-xs font-mono text-slate-500 mb-1.5">
                    CUT #{i + 1} / {selectedEpisode.cutsCount}
                  </span>
                  <p className="text-sm text-slate-300">
                    {selectedEpisode.title} 웹툰 원고 뷰어 영역
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. 모바일/화면 하단 고정 탭바 (fixed bottom-0) 복원 */}
      <nav
        aria-label="하단 고정 내비게이션"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-900/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-5 h-16">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
                  isActive
                    ? "text-violet-400"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-violet-400" />
                )}
                <div className="relative">
                  {item.icon}
                  {item.id === "settings" && isAdminReviewMode && (
                    <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </div>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
