'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Play,
  Crown,
  MessageSquare,
  Settings,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ShieldCheck,
  Sparkles,
  Heart,
  Share2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Volume2,
  Layers,
} from 'lucide-react';
import { EPISODES_100, Episode, EpisodeCut } from '@/lib/episodes-100';

type TabType = 'intro' | 'viewer' | 'membership' | 'community' | 'settings';

interface CommentItem {
  id: string;
  author: string;
  episode: number;
  content: string;
  likes: number;
  createdAt: string;
  isBest?: boolean;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    author: '옥탑방달빛',
    episode: 1,
    content: '1화 첫 컷에서 옥탑방 난간 너머로 서울 야경 펼쳐질 때 소름 돋았어요. 작화 분위기가 미쳤습니다!',
    likes: 142,
    createdAt: '2시간 전',
    isBest: true,
  },
  {
    id: 'c2',
    author: '망원동고양이',
    episode: 3,
    content: '서준이랑 하은이 옥상 빨랫줄 사이로 마주 보는 연출 진짜 영화 같아요. 다음 화 결제하러 갑니다.',
    likes: 89,
    createdAt: '5시간 전',
    isBest: true,
  },
  {
    id: 'c3',
    author: '새벽감성러',
    episode: 5,
    content: '5화 엔딩 대사 보고 잠 못 자는 중... 6화부터 멤버십 바로 질렀습니다!',
    likes: 64,
    createdAt: '1일 전',
  },
];

export default function WebtoonStudioPage() {
  const [activeTab, setActiveTab] = useState<TabType>('viewer');
  const [selectedEpisodeNum, setSelectedEpisodeNum] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [fullscreenCutIndex, setFullscreenCutIndex] = useState<number>(0);

  // 멤버십 & 관리자 검수 모드 상태
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdminReview, setIsAdminReview] = useState<boolean>(false);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string>('');

  // 좋아요 & 북마크
  const [likedEpisodes, setLikedEpisodes] = useState<number[]>([1]);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  // 현재 선택된 에피소드 데이터
  const currentEpisode: Episode =
    EPISODES_100.find((ep) => ep.num === selectedEpisodeNum) || EPISODES_100[0];

  // 열람 가능 여부 (1~5화 무료, 멤버십 보유자 또는 관리자 검수 모드 시 전체 잠금 해제)
  const canAccessEpisode = (epNum: number) => {
    if (epNum <= 5) return true;
    if (isMember || isAdminReview) return true;
    return false;
  };

  const isCurrentAccessible = canAccessEpisode(currentEpisode.num);

  // 키보드 방향키로 전체화면 리더 이동
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        setFullscreenCutIndex((prev) =>
          Math.min(prev + 1, (currentEpisode.cuts?.length || 1) - 1)
        );
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        setFullscreenCutIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentEpisode]);

  const handleSelectEpisode = (epNum: number) => {
    setSelectedEpisodeNum(epNum);
    setFullscreenCutIndex(0);
    setActiveTab('viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput.trim() === '2026') {
      setIsAdminReview(true);
      setAdminError('');
      setAdminSuccessMsg('관리자 검수 모드가 활성화되었습니다. 1~100화 전체 열람이 가능합니다.');
      setAdminPinInput('');
      showToast('관리자 검수 모드 ON (전체 100화 잠금 해제)');
    } else {
      setAdminError('PIN 번호가 일치하지 않습니다. (기본 PIN: 2026)');
      setAdminSuccessMsg('');
    }
  };

  const handleAdminDisable = () => {
    setIsAdminReview(false);
    setAdminSuccessMsg('');
    showToast('관리자 검수 모드가 해제되었습니다.');
  };

  const handleSubscribe = (planName: string) => {
    setIsMember(true);
    showToast(`${planName} 구독이 완료되었습니다! 전 회차 무제한 감상이 가능합니다.`);
    setActiveTab('viewer');
  };

  const toggleLike = (epNum: number) => {
    setLikedEpisodes((prev) =>
      prev.includes(epNum) ? prev.filter((n) => n !== epNum) : [...prev, epNum]
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const item: CommentItem = {
      id: `c-${Date.now()}`,
      author: isAdminReview ? '웹툰스튜디오스_PD' : '독자_달빛러버',
      episode: currentEpisode.num,
      content: newComment.trim(),
      likes: 1,
      createdAt: '방금 전',
    };
    setComments([item, ...comments]);
    setNewComment('');
    showToast('댓글이 등록되었습니다.');
  };

  // 컷 렌더링 헬퍼 (일반 뷰어 & 전체화면 리더 공용 스타일)
  const renderCutVisual = (cut: EpisodeCut, idx: number, isReaderMode = false) => {
    const hasValidImage = Boolean(cut.img && cut.img.trim().length > 0);

    return (
      <div
        key={`${currentEpisode.num}-cut-${idx}`}
        className={`relative w-full overflow-hidden bg-slate-900 border border-slate-800/80 ${
          isReaderMode ? 'rounded-xl shadow-2xl' : 'rounded-2xl shadow-lg'
        }`}
      >
        {/* 컷 상단 번호 & 효과음(SFX) 오버레이 */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80">
          <span className="text-xs font-semibold tracking-wider text-amber-400/90 uppercase">
            CUT {String(idx + 1).padStart(2, '0')} / {String(currentEpisode.cuts?.length || 5).padStart(2, '0')}
          </span>
          {cut.sfx && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Volume2 className="w-3 h-3 text-indigo-400" />
              {cut.sfx}
            </span>
          )}
        </div>

        {/* 실제 컷 이미지 영역 */}
        <div className="relative w-full bg-slate-950 flex items-center justify-center">
          {hasValidImage ? (
            <img
              src={cut.img}
              alt={`${currentEpisode.num}화 ${idx + 1}컷 - ${cut.scene || ''}`}
              className={`w-full object-contain select-none ${
                isReaderMode ? 'max-h-[68vh]' : 'max-h-[640px]'
              }`}
              loading="lazy"
            />
          ) : (
            <div className="w-full py-20 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950">
              <Layers className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-sm text-slate-400">이미지 리소스 준비 중 ({idx + 1}컷)</p>
            </div>
          )}

          {/* 전체화면 확대 버튼 (일반 뷰어일 때만 우측 상단 노출) */}
          {!isReaderMode && (
            <button
              type="button"
              onClick={() => {
                setFullscreenCutIndex(idx);
                setIsFullscreen(true);
              }}
              className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/75 hover:bg-slate-900 text-slate-200 border border-slate-700/70 backdrop-blur-sm transition"
              title="이 컷부터 전체화면 리더로 보기"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 장면 설명(scene), 내레이션(narration), 대사(dialogue) 패널 */}
        <div className="p-4 sm:p-5 space-y-3 bg-gradient-to-b from-slate-900/95 to-slate-950">
          {/* 장면 연출 설명 */}
          {cut.scene && (
            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
              <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[11px]">
                장면
              </span>
              <p>{cut.scene}</p>
            </div>
          )}

          {/* 내레이션 박스 */}
          {cut.narration && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-400 text-amber-100/95 text-sm sm:text-base italic leading-relaxed">
              {cut.narration}
            </div>
          )}

          {/* 캐릭터 대사 말풍선 */}
          {cut.dialogue && (
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-white text-sm sm:text-base font-medium leading-relaxed shadow-inner">
              <span className="block text-[11px] font-semibold text-indigo-300 mb-1">
                대사
              </span>
              “{cut.dialogue}”
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* 상단 고정 헤더 */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-sm shadow">
              달
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                  웹툰스튜디오스
                </span>
                {isAdminReview && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                    <ShieldCheck className="w-3 h-3" />
                    관리자 검수중
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">《달을 비추는 옥탑》 · 총 100화</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isMember ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Crown className="w-3.5 h-3.5" />
                멤버십
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('membership')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
              >
                전편 잠금해제
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 토스트 알림 */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-800 text-white text-xs sm:text-sm font-medium border border-slate-700 shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-3xl mx-auto px-4 pt-5">
        {/* ==================== 1. 작품 소개 탭 ==================== */}
        {activeTab === 'intro' && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                웹툰스튜디오스 오리지널 · 완결 100화
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                달을 비추는 옥탑
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                서울의 가장 낮은 골목 끝, 달빛만이 유일한 조명인 오래된 옥탑방.
                각자의 상처를 숨긴 채 옥상 난간을 마주한 두 청춘이 써 내려가는 100일간의 야경 로맨스 드라마.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">총 회차</div>
                  <div className="text-base sm:text-lg font-bold text-white">100화 완결</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">무료 공개</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-400">1~5화 무료</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">회당 구성</div>
                  <div className="text-base sm:text-lg font-bold text-amber-300">고화질 5컷</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectEpisode(1)}
                className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm sm:text-base transition flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                제 1화 첫 화부터 감상하기
              </button>
            </div>

            {/* 전체 회차 리스트 (1~100화) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  전체 회차 목록 ({EPISODES_100.length}화)
                </h2>
                <span className="text-xs text-slate-400">
                  {isAdminReview
                    ? '관리자 검수 모드: 전 회차 열람 가능'
                    : isMember
                    ? '멤버십 회원: 전 회차 열람 가능'
                    : '1~5화 무료 / 6~100화 멤버십'}
                </span>
              </div>

              <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                {EPISODES_100.map((ep) => {
                  const unlocked = canAccessEpisode(ep.num);
                  const thumb = ep.cuts?.[0]?.img;

                  return (
                    <button
                      key={ep.num}
                      type="button"
                      onClick={() => handleSelectEpisode(ep.num)}
                      className="w-full flex items-center justify-between p-3.5 hover:bg-slate-800/70 transition text-left"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-slate-700/70 flex items-center justify-center">
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={`${ep.num}화 썸네일`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold text-slate-400">{ep.num}화</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400">
                              제 {ep.num}화
                            </span>
                            {ep.num <= 5 && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                                무료
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-semibold text-white truncate mt-0.5">
                            {ep.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {ep.cuts?.length || 5}컷 수록
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 ml-3">
                        {unlocked ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-300">
                            <Eye className="w-3.5 h-3.5 text-amber-400" />
                            보기
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-xs">
                            <Lock className="w-3 h-3" />
                            잠금
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. 웹툰 뷰어 탭 ==================== */}
        {activeTab === 'viewer' && (
          <div className="space-y-5">
            {/* 상단 에피소드 컨트롤 바 */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-400">
                      제 {currentEpisode.num}화 / 100화
                    </span>
                    {currentEpisode.num <= 5 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                        무료 공개
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        멤버십 전용
                      </span>
                    )}
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-white truncate mt-1">
                    {currentEpisode.title}
                  </h1>
                </div>

                {/* 전체화면 리더 실행 버튼 */}
                {isCurrentAccessible && (
                  <button
                    type="button"
                    onClick={() => {
                      setFullscreenCutIndex(0);
                      setIsFullscreen(true);
                    }}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition shadow"
                  >
                    <Maximize2 className="w-4 h-4" />
                    전체화면 리더
                  </button>
                )}
              </div>

              {/* 회차 빠른 선택 드롭다운 & 이전/다음 버튼 */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={currentEpisode.num <= 1}
                  onClick={() => handleSelectEpisode(currentEpisode.num - 1)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition"
                  title="이전 화"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <select
                  value={currentEpisode.num}
                  onChange={(e) => handleSelectEpisode(Number(e.target.value))}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  {EPISODES_100.map((ep) => (
                    <option key={ep.num} value={ep.num}>
                      제 {ep.num}화 - {ep.title} {ep.num <= 5 ? '(무료)' : canAccessEpisode(ep.num) ? '(열람가능)' : '(멤버십)'}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={currentEpisode.num >= EPISODES_100.length}
                  onClick={() => handleSelectEpisode(currentEpisode.num + 1)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition"
                  title="다음 화"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 본문 컷 렌더링 영역 (잠금 여부에 따라 분기) */}
            {isCurrentAccessible ? (
              <div className="space-y-6">
                {currentEpisode.cuts && currentEpisode.cuts.length > 0 ? (
                  currentEpisode.cuts.map((cut, idx) => renderCutVisual(cut, idx, false))
                ) : (
                  <div className="p-12 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-400">
                    이 회차에 등록된 컷 데이터가 없습니다.
                  </div>
                )}

                {/* 에피소드 하단 인터랙션 및 다음 화 이동 */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleLike(currentEpisode.num)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                        likedEpisodes.includes(currentEpisode.num)
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedEpisodes.includes(currentEpisode.num) ? 'fill-rose-400 text-rose-400' : ''
                        }`}
                      />
                      좋아요 {likedEpisodes.includes(currentEpisode.num) ? '완료' : ''}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        showToast('작품 링크가 클립보드에 복사되었습니다.');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-700 transition"
                    >
                      <Share2 className="w-4 h-4" />
                      공유하기
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      disabled={currentEpisode.num <= 1}
                      onClick={() => handleSelectEpisode(currentEpisode.num - 1)}
                      className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-sm font-semibold text-white transition"
                    >
                      ← 이전 화
                    </button>
                    <button
                      type="button"
                      disabled={currentEpisode.num >= EPISODES_100.length}
                      onClick={() => handleSelectEpisode(currentEpisode.num + 1)}
                      className="py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-sm font-bold text-slate-950 transition"
                    >
                      다음 화 ({Math.min(currentEpisode.num + 1, 100)}화) →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* 6~100화 멤버십 잠금 화면 */
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">
                    제 {currentEpisode.num}화는 멤버십 전용 회차입니다
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    1~5화는 무료로 감상하실 수 있으며, 6화부터 100화 완결까지는 멤버십 구독 후 즉시 열람하실 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('membership')}
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition"
                  >
                    멤버십으로 6~100화 전체 열기
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
                  >
                    관리자 검수 PIN 입력
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. 멤버십 탭 ==================== */}
        {activeTab === 'membership' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-indigo-950 border border-amber-400/30">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold mb-3">
                <Crown className="w-3.5 h-3.5" />
                PREMIUM PASS · PortOne V2 안전결제
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                《달을 비추는 옥탑》 전 100화 무제한 정주행
              </h2>
              <p className="text-sm text-slate-300">
                광고 없는 쾌적한 전체화면 리더와 6화~100화 모든 에피소드를 지금 바로 잠금 해제하세요.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-xs font-semibold text-slate-400">월간 정기구독</span>
                  <h3 className="text-lg font-bold text-white mt-1">달빛 월간 패스</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">4,900원</span>
                    <span className="text-xs text-slate-400">/ 월</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                    <li>• 1~100화 전 회차 즉시 열람</li>
                    <li>• 고화질 전체화면 컷 리더 지원</li>
                    <li>• 언제든 해지 가능</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleSubscribe('달빛 월간 패스')}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
                >
                  {isMember ? '현재 이용 중' : '월간 패스 시작하기'}
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border-2 border-amber-400 flex flex-col justify-between space-y-5 relative">
                <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold">
                  BEST 추천
                </span>
                <div>
                  <span className="text-xs font-semibold text-amber-400">소장용 완결 패키지</span>
                  <h3 className="text-lg font-bold text-white mt-1">전권 소장 올패스 (100화)</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-amber-300">19,900원</span>
                    <span className="text-xs text-slate-400">/ 영구 소장</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                    <li>• 1~100화 평생 무제한 소장</li>
                    <li>• 미공개 일러스트 및 작가 후기 포함</li>
                    <li>• 추가 결제 없이 전편 감상</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleSubscribe('전권 소장 올패스')}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition"
                >
                  {isMember ? '전권 소장 완료' : '전권 소장 결제하기'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. 커뮤니티 탭 ==================== */}
        {activeTab === 'community' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-1">독자 감상 & 베스트 댓글</h2>
              <p className="text-xs text-slate-400 mb-4">
                현재 선택된 제 {currentEpisode.num}화에 대한 감상을 남겨보세요.
              </p>

              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`제 ${currentEpisode.num}화 감상평을 입력해주세요...`}
                  className="w-full rounded-xl bg-slate-950 border border-slate-700 p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition"
                  >
                    댓글 등록
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-3">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {c.isBest && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                          BEST
                        </span>
                      )}
                      <span className="text-xs font-bold text-slate-200">{c.author}</span>
                      <span className="text-[11px] text-amber-400">· {c.episode}화</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{c.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== 5. 설정 탭 (관리자 전용 검수 모드 포함) ==================== */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">관리자 전용 검수 모드</h2>
                    <p className="text-xs text-slate-400">
                      결제 없이 1~100화 전체 원고 및 컷 이미지를 검수합니다.
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    isAdminReview
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isAdminReview ? '활성화됨' : '비활성'}
                </span>
              </div>

              {isAdminReview ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                  <p className="text-xs sm:text-sm text-emerald-200">
                    현재 <strong>관리자 검수중</strong> 상태입니다. 헤더 배지가 표시되며 1~100화 모든 잠금이 해제되었습니다.
                  </p>
                  <button
                    type="button"
                    onClick={handleAdminDisable}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                  >
                    검수 모드 종료하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAdminUnlock} className="space-y-3 pt-1">
                  <label className="block text-xs font-medium text-slate-300">
                    관리자 검수 PIN 입력 (기본 PIN: 2026)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={8}
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      placeholder="PIN 번호 4자리 입력"
                      className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center gap-1.5"
                    >
                      <Unlock className="w-4 h-4" />
                      잠금 해제
                    </button>
                  </div>
                  {adminError && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {adminError}
                    </p>
                  )}
                  {adminSuccessMsg && (
                    <p className="text-xs text-emerald-400">{adminSuccessMsg}</p>
                  )}
                </form>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>서비스명</span>
                <span className="text-slate-200 font-medium">웹툰스튜디오스 (Webtoon Studios)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>연재 작품</span>
                <span className="text-slate-200 font-medium">《달을 비추는 옥탑》 (총 100화)</span>
              </div>
              <div className="flex justify-between py-1">
                <span>시스템 스택</span>
                <span className="text-slate-200 font-medium">Next.js 15.5.29 · Neon DB · PortOne V2</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== 전체화면 리더 모달 ==================== */}
      {isFullscreen && isCurrentAccessible && currentEpisode.cuts && (
        <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-lg flex flex-col">
          {/* 전체화면 상단 바 */}
          <div className="flex items-center justify-between px-4 h-14 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-xs font-bold">
                제 {currentEpisode.num}화
              </span>
              <span className="text-sm font-bold text-white truncate">
                {currentEpisode.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              aria-label="전체화면 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 전체화면 중앙 컷 뷰 영역 */}
          <div className="flex-1 overflow-y-auto px-4 py-5 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              {renderCutVisual(
                currentEpisode.cuts[fullscreenCutIndex] || currentEpisode.cuts[0],
                fullscreenCutIndex,
                true
              )}
            </div>
          </div>

          {/* 전체화면 하단 컷 네비게이션 */}
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-3">
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={fullscreenCutIndex <= 0}
                onClick={() => setFullscreenCutIndex((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-xs sm:text-sm font-semibold text-white flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                이전 컷
              </button>

              {/* 컷 인디케이터 점 */}
              <div className="flex items-center gap-1.5">
                {currentEpisode.cuts.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFullscreenCutIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === fullscreenCutIndex
                        ? 'w-6 bg-amber-400'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`${i + 1}컷으로 이동`}
                  />
                ))}
              </div>

              {fullscreenCutIndex < currentEpisode.cuts.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setFullscreenCutIndex((prev) =>
                      Math.min(prev + 1, currentEpisode.cuts.length - 1)
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-xs sm:text-sm font-bold text-slate-950 flex items-center gap-1 transition"
                >
                  다음 컷
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsFullscreen(false);
                    if (currentEpisode.num < EPISODES_100.length) {
                      handleSelectEpisode(currentEpisode.num + 1);
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-xs sm:text-sm font-bold text-slate-950 transition"
                >
                  {currentEpisode.num < EPISODES_100.length ? '다음 화로 →' : '완결 감상 완료'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 하단 고정 탭바 (5개 메뉴) ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-3xl mx-auto grid grid-cols-5 h-16">
          <button
            type="button"
            onClick={() => setActiveTab('intro')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
              activeTab === 'intro' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>작품 소개</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
              activeTab === 'viewer' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>웹툰 뷰어</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('membership')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
              activeTab === 'membership' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span>멤버십</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
              activeTab === 'community' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>커뮤니티</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition ${
              activeTab === 'settings' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>설정</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
