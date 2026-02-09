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
    { label: 'Employees :', value: 28, suffix: '', color: '#F8602E' },
    { label: 'Total hours worked :', value: 1900, suffix: 'H', color: '#41ADBE' },
    { label: 'Total amount to pay :', value: 15000, prefix: '$', suffix: '', color: '#76D15C' },
  ];

  const strokeWidth = 8;
  const viewBoxSize = 200;
  const radius = (viewBoxSize - strokeWidth - 25) / 2;
  const circumference = 2 * Math.PI * radius;

  const getNumberClass = (value: number) => {
    if (value >= 10000) return 'text-4xl xl:text-5xl';
    if (value >= 1000) return 'text-5xl xl:text-6xl';
    return 'text-5xl xl:text-6xl';
  };

  return (
    <div className="w-full flex flex-col xl:flex-row gap-5 xl:gap-10 text-black font-medium text-xl xl:text-2xl">
      {stats.map((item, idx) => (
        <motion.div
          key={idx}
          className="bg-white p-5 flex flex-col xl:aspect-square gap-4 xl:gap-5 w-full xl:w-1/4 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300"
          initial="hidden"
          animate="visible"
          custom={idx}
          variants={cardVariants}
        >
          <p className="text-xl xl:text-2xl">{item.label}</p>
          <hr className="xl:hidden border-gray-300 my-0" />

          <div className="flex-1 flex xl:justify-center justify-end items-center relative">
            <svg
              viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
              className="w-full h-full -rotate-90 hidden xl:block"
            >
              <motion.circle
                cx={viewBoxSize / 2}
                cy={viewBoxSize / 2}
                r={radius}
                stroke={item.color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 2}}
              />
            </svg>

            <div className="flex-1 xl:absolute xl:inset-0 flex items-center justify-end xl:justify-center text-right xl:text-center">
              <p className={`${getNumberClass(item.value)} text-[#105A35] ${khand.className}`} style={{ color: item.color }}>
                {item.prefix || ''}
                {item.value}
                {item.suffix && <span className="text-3xl">{item.suffix}</span>}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
