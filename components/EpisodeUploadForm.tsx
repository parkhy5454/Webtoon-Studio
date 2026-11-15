'use client';

import React, { useState } from 'react';
import { Upload, Plus, Trash2, CheckCircle2, ImagePlus, Layers } from 'lucide-react';

export interface CutItem {
  id: number;
  imageUrl: string;
  description: string;
  sfx: string;
  narration: string;
  dialogue: string;
}

interface Props {
  onPublish: (series: string, episodeNum: number, title: string, cuts: CutItem[]) => void;
}

// 브라우저에서 이미지를 웹툰 뷰어 최적 폭(최대 900px)으로 자동 압축해 4.5MB 업로드 제한 및 저장 용량 문제 해결
function compressImageToDataUrl(file: File, maxWidth = 900, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('이미지 디코딩 실패'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function EpisodeUploadForm({ onPublish }: Props) {
  const [series, setSeries] = useState('서울의 달');
  const [episodeNum, setEpisodeNum] = useState<number>(1);
  const [episodeTitle, setEpisodeTitle] = useState('');
  const [cuts, setCuts] = useState<CutItem[]>([
    { id: 1, imageUrl: '', description: '', sfx: '', narration: '', dialogue: '' },
  ]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [bulkUploading, setBulkUploading] = useState<boolean>(false);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [bulkDragging, setBulkDragging] = useState<boolean>(false);

  // 여러 파일 한꺼번에 업로드 (파일명 순 정렬 후 CUT #1 ~ #N 자동 생성)
  const handleBulkFiles = async (fileList: FileList | File[]) => {
    const imageFiles = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    if (imageFiles.length === 0) {
      alert('이미지 파일(JPG, PNG, WEBP 등)을 선택해 주세요.');
      return;
    }

    setBulkUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const dataUrl = await compressImageToDataUrl(file);
        uploadedUrls.push(dataUrl);
      }

      if (uploadedUrls.length > 0) {
        setCuts((prev) => {
          const hasExistingContent = prev.some(
            (c) => c.imageUrl || c.description || c.sfx || c.narration || c.dialogue
          );
          const baseList = hasExistingContent ? [...prev] : [];
          const newItems: CutItem[] = uploadedUrls.map((url, idx) => ({
            id: baseList.length + idx + 1,
            imageUrl: url,
            description: '',
            sfx: '',
            narration: '',
            dialogue: '',
          }));
          return [...baseList, ...newItems].map((item, idx) => ({ ...item, id: idx + 1 }));
        });
        alert(`${uploadedUrls.length}장의 이미지가 순서대로 컷에 등록되었습니다! 아래 [회차 업로드 및 즉시 공개하기]를 눌러주세요.`);
      }
    } catch {
      alert('이미지 변환 중 오류가 발생했습니다.');
    } finally {
      setBulkUploading(false);
    }
  };

  // 개별 컷 단일 파일 업로드
  const uploadSingleFile = async (cutId: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }

    setUploadingId(cutId);
    try {
      const dataUrl = await compressImageToDataUrl(file);
      setCuts((prev) =>
        prev.map((c) => (c.id === cutId ? { ...c, imageUrl: dataUrl } : c))
      );
    } catch {
      alert('이미지 처리 중 오류가 발생했습니다.');
    } finally {
      setUploadingId(null);
    }
  };

  const handleBulkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleBulkFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleBulkDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBulkDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleBulkFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (cutId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadSingleFile(cutId, file);
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

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (files.length > 1) {
      handleBulkFiles(files);
    } else {
      uploadSingleFile(cutId, files[0]);
    }
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
    const finalTitle = episodeTitle.trim() || `제 ${episodeNum}화`;
    onPublish(series, episodeNum, `${series} - ${finalTitle}`, cuts);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
          <Upload className="w-5 h-5" /> 새 회차 원고 & 컷 업로드
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">연재할 내 작품 선택</label>
          <select
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          >
            <option value="서울의 달">서울의 달</option>
            <option value="서울의 밤">서울의 밤</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">회차 번호 (1~100화)</label>
          <input
            type="number"
            min={1}
            max={100}
            value={episodeNum}
            onChange={(e) => setEpisodeNum(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5">회차 소제목 (미입력 시 자동 지정)</label>
          <input
            type="text"
            value={episodeTitle}
            onChange={(e) => setEpisodeTitle(e.target.value)}
            placeholder={`예: 제 ${episodeNum}화 - 달빛 아래서`}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white"
          />
        </div>
      </div>

      {/* 여러 컷 한꺼번에 일괄 업로드 존 */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!bulkDragging) setBulkDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setBulkDragging(false);
        }}
        onDrop={handleBulkDrop}
        className={`p-6 rounded-2xl border-2 border-dashed transition flex flex-col items-center justify-center text-center gap-3 ${
          bulkDragging
            ? 'border-yellow-400 bg-yellow-400/15 scale-[1.01]'
            : 'border-indigo-500/50 bg-indigo-950/25 hover:border-yellow-400/70'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-yellow-400/15 flex items-center justify-center">
          <Layers className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-white">
            {bulkDragging
              ? '여기에 이미지 파일들을 한꺼번에 놓으세요!'
              : '여러 컷(5장, 10장, 20장... N장) 한꺼번에 일괄 업로드'}
          </p>
          <p className="text-xs text-slate-300">
            그림 파일들을 마우스로 한 번에 드래그해서 놓거나, 여러 장을 동시에 선택하면 파일명 순서대로 CUT #1부터 자동 생성됩니다.
          </p>
        </div>
        <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-xl transition shadow">
          <Upload className="w-4 h-4" />
          <span>{bulkUploading ? '이미지 최적화 및 등록 중...' : '여러 파일 한꺼번에 선택하기'}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleBulkInputChange}
            disabled={bulkUploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-sm font-semibold text-yellow-400">컷 구성 ({cuts.length}컷)</span>
        <button
          type="button"
          onClick={addCut}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg border border-slate-700"
        >
          <Plus className="w-4 h-4" /> 개별 컷 추가
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

              <div
                onDragOver={(e) => handleDragOver(cut.id, e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(cut.id, e)}
                className={`p-4 rounded-xl border-2 border-dashed transition flex flex-col items-center justify-center text-center gap-2 ${
                  isDragging
                    ? 'border-yellow-400 bg-yellow-400/10 scale-[1.01]'
                    : 'border-slate-700 bg-slate-900/80 hover:border-slate-500'
                }`}
              >
                <ImagePlus className={`w-6 h-6 ${isDragging ? 'text-yellow-400' : 'text-slate-400'}`} />
                <p className="text-xs text-slate-300">
                  {isDragging
                    ? '여기에 그림 파일을 놓으세요!'
                    : '이 컷의 그림을 끌어다 놓거나 [파일 찾기]를 누르세요'}
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg border border-slate-600 transition">
                    <Upload className="w-3.5 h-3.5" />
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
        <Upload className="w-4 h-4" /> 회차 업로드 및 즉시 공개하기 (웹툰 뷰어로 이동)
      </button>
    </div>
  );
}
