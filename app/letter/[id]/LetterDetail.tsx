'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLayoutById } from '@/lib/letterLayouts';

interface LetterData {
  id: number;
  receivedDate: string;
  unsealed: string;
  title: string;
  sender: string;
  content: string;
  layout: number;
  isUnlocked: boolean;
}

export default function LetterDetail({ letterId }: { letterId: string }) {
  const [isOpening, setIsOpening] = useState(true);
  const [letter, setLetter] = useState<LetterData | null>(null);

  useEffect(() => {
    const letters: { [key: string]: LetterData } = {
      '1': {
        id: 1,
        receivedDate: '2024.01.15',
        unsealed: '2024.02.01',
        title: '새해 복 많이 받아!',
        sender: '친구A',
        content: '안녕! 새해가 밝았네. 올해도 건강하고 행복한 일만 가득하길 바라. 우리 자주 만나자! 항상 응원할게.',
        layout: 1,
        isUnlocked: true
      },
      '2': {
        id: 2,
        receivedDate: '2024.01.20',
        unsealed: '2024.03.15',
        title: '생일 축하해~',
        sender: '친구B',
        content: '생일 축하해! 네가 태어나줘서 고마워. 앞으로도 좋은 일만 가득하길!',
        layout: 2,
        isUnlocked: false
      },
      '3': {
        id: 3,
        receivedDate: '2024.01.25',
        unsealed: '2024.02.10',
        title: '오랜만이야!',
        sender: '친구C',
        content: '정말 오랜만이지? 요즘 어떻게 지내? 나는 잘 지내고 있어. 시간 되면 한번 만나서 밥 먹자!',
        layout: 3,
        isUnlocked: true
      },
      '4': {
        id: 4,
        receivedDate: '2024.01.28',
        unsealed: '2024.12.31',
        title: '미래의 나에게',
        sender: '나',
        content: '1년 후의 나에게. 올해 세웠던 목표들을 잘 이뤘니? 힘든 일도 많았겠지만 잘 버텨줘서 고마워. 내년에도 화이팅!',
        layout: 4,
        isUnlocked: false
      },
      '5': {
        id: 5,
        receivedDate: '2024.02.01',
        unsealed: '2024.02.14',
        title: '고마워!',
        sender: '친구D',
        content: '지난번에 도와줘서 정말 고마웠어. 네가 있어서 든든해. 앞으로도 좋은 친구로 지내자!',
        layout: 5,
        isUnlocked: true
      }
    };

    setLetter(letters[letterId] || null);

    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [letterId]);

  if (!letter) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">편지를 찾을 수 없습니다.</p>
          <Link href="/inbox" className="mt-4 inline-block px-4 py-2 bg-purple-500 text-white border-2 border-black">
            돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const layoutStyle = getLayoutById(letter.layout);
  const displayContent = letter.isUnlocked ? letter.content : letter.content.substring(0, 30) + '...';

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-purple-200">
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundSize: '4px 4px',
          imageRendering: 'pixelated'
        }}
      />
      
      <Header />
      
      <main className="max-w-[500px] mx-auto px-4 pt-20 pb-20">
        {isOpening ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative animate-bounce">
              <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 border-4 border-black pixel-shadow">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-red-500 to-pink-600 border-b-4 border-black"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-yellow-300 border-2 border-black rounded-full flex items-center justify-center">
                    <i className="ri-heart-fill text-red-500 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-xl text-black">편지를 여는 중...</p>
          </div>
        ) : (
          <div className="mt-4">
            {!letter.isUnlocked ? (
              <div className="relative">
                <div className="relative bg-gradient-to-br from-red-400 to-pink-500 border-4 border-black p-8 pixel-shadow">
                  <div 
                    className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-red-500 to-pink-600 border-b-4 border-black"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 60%, 50% 100%, 0% 60%)'
                    }}
                  />

                  <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 z-20 ${layoutStyle.decoration} border-2 border-black transform rounded-full`}>
                    <div className="w-full h-full text-[25px] flex items-center justify-center">
                      <i className={layoutStyle.contentIcon}></i>
                    </div>
                  </div>

                  <div className={`relative mt-16 ${layoutStyle.container} p-6 pixel-shadow overflow-hidden transform rotate-1`}>
                    {letter.layout !== 4 && (
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(0deg, #8b4513 0px, #8b4513 1px, transparent 1px, transparent 29px)`
                        }}
                      />
                    )}

                    <div 
                      className="absolute top-4 right-4 w-24 h-24 opacity-15 pointer-events-none overflow-hidden"
                    >
                      <Image src={`/layout_${layoutStyle.id}.jpg`} alt={layoutStyle.name} className="w-full h-full object-cover" width={64} height={64} />
                    </div>
                    <div 
                      className="absolute bottom-4 left-4 w-24 h-24 opacity-15 pointer-events-none transform rotate-180 overflow-hidden"
                    >
                      <Image src={`/layout_${layoutStyle.id}.jpg`} alt={layoutStyle.name} className="w-full h-full object-cover" width={64} height={64} />
                    </div>

                    <div className="relative">
                      <div className={`flex items-center justify-between mb-4 border-b-2 border-dashed ${layoutStyle.header}`}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${letter.layout === 4 ? 'bg-green-500' : 'bg-red-500'} border-2 border-black flex items-center justify-center`}>
                            <i className={`ri-mail-open-fill ${letter.layout === 4 ? 'text-black' : 'text-white'} text-sm`}></i>
                          </div>
                          <div className={`flex gap-2 text-sm ${letter.layout === 4 ? 'text-green-500' : 'text-gray-500'}`}>
                            <span>수신: {letter.receivedDate}</span>
                            <span>|</span>
                            <span>개봉: {letter.unsealed}</span>
                          </div>
                        </div>
                      </div>

                      <h1 className={`text-lg font-bold mb-6 text-center ${layoutStyle.font} ${layoutStyle.title} pb-3 border-b-2 ${letter.layout === 4 ? 'border-green-500' : layoutStyle.header.includes('pink') ? 'border-pink-300' : layoutStyle.header.includes('amber') ? 'border-amber-300' : layoutStyle.header.includes('orange') ? 'border-orange-300' : 'border-purple-300'}`}>
                        {letter.title}
                      </h1>

                      <div className="min-h-[120px] mb-6 relative">
                        <p className={`leading-relaxed ${layoutStyle.font} ${layoutStyle.content} whitespace-pre-wrap`}>
                          {displayContent}
                        </p>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/95 flex items-end justify-center pb-4">
                          <div className="text-center">
                            {/* <i className="ri-lock-fill text-gray-400 text-3xl mb-2"></i> */}
                            <span className="text-2xl mb-2">😜</span>
                            <p className="text-xs text-gray-600 font-bold">봉인이 풀리면 모든 내용을 읽을 수 있을거에요</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-100 border-4 border-red-500 pixel-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center flex-shrink-0">
                        <i className="ri-lock-fill text-white text-xl"></i>
                      </div>
                      <div>
                        <p className="text-md font-bold text-red-700 mb-1">🔒 봉인된 편지</p>
                        <p className="text-sm text-red-600">
                          이 편지는 {letter.unsealed}에 봉인이 해제됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`relative ${layoutStyle.container} p-6 pixel-shadow overflow-hidden`}>
                {letter.layout !== 4 && (
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, #8b4513 0px, #8b4513 1px, transparent 1px, transparent 29px)`
                    }}
                  />
                )}

                <div 
                  className="absolute top-4 right-4 w-24 h-24 opacity-15 pointer-events-none overflow-hidden"
                >
                  <Image src={`/layout_${layoutStyle.id}.jpg`} alt={layoutStyle.name} className="w-full h-full object-cover" width={64} height={64} />
                </div>
                <div 
                  className="absolute bottom-4 left-4 w-24 h-24 opacity-15 pointer-events-none transform rotate-180 overflow-hidden"
                >
                  <Image src={`/layout_${layoutStyle.id}.jpg`} alt={layoutStyle.name} className="w-full h-full object-cover" width={64} height={64} />
                </div>
                
                <div className="relative">
                  <div className={`flex items-center justify-between mb-4 border-b-2 border-dashed ${layoutStyle.header}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 ${letter.layout === 4 ? 'bg-green-500' : 'bg-red-500'} border-2 border-black flex items-center justify-center`}>
                        <i className={`ri-mail-open-fill ${letter.layout === 4 ? 'text-black' : 'text-white'} text-sm`}></i>
                      </div>
                      <div className={`flex gap-2 ${letter.layout === 4 ? 'text-green-500' : 'text-gray-500'}`}>
                        <span>수신: {letter.receivedDate}</span>
                        <span>|</span>
                        <span>개봉: {letter.unsealed}</span>
                      </div>
                    </div>
                  </div>

                  <h1 className={`text-lg font-bold mb-6 text-center ${layoutStyle.font} ${layoutStyle.title} pb-3 border-b-2 ${letter.layout === 4 ? 'border-green-500' : layoutStyle.header.includes('pink') ? 'border-pink-300' : layoutStyle.header.includes('amber') ? 'border-amber-300' : layoutStyle.header.includes('orange') ? 'border-orange-300' : 'border-purple-300'}`}>
                    {letter.title}
                  </h1>

                  <div className="min-h-[200px] mb-6 relative">
                    <p className={`leading-relaxed ${layoutStyle.font} ${layoutStyle.content} whitespace-pre-wrap`}>
                      {displayContent}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <div className="text-right">
                      <p className={`text-xs ${letter.layout === 4 ? 'text-green-500' : 'text-gray-600'} mb-1`}>보낸이</p>
                      <p className={`text-sm font-bold ${layoutStyle.font} ${layoutStyle.content}`}>{letter.sender}</p>
                    </div>
                  </div>

                  <div className={`absolute -top-2 -right-2 w-12 h-12 ${layoutStyle.decoration} border-2 border-black transform rotate-12 rounded-full`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <i className={layoutStyle.contentIcon}></i>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <Link 
                href="/inbox"
                className="w-full block px-4 py-3 bg-white border-2 border-black text-center font-bold hover:bg-gray-100 transition-colors pixel-shadow"
              >
                <i className="ri-arrow-left-line mr-1"></i>
                목록으로
              </Link>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
