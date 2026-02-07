'use client'
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const fullText = "Hi, Pooria";
    const [typedText, setTypedText] = useState("");
    const [showDateTime, setShowDateTime] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        let index = 0;
        const typeInterval = setInterval(() => {
            setTypedText(fullText.slice(0, index + 1));
            index++;
            if (index >= fullText.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setShowDateTime(true);
                }, 1000);
            }
        }, 150);

        return () => {
            clearInterval(timer);
            clearInterval(typeInterval);
        };
    }, []);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    const formattedDate = currentTime.toLocaleDateString('en-US', options);
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="px-5 xl:px-10 w-full flex flex-row h-1/12 xl:h-1/6 items-center text-black bg-white relative">
            <button className="invisible xl:hidden left-5 top-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            <div className="w-1/7 pl-3 xl:pl-0">
                <div className="w-14.25 h-12.25 hover:scale-120 hover:rotate-10 transition duration-300">
                    <Image
                        alt="DC"
                        src="/LOGO.png"
                        width={100}
                        height={100}
                        className="cursor-pointer"
                    />
                </div>
            </div>
            <div className="w-6/7 flex flex-col items-end xl:items-start xl:flex-row xl:gap-30 font-medium text-2xl">
                <p className="font-bold">{typedText}</p>
                <div
                    className={`text-xs xl:text-2xl text-gray-500 transition-all duration-500 ease-out transform ${
                        showDateTime ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                >
                    <p>{formattedDate} . {formattedTime}</p>
                </div>
            </div>
        </div>
    );
}