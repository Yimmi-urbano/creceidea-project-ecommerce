import { getDomainFromLocalStorage } from "@/src/infrastructure/storage/localStorage";
import { Module } from "@/src/domain/modules/Module";
import { fetchModules } from "@/src/infrastructure/repositories/moduleRepository";

export const getModules = async (domain: string): Promise<Module[]> => {
  return await fetchModules(domain);
};
