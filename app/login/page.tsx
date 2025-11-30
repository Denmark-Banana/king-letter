'use client';

import { useState, useEffect } from 'react';
import { useSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [stars, setStars] = useState<Array<{width: number, height: number, top: string, left: string, duration: number, delay: number, opacity: number}>>([]);
  const [ripples, setRipples] = useState<Array<{top: string, left: string, duration: number, delay: number, maxSize: number}>>([]);
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();


  useEffect(() => {
    setStars([...Array(30)].map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3
    })));

    setRipples([...Array(8)].map(() => ({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      maxSize: Math.random() * 200 + 150
    })));
  }, []);

  const handleGoogleLogin = async () => {
    if (!signIn || !isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: window.location.origin + '/sso-callback',
        redirectUrlComplete: '/inbox',
      });
    } catch (error) {
      console.error('Google 로그인 오류:', error);
    }
  };

  // 로그인되어 있으면 리다이렉트
  const RedirectIfSignedIn = () => {
    useEffect(() => {
      router.push('/inbox');
    }, []);
    return null;
  };

  return (
    <>
      <SignedIn>
        <RedirectIfSignedIn />
      </SignedIn>
      <SignedOut>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(255, 20, 147, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(0, 191, 255, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 90% 20%, rgba(255, 105, 180, 0.4) 0%, transparent 50%)
              `,
              animation: 'dreamyFloat 20s ease-in-out infinite'
            }}
          />
          
          <div className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  rgba(255, 255, 255, 0.03) 0px,
                  rgba(255, 255, 255, 0.03) 1px,
                  transparent 1px,
                  transparent 2px
                ),
                repeating-linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0.03) 0px,
                  rgba(255, 255, 255, 0.03) 1px,
                  transparent 1px,
                  transparent 2px
                )
              `,
              backgroundSize: '50px 50px',
              animation: 'gridScroll 30s linear infinite'
            }}
          />

          <div className="absolute inset-0">
            {stars.map((star, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  width: star.width + 'px',
                  height: star.height + 'px',
                  top: star.top,
                  left: star.left,
                  animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
                  opacity: star.opacity
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            {ripples.map((ripple, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: ripple.top,
                  left: ripple.left,
                  width: '0px',
                  height: '0px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  animation: `rippleExpand ${ripple.duration}s ease-out ${ripple.delay}s infinite`,
                  '--max-size': ripple.maxSize + 'px'
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center mb-8 animate-float">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-lg opacity-30 blur-xl animate-pulse" />
              
              <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-300 to-yellow-400 border-4 border-black pixel-shadow mx-auto">
                <div className="absolute inset-2 bg-yellow-200 border-2 border-black flex items-center justify-center">
                  <i className="ri-mail-fill text-6xl text-purple-600" style={{ filter: 'drop-shadow(2px 2px 0px #000)' }}></i>
                </div>
                
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-pink-400 border-2 border-black transform rotate-12 flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-300 text-sm"></i>
                </div>
                <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-400 border-2 border-black transform -rotate-12 flex items-center justify-center">
                  <i className="ri-star-fill text-yellow-300 text-sm"></i>
                </div>
              </div>
            </div>

            <h1 
              className="font-PressStart2P text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300"
              style={{ 
                textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
              }}
            >
              KINGS LETTER
            </h1>
            <p className="text-purple-200 text-[16px] leading-relaxed">
              편지 한 장, 설레임 한스푼
            </p>
          </div>

          <div className="w-full max-w-sm">
            <button
              onClick={handleGoogleLogin}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full bg-white border-4 border-black px-6 py-4 flex items-center justify-center gap-3 hover:bg-yellow-300 transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <span className="font-bold text-base">
                {isHovered ? 'START!' : 'Google로 시작하기'}
              </span>
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes dreamyFloat {
            0%, 100% {
              transform: translate(0, 0) scale(1);
              opacity: 0.6;
            }
            25% {
              transform: translate(10%, -10%) scale(1.1);
              opacity: 0.8;
            }
            50% {
              transform: translate(-5%, 5%) scale(0.9);
              opacity: 0.7;
            }
            75% {
              transform: translate(-10%, -5%) scale(1.05);
              opacity: 0.75;
            }
          }

          @keyframes gridScroll {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(50px, 50px);
            }
          }

          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
              transform: scale(1);
            }
            50% {
              opacity: 1;
              transform: scale(1.5);
            }
          }

          @keyframes rippleExpand {
            0% {
              width: 0px;
              height: 0px;
              opacity: 0.6;
              border-color: rgba(186, 85, 211, 0.6);
            }
            50% {
              opacity: 0.4;
              border-color: rgba(255, 105, 180, 0.5);
            }
            100% {
              width: var(--max-size);
              height: var(--max-size);
              opacity: 0;
              border-color: rgba(138, 43, 226, 0);
              transform: translate(-50%, -50%);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .pixel-shadow {
            box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
      </SignedOut>
    </>
  );
}
