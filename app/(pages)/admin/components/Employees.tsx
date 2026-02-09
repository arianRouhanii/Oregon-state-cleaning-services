'use client';
import { useState } from "react";
import { Eye, Dlt, Dtl, Edt } from "@/public/SVG/svg";
import { motion, AnimatePresence } from "framer-motion";
interface Stage2Props {
  setPageState: (page: number) => void;
}

export default function Employees({ setPageState }: Stage2Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showPasswordIndex, setShowPasswordIndex] = useState<number | null>(null);
  const [menu, setMenu] = useState<{
    index: number
    x: number
    y: number
  } | null>(null)

  const employees = [
    { name: "pooria", code: "123456", password: "pooriapass" },
    { name: "alex", code: "654321", password: "alexpass" },
    { name: "maria", code: "112233", password: "mariapass" },
    { name: "john", code: "445566", password: "johnpass" },
    { name: "lisa", code: "778899", password: "lisapass" },
    { name: "pooria", code: "123456", password: "pooriapass" },
    { name: "alex", code: "654321", password: "alexpass" },
    { name: "maria", code: "112233", password: "mariapass" },
    { name: "john", code: "445566", password: "johnpass" },
    { name: "lisa", code: "778899", password: "lisapass" },
  ];
  return (
    <div className="rounded-lg xl:p-4">
      <table className="w-full table-fixed border-separate" style={{ borderSpacing: "0 10px" }}>
        <thead>
          <tr className="text-gray-500">
            <th className="text-left font-normal pl-6 xl:pb-4">Name</th>
            <th className="text-left font-normal xl:pb-4">Company code</th>
            <th className="text-left font-normal xl:pb-4 hidden xl:flex">Password</th>
            <th className="pb-4"></th>
          </tr>
        </thead>
      </table>
      <div className="overflow-y-auto xl:h-[65vh]">
        <table className="w-full table-fixed border-separate" style={{ borderSpacing: "0 10px" }}>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="bg-white text-xl xl:text-2xl rounded-lg shadow">
                <td className="py-6 pl-6 font-medium">{emp.name}</td>
                <td className="py-6 font-medium">{emp.code}</td>
                <td className="py-6 font-medium items-center gap-2 hidden xl:flex">
                  <p>{showPasswordIndex === index ? emp.password : "********"}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordIndex(prev => (prev === index ? null : index))
                    }
                    className="cursor-pointer"
                  >
                    <Eye />
                  </button>
                </td>
                <td className="py-6 pr-6">
                  <div className="hidden xl:flex justify-end gap-4 items-center">
                    <button onClick={() => setPageState(4)} className="hover:scale-110 transition">
                      <Dtl />
                    </button>
                    <button onClick={() => setOpenIndex(index)} className="hover:scale-110 transition">
                      <Dlt />
                    </button>
                    <button onClick={() => setPageState(3)} className="hover:scale-110 transition">
                      <Edt />
                    </button>
                  </div>
                  <div className="xl:hidden flex justify-end items-center">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect()
                        setMenu({
                          index,
                          x: rect.right - 160,
                          y: rect.bottom + 8
                        })
                      }}
                      className="gap-0.5 flex flex-col"
                    >
                      <div className="aspect-square w-2 bg-[#105A35] rounded-full"></div>
                      <div className="aspect-square w-2 bg-[#105A35] rounded-full"></div>
                      <div className="aspect-square w-2 bg-[#105A35] rounded-full"></div>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openIndex !== null && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              onClick={() => setOpenIndex(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="bg-white rounded-2xl p-6 w-96 flex flex-col gap-6 shadow-xl z-50"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-center text-lg">
                Are you sure you want to delete{" "}
                <span className="text-[#EF5350] font-bold">{employees[openIndex].name}</span>?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setOpenIndex(null)}
                  className="w-1/2 py-3 rounded-xl bg-[#EF5350] text-white"
                >
                  No!
                </button>
                <button
                  onClick={() => setOpenIndex(null)}
                  className="w-1/2 py-3 rounded-xl bg-[#32BEA6] text-white"
                >
                  Yes, sure!
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {menu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenu(null)} />
          <div
            className="fixed z-50 bg-white border border-[#105A35] rounded-xl shadow-xl p-4 w-40"
            style={{ top: menu.y, left: menu.x }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm">
                {showPasswordIndex === menu.index
                  ? employees[menu.index].password
                  : "********"}
              </p>
              <button onClick={() => setShowPasswordIndex(prev => prev === menu.index ? null : menu.index)}>
                <Eye />
              </button>
            </div>
            <div className="flex justify-between">
              <button onClick={() => { setPageState(4), setMenu(null) }}>
                <Dtl />
              </button>
              <button onClick={() => { setOpenIndex(menu.index), setMenu(null) }}>
                <Dlt />
              </button>
              <button onClick={() => { setPageState(3), setMenu(null) }}>
                <Edt />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}