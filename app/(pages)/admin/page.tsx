'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Add from "./components/Add";
import Details from "./components/Details";
import Map from "./components/Map";
import Header from "./components/Header";
import { Logout } from "@/public/SVG/svg";

const navItems = [
  {
    label: "Dashboard",
    page: 1,
    icon: (
      <svg width="24" height="24" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 10H8V0H0V10ZM0 18H8V12H0V18ZM10 18H18V8H10V18ZM10 0V6H18V0H10Z" />
      </svg>
    ),
  },
  {
    label: "Employees",
    page: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 22 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 6.02007C16.66 6.02007 17.99 4.67558 17.99 3.01003C17.99 1.34448 16.66 0 15 0C13.34 0 12 1.34448 12 3.01003C12 4.67558 13.34 6.02007 15 6.02007ZM7 6.02007C8.66 6.02007 9.99 4.67558 9.99 3.01003C9.99 1.34448 8.66 0 7 0C5.34 0 4 1.34448 4 3.01003C4 4.67558 5.34 6.02007 7 6.02007ZM7 8.02676C4.67 8.02676 0 9.20067 0 11.5385V14.0468H14V11.5385C14 9.20067 9.33 8.02676 7 8.02676ZM15 8.02676C14.71 8.02676 14.38 8.04682 14.03 8.07692C15.19 8.91973 16 10.0535 16 11.5385V14.0468H22V11.5385C22 9.20067 17.33 8.02676 15 8.02676Z" />
      </svg>
    ),
  },
  {
    label: "Live locations",
    page: 5,
    icon: (
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 21.0938C7.76042 21.0938 3.90625 17.2396 3.90625 12.5C3.90625 7.76042 7.76042 3.90625 12.5 3.90625C17.2396 3.90625 21.0938 7.76042 21.0938 12.5C21.0938 17.2396 17.2396 21.0938 12.5 21.0938ZM12.5 5.46875C8.625 5.46875 5.46875 8.625 5.46875 12.5C5.46875 16.375 8.625 19.5312 12.5 19.5312C16.375 19.5312 19.5312 16.375 19.5312 12.5C19.5312 8.625 16.375 5.46875 12.5 5.46875Z" fill="#FF7E2A" />
        <path d="M12.5 16.4062C10.3438 16.4062 8.59375 14.6562 8.59375 12.5C8.59375 10.3438 10.3438 8.59375 12.5 8.59375C14.6562 8.59375 16.4062 10.3438 16.4062 12.5C16.4062 14.6562 14.6562 16.4062 12.5 16.4062ZM12.5 10.1562C11.2083 10.1562 10.1562 11.2083 10.1562 12.5C10.1562 13.7917 11.2083 14.8438 12.5 14.8438C13.7917 14.8438 14.8438 13.7917 14.8438 12.5C14.8438 11.2083 13.7917 10.1562 12.5 10.1562Z" fill="#FF7E2A" />
        <path d="M12.5 4.94857C12.0729 4.94857 11.7188 4.5944 11.7188 4.16732V2.08398C11.7188 1.6569 12.0729 1.30273 12.5 1.30273C12.9271 1.30273 13.2812 1.6569 13.2812 2.08398V4.16732C13.2812 4.5944 12.9271 4.94857 12.5 4.94857Z" fill="#FF7E2A" />
        <path d="M4.16732 13.2812H2.08398C1.6569 13.2812 1.30273 12.9271 1.30273 12.5C1.30273 12.0729 1.6569 11.7188 2.08398 11.7188H4.16732C4.5944 11.7188 4.94857 12.0729 4.94857 12.5C4.94857 12.9271 4.5944 13.2812 4.16732 13.2812Z" fill="#FF7E2A" />
        <path d="M12.5 23.6986C12.0729 23.6986 11.7188 23.3444 11.7188 22.9173V20.834C11.7188 20.4069 12.0729 20.0527 12.5 20.0527C12.9271 20.0527 13.2812 20.4069 13.2812 20.834V22.9173C13.2812 23.3444 12.9271 23.6986 12.5 23.6986Z" fill="#FF7E2A" />
        <path d="M22.9173 13.2812H20.834C20.4069 13.2812 20.0527 12.9271 20.0527 12.5C20.0527 12.0729 20.4069 11.7188 20.834 11.7188H22.9173C23.3444 11.7188 23.6986 12.0729 23.6986 12.5C23.6986 12.9271 23.3444 13.2812 22.9173 13.2812Z" fill="#FF7E2A" />
      </svg>
    ),
  },
];

export default function Tabs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageState, setPageState] = useState(1);
  const router = useRouter();

  return (
    <main className="select-none h-screen">
      <Header />
      <div className="xl:pl-10 w-full flex flex-row text-black bg-white h-11/12 xl:h-5/6 text-[14px]">
        <button className="xl:hidden absolute left-5 top-5" onClick={() => setMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} color="#FF7E2A">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden w-1/7 flex-col font-bold justify-between mb-10 gap-10 xl:flex">
          <div className="gap-10 flex flex-col">
            <div onClick={() => setPageState(3)} className="bg-[#FF7E2A]/20 hover:scale-105 transition cursor-pointer w-2/3 md:w-1/2 flex flex-row items-center rounded-full gap-2 p-1">
              <div className="bg-[#FF7E2A] rounded-full h-full aspect-square text-white flex items-center justify-center p-2 text-2xl">+</div>
              <p>Add new</p>
            </div>
            <div className="flex flex-col w-full gap-5 pr-10">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setPageState(item.page)}
                  className={`rounded-full py-2 px-4 text-start border border-white/0 flex flex-row items-center gap-2 transition-all duration-200
                    ${pageState === item.page
                      ? 'shadow-lg border border-[#FF7E2A] text-[#FF7E2A]'
                      : 'hover:shadow-lg hover:border hover:border-[#FF7E2A] text-black'
                    }`}
                >
                  {React.cloneElement(item.icon, {
                    fill: pageState === item.page ? 'currentColor' : 'none',
                    stroke: pageState === item.page ? 'none' : 'currentColor',
                    strokeWidth: item.icon.props.strokeWidth || 1.5,
                  })}
                  <p>{item.label}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="gap-3 flex flex-col">
            <p onClick={() => router.push("/")} className="cursor-pointer text-black hover:text-red-500 transition hover:scale-105 flex items-center gap-2">
              <Logout />
              Logout
            </p>
          </div>
        </div>
        <div className="bg-white w-full xl:w-5/6 xl:mb-10">
          <div className="w-full h-full bg-[#F8F8F8] rounded-4xl p-5 xl:p-10">
            {pageState === 1 && <Dashboard setPageState={setPageState} />}
            {pageState === 2 && <Employees setPageState={setPageState} />}
            {pageState === 3 && <Add setPageState={setPageState} />}
            {pageState === 4 && <Details setPageState={setPageState} />}
            {pageState === 5 && <Map setPageState={setPageState} />}
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-xl p-5 flex flex-col gap-6 z-50">
            <button className="self-end mb-4" onClick={() => setMenuOpen(false)} />
            <div className="gap-10 flex flex-col">
              <div onClick={() => setPageState(3)} className="bg-[#FF7E2A]/20 text-black cursor-pointer w-2/3 md:w-1/2 flex flex-row items-center rounded-full gap-2 p-1">
                <div className="bg-[#FF7E2A] rounded-full h-full aspect-square text-white flex items-center justify-center p-2 text-2xl">+</div>
                <p>Add new</p>
              </div>
              <div className="flex flex-col w-full gap-5 pr-10">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => setPageState(item.page)}
                    className={`border-gray-200 border-b py-2 px-4 text-start flex flex-row items-center gap-2
                      ${pageState === item.page ? 'text-[#FF7E2A]' : 'text-black'}`}
                  >
                    {React.cloneElement(item.icon, {
                      fill: pageState === item.page ? 'currentColor' : 'none',
                      stroke: pageState === item.page ? 'none' : 'currentColor',
                      strokeWidth: item.icon.props.strokeWidth || 1.5,
                    })}
                    <p>{item.label}</p>
                  </button>
                ))}
              </div>
              <div className="absolute bottom-5 gap-3 flex flex-col">
                <p onClick={() => router.push("/")} className="text-red-500 flex items-center gap-2">
                  <Logout />
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}