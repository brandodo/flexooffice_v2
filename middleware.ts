export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/settings",
    "/discussions",
    "/discussions/(.*)",
    "/schedule",
  ],
};
