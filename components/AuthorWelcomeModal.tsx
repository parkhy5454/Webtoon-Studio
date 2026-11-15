'use client';

import React from 'react';

interface AuthorWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToUpload: () => void;
}

export default function AuthorWelcomeModal({
  isOpen,
  onClose,
  onGoToUpload,
}: AuthorWelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-2">
            작가 등록 완료
          </span>
          <h3 className="text-xl font-bold text-gray-900">
            웹툰스튜디오스 작가가 되신 것을 환영합니다!
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            첫 작품을 연재하기 전, 원고 규격만 간단히 확인해 주세요.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-2 border border-gray-100 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">지원 확장자</span>
            <span className="font-semibold">JPG, PNG, WEBP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">권장 가로 폭</span>
            <span className="font-semibold">720px ~ 1,000px</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">최대 용량</span>
            <span className="font-semibold">컷당 2MB / 회차당 50MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">정렬 방식</span>
            <span className="font-semibold">파일명 순 (001, 002...)</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            나중에 하기
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToUpload();
            }}
            className="flex-1 py-2.5 px-4 rounded-lg bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            바로 작품 올리기
          </button>
        </div>
      </div>
    </div>
  );
}
