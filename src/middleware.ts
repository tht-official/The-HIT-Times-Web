import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // no additional logic needed - authorization is handled in the callback
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        // Admin portal: only admins
        if (pathname.startsWith("/admin-portal")) {
          return token?.role === "admin";
        }
        // Recruitment: any logged-in user
        if (pathname.startsWith("/recruitment")) {
          return !!token;
        }
        return false;
      },
    },
  },
);

// matches admin-portal and recruitment routes
export const config = { matcher: ["/admin-portal/:path*", "/recruitment", "/recruitment/:path*"] };
