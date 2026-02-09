import { Bck } from "@/public/SVG/svg";
import { useRef } from "react";

interface Stage3Props {
  setPageState: (page: number) => void;
}

export default function Add({ setPageState }: Stage3Props) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "lastname", label: "Lastname", type: "text" },
    { id: "code", label: "Company code", type: "text" },
    { id: "password", label: "Password", type: "text" },
    { id: "income", label: "Income (Per hour)", type: "number" },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      } else {
        console.log("Reached last input");
      }
    }
  };

  return (
    <div className="gap-20 flex flex-col animate-fadeIn">
      <div className="flex flex-row gap-8">
        <div
          onClick={() => setPageState(1)}
          className="bg-[#105A35] cursor-pointer rounded-full h-8 w-8 text-white flex items-center hover:scale-110 transition justify-center pr-0.5 text-2xl"
        >
          <Bck />
        </div>
        <p className="text-2xl xl:text-4xl font-medium">New Employee</p>
      </div>
      <form action="" className="flex flex-col gap-5 md:w-1/2">
        {fields.map((f, idx) => (
          <div key={f.id} className="flex flex-col gap-1">
            <label htmlFor={f.id} className="text-gray-500">
              {f.label}
            </label>
            <input
              type={f.type}
              id={f.id}
              ref={(el) => { inputRefs.current[idx] = el!; }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="  bg-white p-2 border border-gray-300 rounded-xl font-bold outline-none focus:border-[#105A35] focus:ring-2 focus:ring-[#105A35]/50  hover:shadow-md hover:scale-[1.02] transition-all duration-300 "/>
          </div>
        ))}
        <input type="submit" value="Save" className=" bg-[#105A35] mt-5 cursor-pointer xl:w-1/4 text-white font-bold p-2 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 "/>
      </form>
    </div>
  );
}