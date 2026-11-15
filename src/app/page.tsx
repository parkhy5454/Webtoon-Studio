'use client';

import React, { useState } from 'react';
import EpisodeUploadForm, { CutItem } from '@/components/EpisodeUploadForm';
import { Lock, Unlock, ShieldCheck, BookOpen, PenTool, User } from 'lucide-react';

const DEFAULT_CUTS: CutItem[] = [
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

export default function WebtoonStudioApp() {
  const [activeTab, setActiveTab] = useState<'viewer' | 'studio'>('studio');
  const [selectedEpisode, setSelectedEpisode] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [publishedTitle, setPublishedTitle] = useState<string>('서울의 달 - 제 1화');
  const [cuts, setCuts] = useState<CutItem[]>(DEFAULT_CUTS);

  const episodes = Array.from({ length: 100 }, (_, i) => i + 1);
  const isLocked = selectedEpisode > 5 && !isAdmin;

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

  const handlePublish = (title: string, newCuts: CutItem[]) => {
    setPublishedTitle(title);
    setCuts(newCuts);
    setSelectedEpisode(1);
    setActiveTab('viewer');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur border-b border-slate-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white">
              W
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">웹툰스튜디오스</h1>
              <p className="text-[11px] text-slate-400">오픈 웹툰 창작 & 구독 플랫폼</p>
            </div>
          </div>

          <button
            onClick={() => (isAdmin ? setIsAdmin(false) : setShowPinModal(true))}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border ${
              isAdmin
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {isAdmin ? '관리자 검수중' : '관리자 모드'}
          </button>
        </div>
      </header>

      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-xs space-y-4">
            <h3 className="text-base font-bold text-center">관리자 검수 PIN 입력</h3>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN 번호 입력"
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

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {activeTab === 'studio' ? (
          <div className="space-y-4">
            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 text-xs text-indigo-200">
              작가 스튜디오에서는 URL 주소 없이 <strong>내 컴퓨터에서 그림 파일을 직접 선택</strong>하여 바로 연재할 수 있습니다.
            </div>
            <EpisodeUploadForm onPublish={handlePublish} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base">{publishedTitle}</h2>
                <span className="text-xs text-slate-400">1~5화 무료 / 6~100화 멤버십</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {episodes.slice(0, 20).map((ep) => {
                  const locked = ep > 5 && !isAdmin;
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
                <p className="text-sm text-slate-400">1화~5화는 무료로 감상하실 수 있으며, 관리자 모드(PIN)로 전체 검수가 가능합니다.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cuts.map((cut) => (
                  <div key={cut.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex justify-between text-xs text-slate-400">
                      <span>CUT #{cut.id} / {cuts.length}</span>
                      <span>{cut.sfx}</span>
                    </div>
                    {cut.imageUrl ? (
                      <img src={cut.imageUrl} alt={`CUT ${cut.id}`} className="w-full h-auto object-contain bg-black" />
                    ) : (
                      <div className="py-16 px-6 text-center bg-slate-900/50 space-y-2">
                        <p className="text-sm font-semibold text-slate-300">[원고 이미지 미등록 영역 - CUT #{cut.id}]</p>
                        <p className="text-xs text-slate-400">{cut.description}</p>
                        <p className="text-xs text-yellow-400/80 pt-2">※ 하단 [작가 스튜디오] 탭에서 그림 파일을 업로드하면 이 자리에 즉시 표시됩니다.</p>
                      </div>
                    )}
                    {(cut.narration || cut.dialogue) && (
                      <div className="p-4 space-y-2 bg-slate-950/60">
                        {cut.narration && <p className="text-xs text-slate-400 italic">{cut.narration}</p>}
                        {cut.dialogue && <p className="text-sm font-medium text-white bg-slate-900 p-3 rounded-xl border border-slate-800">{cut.dialogue}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur border-t border-slate-800">
        <div className="max-w-4xl mx-auto grid grid-cols-3 h-16">
          <button
            onClick={() => setActiveTab('viewer')}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              activeTab === 'viewer' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>웹툰 뷰어</span>
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${
              activeTab === 'studio' ? 'text-yellow-400 font-bold' : 'text-slate-400'
            }`}
          >
            <PenTool className="w-5 h-5" />
            <span>작가 스튜디오</span>
          </button>
          <button
            onClick={() => setShowPinModal(true)}
            className="flex flex-col items-center justify-center gap-1 text-xs text-slate-400"
          >
            <User className="w-5 h-5" />
            <span>관리자 검수</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
