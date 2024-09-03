import { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, User, DropdownSection, Image } from "@nextui-org/react";
import { useConfig, ConfigProvider } from '@/hooks/ConfigContext';
import { MenuMobile } from "@/components/icons";

export default function UserButtonEvent() {

  const { config } = useConfig();
  const logoToDisplay = config?.logo || '';
  const titleToDisplay = config?.title || 'Crece Idea';
  const [domainSelected, setDomainSelected] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let domain = localStorage.getItem("domainSelect");
      domain = 'https://' + domain;
      setDomainSelected(domain);
    }
  }, []);

  return (
    <div className="flex  gap-4 flex justify-end w-full">


      <Dropdown className="light text-black">
        <DropdownTrigger>



          <div className="flex gap-4 cursor-pointer">
       
            <img
              className="rounded-full w-[40px] h-[40px] object-contain bg-slate-50 outline outline-offset-2 outline-2"
              src={logoToDisplay}
            />
            <div className="lg:block hidden">
              <p className="p-0">{titleToDisplay}</p>
              <Link
                isExternal
                showAnchorIcon
                href={`${domainSelected}`}
                size="sm"
              >{domainSelected}
              </Link>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="light">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold ">Empresa</p>
            <p className="font-normal">{titleToDisplay}</p>
          </DropdownItem>
          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem key="site" variant="flat" className="text-black" href="/configuration/site" as={Link}>Sitio</DropdownItem>
            <DropdownItem key="home" variant="flat" className="text-black" href="/configuration/home" as={Link}>Banner</DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="Help & Feedback">
            <DropdownItem key="logout" color="danger" className="text-rose-600" variant="flat" href="/login" as={Link}>
              Salir
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
