'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  BookOpen,
  Play,
  Crown,
  MessageSquare,
  Settings,
  Lock,
  Unlock,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Heart,
  Share2,
  CheckCircle2,
  AlertCircle,
  Eye,
  UserPlus,
  LogIn,
  LogOut,
  Upload,
  PlusCircle,
  PenTool,
  Coins,
  Users,
  Trash2,
  User,
  ArrowRight,
  Award,
  Zap,
} from 'lucide-react';
import { EPISODES_100 } from '@/lib/episodes-100';

interface EpisodeCut {
  img: string;
  scene?: string;
  narration?: string;
  dialogue?: string;
  sfx?: string;
  [key: string]: unknown;
}

interface Episode {
  num: number;
  title: string;
  cuts: EpisodeCut[];
  [key: string]: unknown;
}

type TabType = 'home' | 'works' | 'viewer' | 'membership' | 'community' | 'settings';
type UserRole = 'reader' | 'creator' | 'admin';

interface CommentItem {
  id: string;
  author: string;
  episode: number;
  content: string;
  likes: number;
  createdAt: string;
  isBest?: boolean;
}

interface UserAccount {
  id: string;
  role: UserRole;
  displayName: string;
  email: string;
  joinedAt: string;
}

interface WebtoonWork {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  genre: string;
  synopsis: string;
  coverImg: string;
  subscribers: number;
  episodes: Episode[];
  isOfficial?: boolean;
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

const SAFE_EPISODES_100: Episode[] = EPISODES_100.map((episode) => ({
  ...episode,
  num: episode.epNumber,
  cuts: episode.cuts as unknown as EpisodeCut[],
}));

const compressCutImage = async (file: File): Promise<File> => {
  const bitmap = await createImageBitmap(file);
  let maxDimension = 1500;
  let quality = 0.82;
  let blob: Blob | null = null;

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) {
      bitmap.close();
      throw new Error('이미지 변환을 시작하지 못했습니다.');
    }
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality));
    if (blob && blob.size <= 850 * 1024) break;
    maxDimension -= 150;
    quality -= 0.08;
  }
  bitmap.close();

  if (!blob || blob.size > 2 * 1024 * 1024) {
    throw new Error(`${file.name}: 이미지 압축 후에도 용량이 너무 큽니다.`);
  }
  const extension = blob.type === 'image/webp' ? 'webp' : blob.type === 'image/png' ? 'png' : 'jpg';
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'cut';
  return new File([blob], `${baseName}.${extension}`, { type: blob.type || 'image/jpeg' });
};

const checkImageUrl = (url: string): Promise<boolean> =>
  new Promise((resolve) => {
    const image = new Image();
    let timeout: number | undefined;
    const finish = (loaded: boolean) => {
      if (timeout !== undefined) window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      resolve(loaded && image.naturalWidth > 0);
    };
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    timeout = window.setTimeout(() => finish(false), 15000);
    image.src = url;
  });

const INITIAL_WORKS: WebtoonWork[] = [
  {
    id: 'work-dalbit',
    title: '달을 비추는 옥탑',
    authorName: '웹툰스튜디오스 오리지널',
    authorId: 'official-studio',
    genre: '감성 로맨스 · 드라마',
    synopsis:
      '서울의 가장 낮은 골목 끝, 달빛만이 유일한 조명인 오래된 옥탑방. 각자의 상처를 숨긴 채 옥상 난간을 마주한 두 청춘이 써 내려가는 100일간의 야경 로맨스 드라마.',
    coverImg: SAFE_EPISODES_100[0]?.cuts?.[0]?.img || '',
    subscribers: 1280,
    episodes: SAFE_EPISODES_100,
    isOfficial: true,
  },
];

const STORAGE_KEYS = {
  LEGACY_USERS: 'webtoon_studios_users_v2',
  CURRENT_USER: 'webtoon_studios_current_user_v2',
  CUSTOM_WORKS: 'webtoon_studios_custom_works_v1',
};

export default function WebtoonStudioPage() {
  // 초기 첫 화면은 플랫폼 정체성을 보여주는 'home' 탭
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // 다중 작품(공유 플랫폼) 상태
  const [works, setWorks] = useState<WebtoonWork[]>(INITIAL_WORKS);
  const [selectedWorkId, setSelectedWorkId] = useState<string>('work-dalbit');
  const [selectedEpisodeNum, setSelectedEpisodeNum] = useState<number>(1);
  const [catalogQuery, setCatalogQuery] = useState('');
  const [catalogGenre, setCatalogGenre] = useState('all');
  const [catalogSort, setCatalogSort] = useState<'latest' | 'popular'>('latest');
  const [catalogWorkId, setCatalogWorkId] = useState<string | null>(null);

  // 멤버십 & 관리자 검수 모드 상태 (기본 화면에서는 비공개)
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdminReview, setIsAdminReview] = useState<boolean>(false);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [secretTapCount, setSecretTapCount] = useState<number>(0);
  const [adminPinInput, setAdminPinInput] = useState<string>('');
  const [adminError, setAdminError] = useState<string>('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string>('');

  // 회원(일반 독자 / 작가) 계정 상태
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [signupRole, setSignupRole] = useState<'reader' | 'creator'>('reader');
  const [displayNameInput, setDisplayNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // 작가 작품 등록 & 회차 업로드 폼 상태
  const [creatorSubTab, setCreatorSubTab] = useState<'newWork' | 'newEpisode' | 'settlement'>('newWork');
  const [newWorkTitle, setNewWorkTitle] = useState<string>('');
  const [newWorkGenre, setNewWorkGenre] = useState<string>('드라마 · 일상');
  const [newWorkSynopsis, setNewWorkSynopsis] = useState<string>('');
  const [newWorkCover, setNewWorkCover] = useState<string>('');

  const [targetWorkId, setTargetWorkId] = useState<string>('');
  const [editingEpisodeNum, setEditingEpisodeNum] = useState<number | null>(null);
  const [isSavingEpisode, setIsSavingEpisode] = useState(false);
  const episodeSaveLock = useRef(false);
  const [newEpTitle, setNewEpTitle] = useState<string>('');
  const [newEpCuts, setNewEpCuts] = useState<EpisodeCut[]>([
    { img: '', scene: '', narration: '', dialogue: '', sfx: '' },
  ]);
  const [isDraggingCutFiles, setIsDraggingCutFiles] = useState<boolean>(false);
  const [isUploadingCutFiles, setIsUploadingCutFiles] = useState<boolean>(false);
  const [cutFileError, setCutFileError] = useState<string>('');
  const [cutUploadProgress, setCutUploadProgress] = useState<string>('');
  const [isCheckingCutImages, setIsCheckingCutImages] = useState<boolean>(false);
  const [cutPreviewErrors, setCutPreviewErrors] = useState<number[]>([]);
  const cutFileInputRef = useRef<HTMLInputElement>(null);

  // 좋아요 & 댓글 & 토스트
  const [likedEpisodes, setLikedEpisodes] = useState<string[]>(['work-dalbit-1']);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  // 로컬 스토리지에서 회원 계정 및 등록된 공유 작품 불러오기
  useEffect(() => {
    let localCustomWorks: WebtoonWork[] = [];
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEYS.LEGACY_USERS);
      if (savedUsers) {
        const legacyUsers = JSON.parse(savedUsers);
        if (Array.isArray(legacyUsers) && legacyUsers.length > 0) {
          void fetch('/api/auth/migrate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ users: legacyUsers }),
          }).then((response) => {
            if (response.ok) localStorage.removeItem(STORAGE_KEYS.LEGACY_USERS);
          }).catch(() => undefined);
        }
      }
      const savedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedCurrent) {
        const parsedUser: UserAccount = JSON.parse(savedCurrent);
        // 관리자 데모 로그인만 로컬 저장소를 사용합니다. 독자/창작자는 서버 세션에서 복원합니다.
        if (parsedUser.role === 'admin') {
          setCurrentUser(parsedUser);
          setIsAdminReview(true);
        }
      }
      const savedWorks = localStorage.getItem(STORAGE_KEYS.CUSTOM_WORKS);
      if (savedWorks) {
        const parsedCustom: WebtoonWork[] = JSON.parse(savedWorks);
        if (Array.isArray(parsedCustom) && parsedCustom.length > 0) {
          localCustomWorks = parsedCustom;
          setWorks([...INITIAL_WORKS, ...localCustomWorks]);
        }
      }
    } catch {
      // 스토리지 접근 오류 무시
    }

    const hydrateServerData = async () => {
      let sessionUser: UserAccount | null = null;
      try {
        const response = await fetch('/api/auth/me', { cache: 'no-store' });
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            sessionUser = data.user as UserAccount;
            setCurrentUser(sessionUser);
            setIsAdminReview(false);
          }
        }
      } catch {
        // API가 연결되지 않았으면 기존 관리자 로컬 로그인만 유지합니다.
      }

      if (sessionUser?.role === 'creator') {
        const ownLocalWorks = localCustomWorks.filter((work) => work.authorId === sessionUser?.id);
        if (ownLocalWorks.length > 0) {
          try {
            await fetch('/api/creator/works', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ works: ownLocalWorks }),
            });
          } catch {
            // 네트워크가 복구되면 작가가 다시 저장할 수 있습니다.
          }
        }
      }

      try {
        const response = await fetch('/api/creator/works', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        const databaseWorks = Array.isArray(data.works) ? (data.works as WebtoonWork[]) : [];
        setWorks((currentWorks) => {
          const merged = new Map<string, WebtoonWork>();
          [...INITIAL_WORKS, ...currentWorks.filter((work) => !work.isOfficial), ...databaseWorks]
            .forEach((work) => merged.set(work.id, work));
          const updatedWorks = Array.from(merged.values());
          try {
            localStorage.setItem(
              STORAGE_KEYS.CUSTOM_WORKS,
              JSON.stringify(updatedWorks.filter((work) => !work.isOfficial))
            );
          } catch {
            // DB 데이터는 다음 접속 때 다시 불러옵니다.
          }
          return updatedWorks;
        });
      } catch {
        // DB에 연결할 수 없으면 로컬 작품을 그대로 표시합니다.
      }
    };

    void hydrateServerData();
  }, []);

  const syncCreatorWorks = async (workList: WebtoonWork[], userId: string) => {
    const ownWorks = workList.filter((work) => work.authorId === userId);
    if (ownWorks.length === 0) return true;
    const response = await fetch('/api/creator/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ works: ownWorks }),
    });
    return response.ok;
  };

  const persistCustomWorks = async (updatedWorks: WebtoonWork[]) => {
    setWorks(updatedWorks);
    try {
      const customOnly = updatedWorks.filter((w) => !w.isOfficial);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_WORKS, JSON.stringify(customOnly));
    } catch {
      showToast('브라우저 저장 공간이 부족합니다.');
      return false;
    }
    if (currentUser?.role === 'creator') {
      try {
        const saved = await syncCreatorWorks(updatedWorks, currentUser.id);
        if (!saved) {
          showToast('DB 저장에 실패했습니다. 잠시 후 다시 시도해 주세요.');
          return false;
        }
      } catch {
        showToast('서버에 작품을 저장하지 못했습니다. DATABASE_URL과 배포 상태를 확인해 주세요.');
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    if (activeTab !== 'works') return;
    let cancelled = false;
    const refreshWorks = async () => {
      try {
        const response = await fetch('/api/creator/works', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        if (!Array.isArray(data.works) || cancelled) return;
        const incoming = data.works as WebtoonWork[];
        setWorks((previous) => {
          const merged = new Map<string, WebtoonWork>();
          [...previous, ...incoming].forEach((work) => merged.set(work.id, work));
          return Array.from(merged.values());
        });
      } catch { /* Keep the existing catalog available while offline. */ }
    };
    void refreshWorks();
    const interval = window.setInterval(() => { void refreshWorks(); }, 30000);
    const onFocus = () => { void refreshWorks(); };
    window.addEventListener('focus', onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [activeTab]);

  // 상단 왼쪽 로고/타이틀 클릭 시 홈 메인 화면으로 이동
  const handleGoHome = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 하단 서비스명 영역 5회 연속 터치 시 숨김 관리자 인증 패널 토글
  const handleSecretAdminTrigger = () => {
    const next = secretTapCount + 1;
    if (next >= 5) {
      setShowAdminPanel((prev) => !prev);
      setSecretTapCount(0);
    } else {
      setSecretTapCount(next);
    }
  };

  // 현재 선택된 작품 & 회차
  const currentWork: WebtoonWork =
    works.find((w) => w.id === selectedWorkId) || works[0];

  const currentEpisode: Episode =
    currentWork.episodes.find((ep) => ep.num === selectedEpisodeNum) ||
    currentWork.episodes[0] || {
      num: 1,
      title: '등록된 회차가 없습니다',
      cuts: [],
    };

  // 배포자/관리자는 멤버십 결제 여부와 관계없이 전체 회차를 열람할 수 있습니다.
  const isAdminLoggedIn = Boolean(isAdminReview || currentUser?.role === 'admin');

  // 열람 가능 여부 (1~5화 무료, 멤버십/관리자 검수 또는 본인 작품일 때 열람 가능)
  const canAccessEpisode = (work: WebtoonWork, epNum: number) => {
    if (epNum <= 5) return true;
    if (isMember || isAdminLoggedIn) return true;
    if (currentUser && work.authorId === currentUser.id) return true;
    return false;
  };

  const isCurrentAccessible = canAccessEpisode(currentWork, currentEpisode.num);
  const displayedEpisodeTitle = currentEpisode.title
    .replace(/^제\s*\d+\s*화\s*[:：\-–—]?\s*/, '')
    .trim() || currentEpisode.title;
  const viewerImageCuts = currentEpisode.cuts.filter(
    (cut) => typeof cut.img === 'string' && cut.img.trim().length > 0
  );

  const handleSelectWorkAndEpisode = (workId: string, epNum: number) => {
    setSelectedWorkId(workId);
    setSelectedEpisodeNum(epNum);
    setActiveTab('viewer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 관리자 검수 모드 핸들러 (PIN 2026)
  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPinInput.trim() === '2026') {
      const adminAccount: UserAccount = {
        id: 'admin-master',
        role: 'admin',
        displayName: '총괄 관리자',
        email: 'admin@webtoonstudios.kr',
        joinedAt: '2026',
      };
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
      setIsAdminReview(true);
      setCurrentUser(adminAccount);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminAccount));
      setAdminError('');
      setAdminSuccessMsg('관리자 모드로 로그인되었습니다. 1~100화 전체 열람이 가능합니다.');
      setAdminPinInput('');
      showToast('관리자 로그인 완료 (전체 회차 잠금 해제)');
    } else {
      setAdminError('PIN 번호가 일치하지 않습니다.');
      setAdminSuccessMsg('');
    }
  };

  // 통합 로그아웃 (일반 독자 / 작가 / 관리자 모두 로그아웃)
  const handleLogoutAll = () => {
    if (currentUser?.role !== 'admin') {
      fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
    }
    setCurrentUser(null);
    setIsAdminReview(false);
    setShowAdminPanel(false);
    setAdminSuccessMsg('');
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    showToast('로그아웃되었습니다.');
  };

  // 회원가입 / 로그인 핸들러 (일반 독자 & 작가 + 관리자 이메일 로그인 지원)
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    if (!email || !password) {
      setAuthError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (authMode === 'signup') {
      const name = displayNameInput.trim();
      if (!name) {
        setAuthError(
          signupRole === 'creator'
            ? '활동하실 작가 필명을 입력해주세요.'
            : '사용하실 닉네임을 입력해주세요.'
        );
        return;
      }
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ displayName: name, email, password, role: signupRole }),
        });
        const data = await response.json();
        if (!response.ok) {
          setAuthError(data.error || '회원가입에 실패했습니다.');
          return;
        }
        const newAccount = data.user as UserAccount;
        setCurrentUser(newAccount);
        if (newAccount.role === 'creator') {
          const saved = await syncCreatorWorks(works, newAccount.id).catch(() => false);
          if (!saved) showToast('기존 작품을 DB로 옮기지 못했습니다. 작가 스튜디오에서 다시 저장해 주세요.');
        }
      } catch {
        setAuthError('서버에 연결할 수 없습니다. DATABASE_URL 설정과 배포 상태를 확인해 주세요.');
        return;
      }
      setDisplayNameInput('');
      setEmailInput('');
      setPasswordInput('');
      showToast(
        signupRole === 'creator'
          ? `${name} 작가님, 가입을 환영합니다! 바로 작품을 등록할 수 있습니다.`
          : `${name}님, 일반 회원으로 가입되었습니다!`
      );
    } else {
      // 관리자 이메일(admin@webtoon.kr / 2026) 비공개 로그인 지원
      if (email === 'admin@webtoon.kr' && password === '2026') {
        const adminAccount: UserAccount = {
          id: 'admin-master',
          role: 'admin',
          displayName: '총괄 관리자',
          email: 'admin@webtoon.kr',
          joinedAt: '2026',
        };
        fetch('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
        setCurrentUser(adminAccount);
        setIsAdminReview(true);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(adminAccount));
        setEmailInput('');
        setPasswordInput('');
        showToast('관리자 계정으로 로그인되었습니다.');
        return;
      }

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setAuthError(data.error || '이메일 또는 비밀번호가 올바르지 않습니다.');
          return;
        }
        const found = data.user as UserAccount;
        setCurrentUser(found);
        setIsAdminReview(false);
        if (found.role === 'creator') {
          const saved = await syncCreatorWorks(works, found.id).catch(() => false);
          if (!saved) showToast('기존 작품을 DB로 옮기지 못했습니다. 작가 스튜디오에서 다시 저장해 주세요.');
        }
        setEmailInput('');
        setPasswordInput('');
        showToast(`${found.displayName}님(${found.role === 'creator' ? '작가' : '일반 회원'})으로 로그인되었습니다.`);
      } catch {
        setAuthError('서버에 연결할 수 없습니다. DATABASE_URL 설정과 배포 상태를 확인해 주세요.');
        return;
      }
    }
  };

  // 일반 독자 -> 작가 전환 버튼
  const handleUpgradeToCreator = async () => {
    if (!currentUser) return;
    try {
      const response = await fetch('/api/auth/upgrade', { method: 'POST' });
      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || '작가 계정 전환에 실패했습니다.');
        return;
      }
      const upgraded = data.user as UserAccount;
      setCurrentUser(upgraded);
      showToast(`${upgraded.displayName}님, 작가 계정으로 전환되었습니다!`);
    } catch {
      showToast('서버에 연결할 수 없습니다.');
      return;
    }
  };

  // 새 웹툰 작품 등록 핸들러
  const handleCreateWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || (currentUser.role !== 'creator' && currentUser.role !== 'admin')) {
      return;
    }
    if (!newWorkTitle.trim()) {
      showToast('작품 제목을 입력해주세요.');
      return;
    }

    const createdWorkId = `work-${Date.now()}`;
    const createdWork: WebtoonWork = {
      id: createdWorkId,
      title: newWorkTitle.trim(),
      authorName: currentUser.displayName,
      authorId: currentUser.id,
      genre: newWorkGenre.trim() || '드라마',
      synopsis:
        newWorkSynopsis.trim() ||
        `${currentUser.displayName} 작가의 오리지널 연재 웹툰입니다.`,
      coverImg: newWorkCover.trim(),
      subscribers: 1,
      episodes: [],
    };

    const updated = [...works, createdWork];
    const saved = await persistCustomWorks(updated);
    if (!saved) return;
    setTargetWorkId(createdWorkId);
    setNewWorkTitle('');
    setNewWorkSynopsis('');
    setNewWorkCover('');
    setCreatorSubTab('newEpisode');
    showToast(`새 작품 《${createdWork.title}》이(가) 등록되었습니다! 이제 1화를 올려보세요.`);
  };

  // 컷 입력 필드 조작
  const handleCutFieldChange = (
    index: number,
    field: 'img' | 'scene' | 'narration' | 'dialogue' | 'sfx',
    value: string
  ) => {
    setNewEpCuts((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
    if (field === 'img') {
      setCutPreviewErrors((prev) => prev.filter((failedIndex) => failedIndex !== index));
    }
  };

  const handleCutImageFiles = async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );
    setCutFileError('');
    setCutUploadProgress('');
    if (files.length === 0) return;
    if (isUploadingCutFiles) return;
    const invalidType = files.find((file) => !['image/jpeg', 'image/png', 'image/webp'].includes(file.type));
    if (invalidType) {
      setCutFileError(`${invalidType.name}: JPG, PNG, WEBP 파일만 올릴 수 있습니다.`);
      return;
    }
    const tooLarge = files.find((file) => file.size > 15 * 1024 * 1024);
    if (tooLarge) {
      setCutFileError(`${tooLarge.name}: 원본 이미지 한 장은 15MB 이하로 선택해 주세요.`);
      return;
    }

    setIsUploadingCutFiles(true);
    setCutUploadProgress('압축 중');
    const uploadedAssets: { url: string; fileName?: string }[] = [];
    try {
      const compressedFiles: File[] = [];
      for (const file of files) {
        try {
          compressedFiles.push(await compressCutImage(file));
        } catch (error) {
          const reason = error instanceof Error ? error.message : '이미지 압축에 실패했습니다.';
          throw new Error(`${file.name}: ${reason}`);
        }
      }

      setCutUploadProgress('업로드 준비');
      const batches: File[][] = [];
      let batch: File[] = [];
      let batchBytes = 0;
      for (const file of compressedFiles) {
        if (batch.length >= 5 || batchBytes + file.size > 4 * 1024 * 1024) {
          if (batch.length) batches.push(batch);
          batch = [];
          batchBytes = 0;
        }
        if (file.size > 4 * 1024 * 1024) {
          throw new Error(`${file.name}: 압축 후에도 업로드 요청 용량을 초과했습니다.`);
        }
        batch.push(file);
        batchBytes += file.size;
      }
      if (batch.length) batches.push(batch);

      for (const uploadBatch of batches) {
        const formData = new FormData();
        uploadBatch.forEach((file) => formData.append('files', file, file.name));
        let response: Response;
        let data: { error?: string; assets?: { url?: string; fileName?: string }[] };
        try {
          response = await fetch('/api/uploads', { method: 'POST', body: formData });
          data = await response.json();
        } catch {
          throw new Error(`${uploadBatch.map((file) => file.name).join(', ')}: 서버 응답을 받지 못했습니다.`);
        }
        if (!response.ok) {
          throw new Error(data.error || `${uploadBatch.map((file) => file.name).join(', ')}: 업로드에 실패했습니다.`);
        }
        if (
          !Array.isArray(data.assets) ||
          data.assets.length !== uploadBatch.length ||
          data.assets.some((asset) => !asset || typeof asset.url !== 'string')
        ) {
          throw new Error(`${uploadBatch.map((file) => file.name).join(', ')}: 저장된 이미지 목록을 확인하지 못했습니다.`);
        }
        uploadedAssets.push(
          ...data.assets.map((asset, index) => ({
            url: asset.url as string,
            fileName: asset.fileName || uploadBatch[index].name,
          }))
        );
        setCutUploadProgress(`${uploadedAssets.length}/${files.length}`);
      }

      setNewEpCuts((prev) => [
          ...prev.filter((cut) =>
            (cut.img || '').trim() ||
            (cut.scene || '').trim() ||
            (cut.narration || '').trim() ||
            (cut.dialogue || '').trim() ||
            (cut.sfx || '').trim()
          ),
          ...uploadedAssets.map((asset) => ({
            img: asset.url,
            scene: '',
            narration: '',
            dialogue: '',
            sfx: '',
          })),
        ]);
      setCutPreviewErrors([]);
      showToast(`${uploadedAssets.length}장 업로드 완료. 미리보기 확인 후 회차를 공개해 주세요.`);
    } catch (error) {
      if (uploadedAssets.length > 0) {
        setNewEpCuts((prev) => [
          ...prev.filter((cut) =>
            (cut.img || '').trim() ||
            (cut.scene || '').trim() ||
            (cut.narration || '').trim() ||
            (cut.dialogue || '').trim() ||
            (cut.sfx || '').trim()
          ),
          ...uploadedAssets.map((asset) => ({
            img: asset.url,
            scene: '',
            narration: '',
            dialogue: '',
            sfx: '',
          })),
        ]);
        setCutPreviewErrors([]);
      }
      const message = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
      const partialMessage = uploadedAssets.length
        ? ` ${uploadedAssets.length}/${files.length}장은 업로드되었습니다. 실패한 이미지를 다시 선택해 주세요.`
        : '';
      setCutFileError(message + partialMessage);
    } finally {
      setIsUploadingCutFiles(false);
      if (cutFileInputRef.current) cutFileInputRef.current.value = '';
    }
  };

  const handleAddCutSlot = () => {
    setNewEpCuts((prev) => [
      ...prev,
      { img: '', scene: '', narration: '', dialogue: '', sfx: '' },
    ]);
  };

  const handleRemoveCutSlot = (index: number) => {
    if (newEpCuts.length <= 1) return;
    setNewEpCuts((prev) => prev.filter((_, idx) => idx !== index));
    setCutPreviewErrors((prev) =>
      prev.filter((failedIndex) => failedIndex !== index).map((failedIndex) =>
        failedIndex > index ? failedIndex - 1 : failedIndex
      )
    );
  };

  const resetEpisodeEditor = (workId: string = targetWorkId) => {
    setTargetWorkId(workId);
    setEditingEpisodeNum(null);
    setNewEpTitle('');
    setNewEpCuts([{ img: '', scene: '', narration: '', dialogue: '', sfx: '' }]);
    setCutFileError('');
    setCutPreviewErrors([]);
    setCutUploadProgress('');
  };

  const loadEpisodeForEditing = (episodeNumber: number) => {
    const ownWorks = works.filter((work) => work.authorId === currentUser?.id);
    const work = ownWorks.find((item) => item.id === targetWorkId) || ownWorks[0];
    const episode = work?.episodes.find((item) => item.num === episodeNumber);
    if (!work || !episode) return;
    setTargetWorkId(work.id);
    setEditingEpisodeNum(episode.num);
    setNewEpTitle(episode.title.replace(/^제\s*\d+\s*화\s*[:：\-–—]?\s*/, '').trim());
    setNewEpCuts(episode.cuts.map((cut) => ({ ...cut })));
    setCutFileError('');
    setCutPreviewErrors([]);
    setCutUploadProgress('');
  };

  const moveEpisodeCut = (index: number, offset: number) => {
    const destination = index + offset;
    if (destination < 0 || destination >= newEpCuts.length) return;
    setNewEpCuts((previous) => {
      const reordered = [...previous];
      [reordered[index], reordered[destination]] = [reordered[destination], reordered[index]];
      return reordered;
    });
    setCutPreviewErrors([]);
  };

  // 새 회차 공개 또는 기존 회차 수정

  const handlePublishEpisode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || (currentUser.role !== 'creator' && currentUser.role !== 'admin')) {
      return;
    }

    const myWorks = works.filter((w) => w.authorId === currentUser.id);
    const activeTargetId = targetWorkId || myWorks[0]?.id;
    const targetWork = myWorks.find((w) => w.id === activeTargetId);

    if (!targetWork) {
      showToast('먼저 새 작품을 등록해주세요.');
      setCreatorSubTab('newWork');
      return;
    }
    if (episodeSaveLock.current || isUploadingCutFiles || isCheckingCutImages) return;
    if (editingEpisodeNum !== null && !targetWork.episodes.some((episode) => episode.num === editingEpisodeNum)) {
      showToast('수정할 회차를 다시 선택해 주세요.');
      return;
    }
    const cleanEpisodeTitle = newEpTitle.trim().replace(/^제\s*\d+\s*화\s*[-:：–—]?\s*/, '').trim();
    if (!cleanEpisodeTitle) {
      showToast('회차 제목을 입력해주세요.');
      return;
    }

    const activeCuts = newEpCuts
      .map((cut, index) => ({ cut, index }))
      .filter(({ cut }) =>
        (cut.img || '').trim() ||
        (cut.scene || '').trim() ||
        (cut.narration || '').trim() ||
        (cut.dialogue || '').trim() ||
        (cut.sfx || '').trim()
      );

    if (activeCuts.length === 0) {
      showToast('회차 이미지를 한 장 이상 업로드해 주세요.');
      return;
    }
    const missingImage = activeCuts.find(({ cut }) => !(cut.img || '').trim());
    if (missingImage) {
      const message = `${missingImage.index + 1}번째 컷 이미지가 없습니다. 모든 컷에 이미지를 넣어주세요.`;
      setCutFileError(message);
      showToast(message);
      return;
    }

    episodeSaveLock.current = true;
    setIsSavingEpisode(true);
    try {
    setIsCheckingCutImages(true);
    setCutFileError('모든 컷 이미지를 확인하고 있습니다...');
    setCutPreviewErrors([]);
    try {
      const failedIndexes: number[] = [];
      for (let start = 0; start < activeCuts.length; start += 10) {
        const batch = activeCuts.slice(start, start + 10);
        const results = await Promise.all(batch.map(({ cut }) => checkImageUrl(cut.img.trim())));
        batch.forEach(({ index }, batchIndex) => {
          if (!results[batchIndex]) failedIndexes.push(index);
        });
      }
      if (failedIndexes.length > 0) {
        setCutPreviewErrors(failedIndexes);
        const failedList = failedIndexes.map((index) => index + 1).join(', ');
        const message = `${failedList}번 컷 이미지가 열리지 않습니다. 파일을 다시 올리거나 주소를 확인해 주세요.`;
        setCutFileError(message);
        showToast(message);
        return;
      }
    } finally {
      setIsCheckingCutImages(false);
    }
    setCutFileError('');

    const validCuts = activeCuts.map(({ cut }) => cut);
    const nextNum = editingEpisodeNum ?? Math.max(0, ...targetWork.episodes.map((episode) => episode.num)) + 1;
    const existingEpisode = targetWork.episodes.find((episode) => episode.num === editingEpisodeNum);
    const newEpisode: Episode = {
      ...existingEpisode,
      num: nextNum,
      title: cleanEpisodeTitle,
      cuts: validCuts,
    };

    const updatedWorks = works.map((w) => {
      if (w.id !== targetWork.id) return w;
      return {
        ...w,
        coverImg: w.coverImg || validCuts[0]?.img || '',
        episodes: editingEpisodeNum !== null
          ? w.episodes.map((episode) => episode.num === editingEpisodeNum ? newEpisode : episode)
          : [...w.episodes, newEpisode],
      };
    });

    const saved = await persistCustomWorks(updatedWorks);
    if (!saved) return;
    setNewEpTitle('');
    setNewEpCuts([{ img: '', scene: '', narration: '', dialogue: '', sfx: '' }]);
    showToast(`《${targetWork.title}》 제 ${nextNum}화가 ${editingEpisodeNum !== null ? '수정되었습니다' : '공개되었습니다'}!`);
    setEditingEpisodeNum(null);
    setCutPreviewErrors([]);
    handleSelectWorkAndEpisode(targetWork.id, nextNum);
    } finally {
      episodeSaveLock.current = false;
      setIsSavingEpisode(false);
    }
  };

  const handleSubscribe = (planName: string) => {
    setIsMember(true);
    showToast(`${planName} 구독이 완료되었습니다! 전 작품·전 회차 무제한 감상이 가능합니다.`);
    setActiveTab('viewer');
  };

  const toggleLike = (workId: string, epNum: number) => {
    const key = `${workId}-${epNum}`;
    setLikedEpisodes((prev) =>
      prev.includes(key) ? prev.filter((n) => n !== key) : [...prev, key]
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const authorLabel = currentUser
      ? currentUser.role === 'admin'
        ? `${currentUser.displayName} (관리자)`
        : currentUser.role === 'creator'
        ? `${currentUser.displayName} (작가)`
        : currentUser.displayName
      : isAdminReview
      ? '웹툰스튜디오스_관리자'
      : '비회원_독자';

    const item: CommentItem = {
      id: `c-${Date.now()}`,
      author: authorLabel,
      episode: currentEpisode.num,
      content: newComment.trim(),
      likes: 1,
      createdAt: '방금 전',
    };
    setComments([item, ...comments]);
    setNewComment('');
    showToast('댓글이 등록되었습니다.');
  };

  const myWorksList = currentUser
    ? works.filter((w) => w.authorId === currentUser.id)
    : [];

  const isLoggedIn = Boolean(currentUser || isAdminReview);
  const catalogGenres = Array.from(new Set(
    works.flatMap((work) => work.genre.split(/[·,/]/).map((genre) => genre.trim()).filter(Boolean))
  )).sort((a, b) => a.localeCompare(b, 'ko'));
  const catalogWorks = works.filter((work) => {
    const query = catalogQuery.trim().toLocaleLowerCase();
    return (!query || [work.title, work.authorName, work.genre, work.synopsis]
      .some((value) => value.toLocaleLowerCase().includes(query))) &&
      (catalogGenre === 'all' || work.genre.split(/[·,/]/).some((genre) => genre.trim() === catalogGenre));
  }).sort((a, b) => {
    if (catalogSort === 'popular') return (b.subscribers || 0) - (a.subscribers || 0);
    const aRegistered = Number(a.id.match(/^work-(\d+)$/)?.[1] || 0);
    const bRegistered = Number(b.id.match(/^work-(\d+)$/)?.[1] || 0);
    return bRegistered - aRegistered || works.indexOf(b) - works.indexOf(a);
  });
  const catalogSelectedWork = works.find((work) => work.id === catalogWorkId);


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24">
      {/* 상단 고정 헤더 */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          {/* 상단 왼쪽 웹툰스튜디오스 로고/타이틀 -> 클릭 시 홈 메인 화면 이동 */}
          <button
            type="button"
            onClick={handleGoHome}
            className="flex items-center gap-2.5 min-w-0 text-left group focus:outline-none"
            title="웹툰스튜디오스 홈 메인 화면으로 이동"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-indigo-600 flex items-center justify-center text-slate-950 font-black text-sm shadow shrink-0 group-hover:scale-105 transition">
              W
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-amber-300 transition">
                  웹툰스튜디오스
                </span>
                {isAdminLoggedIn && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                    <ShieldCheck className="w-3 h-3" />
                    관리자
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                오픈 웹툰 창작 &amp; 구독 플랫폼
              </p>
            </div>
          </button>

          {/* 상단 우측: 회원/작가/관리자 배지 및 원클릭 로그아웃 */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                    isAdminLoggedIn
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : currentUser?.role === 'creator'
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {isAdminLoggedIn ? (
                    <ShieldCheck className="w-3 h-3" />
                  ) : currentUser?.role === 'creator' ? (
                    <PenTool className="w-3 h-3" />
                  ) : (
                    <User className="w-3 h-3 text-amber-400" />
                  )}
                  <span className="max-w-[84px] truncate">
                    {currentUser ? currentUser.displayName : '관리자'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleLogoutAll}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition"
                  title="로그아웃"
                >
                  <LogOut className="w-3 h-3" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                <LogIn className="w-3 h-3 text-amber-400" />
                로그인 / 가입
              </button>
            )}

            {isMember && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Crown className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 토스트 알림 */}
      {toastMsg && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-800 text-white text-xs sm:text-sm font-medium border border-slate-700 shadow-xl flex items-center gap-2 max-w-[92vw]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{toastMsg}</span>
        </div>
      )}

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-3xl mx-auto px-4 pt-5">
        {/* ==================== 1. 홈 탭 (이 앱이 어떤 서비스인지 소개하는 메인 랜딩) ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* 히어로 브랜드 소개 배너 */}
            <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-9 shadow-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold border border-amber-400/30 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                누구나 작가가 되는 오픈 웹툰 플랫폼
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
                이야기를 그린 순간,
                <br />
                <span className="text-amber-400">웹툰스튜디오스</span>에서 연재가 시작됩니다
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-2xl">
                독자는 무료 회차와 멤버십으로 웹툰을 즐기고, 창작자는 작품을 연재해 수익을 나눕니다.
              </p>

              {/* 핵심 CTA 버튼 2종 */}
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('works')}
                  className="py-3.5 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <BookOpen className="w-4 h-4" />
                  연재 작품관 둘러보기
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="py-3.5 px-5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base border border-indigo-400/40 transition flex items-center justify-center gap-2"
                >
                  <PenTool className="w-4 h-4" />
                  작가 등록하고 내 작품 연재하기
                </button>
              </div>
            </div>

            {/* 3대 핵심 가치 카드 */}
            <div className="grid sm:grid-cols-3 gap-3.5">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">1~5화 누구나 무료</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  모든 연재작의 초반 1~5화를 무료로 감상하고, 마음에 드는 작품은 멤버십으로 완결까지 정주행하세요.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <PenTool className="w-5 h-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">즉시 오픈 연재 스튜디오</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  회원가입 후 작가 스튜디오에서 작품 타이틀 개설부터 컷 이미지·대사·효과음 업로드까지 한 번에 완료합니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white">투명한 작가 5 : 5 정산</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  멤버십 구독 수익의 50%를 연재 작가에게 직접 배분하며, 작가 스튜디오에서 실시간 정산 현황을 제공합니다.
                </p>
              </div>
            </div>

            {/* 대표 오리지널 작품 하이라이트 바로가기 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  FEATURED ORIGINAL · 대표 완결작
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('works')}
                  className="text-xs font-semibold text-slate-300 hover:text-amber-300 flex items-center gap-1"
                >
                  전체 {works.length}편 보기 →
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-20 h-24 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700 flex items-center justify-center">
                  {INITIAL_WORKS[0].coverImg ? (
                    <img
                      src={INITIAL_WORKS[0].coverImg}
                      alt={INITIAL_WORKS[0].title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-7 h-7 text-slate-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                      100화 완결
                    </span>
                    <span className="text-xs text-slate-400">{INITIAL_WORKS[0].genre}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white">
                    {INITIAL_WORKS[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {INITIAL_WORKS[0].synopsis}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectWorkAndEpisode('work-dalbit', 1)}
                  className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  1화 바로보기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 2. 작품관 탭 (전체 연재작 선택 & 작품 상세 & 회차 목록) ==================== */}
        {activeTab === 'works' && (
          <div className="space-y-6">
            {/* 플랫폼 내 등록된 전체 작품 선택 카드 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  연재 작품관 ({works.length}편)
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  새 작품 등록
                </button>
              </div>

              <div className="space-y-3">
                <input type="search" aria-label="작품 검색" value={catalogQuery}
                  onChange={(event) => setCatalogQuery(event.target.value)}
                  placeholder="작품명·작가명 검색"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-400" />
                <div className="grid grid-cols-2 gap-3">
                  <select aria-label="장르 선택" value={catalogGenre}
                    onChange={(event) => setCatalogGenre(event.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white">
                    <option value="all">전체 장르</option>
                    {catalogGenres.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
                  </select>
                  <select aria-label="작품 정렬" value={catalogSort}
                    onChange={(event) => setCatalogSort(event.target.value as 'latest' | 'popular')}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white">
                    <option value="latest">최신 등록순</option>
                    <option value="popular">인기순</option>
                  </select>
                </div>
                <p className="text-xs text-slate-400">{catalogWorks.length}편 표시</p>
              </div>
              {catalogWorks.length === 0 && (
                <div className="p-8 rounded-xl bg-slate-900 text-center">
                  <p className="text-sm text-slate-300">검색 조건에 맞는 작품이 없습니다.</p>
                  <button type="button" onClick={() => { setCatalogQuery(''); setCatalogGenre('all'); }}
                    className="mt-3 text-xs text-amber-300">전체 작품 보기</button>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {catalogWorks.map((work) => {
                  const isSelected = work.id === catalogWorkId;
                  return (
                    <button
                      key={work.id}
                      type="button"
                      onClick={() => {
                        setCatalogWorkId(work.id);
                        setSelectedWorkId(work.id);
                        setSelectedEpisodeNum(1);
                        window.setTimeout(() => document.getElementById('catalog-work-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
                      }}
                      className={`p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                        isSelected
                          ? 'bg-indigo-950/50 border-amber-400 shadow-lg'
                          : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-16 h-20 rounded-xl bg-slate-800 overflow-hidden shrink-0 border border-slate-700 flex items-center justify-center">
                        {work.coverImg ? (
                          <img
                            src={work.coverImg}
                            alt={work.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <BookOpen className="w-6 h-6 text-slate-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {work.isOfficial ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[10px] font-bold">
                              대표작
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                              작가 연재작
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400">{work.genre}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-white truncate mt-1">
                          {work.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          글/그림 · {work.authorName}
                        </p>
                        <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">{work.synopsis}</p>
                        <p className="text-[11px] text-amber-400/90 mt-1.5 font-medium">
                          총 {work.episodes.length}화 연재중
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {catalogSelectedWork && (
              <div id="catalog-work-detail" className="space-y-5 scroll-mt-20">
            {/* 선택된 작품 상세 카드 */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-6 sm:p-7">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-semibold border border-amber-400/30 mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                {catalogSelectedWork.authorName} · {catalogSelectedWork.genre}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2.5">
                {catalogSelectedWork.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                {catalogSelectedWork.synopsis}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-0.5">등록 회차</div>
                  <div className="text-sm sm:text-base font-bold text-white">
                    총 {catalogSelectedWork.episodes.length}화
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-0.5">무료 공개</div>
                  <div className="text-sm sm:text-base font-bold text-emerald-400">
                    1~5화 무료
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-0.5">수익 배분</div>
                  <div className="text-sm sm:text-base font-bold text-amber-300">작가 5 : 5</div>
                </div>
              </div>

              <button
                type="button"
                disabled={catalogSelectedWork.episodes.length === 0}
                onClick={() => handleSelectWorkAndEpisode(catalogSelectedWork.id, 1)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                {catalogSelectedWork.episodes.length > 0
                  ? '제 1화 첫 화부터 감상하기'
                  : '아직 업로드된 회차가 없습니다'}
              </button>
            </div>

            {/* 선택된 작품의 전체 회차 리스트 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  회차 목록 ({catalogSelectedWork.episodes.length}화)
                </h3>
                <span className="text-xs text-slate-400">
                  {isAdminLoggedIn
                    ? '관리자 모드: 전 회차 열람 가능'
                    : isMember
                    ? '멤버십 회원: 전 회차 열람 가능'
                    : '1~5화 무료 / 6화~ 멤버십'}
                </span>
              </div>

              {catalogSelectedWork.episodes.length === 0 ? (
                <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 text-center space-y-3">
                  <p className="text-sm text-slate-400">아직 등록된 회차가 없습니다.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                  >
                    설정 &gt; 작가 스튜디오에서 첫 회차 올리기
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                  {catalogSelectedWork.episodes.map((ep) => {
                    const unlocked = canAccessEpisode(catalogSelectedWork, ep.num);
                    const thumb = ep.cuts?.[0]?.img;

                    return (
                      <button
                        key={ep.num}
                        type="button"
                        onClick={() => handleSelectWorkAndEpisode(catalogSelectedWork.id, ep.num)}
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
                              제 {ep.num}화 - {ep.title.replace(/^제\s*\d+\s*화\s*[:：\-–—]?\s*/, '').trim()}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {ep.cuts?.length || 0}컷 수록
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
              )}
            </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 3. 웹툰 뷰어 탭 ==================== */}
        {activeTab === 'viewer' && (
          <div className="space-y-5">
            {isCurrentAccessible ? (
              <>
                <h1 className="text-lg sm:text-xl font-bold text-white">
                  제 {currentEpisode.num}화 - {displayedEpisodeTitle}
                </h1>

                <div className="w-full max-w-3xl mx-auto">
                  {viewerImageCuts.map((cut, idx) => (
                    <img
                      key={`${currentWork.id}-${currentEpisode.num}-image-${idx}`}
                      src={cut.img}
                      alt=""
                      className="block w-full h-auto"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  ))}
                </div>

                {currentEpisode.num < currentWork.episodes.length && (
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectWorkAndEpisode(currentWork.id, currentEpisode.num + 1)
                    }
                    className="mx-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold transition"
                  >
                    다음 회차 보기
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </>
            ) : (
              <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 text-center space-y-5">
                <div className="w-16 h-16 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8 text-amber-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">
                    제 {currentEpisode.num}화는 멤버십 전용 회차입니다
                  </h2>
                  <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                    1~5화는 무료로 감상할 수 있으며, 6화 이후 회차는 멤버십 구독 후 열람할 수 있습니다.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('membership')}
                    className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition"
                  >
                    멤버십 보기
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('settings')}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition"
                  >
                    로그인하기
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 4. 멤버십 탭 ==================== */}
        {activeTab === 'membership' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-indigo-950 border border-amber-400/30">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold mb-3">
                <Crown className="w-3.5 h-3.5" />
                PREMIUM PASS · PortOne V2 안전결제
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                웹툰스튜디오스 전 작품 무제한 정주행
              </h2>
              <p className="text-sm text-slate-300">
                《달을 비추는 옥탑》 100화 완결작을 포함한 플랫폼 입점 작가들의 모든 유료 회차를 무제한 감상하세요.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-xs font-semibold text-slate-400">월간 정기구독</span>
                  <h3 className="text-lg font-bold text-white mt-1">스튜디오 월간 패스</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">4,900원</span>
                    <span className="text-xs text-slate-400">/ 월</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                    <li>• 전 작품 6화~완결 회차 즉시 열람</li>
                    <li>• 고화질 전체화면 컷 리더 지원</li>
                    <li>• 구독료 50% 연재 작가 창작 지원 배분</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleSubscribe('스튜디오 월간 패스')}
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
                  <span className="text-xs font-semibold text-amber-400">평생 소장 올패스</span>
                  <h3 className="text-lg font-bold text-white mt-1">전권 소장 올패스</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-amber-300">19,900원</span>
                    <span className="text-xs text-slate-400">/ 영구 소장</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                    <li>• 《달을 비추는 옥탑》 1~100화 평생 소장</li>
                    <li>• 신작 입점 웹툰 우선 열람권</li>
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

        {/* ==================== 5. 커뮤니티 탭 ==================== */}
        {activeTab === 'community' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h2 className="text-lg font-bold text-white mb-1">독자 감상 & 작가 소통 게시판</h2>
              <p className="text-xs text-slate-400 mb-4">
                현재 감상 중인 《{currentWork.title}》 제 {currentEpisode.num}화에 대한 감상을 남겨보세요.
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

        {/* ==================== 6. 설정 탭 (일반 독자 · 작가 회원가입/로그인 & 작가 스튜디오) ==================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* (A) 회원 / 작가 계정 관리 (관리자 관련 문구 및 폼은 일반 화면에 노출하지 않음) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900 border border-indigo-500/30 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    {isAdminLoggedIn ? (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    ) : currentUser?.role === 'creator' ? (
                      <PenTool className="w-5 h-5 text-indigo-300" />
                    ) : (
                      <User className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      회원가입 · 로그인 (독자 · 작가)
                    </h2>
                    <p className="text-xs text-slate-300">
                      일반 독자 회원 또는 창작 작가 회원으로 가입하고 로그인할 수 있습니다.
                    </p>
                  </div>
                </div>

                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogoutAll}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-500/40 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    로그아웃
                  </button>
                )}
              </div>

              {!isLoggedIn ? (
                /* 비로그인 상태: 일반 독자 / 작가 회원가입 및 로그인 폼 */
                <div className="p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError('');
                      }}
                      className={`py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                        authMode === 'signup'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      회원가입
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                      className={`py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition ${
                        authMode === 'login'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <LogIn className="w-4 h-4" />
                      로그인
                    </button>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-3">
                    {authMode === 'signup' && (
                      <>
                        {/* 회원 유형 선택: 일반 독자 vs 창작 작가 */}
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1.5">
                            가입 유형 선택
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setSignupRole('reader')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                                signupRole === 'reader'
                                  ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                                  : 'bg-slate-900 border-slate-700 text-slate-400'
                              }`}
                            >
                              <User className="w-3.5 h-3.5" />
                              일반 독자 회원
                            </button>
                            <button
                              type="button"
                              onClick={() => setSignupRole('creator')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                                signupRole === 'creator'
                                  ? 'bg-indigo-500/25 border-indigo-400 text-indigo-200'
                                  : 'bg-slate-900 border-slate-700 text-slate-400'
                              }`}
                            >
                              <PenTool className="w-3.5 h-3.5" />
                              작가(창작자) 회원
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            {signupRole === 'creator' ? '작가 필명 (활동명)' : '독자 닉네임'}
                          </label>
                          <input
                            type="text"
                            value={displayNameInput}
                            onChange={(e) => setDisplayNameInput(e.target.value)}
                            placeholder={
                              signupRole === 'creator'
                                ? '예: 달빛작가, 서울스케치'
                                : '예: 밤하늘독자'
                            }
                            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        이메일
                      </label>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="user@example.com"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        비밀번호
                      </label>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        minLength={authMode === 'signup' ? 8 : undefined}
                        placeholder="비밀번호 입력"
                        className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                      />
                      {authMode === 'signup' && (
                        <p className="mt-1 text-[11px] text-slate-500">비밀번호는 8자 이상이어야 합니다.</p>
                      )}
                    </div>

                    {authError && (
                      <p className="text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {authError}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm transition"
                    >
                      {authMode === 'signup'
                        ? signupRole === 'creator'
                          ? '작가 계정 생성하고 연재 시작하기'
                          : '일반 독자 회원가입 완료'
                        : '로그인'}
                    </button>
                  </form>
                </div>
              ) : (
                /* 로그인 상태 표시 카드 */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            isAdminLoggedIn
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : currentUser?.role === 'creator'
                              ? 'bg-indigo-500/20 text-indigo-300'
                              : 'bg-amber-400/20 text-amber-300'
                          }`}
                        >
                          {isAdminLoggedIn
                            ? '관리자 계정'
                            : currentUser?.role === 'creator'
                            ? '창작 작가 계정'
                            : '일반 독자 계정'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {currentUser?.email || 'admin@webtoonstudios.kr'}
                        </span>
                      </div>
                      <p className="text-base font-bold text-white mt-1">
                        {currentUser ? currentUser.displayName : '총괄 관리자'} 님 로그인 중
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogoutAll}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-200 hover:border-rose-500/40 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      현재 계정 로그아웃
                    </button>
                  </div>

                  {/* 일반 독자 계정일 때 작가 전환 안내 */}
                  {currentUser?.role === 'reader' && (
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <p className="text-xs text-slate-300">
                        직접 웹툰을 연재하고 싶으신가요? 클릭 한 번으로 작가 스튜디오 권한을 활성화할 수 있습니다.
                      </p>
                      <button
                        type="button"
                        onClick={handleUpgradeToCreator}
                        className="shrink-0 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                      >
                        작가 계정으로 전환
                      </button>
                    </div>
                  )}

                  {/* 작가 또는 관리자 계정일 때 작가 스튜디오 노출 */}
                  {(currentUser?.role === 'creator' || isAdminLoggedIn) && (
                    <div className="space-y-4 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-300">
                          작가 스튜디오 · 작품 및 회차 관리
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-slate-950/70 text-xs text-amber-300 font-bold">
                          내 등록 작품 {myWorksList.length}편
                        </span>
                      </div>

                      {/* 작가 스튜디오 내부 메뉴 탭 */}
                      <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setCreatorSubTab('newWork')}
                          className={`py-2 rounded-lg text-xs font-bold transition ${
                            creatorSubTab === 'newWork'
                              ? 'bg-amber-400 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          1. 새 작품 등록
                        </button>
                        <button
                          type="button"
                          onClick={() => setCreatorSubTab('newEpisode')}
                          className={`py-2 rounded-lg text-xs font-bold transition ${
                            creatorSubTab === 'newEpisode'
                              ? 'bg-amber-400 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          2. 회차(컷) 업로드
                        </button>
                        <button
                          type="button"
                          onClick={() => setCreatorSubTab('settlement')}
                          className={`py-2 rounded-lg text-xs font-bold transition ${
                            creatorSubTab === 'settlement'
                              ? 'bg-amber-400 text-slate-950'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          3. 5:5 수익 정산
                        </button>
                      </div>

                      {/* 서브탭 1: 새 작품 등록 */}
                      {creatorSubTab === 'newWork' && (
                        <form
                          onSubmit={handleCreateWork}
                          className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3"
                        >
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <PlusCircle className="w-4 h-4 text-amber-400" />
                            신규 웹툰 타이틀 개설
                          </h3>
                          <div>
                            <label className="block text-xs text-slate-300 mb-1">
                              작품 제목 *
                            </label>
                            <input
                              type="text"
                              value={newWorkTitle}
                              onChange={(e) => setNewWorkTitle(e.target.value)}
                              placeholder="예: 한강 야경의 편의점"
                              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                            />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs text-slate-300 mb-1">장르</label>
                              <input
                                type="text"
                                value={newWorkGenre}
                                onChange={(e) => setNewWorkGenre(e.target.value)}
                                placeholder="로맨스 · 판타지 · 일상"
                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-slate-300 mb-1">
                                대표 썸네일 이미지 URL (선택)
                              </label>
                              <input
                                type="text"
                                value={newWorkCover}
                                onChange={(e) => setNewWorkCover(e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-300 mb-1">
                              작품 시놉시스 (줄거리)
                            </label>
                            <textarea
                              rows={2}
                              value={newWorkSynopsis}
                              onChange={(e) => setNewWorkSynopsis(e.target.value)}
                              placeholder="독자들에게 보여질 작품 소개글을 입력하세요."
                              className="w-full rounded-xl bg-slate-900 border border-slate-700 p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition"
                          >
                            작품 등록하고 회차 업로드로 이동
                          </button>
                        </form>
                      )}

                      {/* 서브탭 2: 회차(컷) 업로드 */}
                      {creatorSubTab === 'newEpisode' && (
                        <form
                          onSubmit={handlePublishEpisode}
                          className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4"
                        >
                          <fieldset disabled={isUploadingCutFiles || isSavingEpisode} className="space-y-4 disabled:opacity-70">
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Upload className="w-4 h-4 text-amber-400" />
                            회차 등록 및 수정
                          </h3>

                          {myWorksList.length === 0 ? (
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-2">
                              <p className="text-xs text-slate-400">
                                먼저 [1. 새 작품 등록]에서 작품 타이틀을 개설해주세요.
                              </p>
                              <button
                                type="button"
                                onClick={() => setCreatorSubTab('newWork')}
                                className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold"
                              >
                                새 작품 등록하러 가기
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="grid sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs text-slate-300 mb-1">
                                    연재할 내 작품 선택
                                  </label>
                                  <select
                                    value={targetWorkId || myWorksList[0]?.id}
                                    onChange={(e) => resetEpisodeEditor(e.target.value)}
                                    className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
                                  >
                                    {myWorksList.map((w) => (
                                      <option key={w.id} value={w.id}>
                                        {w.title} (다음: 제 {w.episodes.length + 1}화)
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs text-slate-300 mb-1">
                                    회차 소제목 *
                                  </label>
                                  <input
                                    type="text"
                                    value={newEpTitle}
                                    onChange={(e) => setNewEpTitle(e.target.value)}
                                    placeholder="예: 제 1화 - 비 오는 옥상에서"
                                    className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="block text-xs text-slate-300">등록 또는 수정할 회차</label>
                                <select
                                  value={editingEpisodeNum ?? 'new'}
                                  onChange={(event) => event.target.value === 'new'
                                    ? resetEpisodeEditor()
                                    : loadEpisodeForEditing(Number(event.target.value))}
                                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white"
                                >
                                  <option value="new">새 회차 등록</option>
                                  {(myWorksList.find((work) => work.id === targetWorkId) || myWorksList[0])?.episodes.map((episode) => (
                                    <option key={episode.num} value={episode.num}>
                                      제 {episode.num}화 - {episode.title.replace(/^제\s*\d+\s*화\s*[:：\-–—]?\s*/, '').trim()} 수정
                                    </option>
                                  ))}
                                </select>
                                {editingEpisodeNum !== null && (
                                  <p className="text-xs text-amber-300">
                                    제 {editingEpisodeNum}화 수정 중 · 추가 이미지는 기존 컷 뒤에 이어집니다. 저장하면 같은 회차에 반영됩니다.
                                  </p>
                                )}
                              </div>

                              <div
                                onDragOver={(event) => {
                                  event.preventDefault();
                                  setIsDraggingCutFiles(true);
                                }}
                                onDragLeave={() => setIsDraggingCutFiles(false)}
                                onDrop={(event) => {
                                  event.preventDefault();
                                  setIsDraggingCutFiles(false);
                                  void handleCutImageFiles(event.dataTransfer.files);
                                }}
                                className={`rounded-xl border-2 border-dashed p-4 sm:p-5 text-center transition ${
                                  isDraggingCutFiles
                                    ? 'border-amber-400 bg-amber-400/10'
                                    : 'border-slate-700 bg-slate-900/60'
                                }`}
                              >
                                <input
                                  ref={cutFileInputRef}
                                  type="file"
                                  multiple
                                  accept="image/jpeg,image/png,image/webp"
                                  className="hidden"
                                  onChange={(event) => void handleCutImageFiles(event.target.files || [])}
                                />
                                <p className="text-sm font-semibold text-white">
                                  회차 컷 이미지를 원하는 수만큼 한 번에 올리세요
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  파일을 여기로 드래그하거나 파일 찾기로 선택할 수 있습니다. 파일명 순서대로 이어 붙입니다.
                                </p>
                                <p className="mt-1 text-[11px] text-emerald-300">
                                  현재 이미지 {newEpCuts.filter((cut) => (cut.img || '').trim()).length}장 · 원하는 만큼 추가 가능
                                </p>
                                <button
                                  type="button"
                                  disabled={isUploadingCutFiles}
                                  onClick={() => cutFileInputRef.current?.click()}
                                  className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold"
                                >
                                  {isUploadingCutFiles ? `압축·업로드 중... ${cutUploadProgress}` : '이미지 파일 찾기'}
                                </button>
                                <p className="mt-2 text-[11px] text-slate-500">
                                  JPG · PNG · WEBP / 원본 한 장당 15MB 이하 / 파일명 순서로 배치
                                </p>
                                {cutFileError && (
                                  <p className="mt-3 text-xs text-rose-300">{cutFileError}</p>
                                )}
                              </div>

                              {/* 컷별 입력 리스트 */}
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-amber-300">
                                    컷 구성 ({newEpCuts.length}컷)
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleAddCutSlot}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                                  >
                                    <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                                    컷 추가
                                  </button>
                                </div>

                                {newEpCuts.map((cut, idx) => (
                                  <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-indigo-300">
                                        CUT #{idx + 1}
                                      </span>
                                      <div className="flex items-center gap-2">
                                        <button type="button" disabled={idx === 0}
                                          onClick={() => moveEpisodeCut(idx, -1)}
                                          className="text-xs text-slate-300 disabled:opacity-30">위로</button>
                                        <button type="button" disabled={idx === newEpCuts.length - 1}
                                          onClick={() => moveEpisodeCut(idx, 1)}
                                          className="text-xs text-slate-300 disabled:opacity-30">아래로</button>
                                      </div>
                                      {newEpCuts.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveCutSlot(idx)}
                                          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                                        >
                                          <Trash2 className="w-3.5 h-3.5" />
                                          삭제
                                        </button>
                                      )}
                                    </div>

                                    <input
                                      type="text"
                                      value={cut.img || ''}
                                      onChange={(e) =>
                                        handleCutFieldChange(idx, 'img', e.target.value)
                                      }
                                      placeholder="컷 이미지 주소 (필수)"
                                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                                    />
                                    {cut.img && (
                                      <div className="flex items-center gap-3 rounded-lg bg-slate-950 border border-slate-700 p-2">
                                        <img
                                          src={cut.img}
                                          alt=""
                                          className={`h-20 w-16 rounded object-cover bg-slate-800 ${cutPreviewErrors.includes(idx) ? 'hidden' : ''}`}
                                          onLoad={() =>
                                            setCutPreviewErrors((prev) => prev.filter((failedIndex) => failedIndex !== idx))
                                          }
                                          onError={() =>
                                            setCutPreviewErrors((prev) =>
                                              prev.includes(idx) ? prev : [...prev, idx]
                                            )
                                          }
                                        />
                                        <div className="flex-1">
                                          {cutPreviewErrors.includes(idx) ? (
                                            <p className="text-xs font-semibold text-rose-300">이미지를 불러오지 못했습니다. 주소를 확인하거나 다시 업로드해 주세요.</p>
                                          ) : (
                                            <p className="text-xs font-semibold text-emerald-300">미리보기 확인됨</p>
                                          )}
                                          <p className="mt-1 text-[11px] text-slate-500">회차 공개 전에 모든 이미지가 열리는지 확인합니다.</p>
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => handleCutFieldChange(idx, 'img', '')}
                                          className="text-xs text-rose-300 hover:text-rose-200"
                                        >
                                          제거
                                        </button>
                                      </div>
                                    )}
                                    <div className="grid sm:grid-cols-2 gap-2">
                                      <input
                                        type="text"
                                        value={cut.scene || ''}
                                        onChange={(e) =>
                                          handleCutFieldChange(idx, 'scene', e.target.value)
                                        }
                                        placeholder="장면 설명 (예: 노을 지는 옥탑방 난간)"
                                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                                      />
                                      <input
                                        type="text"
                                        value={cut.sfx || ''}
                                        onChange={(e) =>
                                          handleCutFieldChange(idx, 'sfx', e.target.value)
                                        }
                                        placeholder="효과음 SFX (예: 쏴아아-, 두근)"
                                        className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                                      />
                                    </div>
                                    <input
                                      type="text"
                                      value={cut.narration || ''}
                                      onChange={(e) =>
                                        handleCutFieldChange(idx, 'narration', e.target.value)
                                      }
                                      placeholder="내레이션 (독백/지문)"
                                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                                    />
                                    <input
                                      type="text"
                                      value={cut.dialogue || ''}
                                      onChange={(e) =>
                                        handleCutFieldChange(idx, 'dialogue', e.target.value)
                                      }
                                      placeholder="캐릭터 대사"
                                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-xs text-white placeholder-slate-500"
                                    />
                                  </div>
                                ))}
                              </div>

                              <button
                                type="submit"
                                disabled={isUploadingCutFiles || isCheckingCutImages || isSavingEpisode}
                                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-extrabold text-sm transition flex items-center justify-center gap-1.5"
                              >
                                <Upload className="w-4 h-4" />
                                {isSavingEpisode ? '이미지 확인·저장 중...' : editingEpisodeNum !== null ? '회차 수정 저장하기' : '회차 업로드 및 즉시 공개하기'}
                              </button>
                            </>
                          )}
                          </fieldset>
                        </form>
                      )}

                      {/* 서브탭 3: 작가 4 : 플랫폼 6 수익 정산 */}
                      {creatorSubTab === 'settlement' && (
                        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
                          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Coins className="w-4 h-4 text-amber-400" />
                            작품별 구독 수익 정산 현황 (작가 50% : 플랫폼 50%)
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-indigo-400" />내 작품 총 구독자
                              </span>
                              <p className="text-lg font-extrabold text-white mt-1">
                                {myWorksList.reduce((acc, w) => acc + w.subscribers, 0)}명
                              </p>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-[11px] text-slate-400">
                                이번 달 예상 정산액 (50%)
                              </span>
                              <p className="text-lg font-extrabold text-amber-300 mt-1">
                                {(
                                  myWorksList.reduce((acc, w) => acc + w.subscribers, 0) *
                                  4900 *
                                  0.5
                                ).toLocaleString()}
                                원
                              </p>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            * 멤버십 월 구독료(4,900원) 중 작가 창작 지원 배분율 50%가 작품별 구독 비중 및 열람 수에 따라 자동 산정됩니다.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* (B) 숨김 관리자 전용 검수 패널 (관리자 로그인 중이거나 하단 서비스명 5회 터치 시에만 표시) */}
            {(isAdminLoggedIn || showAdminPanel) && (
              <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">관리자 전용 검수 모드</h2>
                      <p className="text-xs text-slate-400">
                        결제 없이 1~100화 전체 원고 및 입점 작가 작품을 검수합니다.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      isAdminLoggedIn
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isAdminLoggedIn ? '활성화됨' : '인증 대기'}
                  </span>
                </div>

                {isAdminLoggedIn ? (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-3">
                    <p className="text-xs sm:text-sm text-emerald-200">
                      현재 <strong>관리자 계정</strong>으로 로그인되어 있습니다. 전 작품 모든 회차 잠금이 해제되었습니다.
                    </p>
                    <button
                      type="button"
                      onClick={handleLogoutAll}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-500/40 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      관리자 로그아웃
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAdminUnlock} className="space-y-3 pt-1">
                    <label className="block text-xs font-medium text-slate-300">
                      관리자 인증 코드 입력
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        inputMode="numeric"
                        maxLength={8}
                        value={adminPinInput}
                        onChange={(e) => setAdminPinInput(e.target.value)}
                        placeholder="인증 코드 입력"
                        className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition flex items-center gap-1.5"
                      >
                        <Unlock className="w-4 h-4" />
                        인증
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
            )}

            {/* (C) 플랫폼 정보 (서비스명 줄을 5회 연속 클릭하면 관리자 인증 패널이 열립니다) */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs text-slate-400">
              <div
                onClick={handleSecretAdminTrigger}
                className="flex justify-between py-1 border-b border-slate-800/80 select-none cursor-default"
              >
                <span>서비스명</span>
                <span className="text-slate-200 font-medium">
                  웹툰스튜디오스 (Webtoon Studios 오픈 연재 플랫폼)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span>등록 작품 수</span>
                <span className="text-slate-200 font-medium">총 {works.length}편 연재 중</span>
              </div>
              <div className="flex justify-between py-1">
                <span>시스템 스택</span>
                <span className="text-slate-200 font-medium">
                  Next.js · Neon DB · PortOne V2
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== 하단 고정 탭바 (6개 균등 배치: 홈 · 작품관 · 뷰어 · 멤버십 · 커뮤니티 · 설정) ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-3xl mx-auto grid grid-cols-6 h-16">
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>홈</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('works')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'works' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>작품관</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('viewer')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'viewer' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>뷰어</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('membership')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'membership' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>멤버십</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('community')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'community' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>커뮤니티</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] sm:text-[11px] font-medium transition ${
              activeTab === 'settings' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>설정</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
