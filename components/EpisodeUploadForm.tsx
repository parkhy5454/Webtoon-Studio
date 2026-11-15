\'use client\';

import React, { useState, useRef } from \'react\';

interface UploadedCut {
  file: File;
  previewUrl: string;
  order: number;
}

interface Props {
  episodeNumber?: number;
}

const ALLOWED_TYPES = [\'image/jpeg\', \'image/png\', \'image/webp\'];
const MAX_FILE_SIZE_MB = 2; // 컷당 최대 2MB
const MAX_TOTAL_SIZE_MB = 50; // 1회차 총합 최대 50MB

export default function EpisodeUploadForm({ episodeNumber = 1 }: Props) {
  const [cuts, setCuts] = useState<UploadedCut[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setErrorMsg(null);

    const fileArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    let currentTotalSize = cuts.reduce((acc, item) => acc + item.file.size, 0);

    for (const file of fileArray) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMsg(`지원하지 않는 형식입니다: ${file.name} (JPG, PNG, WEBP만 가능)`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`용량 초과(${MAX_FILE_SIZE_MB}MB 이하 권장): ${file.name}`);
        continue;
      }

      if (currentTotalSize + file.size > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
        setErrorMsg(`1회차 전체 용량은 ${MAX_TOTAL_SIZE_MB}MB를 초과할 수 없습니다.`);
        break;
      }

      currentTotalSize += file.size;
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const combinedFiles = [...cuts.map((c) => c.file), ...validFiles].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: \'base\' })
    );

    const updatedCuts: UploadedCut[] = combinedFiles.map((file, idx) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      order: idx + 1,
    }));

    setCuts(updatedCuts);
  };

  const removeCut = (indexToRemove: number) => {
    const filtered = cuts
      .filter((_, idx) => idx !== indexToRemove)
      .map((item, idx) => ({ ...item, order: idx + 1 }));
    setCuts(filtered);
  };

  const handleUploadSubmit = () => {
    if (cuts.length === 0) {
      alert(\'업로드할 컷 이미지를 최소 1장 이상 선택해주세요.\');
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert(`🎉 [제 ${episodeNumber}화] 원고 ${cuts.length}장이 성공적으로 업로드되었습니다!`);
      setCuts([]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900">
          🖼️ 제 {episodeNumber}화 원고 이미지 업로드 (총 5컷 권장)
        </h2>
        <span className="text-xs text-gray-500">JPG, PNG, WEBP 지원</span>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? \'border-indigo-600 bg-indigo-50\' : \'border-gray-300 hover:border-indigo-400 bg-gray-50\'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="space-y-2">
          <p className="text-base font-semibold text-gray-800">
            여기를 클릭하거나 컷 이미지 파일들을 드래그하여 올려주세요
          </p>
          <p className="text-xs text-gray-400">
            파일명 오름차순(001.jpg, 002.jpg...)으로 자동 정렬됩니다.
          </p>
        </div>

        <div className="mt-4 inline-block text-left bg-white px-4 py-3 rounded-md border border-gray-200 text-xs text-gray-600 space-y-1">
          <p className="font-semibold text-gray-800">📌 업로드 가이드 요약</p>
          <p>• <strong>권장 규격:</strong> 가로 720px ~ 1,000px (컷당 2MB 이하)</p>
          <p>• <strong>회차 구성:</strong> 서울의 달 5컷 템플릿에 맞추어 5장의 이미지를 올려주세요.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {cuts.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-700">
              선택된 원고 컷 미리보기 ({cuts.length}장 / 5컷)
            </span>
            <button
              type="button"
              onClick={() => setCuts([])}
              className="text-xs text-red-500 hover:underline"
            >
              전체 초기화
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {cuts.map((cut, idx) => (
              <div key={cut.file.name + idx} className="relative bg-gray-50 p-2 rounded-lg border border-gray-200 text-center">
                <span className="absolute top-3 left-3 w-6 h-6 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-xs shadow">
                  {cut.order}
                </span>
                <img
                  src={cut.previewUrl}
                  alt={cut.file.name}
                  className="w-full h-28 object-cover rounded mb-2 border border-gray-200"
                />
                <p className="text-xs font-medium text-gray-800 truncate">{cut.file.name}</p>
                <button
                  type="button"
                  onClick={() => removeCut(idx)}
                  className="mt-1 text-xs text-red-500 hover:underline"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={isUploading}
            onClick={handleUploadSubmit}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm shadow-md transition-colors"
          >
            {isUploading ? \'업로드 중...\' : `[제 ${episodeNumber}화] 원고 최종 등록하기`}
          </button>
        </div>
      )}
    </div>
  );
}
