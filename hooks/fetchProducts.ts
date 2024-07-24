// fetchProducts.ts
import axios from "axios";

const API_URL_PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS;

export const getProducts = async (page: number) => {
  const domain = localStorage.getItem("domainSelect");

  if (!domain) {
    throw new Error("Domain not selected");
  }

  const domainPrimary = domain.split('.')[0];

  const response = await axios.get(`${API_URL_PRODUCTS}`, {
    params: { page }, // Incluye el parámetro de página
    headers: {
      Domain: domainPrimary,
    },
  });

  return response.data;
};
