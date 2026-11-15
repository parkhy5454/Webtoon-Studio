'use client';

import React, { useState } from 'react';

export default function EpisodeUploadForm() {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.imageUrl);
        alert('이미지가 성공적으로 업로드되었습니다!');
      } else {
        alert('업로드 실패: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-6 bg-slate-900 rounded-xl text-white">
      <h3 className="text-lg font-bold">새 회차 컷 업로드 (파일 선택 기능)</h3>
      
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-300">내 컴퓨터에서 이미지 선택</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400 cursor-pointer text-sm text-gray-400"
        />
        {uploading && <p className="text-yellow-400 text-xs">업로드 중입니다...</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm text-gray-300">컷 이미지 URL (자동 입력 또는 직접 입력)</label>
        <input 
          type="text" 
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="예: /images/cut1.png 또는 업로드 버튼 사용"
          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white text-sm"
        />
      </div>

      {imageUrl && (
        <div className="mt-2">
          <p className="text-xs text-gray-400 mb-1">미리보기:</p>
          <img src={imageUrl} alt="미리보기 컷" className="h-32 object-contain rounded border border-slate-700" />
        </div>
      )}
    </div>
  );
}
