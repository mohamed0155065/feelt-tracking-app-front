import {
  updateDriverSchema,
  updateDriverSchemaType,
} from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { updateDriverApi } from "../api/driverApi";
import toast from "react-hot-toast";
import { DriverType } from "../types";

interface UseUpdateDriverOptions {
  onSuccessCallback?: () => void;
  // إمكانية تمرير البيانات القديمة لتعبئة الحقول تلقائياً
  initialValues?: DriverType | null;
}

export const useUpdateDriver = (
  id: string,
  options?: UseUpdateDriverOptions,
) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<updateDriverSchemaType>({
    resolver: zodResolver(updateDriverSchema),
    // تحديث قيم الـ Form تلقائياً إذا كانت خيارات البيانات البدائية ممررة
    values: options?.initialValues as updateDriverSchemaType,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data: updateDriverSchemaType) => updateDriverApi(id, data),

    onSuccess: () => {
      // إبطال كاش القائمة العامة + كاش السائق المحدد
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      queryClient.invalidateQueries({ queryKey: ["driver", id] });

      toast.success("تم تعديل السائق بنجاح!");
      reset();

      options?.onSuccessCallback?.();
    },

    onError: (err: any) => {
      toast.error(err?.message || "حدث خطأ، لم يتم تعديل السائق!");
      if (err?.errors && typeof err.errors === "object") {
        Object.entries(err.errors).forEach(([field, messages]) => {
          const messageArray = messages as string[];
          if (messageArray && messageArray.length > 0) {
            setError(field as keyof updateDriverSchemaType, {
              message: messageArray[0],
            });
          }
        });
      }
    },
  });

  const onSubmit = (data: updateDriverSchemaType) => mutate(data);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isError,
    error,
    isPending,
    reset,
  };
};
