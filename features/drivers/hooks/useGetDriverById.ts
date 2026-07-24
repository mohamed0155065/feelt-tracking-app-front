import { useQuery } from "@tanstack/react-query";
import { getDriverByIdApi } from "../api/driverApi";

export const useGetDriverById = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["driver", id],
    queryFn: () => getDriverByIdApi(id),
    enabled: Boolean(id), 
  });

  return {
    driver: data,
    ...rest,
  };
};