"use client"
import OptionsToolbar from "@/components/toolbar";
import Sidebar from "@/components/sidebar";
import useIsMobile from "@/hooks/useIsMobile";
import { HeadToolbar } from "@/components/headToolbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  return (

    <div className="flex h-screen">
     <div className="md:flex hidden"><Sidebar /></div>
     <div className="md:hidden visible"> <OptionsToolbar /></div>
      <div className="flex-1 p-4 gap-2 flex flex-wrap">
        <div className="w-full"><HeadToolbar /></div>
        <div className="w-full"> {children}</div>
      </div>
    </div>
  );
}
