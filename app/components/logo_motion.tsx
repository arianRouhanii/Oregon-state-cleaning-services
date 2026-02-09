'use client'

import { motion } from "framer-motion";
import Image from "next/image";

export default function LogoMotion() {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <Image
                src="/logo_motion.gif"
                alt="Logo"
                width={400}
                height={400}
                priority
            />
        </motion.div>
    );
}
