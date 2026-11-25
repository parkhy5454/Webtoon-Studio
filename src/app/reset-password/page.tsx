'use client';

import { useEffect, useState } from 'react';

export default function ResetPasswordPage() {
  const [token, setToken] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.hash.slice(1)).get('token') ?? '');
  }, []);

  return (
    <main className="mx-auto max-w-md space-y-4 px-5 py-12">
      <h1 className="text-xl font-bold">비밀번호 재설정</h1>
      <form className="light-entry light-login space-y-3 rounded-xl p-4" onSubmit={async (event) => {
        event.preventDefault();
        if (pending) return;
        setPending(true);
        setMessage('');
        try {
          const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(token
              ? { action: 'confirm', token, password: value }
              : { action: 'request', email: value }),
          });
          const data = await response.json();
          if (!response.ok) {
            setMessage(data.error ?? '잠시 뒤 다시 시도해 주세요.');
            return;
          }
          setValue('');
          if (token) {
            window.history.replaceState(null, '', window.location.pathname);
            setToken('');
            setMessage('비밀번호를 바꿨습니다. 새 비밀번호로 로그인해 주세요.');
          } else {
            setMessage('가입된 주소라면 비밀번호 재설정 링크가 발송됩니다.');
          }
        } catch {
          setMessage('서버에 연결하지 못했습니다. 잠시 뒤 다시 시도해 주세요.');
        } finally {
          setPending(false);
        }
      }}>
        <label className="block space-y-2">
          <span>{token ? '새 비밀번호' : '가입 이메일'}</span>
          <input key={token ? 'password' : 'email'} required
            type={token ? 'password' : 'email'} autoComplete={token ? 'new-password' : 'email'}
            minLength={token ? 8 : undefined} maxLength={token ? 200 : 254}
            value={value} onChange={(event) => setValue(event.target.value)}
            className="block w-full rounded-lg border border-slate-700 bg-slate-900 p-3" />
        </label>
        <button disabled={pending} className="w-full rounded-lg bg-amber-400 p-3 font-bold text-slate-950 disabled:opacity-50">
          {token ? '비밀번호 저장' : '재설정 링크 받기'}
        </button>
      </form>
      {message && <p role="status" className="text-sm text-slate-200">{message}</p>}
      <a href="/" className="text-sm text-amber-300">웹툰스튜디오로 돌아가기</a>
    </main>
  );
}
