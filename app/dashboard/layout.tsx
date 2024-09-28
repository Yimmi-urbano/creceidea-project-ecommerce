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
    <div className="flex">
     <div className="md:flex hidden h-screen"><Sidebar /></div>
     <div className="md:hidden visible "> <OptionsToolbar /></div>
      <div className="flex-1 p-4 gap-4 flex flex-wrap w-full">
        <div className="w-full h-[3rem] relative"><HeadToolbar /></div>
        <div className="w-full h-[74vh] lg:h-[85vh]"> {children}</div>
      </div>
    </div>
  );
}
