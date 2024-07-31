import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/sidebar";
import Header from "@/app/components/header";

const roboto = Barlow({
  weight: '300',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Task Management Dashboard",
  description: "A web-based task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      
              {children}
          
      </body>
    </html>
  );
}
