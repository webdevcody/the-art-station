import { getWebRequest } from "@tanstack/react-start/server";
import { auth } from "~/utils/auth";
import { createServerFn } from "@tanstack/react-start";

export const isAdminFn = createServerFn().handler(async () => {
  const request = getWebRequest();
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  return session?.user?.isAdmin;
});
