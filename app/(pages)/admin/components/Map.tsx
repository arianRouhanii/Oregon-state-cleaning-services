'use client'
import { motion } from "framer-motion";

interface Stage5Props {
    setPageState: (page: number) => void;
}

export default function Map({ setPageState }: Stage5Props) {
    return (
        <div className="flex w-full h-full flex-col">
            <motion.div
                className="w-full h-full rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <iframe
                    src="https://maps.google.com/maps?q=40.7831,-73.9712&z=13&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
            </motion.div>
        </div>
    );
}