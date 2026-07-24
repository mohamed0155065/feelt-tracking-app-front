import { useQuery } from "@tanstack/react-query";
import { getAllDriversApi } from "../api/driverApi";
import { drivers } from "../const";

export const useGetAllDrivers = () => {
  const { data = drivers, ...rest } = useQuery({
    queryKey: ["drivers"], 
    queryFn: getAllDriversApi,
  });

  return {
    data,
    ...rest,
  };
};