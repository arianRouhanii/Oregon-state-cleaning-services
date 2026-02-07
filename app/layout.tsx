import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const roboto = localFont({
  src: '../fonts/Roboto-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-roboto',
});
export const khand = localFont({
  src: '../fonts/Khand-Regular.ttf',
  weight: '400',
  style: 'normal',
  variable: '--font-khand',
});

export const metadata: Metadata = {
  title: "DC",
  description: "Employee Manager",
  icons: {
    icon: "/LOGO.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-black">
      <body
        className={roboto.className}
      >
        {children}
      </body>
    </html>
  );
}
