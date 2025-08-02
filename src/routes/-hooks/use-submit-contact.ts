import { useMutation } from "@tanstack/react-query";
import { submitContact } from "../-fn/submit-contact";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitContact({ data }),
  });
}
