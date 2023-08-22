import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function useAuth() {

  const [loginUser, setLoginUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/user/login");
    }

    try {
      fetch("/api/user/auth", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setLoginUser(data.result);
        })

    } catch (error) {
      router.push("/user/login");
    }
  }, [router]);

  return loginUser;
};
