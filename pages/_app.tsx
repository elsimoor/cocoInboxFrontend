import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const PRO_ONLY_PATHS = new Set(["/emails", "/sms", "/notes", "/files", "/esim", "/domains", "/users"]);
const ADMIN_PATH_PREFIX = "/admin";

function Guard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (loading) return;
    const path = router.pathname;
    if (path.startsWith(ADMIN_PATH_PREFIX)) {
      return;
    }
    const isAuthPage = path === "/login" || path === "/register" || path === "/signup" || path === "/";
    // Public share/download routes (allow unauthenticated access)
    const isPublicShareRoute = path === "/f/[id]" || path.startsWith("/f/");
    if (!user && !isAuthPage && !isPublicShareRoute) {
      router.replace(`/login?next=${encodeURIComponent(path)}`);
      return;
    }
    if (!user) return;

    const isAdminRoute = path.startsWith(ADMIN_PATH_PREFIX);
    if (isAdminRoute && !user.roles?.includes("admin")) {
      router.replace("/dashboard");
      return;
    }

    const isPro = !!(user.roles?.includes("pro") || (user as any).is_pro);
    if (PRO_ONLY_PATHS.has(path) && !isPro) {
      router.replace("/upgrade");
    }
  }, [user, loading, router]);
  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Guard>
        <Component {...pageProps} />
      </Guard>
    </AuthProvider>
  );
}