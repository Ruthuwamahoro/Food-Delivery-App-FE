export default function isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth-token");
  }