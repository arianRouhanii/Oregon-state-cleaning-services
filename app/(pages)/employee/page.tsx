'use client'
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Logout } from "@/public/SVG/svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Employee() {
  const MAX_SECONDS = 8 * 60 * 60;
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showClockOutPopup, setShowClockOutPopup] = useState(false);
  const [checkboxes, setCheckboxes] = useState({ lights: false, alarms: false, doors: false });
  const [description, setDescription] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleCircle = () => {
    if (running) {
      setRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else setShowPopup(true);
  };

  const startTimer = () => {
    setShowPopup(false);
    setRunning(true);
    timerRef.current = window.setInterval(() => setSeconds(prev => prev + 1), 1000);
  };

  const resetTimer = () => {
    setRunning(false);
    setSeconds(0);
    setCheckboxes({ lights: false, alarms: false, doors: false });
    setDescription('');
    if (timerRef.current) clearInterval(timerRef.current);
    setShowClockOutPopup(false);
  };

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600).toString().padStart(2, '0');
    const m = Math.floor((sec % 3600) / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const formatDate = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' });
  const formatClock = (date: Date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const progressPercent = Math.min(seconds / MAX_SECONDS, 1) * 100;

  const circleSVG = running ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="48" height="48">
      <rect x="5" y="4" width="4" height="16" rx="1" />
      <rect x="15" y="4" width="4" height="16" rx="1" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="48" height="48">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );

  const checkboxItems = [
    { key: 'lights', label: 'I have turned off facility lights' },
    { key: 'alarms', label: 'I have set the alarms' },
    { key: 'doors', label: 'I have locked all the doors' }
  ];

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-black flex flex-col gap-5 bg-white h-screen relative"
    >
      <div className={`${showPopup || showClockOutPopup ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="w-full top-3 p-5 flex justify-between items-center">
          <Image alt="DC" src="/logo.png" width={50} height={50} />
          <a className="text-red-500" href="../" ><Logout /></a>
        </div>

        <div className="w-full border-[#F1F1F1] flex flex-col justify-center items-center bg-white rounded-4xl px-5">
          <form className="flex flex-col gap-5 justify-center w-full">
            <div className="flex flex-col gap-5 bg-[#F1F1F1] rounded-2xl p-5">
              <p className="text-3xl font-bold">Hi Sara</p>
              <div className="flex flex-row justify-between items-center">
                <p className="text-gray-500 text-xs font-medium">{formatDate(currentDate)}</p>
                <p className="text-3xl font-bold">{formatClock(currentDate)}</p>
              </div>
            </div>

            <div className="bg-[#F1F1F1] rounded-2xl p-5 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={toggleCircle}
                className={`rounded-full w-32 h-32 flex items-center justify-center ${running ? 'bg-[#EF5350]' : 'bg-[#32BEA6]'} relative`}
              >
                {circleSVG}
              </button>
              <p className="text-xl font-bold">{running ? 'Lunch-out' : 'Clock-in'}</p>
              <div className="flex flex-col gap-2 w-full mt-2">
                <p className="text-2xl font-bold text-left">{formatTime(seconds)}</p>
                <progress
                  max={MAX_SECONDS}
                  value={seconds}
                  className="w-full h-4 rounded-full border p-0.5 border-[#FF7E2A] appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[#FF7E2A] [&::-webkit-progress-value]:rounded-full [&::-moz-progress-bar]:bg-[#FF7E2A] [&::-moz-progress-bar]:rounded-full"
                />
              </div>
            </div>

            {seconds > 0 && (
              <button
                type="button"
                onClick={() => setShowClockOutPopup(true)}
                className="bg-[#EF5350] cursor-pointer text-white font-bold rounded-xl p-3 w-full outline-0"
              >
                Clock out!
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Clock-in Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 w-80 flex flex-col gap-4"
            >
              <p className="text-xl font-bold">Are you sure you want to start?</p>
              <div className="text-gray-500 text-sm flex flex-row justify-between">
                <p>{formatDate(currentDate)}</p>
                <p>{formatClock(currentDate)}</p>
              </div>
              <div className="flex justify-between gap-4 mt-4">
                <button onClick={startTimer} className="bg-[#32BEA6] text-white font-bold rounded-xl p-2 flex-1">Yes</button>
                <button onClick={() => setShowPopup(false)} className="bg-[#EF5350] text-white font-bold rounded-xl p-2 flex-1">No</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clock-out Popup */}
      <AnimatePresence>
        {showClockOutPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 w-80 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <p className="text-xl font-bold">Are you sure you want to end?</p>
              <div className="text-gray-500 text-sm flex flex-row justify-between">
                <p>{formatDate(currentDate)}</p>
                <p>{formatClock(currentDate)}</p>
              </div>

              {/* Animated Checkboxes */}
              <div className="flex flex-col gap-2 mt-2">
                {checkboxItems.map(item => (
                  <label key={item.key} className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={checkboxes[item.key as keyof typeof checkboxes]}
                      onChange={() =>
                        setCheckboxes({ ...checkboxes, [item.key]: !checkboxes[item.key as keyof typeof checkboxes] })
                      }
                      className="hidden"
                    />
                    <motion.div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                        checkboxes[item.key as keyof typeof checkboxes]
                          ? 'bg-[#32BEA6] border-[#32BEA6]'
                          : 'border-gray-300 bg-white'
                      }`}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      {checkboxes[item.key as keyof typeof checkboxes] && (
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="w-4 h-4 text-white"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <path fill="none" stroke="currentColor" strokeWidth="3" d="M4 12l6 6L20 6" />
                        </motion.svg>
                      )}
                    </motion.div>
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              <textarea
                placeholder="Description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-[#F1F1F1] outline-none rounded-xl p-2 mt-2 w-full resize-none h-[20vh]"
              />

              <div className="flex justify-between gap-4 mt-4">
                <button onClick={resetTimer} className="bg-[#32BEA6] text-white font-bold rounded-xl p-2 flex-1">Yes</button>
                <button onClick={() => setShowClockOutPopup(false)} className="bg-[#EF5350] text-white font-bold rounded-xl p-2 flex-1">No</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}