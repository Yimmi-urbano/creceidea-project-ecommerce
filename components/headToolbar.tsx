import React from "react";
import UserButtonEvent from "@/components/user/userButton"
import { Logo } from "./icons";
import { ConfigProvider } from "@/hooks/ConfigContext";
import {Divider} from "@nextui-org/react";

export const HeadToolbar = () => {
  return (
<>
    <div className="flex justify-betwen gap-4 h-[3rem] w-full">
      <Logo className='logo-sidebar flex md:hidden' />
      <ConfigProvider>
        <UserButtonEvent />
      </ConfigProvider>
      
    </div>
   
   <Divider className="my-2" />
   </>
  );
}
