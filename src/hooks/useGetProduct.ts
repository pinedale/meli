

import axios from "axios";
import {  UseQueryResult, useQuery } from "react-query";

type Pictures = {
  id: string;
  secure_url: string;
}


type Product = {
  id: string;
  condition: string;
  sold_quantity: number;
  price: number;
  thumbnail: string;
  title: string;
  permalink: string;
  pictures: Array<Pictures>
}

export const useGetProduct = (productId?: string):UseQueryResult<Product> => useQuery({
  queryKey: ['product', productId],
  queryFn: async () => {
    const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`);
    return response.data;
  },
  enabled: !!productId,
});
