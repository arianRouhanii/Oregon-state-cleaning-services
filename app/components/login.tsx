'use client'
import { useEffect, useState } from "react";
import { Cod, Pss } from "@/public/SVG/svg";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import LogoMotion from "./logo_motion";

export default function Login() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <LogoMotion />
                    </motion.div>
                )}
            </AnimatePresence>
            {!showSplash && (
                <motion.main
                    className="text-black flex flex-col justify-center items-center gap-5 bg-white md:h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="w-full md:w-[50vh] p-9 flex xl:justify-center"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            alt="logo"
                            src="/main_logo.png"
                            width={100}
                            height={100}
                        />
                    </motion.div>
                    <motion.div
                        className="w-full md:border border-[#F1F1F1] md:w-[50vh] flex flex-col justify-center items-center bg-white rounded-4xl md:py-10 px-9 md:px-20"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <form
                            action="/employee"
                            className="flex flex-col gap-5 justify-center md:items-center w-full"
                        >
                            <motion.div
                                className="flex flex-col md:hidden gap-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <p className="text-3xl font-bold">
                                    Sign in to your Account
                                </p>
                                <p className="text-gray-500 text-xs font-medium">
                                    Enter your Company code and password to log in
                                </p>
                            </motion.div>

                            <motion.p
                                className="font-bold hidden md:flex"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                Log in
                            </motion.p>
                            <motion.label
                                htmlFor="companycode"
                                className="bg-[#F1F1F1] rounded-full p-3 w-full flex gap-3 px-5"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Cod />
                                <input
                                    type="text"
                                    id="companycode"
                                    className="w-full outline-0 bg-transparent"
                                    required
                                    placeholder="Company code"
                                />
                            </motion.label>
                            <motion.label
                                htmlFor="password"
                                className="bg-[#F1F1F1] rounded-full p-3 w-full flex gap-3 px-5"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <Pss />
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full outline-0 bg-transparent"
                                    required
                                    placeholder="Password"
                                    minLength={8}
                                />
                            </motion.label>
                            <motion.div
                                className="w-full flex justify-end"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <button type="button">
                                    Forgot password?
                                </button>
                            </motion.div>

                            <motion.input
                                type="submit"
                                value="Log in"
                                className="bg-[#105A35] text-white font-bold rounded-full p-3 w-full cursor-pointer"
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            />
                        </form>
                    </motion.div>
                </motion.main>
            )}
        </>
    );
}