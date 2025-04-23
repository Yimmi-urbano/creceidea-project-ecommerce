import { fetchModules } from "@/infrastructure/installed_modules/moduleRepository";
import { Module } from "@/domain/installed_modules/Module";

export const getModules = async (domain: string): Promise<Module[]> => {
  return await fetchModules(domain);
};
