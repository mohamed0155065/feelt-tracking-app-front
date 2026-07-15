import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/login";

export default function useLoginMutation() {
  return useMutation({
    mutationFn: loginApi,
  });
}
