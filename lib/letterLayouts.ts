// 편지지 레이아웃 타입 정의
export interface LetterLayout {
  id: number;
  name: string;
  alias: string;
  gradient: string;
  icon: string;
  iconColor: string;
  previewBg: string;
  previewLine: string;
  font: string;
  container: string;
  header: string;
  title: string;
  content: string;
  decoration: string;
  contentIcon: string;
}

// 사용 가능한 모든 편지지 레이아웃
export const letterLayouts: LetterLayout[] = [
  { 
    id: 1,
    name: 'lovely',
    alias: '알콩달콩 사랑스러운',
    gradient: 'from-pink-200 to-rose-200',
    icon: 'ri-heart-fill',
    iconColor: 'text-pink-500',
    previewBg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100',
    previewLine: 'border-pink-200',
    font: 'font-PfStardust',
    container: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 border-4 border-pink-300',
    header: 'bg-gradient-to-r from-pink-200 to-rose-200 border-pink-300',
    title: 'text-pink-600',
    content: 'text-gray-700',
    decoration: 'bg-pink-400',
    contentIcon: 'ri-heart-fill text-white'
  },
  { 
    id: 2,
    name: 'elegant',
    alias: '세련되고 고풍스러운',
    gradient: 'from-amber-200 to-yellow-200',
    icon: 'ri-quill-pen-fill',
    iconColor: 'text-amber-700',
    previewBg: 'bg-gradient-to-br from-amber-50 to-yellow-100',
    previewLine: 'border-amber-300',
    font: 'font-DosHandwriting',
    container: 'bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-600',
    header: 'bg-gradient-to-r from-amber-200 to-yellow-200 border-amber-400',
    title: 'text-amber-800',
    content: 'text-gray-800',
    decoration: 'bg-amber-600',
    contentIcon: 'ri-quill-pen-fill text-white',
  },
  { 
    id: 3,
    name: 'funny',
    alias: '장난기가 가득한',
    gradient: 'from-yellow-200 to-orange-200',
    icon: 'ri-emotion-laugh-fill',
    iconColor: 'text-orange-500',
    previewBg: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100',
    previewLine: 'border-orange-200',
    font: '',
    container: 'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-100 border-4 border-orange-400',
    header: 'bg-gradient-to-r from-yellow-200 to-orange-200 border-orange-300',
    title: 'text-orange-600',
    content: 'text-gray-700',
    decoration: 'bg-orange-500',
    contentIcon: 'ri-emotion-laugh-fill text-white',
  },
  { 
    id: 4,
    name: 'crt',
    alias: 'CRT 모니터',
    gradient: 'from-green-900 to-green-700',
    icon: 'ri-computer-fill',
    iconColor: 'text-green-400',
    previewBg: 'bg-black',
    previewLine: 'border-green-500',
    font: 'font-mono font-DOSIyagiMedium',
    container: 'bg-black border-4 border-green-500',
    header: 'bg-green-900 border-green-500',
    title: 'text-green-400',
    content: 'text-green-300',
    decoration: 'bg-green-500',
    contentIcon: 'ri-computer-fill text-black',
  },
  { 
    id: 5,
    name: 'park',
    alias: '놀이공원',
    gradient: 'from-purple-200 via-blue-200 to-pink-200',
    icon: 'ri-cake-3-fill',
    iconColor: 'text-purple-500',
    previewBg: 'bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100',
    previewLine: 'border-purple-200',
    font: 'font-Galmuri9',
    container: 'bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 border-4 border-purple-400',
    header: 'bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 border-purple-300',
    title: 'text-purple-600',
    content: 'text-gray-700',
    decoration: 'bg-gradient-to-r from-purple-500 to-pink-500',
    contentIcon: 'ri-cake-3-fill text-white',
  }
];

// 유틸리티 함수: ID로 레이아웃 찾기
export const getLayoutById = (id: number): LetterLayout => {
  return letterLayouts.find(layout => layout.id === id) || letterLayouts[0];
};

export const getLayoutByName = (name: string): LetterLayout => {
  return letterLayouts.find(layout => layout.name === name) || letterLayouts[0];
};

// 유틸리티 함수: 기본 레이아웃 가져오기
export const getDefaultLayout = (): LetterLayout => {
  return letterLayouts[0];
};

