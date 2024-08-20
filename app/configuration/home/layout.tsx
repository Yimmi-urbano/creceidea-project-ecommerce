"use client"
import { HeadToolbar } from "@/components/headToolbar";
import Sidebar from "@/components/sidebar";
import OptionsToolbar from "@/components/toolbar";

export default function HomeConfig({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="flex md:h-screen mb-16 md:mb-0">
        <div className="md:flex hidden"><Sidebar /></div>
        <div className="md:hidden visible "> <OptionsToolbar /></div>
         <div className="flex-1 p-4 gap-4 flex flex-wrap w-full">
           <div className="w-full h-[3rem]"><HeadToolbar /></div>
           <div className="w-full"> {children}</div>
         </div>
       </div>
    );
  }