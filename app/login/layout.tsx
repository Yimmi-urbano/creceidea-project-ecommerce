import { Logo } from "@/components/icons";

export default function CardLogin({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="flex flex-col lg:items-end justify-center  h-full"> 
       <div className="logo-crece-style"><Logo /></div> 
        <div className="inline-block max-w-lg text-center justify-center">
          {children}
        </div>
      </section>
    );
  }
  