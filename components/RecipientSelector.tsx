'use client';

import { useEffect, useState } from 'react';

interface RecipientSelectorProps {
  onSelect: (recipient: { id: string; name: string; email: string }) => void;
  onClose: () => void;
}

export default function RecipientSelector({ onSelect, onClose }: RecipientSelectorProps) {
  const [recipients, setRecipients] = useState<
    { id: string; name: string; email: string; profilePicture: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/users", { cache: "no-store" });
        const json = await res.json();
        if (res.ok && alive) {
          setRecipients(json.users || []);
        }
      } catch {
        // ignore
      } finally {
        if (alive) {
          setIsLoading(false);
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const filteredRecipients = recipients.filter(recipient =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="relative max-w-md w-full bg-white border-4 border-black pixel-shadow">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 border-b-4 border-black">
          <div className="flex items-center justify-between">
            <h3 className="text-white">받는 사람 선택</h3>
            <button
              onClick={onClose}
              className="w-6 h-6 bg-white border-2 border-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-sm"></i>
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="이름 또는 이메일 검색..."
                className="w-full pl-8 pr-3 py-2 bg-gray-100 border-2 border-black text-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || recipients.length === 0}
              />
              <i className="ri-search-line absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          <div className="max-h-[300px] overflow-y-auto border-2 border-black">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-gray-600 font-bold">받는 사람 목록을 불러오는 중...</p>
              </div>
            ) : filteredRecipients.length > 0 ? (
              filteredRecipients.map((recipient, index) => (
                <button
                  key={recipient.id}
                  onClick={() => onSelect({ id: recipient.id, name: recipient.name, email: recipient.email })}
                  className={`w-full p-3 flex items-center gap-3 hover:bg-yellow-100 transition-colors border-b-2 border-black last:border-b-0 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-black flex items-center justify-center text-xl flex-shrink-0">
                    <img
                      src={recipient.profilePicture}
                      alt={recipient.name}
                      width={40}
                      height={40}
                      draggable={false}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-gray-800">{recipient.name}</p>
                    <p className="text-sm text-gray-500">{recipient.email}</p>
                  </div>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </button>
              ))
            ) : (
              <div className="p-8 text-center">
                <i className="ri-user-search-line text-4xl text-gray-300 mb-2"></i>
                <p className="text-gray-500">
                  {searchTerm ? '검색 결과가 없습니다' : '받는 사람이 없습니다'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
