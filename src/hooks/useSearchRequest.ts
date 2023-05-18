import axios from "axios";
import {  UseQueryResult, useQuery } from "react-query";

type Address = {
  state_name: string;
}

export type SearchResult = {
  id: string;
  price: number;
  title: string;
  thumbnail: string;
  address: Address;
}

export const useSearchRequest = (query?: string):UseQueryResult<SearchResult[]> => useQuery({
  queryKey: ['searchResults', query],
  queryFn: async () => {
    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search`, {
      params: {
        q: query,
        limit: 4,
      }
    });
    
    return response.data.results;
  },
  enabled: !!query,
});
