"use client";
import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OAuthCapture() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const captured = useRef(false); 

  useEffect(() => {

    const isOAuth = searchParams.get("oauth") === "success";
    if (!isOAuth) {
      return;
    }

    const captureToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/token`,
          { credentials: "include" }
        );


        if (!res.ok) {
          return;
        }

        const data = await res.json();

        if (!data.token) {
          return;
        }
        captured.current = true;

        document.cookie = `auth-token=${data.token}; path=/; max-age=${
          60 * 60 * 24 * 7
        }; SameSite=Lax`;


        router.replace("/");
      } catch (err) {
        console.error("💥 Error capturing token:", err);
      }
    };

    captureToken();
  }, [searchParams]);

  return null;
}