\'use client\';

import React, { useState, useRef } from \'react\';

interface UploadedCut {
  file: File;
  previewUrl: string;
  order: number;
}

const ALLOWED_TYPES = [\'image/jpeg\', \'image/png\', \'image/webp\'];
const MAX_FILE_SIZE_MB = 2; // 컷당 최대 2MB
const MAX_TOTAL_SIZE_MB = 50; // 1회차 총합 최대 50MB

export default function EpisodeUploadForm() {
  const [cuts, setCuts] = useState<UploadedCut[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">새 회차 원고 업로드</h2>

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
        className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
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

        <p className="text-base font-semibold text-gray-800 mb-2">
          원고 이미지를 이곳에 드래그하거나 클릭하여 선택하세요
        </p>

        <div className="inline-block text-left bg-white px-4 py-3 rounded-md border border-gray-200 text-xs text-gray-600 space-y-1">
          <p className="font-semibold text-gray-800">📌 원고 업로드 간략 가이드</p>
          <p>• <strong>파일 형식:</strong> JPG, PNG, WEBP (RGB 모드 권장)</p>
          <p>• <strong>권장 규격:</strong> 가로 720px ~ 1,000px / 컷당 2MB 이하 (총 50MB 이하)</p>
          <p>• <strong>자동 정렬:</strong> 파일명 숫자 순서대로 자동 배치됩니다. (예: 001.jpg, 002.jpg)</p>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 font-medium">
          ⚠️ {errorMsg}
        </div>
      )}

      {cuts.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">
              등록된 컷 ({cuts.length}장)
            </span>
            <button
              type="button"
              onClick={() => setCuts([])}
              className="text-xs text-red-500 hover:underline"
            >
              전체 삭제
            </button>
          </div>

          <ul className="divide-y divide-gray-100 border border-gray-200 rounded-lg max-h-64 overflow-y-auto">
            {cuts.map((cut, idx) => (
              <li key={cut.file.name + idx} className="flex items-center justify-between p-2.5 text-sm">
                <div className="flex items-center space-x-3 truncate">
                  <span className="w-7 h-7 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded text-xs">
                    {cut.order}
                  </span>
                  <img
                    src={cut.previewUrl}
                    alt={cut.file.name}
                    className="w-10 h-10 object-cover rounded border border-gray-200"
                  />
                  <span className="truncate font-medium text-gray-800">{cut.file.name}</span>
                  <span className="text-xs text-gray-400">
                    ({(cut.file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeCut(idx)}
                  className="text-gray-400 hover:text-red-500 px-2"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
