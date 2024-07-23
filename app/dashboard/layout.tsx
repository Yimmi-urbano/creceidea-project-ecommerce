"use client"
import OptionsToolbar from "@/components/toolbar";
import Sidebar from "@/components/sidebar";
import { HeadToolbar } from "@/components/headToolbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex md:h-screen">
     <div className="md:flex hidden"><Sidebar /></div>
     <div className="md:hidden visible "> <OptionsToolbar /></div>
      <div className="flex-1 p-4 gap-4 flex flex-wrap">
        <div className="w-full h-[3rem]"><HeadToolbar /></div>
        <div className="w-full"> {children}</div>
      </div>
    </div>
  );
}
