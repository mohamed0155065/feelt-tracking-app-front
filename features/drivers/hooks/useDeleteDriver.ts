import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDriverApi } from "../api/driverApi";
import toast from "react-hot-toast";

interface UseDeleteDriverOptions {
  onSuccessCallback?: () => void;
}

export const useDeleteDriver = (options?: UseDeleteDriverOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({
    // 👈 استقبال id مباشرة من mutate(id)
    mutationFn: (id: string) => deleteDriverApi(id),

    onSuccess: (_, id) => {
      // إبطال كاش القائمة العامة + كاش السائق المحذوف
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      queryClient.invalidateQueries({ queryKey: ["driver", id] });

      toast.success("تم حذف السائق بنجاح!");

      options?.onSuccessCallback?.();
    },

    onError: (err: any) => {
      toast.error(err?.message || "حدث خطأ، لم يتم حذف السائق!");
    },
  });

  return {
    deleteDriver: mutate, // 👈 تصبح دالة تستقبل الـ id مباشرة: deleteDriver(driverId)
    isError,
    error,
    isPending,
  };
};