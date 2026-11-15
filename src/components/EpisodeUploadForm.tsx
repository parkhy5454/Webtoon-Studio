'use client';

import React, { useState } from 'react';
import { Upload, Plus, Trash2, CheckCircle2, ImagePlus } from 'lucide-react';

export interface CutItem {
  id: number;
  imageUrl: string;
  description: string;
  sfx: string;
  narration: string;
  dialogue: string;
}

interface Props {
  onPublish: (title: string, cuts: CutItem[]) => void;
}

export default function EpisodeUploadForm({ onPublish }: Props) {
  const [series, setSeries] = useState('서울의 달');
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [cuts, setCuts] = useState<CutItem[]>([
    { id: 1, imageUrl: '', description: '', sfx: '', narration: '', dialogue: '' },
  ]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const uploadFile = async (cutId: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }

    setUploadingId(cutId);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setCuts((prev) =>
          prev.map((c) => (c.id === cutId ? { ...c, imageUrl: data.imageUrl } : c))
        );
      } else {
        alert(data.message || '업로드 실패');
      }
    } catch {
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleFileChange = (cutId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(cutId, file);
  };

  const handleDragOver = (cutId: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggingId !== cutId) setDraggingId(cutId);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingId(null);
  };

  const handleDrop = (cutId: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingId(null);

    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(cutId, file);
  };

  const addCut = () => {
    setCuts((prev) => [
      ...prev,
      { id: prev.length + 1, imageUrl: '', description: '', sfx: '', narration: '', dialogue: '' },
    ]);
  };

  const removeCut = (id: number) => {
    if (cuts.length === 1) return;
    setCuts((prev) => prev.filter((c) => c.id !== id).map((c, idx) => ({ ...c, id: idx + 1 })));
  };

  const updateField = (id: number, field: keyof CutItem, value: string) => {
    setCuts((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleSubmit = () => {
    if (!episodeTitle.trim()) {
      alert('회차 소제목을 입력해 주세요.');
      return;
    }
    onPublish(`${series} - ${episodeTitle}`, cuts);
    alert('회차가 업로드되어 뷰어에 즉시 반영되었습니다!');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
          <Upload className="w-5 h-5" /> 새 회차 원고 & 컷 업로드
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">연재할 내 작품 선택</label>
          <select
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          >
            <option value="서울의 달">서울의 달 (다음: 제 1화)</option>
            <option value="서울의 밤">서울의 밤</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">회차 소제목 *</label>
          <input
            type="text"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
            placeholder="예: 제 1화 - 비 오는 옥상에서"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-yellow-400">컷 구성 ({cuts.length}컷)</span>
        <button
          type="button"
          onClick={addCut}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg border border-slate-700"
        >
          <Plus className="w-4 h-4" /> 컷 추가
        </button>
      </div>

      <div className="space-y-4">
        {cuts.map((cut) => {
          const isDragging = draggingId === cut.id;
          return (
            <div key={cut.id} className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400">CUT #{cut.id}</span>
                {cuts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCut(cut.id)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 드래그 앤 드롭 + 클릭 파일 선택 통합 영역 */}
              <div
                onDragOver={(e) => handleDragOver(cut.id, e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(cut.id, e)}
                className={`p-5 rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center text-center gap-2.5 ${
                  isDragging
                    ? 'border-yellow-400 bg-yellow-400/10 scale-[1.01]'
                    : 'border-slate-700 bg-slate-900/80 hover:border-slate-500'
                }`}
              >
                <ImagePlus className={`w-7 h-7 ${isDragging ? 'text-yellow-400' : 'text-slate-400'}`} />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-200">
                    {isDragging
                      ? '여기에 그림 파일을 놓으세요!'
                      : '그림 파일을 마우스로 끌어다 놓거나(드래그), 아래 버튼을 눌러 선택하세요'}
                  </p>
                  <p className="text-[11px] text-slate-400">JPG, PNG, WEBP 이미지 지원</p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-lg transition">
                    <Upload className="w-4 h-4" />
                    <span>{uploadingId === cut.id ? '업로드 중...' : '파일 찾기'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(cut.id, e)}
                      className="hidden"
                    />
                  </label>
                  {cut.imageUrl && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-4 h-4" /> 이미지 등록 완료
                    </span>
                  )}
                </div>
              </div>

              {cut.imageUrl && (
                <div className="rounded-lg overflow-hidden border border-slate-800 bg-black flex justify-center p-2">
                  <img src={cut.imageUrl} alt={`CUT #${cut.id}`} className="max-h-64 object-contain" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={cut.description}
                  onChange={(e) => updateField(cut.id, 'description', e.target.value)}
                  placeholder="장면 설명 (예: 노을 지는 옥탑방 난간)"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={cut.sfx}
                  onChange={(e) => updateField(cut.id, 'sfx', e.target.value)}
                  placeholder="효과음 SFX (예: 쏴아아-, 두근)"
                  className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <input
                type="text"
                value={cut.narration}
                onChange={(e) => updateField(cut.id, 'narration', e.target.value)}
                placeholder="내레이션 (독백/지문)"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
              <input
                type="text"
                value={cut.dialogue}
                onChange={(e) => updateField(cut.id, 'dialogue', e.target.value)}
                placeholder="캐릭터 대사"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition"
      >
        <Upload className="w-4 h-4" /> 회차 업로드 및 즉시 공개하기
      </button>
    </div>
  );
}
