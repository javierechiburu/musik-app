"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-violet-950 shadow-sm border-b border-gray-700 fixed top-0 left-0 right-0 lg:left-64 z-30 h-16">
      <div className="h-full px-4 lg:px-6">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Image
              src={"/FADER_LOGO.svg"}
              width={100}
              height={80}
              alt="logo fader"
              className="invert"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-6 w-px bg-gray-600"></div>

            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
