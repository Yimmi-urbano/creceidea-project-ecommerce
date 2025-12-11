import { fetchModules } from "@/src/infrastructure/repositories/installed_modules/moduleRepository";
import { Module } from "@/src/domain/installed_modules/Module";

export const getModules = async (domain: string): Promise<Module[]> => {
  return await fetchModules(domain);
};
