'use client'
import { useState } from "react";
import { Cal, Bck, Loc, Des } from "@/public/SVG/svg";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { startOfMonth } from 'date-fns';
import { motion } from "framer-motion";

interface Stage4Props {
  setPageState: (page: number) => void;
}

type Row = {
  id: string;
  date: string;
  locations: { lat: number; lng: number }[];
  desc: string;
  progress: number;
  time: string;
  income: string;
};

export default function Details({ setPageState }: Stage4Props) {
  const [openDateFilter, setOpenDateFilter] = useState(false);
  const today = new Date();
  const [dateRange, setDateRange] = useState([
    { startDate: startOfMonth(today), endDate: today, key: 'selection' }
  ]);
  const [openMap, setOpenMap] = useState<{ rowId: string; index: number } | null>(null);
  const [openDesc, setOpenDesc] = useState<string | null>(null);

  const stats = [
    { label: "Average Income", value: "$48", color: "text-green-500", days: "14 Days" },
    { label: "Total Income", value: "$2150", color: "text-green-500", days: "14 Days" },
    { label: "Average time", value: "07:45", color: "text-[#FF7E2A]", days: "30 Days" },
    { label: "Total time", value: "168H", color: "text-[#FF7E2A]", days: "30 Days" },
  ];

  const rows: Row[] = [
    {
      id: "r1",
      date: "Sunday 1 Feb 2026",
      locations: [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 40.780, lng: -73.970 },
        { lat: 40.790, lng: -73.965 },
      ],
      desc: "test1",
      progress: 100,
      time: "8:00",
      income: "48"
    },
    {
      id: "r2",
      date: "Monday 2 Feb 2026",
      locations: [{ lat: 40.785091, lng: -73.968285 }],
      desc: "test2",
      progress: 50,
      time: "4:00",
      income: "24"
    },
    {
      id: "r3",
      date: "Thursday 3 Feb 2026",
      locations: [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 40.782, lng: -73.966 }
      ],
      desc: "test3",
      progress: 75,
      time: "6:00",
      income: "36"
    }
  ];

  const filteredSortedRows = [...rows]
    .filter(r => {
      const rowDate = new Date(r.date).setHours(0, 0, 0, 0);
      const start = dateRange[0].startDate.setHours(0, 0, 0, 0);
      const end = dateRange[0].endDate.setHours(23, 59, 59, 999);
      return rowDate >= start && rowDate <= end;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isEmpty = filteredSortedRows.length === 0;

  return (
    <div className="relative flex gap-6">
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex justify-between items-center relative">
          <div className="flex gap-8 items-center">
            <div onClick={() => setPageState(2)} className="bg-[#FF7E2A] cursor-pointer rounded-full h-8 w-8 text-white flex items-center pr-0.5 justify-center text-2xl hover:scale-110 transition">
              <Bck />
            </div>
            <p className="text-2xl xl:text-4xl font-medium">Pooria</p>
          </div>
          <div onClick={() => setOpenDateFilter(true)} className="cursor-pointer bg-[#646464]/5 p-4 rounded-xl text-gray-500 hover:bg-[#646464]/10 text-xl hidden xl:flex flex-row items-center gap-2">
            <Cal />
            <p>{`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}</p>
          </div>
        </div>
        <div className="w-full xl:flex xl:flex-row grid grid-cols-2 gap-5 xl:gap-10 text-black font-medium">
          {stats.map(s => (
            <motion.div
              key={s.label}
              className="bg-[#646464]/5 p-5 aspect-square sm:aspect-auto xl:aspect-square w-full xl:w-1/7 rounded-2xl hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{s.label}</p>
              <div className="flex items-center justify-center h-3/4">
                <p className={`text-4xl ${s.color}`}>{s.value}</p>
              </div>
              <p className="text-gray-500 text-right">{s.days}</p>
            </motion.div>
          ))}
        </div>
        <div onClick={() => setOpenDateFilter(true)} className="cursor-pointer bg-[#646464]/5 p-4 rounded-xl text-gray-500 text-xl flex flex-row items-center gap-2 justify-between xl:hidden mb-3">
          <Cal />
          <p>{`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}</p>
        </div>
        <p className="text-2xl xl:text-4xl font-medium flex xl:hidden mt-5">History</p>
        <div className="flex flex-col xl:hidden mb-5 gap-5">
          {isEmpty && <p className="text-center text-gray-400">There is no history at this range</p>}
          {filteredSortedRows.map(r => (
            <motion.div key={r.id} className="bg-white flex flex-col p-5 rounded-xl border border-gray-200 gap-3"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
            >
              <div className="flex flex-row justify-between">
                <p>{r.date}</p>
                <p>Income: ~ $ {r.income}</p>
              </div>
              <div className="flex flex-row justify-between">
                <div
                  onClick={() => setOpenMap({ rowId: r.id, index: 0 })}
                  className="px-3 py-1 flex flex-row rounded-full bg-[#646464]/10 items-center gap-1 cursor-pointer"
                >
                  <Loc /> Track
                </div>
                <div
                  onClick={() => setOpenDesc(r.desc)}
                  className="px-3 py-1 flex flex-row rounded-full bg-[#646464]/10 items-center cursor-pointer"
                >
                  <Des />
                </div>
              </div>
              <div className="flex flex-row justify-between gap-5 items-center">
                <progress
                  max={100}
                  value={r.progress}
                  className="w-full h-4 rounded-full border p-px border-[#FF7E2A] appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[#FF7E2A] [&::-webkit-progress-value]:rounded-full"
                />
                <span style={{ color: parseInt(r.time.split(":")[0]) < 8 ? "red" : "green" }}>{r.time}</span>
              </div>
            </motion.div>
          ))}
          <hr className="text-gray-300" />
        </div>
        <p className="text-2xl xl:text-4xl font-medium hidden xl:flex mt-5">History</p>
        <div className="overflow-y-auto h-[35vh] hidden xl:block">
          <table className="min-w-full">
            <thead className="sticky top-0 bg-[#F8F8F8]">
              <tr>
                {["Date", "Location", "Description", "Total time", "Income"].map(h => (
                  <th key={h} className="px-4 py-2 text-left text-lg text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isEmpty && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-400 text-lg">
                    There is no history at this range
                  </td>
                </tr>
              )}
              {filteredSortedRows.map((r, i) => (
                <tr
                  key={r.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-transparent"}
                >
                  <td className="px-6 py-4 text-xl text-gray-500">{r.date}</td>
                  <td
                    className="px-6 py-4 text-xl text-gray-500 flex flex-row gap-1 items-center cursor-pointer"
                    onClick={() => setOpenMap({ rowId: r.id, index: 0 })}
                  >
                    <Loc /> Track
                  </td>
                  <td
                    className="px-6 py-4 text-xl text-gray-500 cursor-pointer"
                    onClick={() => setOpenDesc(r.desc)}
                  >
                    <Des />
                  </td>
                  <td className="px-6 py-4 text-xl">
                    <div className="flex items-center gap-3">
                      <progress
                        max={100}
                        value={r.progress}
                        className="w-full h-4 rounded-full border p-px border-[#FF7E2A] appearance-none [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[#FF7E2A] [&::-webkit-progress-value]:rounded-full"
                      />
                      <span style={{ color: parseInt(r.time.split(":")[0]) < 8 ? "red" : "green" }}>
                        {r.time}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-2xl">~ $ {r.income}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {openDateFilter && (
          <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-end">
            <div className="bg-white rounded-t-2xl w-full xl:w-1/3 p-5 animate-slideUp">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-medium">Select Date Range</p>
                <button onClick={() => setOpenDateFilter(false)} className="text-xl text-gray-500">✕</button>
              </div>
              <DateRange
                ranges={dateRange}
                onChange={(item: { selection: { startDate: Date; endDate: Date; key: string } }) =>
                  setDateRange([item.selection])
                }
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                rangeColors={['#FF7E2A']}
              />
            </div>
          </div>
        )}
      </div>
      {openMap && (() => {
        const row = rows.find(r => r.id === openMap.rowId);
        if (!row) return null;
        const loc = row.locations[openMap.index];
        return (
          <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl w-[90%] xl:w-150 p-4"
              initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setOpenMap(null)} className="text-gray-500 float-right">✕</button>
              <div className="flex gap-2 mb-3 flex-wrap">
                {row.locations.map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded-full ${i === openMap.index ? 'bg-[#FF7E2A] text-white' : 'bg-gray-200'}`}
                    onClick={() => setOpenMap({ rowId: row.id, index: i })}
                  >
                    Job {i + 1}
                  </button>
                ))}
              </div>
              <iframe
                className="w-full h-87.5 rounded-xl"
                loading="lazy"
                src={`https://www.google.com/maps?q=${loc.lat},${loc.lng}&z=15&output=embed`}
              />
            </motion.div>
          </motion.div>
        );
      })()}
      {openDesc && (
        <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="bg-white rounded-2xl w-[90%] xl:w-125 p-5"
            initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} transition={{ duration: 0.3 }}>
            <button onClick={() => setOpenDesc(null)} className="text-gray-500 float-right">✕</button>
            <p>Description</p>
            <p className="mt-6 text-gray-600 leading-relaxed">{openDesc}</p>
          </motion.div>
        </motion.div>
      )}
      <style jsx> {`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}