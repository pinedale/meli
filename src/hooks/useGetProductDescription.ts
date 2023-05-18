import axios from "axios";
import {  UseQueryResult, useQuery } from "react-query";


export const useGetProductDescription = (productId?: string):UseQueryResult<string> => useQuery({
  queryKey: ['product', productId, 'description'],
  queryFn: async () => {
    const response = await axios.get(`https://api.mercadolibre.com/items/${productId}/description`);
    return response.data.plain_text;
  },
  enabled: !!productId,
});
