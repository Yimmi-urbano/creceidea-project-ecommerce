// fetchProducts.ts
import axios from "axios";

const API_URL_PRODUCTS = process.env.NEXT_PUBLIC_PRODUCTS;

export const getProducts = async (page: number, title: string = "", category: string = "") => {
  const domain = localStorage.getItem("domainSelect");

  if (!domain) {
    throw new Error("Domain not selected");
  }

  const domainPrimary = domain.split('.')[0];

  let url = `${API_URL_PRODUCTS}`;
  if (title) {
    url += `/title/${title}`;
  } else if (category) {
    url += `/category/${category}`;
  }

  const response = await axios.get(url, {
    headers: {
      Domain: domainPrimary,
    },
    params: { page },
  });

  return response.data;
};
