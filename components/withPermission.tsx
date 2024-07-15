import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withPermission = (WrappedComponent: React.ComponentType, componentName: string) => {
  const ComponentWithPermission: React.FC = (props) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
      const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
      const componentPermission = permissions.find((comp: any) => comp.name_component === componentName);

      if (componentPermission?.status) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false); // Establecer isAllowed como false si no tiene permisos
      }
    }, [componentName]);

    if (!isAllowed) {
      return null; // No renderizar el componente si no tiene permisos
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPermission;
};

export default withPermission;
