// app/layout.tsx
import React from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
