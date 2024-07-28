"use client"
import UserButtonEvent from "@/components/user/userButton"
import { Logo } from "./icons";

export const HeadToolbar = () => {
  return (

    <div className="flex justify-betwen gap-4 h-[3rem] w-full">
<Logo className='logo-sidebar flex md:hidden' />
          <UserButtonEvent />
    
    </div>
  );
}
