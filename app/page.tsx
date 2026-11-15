'use client';

import React, { useState, useEffect } from 'react';
import EpisodeUploadForm, { CutItem } from '../components/EpisodeUploadForm';
import {
  Home,
  BookOpen,
  Crown,
  MessageSquare,
  Settings,
  Lock,
  Unlock,
  ShieldCheck,
  PenTool,
  ArrowLeft,
  LogOut,
  Play,
  Send,
  Sparkles,
  Check,
  Trash2,
} from 'lucide-react';

type MainTab = 'home' | 'viewer' | 'membership' | 'community' | 'settings' | 'studio';

interface EpisodeRecord {
  episodeNum: number;
  title: string;
  cuts: CutItem[];
  updatedAt: string;
}

const DEFAULT_CUTS_EP1: CutItem[] = [
  {
    id: 1,
    imageUrl: '',
    description: '달빛이 비치는 서울 옥탑방 전경',
    sfx: '휘이이잉-',
    narration: '1994년 서울, 그 달동네 언덕 위에는 각자의 꿈을 품은 청춘들이 있었다.',
    dialogue: '박진우(27): "오늘도 서울의 달은 유난히 밝네..."',
  },
  {
    id: 2,
    imageUrl: '',
    description: '편의점 앞에서 컵라면을 먹는 두 청년',
    sfx: '후루룩-',
    narration: '주머니는 가벼웠지만 마음만은 누구보다 뜨거웠던 시절.',
    dialogue: '김도윤(27): "진우야, 우리도 언젠간 저 빌딩 숲 위에 설 수 있겠지?"',
  },
  {
    id: 3,
    imageUrl: '',
    description: '골목길 가로등 아래 서 있는 최서윤',
    sfx: '또각, 또각',
    narration: '예고 없이 찾아온 인연은 조용히 문을 두드렸다.',
    dialogue: '최서윤(25): "실례합니다, 혹시 이 근처에 옥탑방 빈 곳 있나요?"',
  },
  {
    id: 4,
    imageUrl: '',
    description: '서로를 바라보며 놀라는 세 사람',
    sfx: '두근!',
    narration: '그렇게 세 사람의 서울살이가 한 지붕 아래에서 시작되었다.',
    dialogue: '박진우(27): "어? 아까 낮에 버스에서 본 분 아닌가요?"',
  },
  {
    id: 5,
    imageUrl: '',
    description: '서울 야경을 내려다보는 엔딩 컷',
    sfx: '잔잔한 바람 소리',
    narration: '제 1화 끝 - 다음 화에 계속됩니다.',
    dialogue: '',
  },
];

const STORAGE_KEY = 'dalbit_webtoon_episodes_v1';

export default function WebtoonStudioApp() {
  const [activeTab, setActiveTab] = useState<MainTab>('home');
  const [selectedSeries, setSelectedSeries] = useState<string>('서울의 달');
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);

  // 회차별 데이터 저장소 (1화 기본 세팅 + 작가 업로드 회차 영구 보관)
  const [episodesMap, setEpisodesMap] = useState<Record<number, EpisodeRecord>>({
    1: {
      episodeNum: 1,
      title: '서울의 달 - 제 1화',
      cuts: DEFAULT_CUTS_EP1,
      updatedAt: '기본 연재분',
    },
  });

  // 커뮤니티 댓글 상태
  const [comments, setComments] = useState([
    { id: 1, author: '달빛독자', text: '1994년 서울 감성이 살아있네요! 1화부터 몰입감 최고입니다.', time: '방금 전' },
    { id: 2, author: '웹툰매니아', text: '진우, 도윤, 서윤 세 사람 케미가 너무 기대됩니다!', time: '10분 전' },
  ]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // localStorage에서 기존 업로드 데이터 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setEpisodesMap((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch (e) {
      console.error('저장된 회차 불러오기 실패:', e);
    }
  }, []);

  const episodesList = Array.from({ length: 100 }, (_, i) => i + 1);
  const isLocked = selectedEpisode > 5 && !isAdmin && !isMember;

  const currentEpisodeData: EpisodeRecord = episodesMap[selectedEpisode] || {
    episodeNum: selectedEpisode,
    title: `${selectedSeries} - 제 ${selectedEpisode}화`,
    cuts: DEFAULT_CUTS_EP1.map((c) => ({
      ...c,
      narration: `제 ${selectedEpisode}화 스토리 장면 #${c.id}`,
    })),
    updatedAt: '연재 예정',
  };

  const handleAdminAuth = () => {
    if (pinInput === '2026') {
      setIsAdmin(true);
      setShowPinModal(false);
      setPinInput('');
      alert('관리자 검수 모드가 활성화되었습니다. (1~100화 전체 열람 가능)');
    } else {
      alert('PIN 번호가 일치하지 않습니다.');
    }
  };

  // 작가가 회차를 업로드하면 즉시 저장하고 웹툰 뷰어로 전환!
  const handlePublish = (series: string, epNum: number, title: string, newCuts: CutItem[]) => {
    const newRecord: EpisodeRecord = {
      episodeNum: epNum,
      title,
      cuts: newCuts,
      updatedAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMap = {
      ...episodesMap,
      [epNum]: newRecord,
    };

    setEpisodesMap(updatedMap);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMap));
    } catch (e) {
      console.warn('로컬 스토리지 용량 한계:', e);
    }

    setSelectedSeries(series);
    setSelectedEpisode(epNum);
    setActiveTab('viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments((prev) => [
      {
        id: Date.now(),
        author: commentAuthor.trim() || '익명독자',
        text: commentText.trim(),
        time: '방금 전',
      },
      ...prev,
    ]);
    setCommentText('');
  };

  const handleResetData = () => {
    if (confirm('업로드한 로컬 저장 데이터를 초기화하시겠습니까?')) {
      localStorage.removeItem(STORAGE_KEY);
      setEpisodesMap({
        1: {
          episodeNum: 1,
          title: '서울의 달 - 제 1화',
          cuts: DEFAULT_CUTS_EP1,
          updatedAt: '기본 연재분',
        },
      });
      alert('초기화되었습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* 상단 고정 헤더 */}
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left hover:opacity-90 transition"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white">
              W
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">웹툰스튜디오스</h1>
              <p className="text-[11px] text-slate-400">
                {activeTab === 'studio' ? '작가 스튜디오 (업로드)' : '오픈 웹툰 창작 & 구독 플랫폼'}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {activeTab === 'studio' ? (
              <button
                type="button"
                onClick={() => setActiveTab('viewer')}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-yellow-400 hover:bg-yellow-300 text-slate-950 flex items-center gap-1.5 shadow transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>나가기 (웹툰 보기)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('studio')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>작가 업로드</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => (isAdmin ? setIsAdmin(false) : setShowPinModal(true))}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                isAdmin
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              {isAdmin ? <LogOut className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isAdmin ? '검수중' : '관리자'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 관리자 PIN 입력 모달 */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-xs space-y-4">
            <h3 className="text-base font-bold text-center">관리자 검수 PIN 입력</h3>
            <p className="text-xs text-slate-400 text-center">PIN 번호(2026)를 입력하면 1~100화 전체 열람이 가능합니다.</p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN 입력"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-center text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-2 bg-slate-800 rounded-xl text-xs"
              >
                취소
              </button>
              <button
                onClick={handleAdminAuth}
                className="flex-1 py-2 bg-yellow-400 text-slate-950 font-bold rounded-xl text-xs"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 메인 화면 영역 */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {/* 1. 홈 탭 */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/15 text-yellow-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> 대표 연재작 · 1~5화 무료 공개
              </span>
              <h2 className="text-2xl font-black text-white">서울의 달 (1994 달빛 연대기)</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                서울 달동네 옥탑방에 모인 세 청춘 박진우(27), 김도윤(27), 최서윤(25)의 뜨겁고 애틋한 꿈과 사랑 이야기.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedEpisode(1);
                    setActiveTab('viewer');
                  }}
                  className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 transition"
                >
                  <Play className="w-4 h-4 fill-current" /> 1화 첫화보기
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('studio')}
                  className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 flex items-center gap-2 transition"
                >
                  <PenTool className="w-4 h-4 text-indigo-400" /> 작가 스튜디오 (원고 올리기)
                </button>
              </div>
            </div>

            {/* 전체 회차 리스트 (1~100화) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base">전체 회차 목록 (총 100화)</h3>
                <span className="text-xs text-slate-400">
                  {isAdmin ? '관리자 모드: 전 회차 열람 가능' : '1~5화 무료 / 6~100화 멤버십'}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {episodesList.map((ep) => {
                  const locked = ep > 5 && !isAdmin && !isMember;
                  const hasUploadedImages = episodesMap[ep]?.cuts?.some((c) => Boolean(c.imageUrl));
                  return (
                    <button
                      key={ep}
                      onClick={() => {
                        setSelectedEpisode(ep);
                        setActiveTab('viewer');
                      }}
                      className="p-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs transition"
                    >
                      <span className="font-semibold flex items-center gap-1.5">
                        제 {ep}화
                        {hasUploadedImages && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400" title="원고 업로드됨" />
                        )}
                      </span>
                      {locked ? (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <span className="text-[11px] text-emerald-400 font-medium">무료</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 2. 웹툰 뷰어 탭 */}
        {activeTab === 'viewer' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-base">{currentEpisodeData.title}</h2>
                  <p className="text-xs text-slate-400">
                    총 {currentEpisodeData.cuts.length}컷 · {currentEpisodeData.updatedAt}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('studio')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg border border-slate-700 text-yellow-400"
                >
                  + 이 회차 원고 수정/업로드
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {episodesList.slice(0, 30).map((ep) => {
                  const locked = ep > 5 && !isAdmin && !isMember;
                  return (
                    <button
                      key={ep}
                      onClick={() => setSelectedEpisode(ep)}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border ${
                        selectedEpisode === ep
                          ? 'bg-yellow-400 text-slate-950 border-yellow-400 font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                      }`}
                    >
                      {locked ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-emerald-400" />}
                      {ep}화
                    </button>
                  );
                })}
              </div>
            </div>

            {isLocked ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                <Lock className="w-12 h-12 text-yellow-400 mx-auto" />
                <h3 className="text-lg font-bold">제 {selectedEpisode}화는 유료 멤버십 전용 회차입니다</h3>
                <p className="text-sm text-slate-400">
                  1~5화는 무료로 감상하실 수 있으며, 하단 [멤버십] 가입 또는 우측 상단 [관리자] PIN(2026) 입력 시 즉시 열람됩니다.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('membership')}
                    className="px-5 py-2.5 bg-yellow-400 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    멤버십 안내 보기
                  </button>
                  <button
                    onClick={() => setShowPinModal(true)}
                    className="px-5 py-2.5 bg-slate-800 text-white font-semibold text-xs rounded-xl border border-slate-700"
                  >
                    관리자 PIN 입력
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {currentEpisodeData.cuts.map((cut) => (
                  <div key={cut.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex justify-between text-xs text-slate-400">
                      <span>CUT #{cut.id} / {currentEpisodeData.cuts.length}</span>
                      <span>{cut.sfx}</span>
                    </div>
                    {cut.imageUrl ? (
                      <img src={cut.imageUrl} alt={`CUT ${cut.id}`} className="w-full h-auto object-contain bg-black" />
                    ) : (
                      <div className="py-16 px-6 text-center bg-slate-900/50 space-y-2">
                        <p className="text-sm font-semibold text-slate-300">[원고 이미지 미등록 영역 - CUT #{cut.id}]</p>
                        <p className="text-xs text-slate-400">{cut.description}</p>
                        <p className="text-xs text-yellow-400/80 pt-2">
                          ※ 우측 상단 [작가 업로드]에서 그림 5장을 올린 뒤 맨 아래 [회차 업로드 및 즉시 공개하기] 버튼을 누르면 이 자리에 바로 보입니다.
                        </p>
                      </div>
                    )}
                    {(cut.narration || cut.dialogue) && (
                      <div className="p-4 space-y-2 bg-slate-950/60">
                        {cut.narration && <p className="text-xs text-slate-400 italic">{cut.narration}</p>}
                        {cut.dialogue && (
                          <p className="text-sm font-medium text-white bg-slate-900 p-3 rounded-xl border border-slate-800">
                            {cut.dialogue}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. 멤버십 탭 */}
        {activeTab === 'membership' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-yellow-400 text-xs font-bold">
                <Crown className="w-4 h-4" /> 월간 구독 멤버십
              </span>
              <h2 className="text-xl font-bold">웹툰스튜디오스 올패스 멤버십</h2>
              <p className="text-sm text-slate-400">6화부터 100화까지 모든 유료 연재분을 광고 없이 무제한 감상하세요.</p>
            </div>

            <div className="bg-slate-950 border border-yellow-400/40 rounded-2xl p-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-base font-bold text-white">월 정기 구독권</span>
                <span className="text-xl font-black text-yellow-400">₩4,900 / 월</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 제 6화 ~ 100화 전편 즉시 잠금 해제</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 신작 미리보기 및 고화질 원고 감상</li>
              </ul>
              <button
                type="button"
                onClick={() => {
                  setIsMember(!isMember);
                  alert(!isMember ? '멤버십 체험이 활성화되어 6~100화가 잠금 해제되었습니다!' : '멤버십이 해지되었습니다.');
                }}
                className={`w-full py-3 rounded-xl font-bold text-sm transition ${
                  isMember
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                    : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950'
                }`}
              >
                {isMember ? '멤버십 이용 중 (클릭 시 해지)' : '멤버십 즉시 활성화 (테스트 체험)'}
              </button>
            </div>
          </div>
        )}

        {/* 4. 커뮤니티 탭 */}
        {activeTab === 'community' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" /> 독자 & 작가 커뮤니티
              </h2>
              <p className="text-xs text-slate-400 mt-1">작품 감상평과 응원 댓글을 남겨주세요.</p>
            </div>

            <form onSubmit={handleAddComment} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <input
                type="text"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                placeholder="닉네임 (미입력 시 익명독자)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="응원 댓글을 입력하세요..."
                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> 등록
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-yellow-400">{c.author}</span>
                    <span className="text-slate-500">{c.time}</span>
                  </div>
                  <p className="text-sm text-slate-200">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. 설정 탭 */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-300" /> 앱 설정 및 관리자 검수
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">작가 스튜디오 (원고 업로드)</p>
                  <p className="text-xs text-slate-400">새 회차 컷 이미지를 일괄 업로드하고 공개합니다.</p>
                </div>
                <button
                  onClick={() => setActiveTab('studio')}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                >
                  이동하기
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">관리자 검수 모드 (PIN 2026)</p>
                  <p className="text-xs text-slate-400">1~100화 전 회차 잠금 해제 및 검수 권한</p>
                </div>
                <button
                  onClick={() => (isAdmin ? setIsAdmin(false) : setShowPinModal(true))}
                  className={`px-4 py-2 text-xs font-bold rounded-lg ${
                    isAdmin ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-yellow-400 text-slate-950'
                  }`}
                >
                  {isAdmin ? '활성화됨 (해제)' : 'PIN 입력'}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-red-400">업로드 데이터 초기화</p>
                  <p className="text-xs text-slate-400">브라우저에 임시 저장된 회차 이미지를 초기화합니다.</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="px-4 py-2 bg-slate-800 hover:bg-red-950 text-red-300 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> 초기화
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. 작가 스튜디오 탭 */}
        {activeTab === 'studio' && (
          <div className="space-y-4">
            <div className="bg-indigo-950/50 border border-indigo-500/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs text-indigo-200">
                ① 그림 파일을 드래그해서 올린 뒤 → ② 맨 아래 노란색 <strong>[회차 업로드 및 즉시 공개하기]</strong> 버튼을 꼭 눌러야 웹툰 뷰어에 반영됩니다!
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('viewer')}
                className="shrink-0 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg border border-slate-600 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-yellow-400" />
                <span>나가기</span>
              </button>
            </div>

            <EpisodeUploadForm onPublish={handlePublish} />
          </div>
        )}
      </main>

      {/* 하단 고정 5개 탭 네비게이션 바 (홈 / 웹툰 뷰어 / 멤버십 / 커뮤니티 / 설정) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800">
        <div className="max-w-4xl mx-auto grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
              activeTab === 'home' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>홈</span>
          </button>
          <button
            onClick={() => setActiveTab('viewer')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
              activeTab === 'viewer' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>웹툰 뷰어</span>
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
              activeTab === 'membership' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span>멤버십</span>
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
              activeTab === 'community' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>커뮤니티</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 text-[11px] ${
              activeTab === 'settings' || activeTab === 'studio' ? 'text-yellow-400 font-bold' : 'text-slate-400'
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
