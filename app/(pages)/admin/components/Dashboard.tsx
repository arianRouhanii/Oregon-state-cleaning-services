import localFont from 'next/font/local';
import { motion, Variants } from 'framer-motion';

const khand = localFont({
  src: '../../../../fonts/Khand-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-khand',
});

interface Stage1Props {
  setPageState: (page: number) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, type: 'spring', stiffness: 100 },
  }),
};

export default function Dashboard({ setPageState }: Stage1Props) {
  const stats = [
    { label: 'Employees :', value: 28, color: 'text-[#FF7E2A]', suffix: '' },
    { label: 'Total hours worked :', value: 1900, color: 'text-[#FF7E2A]', suffix: 'H' },
    { label: 'Total amount to pay :', value: 15000, color: 'text-green-500', prefix: '$', suffix: '' },
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row gap-5 xl:gap-10 text-black font-medium text-xl xl:text-2xl">
      {stats.map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-white p-5 xl:aspect-square flex flex-col gap-3 w-full xl:w-1/4 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
          custom={idx}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <p>{item.label}</p>
          <hr className="text-gray-300 flex xl:hidden" />
          <div className="xl:justify-center justify-end flex xl:items-center h-3/4">
            <p className={`text-6xl ${item.color} ${khand.className}`}>
              {item.prefix || ''}{item.value}{item.suffix && <span className="text-5xl">{item.suffix}</span>}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}