"use client"
import OptionsToolbar from "@/src/presentation/components/shared/toolbar";
import Sidebar from "@/src/presentation/components/shared/sidebar";
import { HeadToolbar } from "@/src/presentation/components/shared/headToolbar";

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
