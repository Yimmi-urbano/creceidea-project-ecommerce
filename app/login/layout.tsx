import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export default function CardLogin({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col lg:items-end justify-center  h-full">
      <div className="logo-crece-style"><Logo /><ThemeSwitch /></div>  
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  