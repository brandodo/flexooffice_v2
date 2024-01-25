export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/settings",
    "/dashboard/discussions",
    "/dashboard/discussions/(.*)",
  ],
};
