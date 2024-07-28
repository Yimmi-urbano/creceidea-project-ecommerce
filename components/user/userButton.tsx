import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Link} from "@nextui-org/react";
import { MenuMobile } from "@/components/icons"

export default function UserButtonEvent() {
  return (
    <div className="flex  gap-4 flex justify-end w-full">
    
      <Dropdown placement="bottom-start">
     
        <DropdownTrigger>
     
          <Button isIconOnly variant="light">
          <MenuMobile/>
          </Button>
          

        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="light">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Empresa</p>
            <p className="font-bold">Don Guston</p>
          </DropdownItem>
          <DropdownItem key="settings">
            Configurar
          </DropdownItem>
          <DropdownItem key="team_settings">Tienda</DropdownItem>
          <DropdownItem key="analytics">
            Reportes
          </DropdownItem>
          <DropdownItem key="system">Ventas</DropdownItem>
          <DropdownItem key="configurations">Facturaciones</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Colores
          </DropdownItem>
          <DropdownItem key="logout" color="danger" href='/login' as={Link}>
            Salir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
