"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  Crown,
  BookOpen,
  Settings,
  CheckCircle2,
  X,
  CreditCard,
  Eye,
  Sparkles,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Episode {
  id: number;
  title: string;
  subtitle: string;
  releaseDate: string;
  isFree: boolean;
  cutsCount: number;
  thumbnailColor: string;
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

export default function WebtoonStudiosPage() {
  const [activeTab, setActiveTab] = useState<"episodes" | "settings">("episodes");
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdminReviewMode, setIsAdminReviewMode] = useState<boolean>(false);

  // Admin PIN modal / inline states
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pendingEpisode, setPendingEpisode] = useState<Episode | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState<boolean>(false);

  // Viewer modal state
  const [viewingEpisode, setViewingEpisode] = useState<Episode | null>(null);

  // Filter state
  const [filterMode, setFilterMode] = useState<"all" | "free" | "locked">("all");

  // Restore session state from localStorage
  useEffect(() => {
    try {
      const savedMember = localStorage.getItem("ws_is_member");
      const savedAdmin = localStorage.getItem("ws_is_admin_review");
      if (savedMember === "true") setIsMember(true);
      if (savedAdmin === "true") setIsAdminReviewMode(true);
    } catch {
      // ignore storage errors
    }
  }, []);

  const updateMembership = (status: boolean) => {
    setIsMember(status);
    try {
      localStorage.setItem("ws_is_member", String(status));
    } catch {
      // ignore
    }
  };

  const updateAdminReviewMode = (status: boolean) => {
    setIsAdminReviewMode(status);
    try {
      localStorage.setItem("ws_is_admin_review", String(status));
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

  const handleEpisodeClick = (ep: Episode) => {
    if (canAccessEpisode(ep)) {
      setViewingEpisode(ep);
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
        setViewingEpisode(pendingEpisode);
        setPendingEpisode(null);
      }
      setTimeout(() => setPaymentSuccessToast(false), 4000);
    }, 900);
  };

  const handleAdminPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_DEFAULT_PIN) {
      updateAdminReviewMode(true);
      setPinInput("");
      setPinError("");
    } else {
      setPinError("PIN 번호가 올바르지 않습니다. (기본 PIN: 2026)");
    }
  };

  const handleDisableAdminMode = () => {
    updateAdminReviewMode(false);
    setPinInput("");
    setPinError("");
  };

  const filteredEpisodes = EPISODES.filter((ep) => {
    if (filterMode === "free") return ep.isFree;
    if (filterMode === "locked") return !canAccessEpisode(ep);
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/20">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-tight text-white">
                  웹툰스튜디오스
                </h1>
                {/* 관리자 검수중 배지 표시 */}
                {isAdminReviewMode && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    관리자 검수중
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                오리지널 시리즈 · 총 100화 완결 아카이브
              </p>
            </div>
          </div>

          {/* Navigation & Status */}
          <div className="flex items-center gap-2">
            {isMember ? (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <Crown className="w-3.5 h-3.5 text-emerald-400" />
                프리미엄 멤버십 활성
              </span>
            ) : (
              !isAdminReviewMode && (
                <button
                  onClick={() => {
                    setPendingEpisode(null);
                    setShowPaymentModal(true);
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition"
                >
                  <Crown className="w-3.5 h-3.5" />
                  멤버십 가입
                </button>
              )
            )}

            <nav className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
              <button
                onClick={() => setActiveTab("episodes")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === "episodes"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                회차 목록
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeTab === "settings"
                    ? "bg-slate-700 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                설정
                {isAdminReviewMode && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Payment Completion Toast */}
      {paymentSuccessToast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-900/95 border border-emerald-500/50 text-emerald-100 shadow-2xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">멤버십 결제가 완료되었습니다!</p>
            <p className="text-xs text-emerald-300">
              6화~100화 모든 유료 회차 잠금이 자동 해제되었습니다.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        {activeTab === "episodes" ? (
          <div className="space-y-6">
            {/* Series Banner */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 bg-violet-500/15 border border-violet-500/30 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5" />
                    스튜디오 독점 연재작 · 1~5화 무료 / 6~100화 멤버십
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    달빛 아래의 연대기 (전체 100화)
                  </h2>
                  <p className="text-sm text-slate-300 max-w-2xl">
                    1화부터 5화까지는 누구나 무료로 감상할 수 있으며, 6화부터 100화까지는
                    멤버십 결제 완료 시 즉시 전체 잠금 해제됩니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  {isAdminReviewMode ? (
                    <div className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>관리자 검수 모드 활성 (1~100화 전체 열람 가능)</span>
                    </div>
                  ) : isMember ? (
                    <div className="px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                      <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>멤버십 인증 완료 (1~100화 전체 잠금 해제됨)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setPendingEpisode(EPISODES[5]);
                        setShowPaymentModal(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-600/25 transition flex items-center justify-center gap-2"
                    >
                      <Crown className="w-4 h-4" />
                      멤버십 결제하고 6~100화 해제
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Filter & Summary Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterMode("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    filterMode === "all"
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  전체 ({TOTAL_EPISODES})
                </button>
                <button
                  onClick={() => setFilterMode("free")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    filterMode === "free"
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  무료 공개 (1~5화)
                </button>
                <button
                  onClick={() => setFilterMode("locked")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    filterMode === "locked"
                      ? "bg-slate-800 text-white border-slate-600"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  잠긴 회차 (
                  {EPISODES.filter((ep) => !canAccessEpisode(ep)).length})
                </button>
              </div>

              <div className="text-xs text-slate-400">
                열람 가능:{" "}
                <strong className="text-slate-200">
                  {EPISODES.filter((ep) => canAccessEpisode(ep)).length}화
                </strong>{" "}
                / {TOTAL_EPISODES}화
              </div>
            </div>

            {/* Episode List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredEpisodes.map((ep) => {
                const unlocked = canAccessEpisode(ep);
                return (
                  <button
                    key={ep.id}
                    onClick={() => handleEpisodeClick(ep)}
                    className={`group text-left p-3.5 rounded-xl border transition flex items-center gap-3.5 ${
                      unlocked
                        ? "bg-slate-900/80 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                        : "bg-slate-900/40 border-slate-800/80 hover:border-violet-500/50 hover:bg-slate-900/70"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div
                      className={`relative w-16 h-16 rounded-lg bg-gradient-to-br ${ep.thumbnailColor} flex flex-col items-center justify-center shrink-0 overflow-hidden`}
                    >
                      <span className="text-xs font-bold text-white/90">
                        EP.{ep.id}
                      </span>
                      <span className="text-[10px] text-white/75">
                        {ep.cutsCount}컷
                      </span>
                      {!unlocked && (
                        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[1px] flex items-center justify-center">
                          <Lock className="w-5 h-5 text-slate-200" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-white group-hover:text-violet-300 transition">
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
                            멤버십 전용
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 truncate">
                        {ep.subtitle}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {ep.releaseDate}
                      </p>
                    </div>

                    {/* Right Action Indicator */}
                    <div className="shrink-0">
                      {unlocked ? (
                        <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-violet-600/20 flex items-center justify-center text-slate-300 group-hover:text-violet-300 transition">
                          <Eye className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-violet-300 transition">
                          <Lock className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Settings Tab */
          <div className="max-w-2xl mx-auto space-y-6">
            {/* 1. 설정 탭 상단: 관리자 전용 검수 모드 */}
            <section className="rounded-2xl border border-amber-500/30 bg-slate-900 p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">
                        관리자 전용 검수 모드
                      </h2>
                      {isAdminReviewMode && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          활성화됨
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      스튜디오 내부 검수 및 QA 목적의 전체 회차(1~100화) 잠금 해제 기능입니다.
                    </p>
                  </div>
                </div>
              </div>

              {isAdminReviewMode ? (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-amber-200 flex items-center gap-1.5">
                      <Unlock className="w-4 h-4 text-amber-400" />
                      관리자 검수 권한으로 1~100화 잠금이 해제되었습니다.
                    </p>
                    <p className="text-xs text-amber-300/80">
                      상단 헤더에 &apos;관리자 검수중&apos; 배지가 표시되며 멤버십 결제 없이 모든 회차를 검수할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleDisableAdminMode}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 shrink-0 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    검수 모드 종료
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdminPinSubmit} className="space-y-3">
                  <label className="block text-xs font-medium text-slate-300">
                    관리자 PIN 번호 입력 (기본 PIN: 2026)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={8}
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        if (pinError) setPinError("");
                      }}
                      placeholder="PIN 4자리 입력 (예: 2026)"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold transition shrink-0"
                    >
                      검수 모드 잠금 해제
                    </button>
                  </div>
                  {pinError && (
                    <p className="text-xs text-rose-400 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {pinError}
                    </p>
                  )}
                </form>
              )}
            </section>

            {/* 2. 멤버십 구독 관리 섹션 */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                    <Crown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      멤버십 구독 상태
                    </h3>
                    <p className="text-xs text-slate-400">
                      1~5화 무료 제공 · 6~100화 멤버십 전용
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    isMember
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700"
                  }`}
                >
                  {isMember ? "멤버십 이용중" : "미가입 (무료 회원)"}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 space-y-1">
                  <p className="font-medium text-white">
                    웹툰스튜디오스 올패스 멤버십 (월 4,900원)
                  </p>
                  <p className="text-slate-400">
                    결제 완료 즉시 6화~100화 전체 잠금이 자동으로 해제됩니다.
                  </p>
                </div>

                {isMember ? (
                  <button
                    onClick={() => updateMembership(false)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 shrink-0 transition"
                  >
                    멤버십 해지 (테스트 초기화)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setPendingEpisode(null);
                      setShowPaymentModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shrink-0 transition"
                  >
                    멤버십 결제하기
                  </button>
                )}
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
                    멤버십 전용 회차 안내
                  </h3>
                  <p className="text-xs text-slate-400">
                    {pendingEpisode
                      ? `${pendingEpisode.title}부터는 멤버십 가입이 필요합니다.`
                      : "6화~100화 전체 열람 멤버십"}
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

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-300">웹툰스튜디오스 올패스</span>
                <span className="font-bold text-white">4,900원 / 월</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  6화 ~ 100화 유료 회차 즉시 자동 잠금 해제
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  광고 없는 고화질 스크롤 뷰어 지원
                </li>
              </ul>
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
                className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <CreditCard className="w-4 h-4" />
                {isProcessingPayment ? "결제 처리중..." : "결제 완료하기"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Episode Viewer Modal */}
      {viewingEpisode && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col">
          {/* Viewer Top Bar */}
          <div className="h-14 px-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewingEpisode(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">
                    {viewingEpisode.title} - {viewingEpisode.subtitle}
                  </span>
                  {isAdminReviewMode && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      관리자 검수중
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={viewingEpisode.id <= 1}
                onClick={() => {
                  const prev = EPISODES[viewingEpisode.id - 2];
                  if (prev && canAccessEpisode(prev)) setViewingEpisode(prev);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                이전화
              </button>
              <button
                disabled={viewingEpisode.id >= TOTAL_EPISODES}
                onClick={() => {
                  const next = EPISODES[viewingEpisode.id];
                  if (next) {
                    if (canAccessEpisode(next)) {
                      setViewingEpisode(next);
                    } else {
                      setViewingEpisode(null);
                      setPendingEpisode(next);
                      setShowPaymentModal(true);
                    }
                  }
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-xs flex items-center gap-1"
              >
                다음화
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Viewer Canvas */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
            <div className="w-full max-w-xl space-y-6">
              <div
                className={`p-8 rounded-2xl bg-gradient-to-br ${viewingEpisode.thumbnailColor} text-center space-y-2 shadow-xl`}
              >
                <p className="text-xs uppercase tracking-widest text-white/80">
                  WEBTOON STUDIOS ORIGINAL
                </p>
                <h3 className="text-2xl font-extrabold text-white">
                  {viewingEpisode.title}
                </h3>
                <p className="text-sm text-white/90">{viewingEpisode.subtitle}</p>
                <p className="text-xs text-white/75 pt-2">
                  총 {viewingEpisode.cutsCount}컷 분량 ·{" "}
                  {viewingEpisode.isFree
                    ? "무료 공개 회차"
                    : isAdminReviewMode
                    ? "관리자 검수 모드 열람"
                    : "멤버십 인증 열람"}
                </p>
              </div>

              {/* Simulated Webtoon Cuts */}
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-slate-400 p-6 text-center"
                >
                  <span className="text-xs font-mono text-slate-500 mb-2">
                    CUT #{i + 1} / {viewingEpisode.cutsCount}
                  </span>
                  <p className="text-sm text-slate-300">
                    {viewingEpisode.title} 스토리보드 & 원고 렌더링 영역
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
