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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.77 13.75H15.73C13.72 13.75 12.75 12.82 12.75 10.9V4.1C12.75 2.18 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.18 22.75 4.1V10.9C22.75 12.82 21.77 13.75 19.77 13.75ZM15.73 2.75C14.46 2.75 14.25 3.09 14.25 4.1V10.9C14.25 11.91 14.46 12.25 15.73 12.25H19.77C21.04 12.25 21.25 11.91 21.25 10.9V4.1C21.25 3.09 21.04 2.75 19.77 2.75H15.73Z"  fill="#105A35" />
        <path d="M19.77 22.75H15.73C13.72 22.75 12.75 21.82 12.75 19.9V18.1C12.75 16.18 13.73 15.25 15.73 15.25H19.77C21.78 15.25 22.75 16.18 22.75 18.1V19.9C22.75 21.82 21.77 22.75 19.77 22.75ZM15.73 16.75C14.46 16.75 14.25 17.09 14.25 18.1V19.9C14.25 20.91 14.46 21.25 15.73 21.25H19.77C21.04 21.25 21.25 20.91 21.25 19.9V18.1C21.25 17.09 21.04 16.75 19.77 16.75H15.73Z"  fill="#105A35" />
        <path d="M8.27 22.75H4.23C2.22 22.75 1.25 21.82 1.25 19.9V13.1C1.25 11.18 2.23 10.25 4.23 10.25H8.27C10.28 10.25 11.25 11.18 11.25 13.1V19.9C11.25 21.82 10.27 22.75 8.27 22.75ZM4.23 11.75C2.96 11.75 2.75 12.09 2.75 13.1V19.9C2.75 20.91 2.96 21.25 4.23 21.25H8.27C9.54 21.25 9.75 20.91 9.75 19.9V13.1C9.75 12.09 9.54 11.75 8.27 11.75H4.23Z"  fill="#105A35" />
        <path d="M8.27 8.75H4.23C2.22 8.75 1.25 7.82 1.25 5.9V4.1C1.25 2.18 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.18 11.25 4.1V5.9C11.25 7.82 10.27 8.75 8.27 8.75ZM4.23 2.75C2.96 2.75 2.75 3.09 2.75 4.1V5.9C2.75 6.91 2.96 7.25 4.23 7.25H8.27C9.54 7.25 9.75 6.91 9.75 5.9V4.1C9.75 3.09 9.54 2.75 8.27 2.75H4.23Z"  fill="#105A35" />
      </svg>
    ),
  },
  {
    label: "Employees",
    page: 2,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.15957 11.62C9.12957 11.62 9.10957 11.62 9.07957 11.62C9.02957 11.61 8.95957 11.61 8.89957 11.62C5.99957 11.53 3.80957 9.25 3.80957 6.44C3.80957 3.58 6.13957 1.25 8.99957 1.25C11.8596 1.25 14.1896 3.58 14.1896 6.44C14.1796 9.25 11.9796 11.53 9.18957 11.62C9.17957 11.62 9.16957 11.62 9.15957 11.62ZM8.99957 2.75C6.96957 2.75 5.30957 4.41 5.30957 6.44C5.30957 8.44 6.86957 10.05 8.85957 10.12C8.91957 10.11 9.04957 10.11 9.17957 10.12C11.1396 10.03 12.6796 8.42 12.6896 6.44C12.6896 4.41 11.0296 2.75 8.99957 2.75Z"  fill="#105A35" />
        <path d="M16.5394 11.75C16.5094 11.75 16.4794 11.75 16.4494 11.74C16.0394 11.78 15.6194 11.49 15.5794 11.08C15.5394 10.67 15.7894 10.3 16.1994 10.25C16.3194 10.24 16.4494 10.24 16.5594 10.24C18.0194 10.16 19.1594 8.96 19.1594 7.49C19.1594 5.97 17.9294 4.74 16.4094 4.74C15.9994 4.75 15.6594 4.41 15.6594 4C15.6594 3.59 15.9994 3.25 16.4094 3.25C18.7494 3.25 20.6594 5.16 20.6594 7.5C20.6594 9.8 18.8594 11.66 16.5694 11.75C16.5594 11.75 16.5494 11.75 16.5394 11.75Z"  fill="#105A35" />
        <path d="M9.16961 22.55C7.20961 22.55 5.23961 22.05 3.74961 21.05C2.35961 20.13 1.59961 18.87 1.59961 17.5C1.59961 16.13 2.35961 14.86 3.74961 13.93C6.74961 11.94 11.6096 11.94 14.5896 13.93C15.9696 14.85 16.7396 16.11 16.7396 17.48C16.7396 18.85 15.9796 20.12 14.5896 21.05C13.0896 22.05 11.1296 22.55 9.16961 22.55ZM4.57961 15.19C3.61961 15.83 3.09961 16.65 3.09961 17.51C3.09961 18.36 3.62961 19.18 4.57961 19.81C7.06961 21.48 11.2696 21.48 13.7596 19.81C14.7196 19.17 15.2396 18.35 15.2396 17.49C15.2396 16.64 14.7096 15.82 13.7596 15.19C11.2696 13.53 7.06961 13.53 4.57961 15.19Z"  fill="#105A35" />
        <path d="M18.3397 20.75C17.9897 20.75 17.6797 20.51 17.6097 20.15C17.5297 19.74 17.7897 19.35 18.1897 19.26C18.8197 19.13 19.3997 18.88 19.8497 18.53C20.4197 18.1 20.7297 17.56 20.7297 16.99C20.7297 16.42 20.4197 15.88 19.8597 15.46C19.4197 15.12 18.8697 14.88 18.2197 14.73C17.8197 14.64 17.5597 14.24 17.6497 13.83C17.7397 13.43 18.1397 13.17 18.5497 13.26C19.4097 13.45 20.1597 13.79 20.7697 14.26C21.6997 14.96 22.2297 15.95 22.2297 16.99C22.2297 18.03 21.6897 19.02 20.7597 19.73C20.1397 20.21 19.3597 20.56 18.4997 20.73C18.4397 20.75 18.3897 20.75 18.3397 20.75Z"  fill="#105A35" />
      </svg>
    ),
  },
  {
    label: "Live locations",
    page: 5,
    icon: (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 21.0938C7.76042 21.0938 3.90625 17.2396 3.90625 12.5C3.90625 7.76042 7.76042 3.90625 12.5 3.90625C17.2396 3.90625 21.0938 7.76042 21.0938 12.5C21.0938 17.2396 17.2396 21.0938 12.5 21.0938ZM12.5 5.46875C8.625 5.46875 5.46875 8.625 5.46875 12.5C5.46875 16.375 8.625 19.5312 12.5 19.5312C16.375 19.5312 19.5312 16.375 19.5312 12.5C19.5312 8.625 16.375 5.46875 12.5 5.46875Z" fill="#105A35" />
        <path d="M12.5 16.4062C10.3438 16.4062 8.59375 14.6562 8.59375 12.5C8.59375 10.3438 10.3438 8.59375 12.5 8.59375C14.6562 8.59375 16.4062 10.3438 16.4062 12.5C16.4062 14.6562 14.6562 16.4062 12.5 16.4062ZM12.5 10.1562C11.2083 10.1562 10.1562 11.2083 10.1562 12.5C10.1562 13.7917 11.2083 14.8438 12.5 14.8438C13.7917 14.8438 14.8438 13.7917 14.8438 12.5C14.8438 11.2083 13.7917 10.1562 12.5 10.1562Z" fill="#105A35" />
        <path d="M12.5 4.94857C12.0729 4.94857 11.7188 4.5944 11.7188 4.16732V2.08398C11.7188 1.6569 12.0729 1.30273 12.5 1.30273C12.9271 1.30273 13.2812 1.6569 13.2812 2.08398V4.16732C13.2812 4.5944 12.9271 4.94857 12.5 4.94857Z" fill="#105A35" />
        <path d="M4.16732 13.2812H2.08398C1.6569 13.2812 1.30273 12.9271 1.30273 12.5C1.30273 12.0729 1.6569 11.7188 2.08398 11.7188H4.16732C4.5944 11.7188 4.94857 12.0729 4.94857 12.5C4.94857 12.9271 4.5944 13.2812 4.16732 13.2812Z" fill="#105A35" />
        <path d="M12.5 23.6986C12.0729 23.6986 11.7188 23.3444 11.7188 22.9173V20.834C11.7188 20.4069 12.0729 20.0527 12.5 20.0527C12.9271 20.0527 13.2812 20.4069 13.2812 20.834V22.9173C13.2812 23.3444 12.9271 23.6986 12.5 23.6986Z" fill="#105A35" />
        <path d="M22.9173 13.2812H20.834C20.4069 13.2812 20.0527 12.9271 20.0527 12.5C20.0527 12.0729 20.4069 11.7188 20.834 11.7188H22.9173C23.3444 11.7188 23.6986 12.0729 23.6986 12.5C23.6986 12.9271 23.3444 13.2812 22.9173 13.2812Z" fill="#105A35" />
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
        <button className="xl:hidden absolute left-5 top-6" onClick={() => setMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} color="#105A35">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="hidden w-1/7 flex-col font-bold justify-between mb-10 gap-10 xl:flex">
          <div className="gap-10 flex flex-col">
            <div onClick={() => setPageState(3)} className="bg-[#105A35]/20 hover:scale-105 transition cursor-pointer w-2/3 md:w-1/2 flex flex-row items-center rounded-full gap-2 p-1">
              <div className="bg-[#105A35] rounded-full h-full aspect-square text-white flex items-center justify-center p-2 text-2xl">+</div>
              <p>Add new</p>
            </div>
            <div className="flex flex-col w-full gap-5 pr-10">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setPageState(item.page)}
                  className={`rounded-full py-2 px-4 text-start border border-white/0 flex flex-row items-center gap-2 transition-all duration-200
                    ${pageState === item.page
                      ? 'shadow-lg  text-[#105A35]'
                      : 'hover:shadow-lg hover:border hover:border-[#105A35] text-black'
                    }`}
                >
                  {React.cloneElement(item.icon, {
                    fill: pageState === item.page ? 'currentColor' : 'none',
                    stroke: pageState === item.page ? 'none' : 'currentColor',
                    strokeWidth: item.icon.props.strokeWidth || 0.3,
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
          <div className="w-full h-full bg-gray-100 rounded-4xl p-5 xl:p-10">
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
              <div onClick={() => setPageState(3)} className="bg-[#105A35]/20 text-black cursor-pointer w-2/3 md:w-1/2 flex flex-row items-center rounded-full gap-2 p-1">
                <div className="bg-[#105A35] rounded-full h-full aspect-square text-white flex items-center justify-center p-2 text-2xl">+</div>
                <p>Add new</p>
              </div>
              <div className="flex flex-col w-full gap-5 pr-10">
                {navItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => setPageState(item.page)}
                    className={`border-gray-200 border-b py-2 px-4 text-start flex flex-row items-center gap-2
                      ${pageState === item.page ? 'text-[#105A35]' : 'text-black'}`}
                  >
                    {React.cloneElement(item.icon, {
                      fill: pageState === item.page ? 'currentColor' : 'none',
                      stroke: pageState === item.page ? 'none' : 'currentColor',
                      strokeWidth: item.icon.props.strokeWidth || 0.3,
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