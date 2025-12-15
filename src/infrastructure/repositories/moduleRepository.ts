/**
 * @fileoverview Module Repository
 * 
 * Repository responsible for fetching and managing modules from the API.
 * Handles data transformation from API response to domain entities.
 * 
 * @module infrastructure/repositories/moduleRepository
 */

import { Module } from "@/src/domain/modules/Module";
import { API_ENDPOINTS } from "@/src/infrastructure/http/apiConfig";

/**
 * Fetches all modules for a specific domain from the API.
 * 
 * This function retrieves the list of installed modules for a given domain,
 * transforms the API response into domain entities, and handles errors gracefully.
 * 
 * @async
 * @function fetchModules
 * @param {string} domain - The domain identifier to fetch modules for
 * @returns {Promise<Module[]>} Array of Module entities. Returns empty array on error.
 * 
 * @throws {Error} Throws error if the HTTP request fails (caught internally)
 * 
 * @example
 * ```typescript
 * const modules = await fetchModules('mystore.com');
 * console.log(modules); // [{ id: '123', title: 'Payment Module', ... }]
 * ```
 * 
 * @example
 * // Error handling - returns empty array on failure
 * const modules = await fetchModules('invalid-domain');
 * console.log(modules); // []
 */
export const fetchModules = async (domain: string): Promise<Module[]> => {
  try {
    // Prepare headers with domain information
    const myHeaders = new Headers();
    myHeaders.append("domain", domain);

    // Fetch modules from API
    const response = await fetch(API_ENDPOINTS.INSTALLED_MODULES, {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    });

    // Validate response status
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Parse and transform response data
    const data = await response.json();

    // Map API response to domain entities
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
    // Log error for debugging purposes
    console.error("Error al obtener módulos:", error);

    // Return empty array to prevent breaking the application
    return [];
  }
};
