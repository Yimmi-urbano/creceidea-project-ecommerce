import { getDomainFromLocalStorage } from "@/src/infrastructure/storage/localStorage";
import { Module } from "@/src/domain/installed_modules/Module";
import { API_ENDPOINTS } from "@/src/infrastructure/http/apiConfig";

export const fetchModules = async (domain: string): Promise<Module[]> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("domain", domain);

    const response = await fetch(API_ENDPOINTS.INSTALLED_MODULES, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((item: any) => ({
      id: item._id,
      domain: item.domain,
      title: item.title_module,
      nameId: item.nameId,
      type: item.type_module,
      activeType: item.type_active,
      logo: item.logo,
      description: item.description,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
  } catch (error) {
    console.error("Error al obtener módulos:", error);
    return [];
  }
};
