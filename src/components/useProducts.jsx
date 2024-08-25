import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useProducts() {
    function getRecentProducts() {
        return axios("https://ecommerce.routemisr.com/api/v1/products");
      }
    
      let response = useQuery({
        queryKey: ["recentProducts"],
        queryFn: getRecentProducts,
        staleTime:10000,
      });
    
    return response;
    
}

export default useProducts
