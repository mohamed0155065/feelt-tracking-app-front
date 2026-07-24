import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { driverSchema, driverSchemaType } from "@/features/auth/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDriverApi } from "../api/driverApi";
import toast from "react-hot-toast";

// Callback لإغلاق المودال عند النجاح
interface UseAddDriverOptions {
  onSuccessCallback?: () => void;
}

export const useAddDriver = (options?: UseAddDriverOptions) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<driverSchemaType>({
    resolver: zodResolver(driverSchema),
  });

  const {
    mutate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: addDriverApi,
    onSuccess: () => {
      // إعادة جلب قائمة السائقين لكي يظهر السائق الجديد في الجدول فوراً
      queryClient.invalidateQueries({ queryKey: ["drivers"] });

      toast.success("تمت إضافة السائق بنجاح!");
      reset();

      options?.onSuccessCallback?.();
    },
    onError: (err: any) => {
 toast.error("لم يتم إضافة السائق !");
 console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      if (err?.errors && typeof err.errors === "object") {
        Object.entries(err.errors).forEach(([field, messages]) => {
          const messageArray = messages as string[];
          if (messageArray && messageArray.length > 0) {
            setError(field as keyof driverSchemaType, {
              message: messageArray[0],
            });
          }
        });
      }
    },
  });


  const onSubmit = (data: driverSchemaType) => mutate(data);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isError,
    error,
    isPending,
    reset
  };
};