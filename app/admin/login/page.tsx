"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Wrong email or password. Try again.");
      setIsSubmitting(false);
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/admin");
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-brand">
        <span className="status-dot" aria-hidden="true" />
        <span className="login-logo">
          3<span>ple</span> Star
        </span>
      </div>
      <p className="login-subtitle">Sign in to manage your site</p>

      {error && (
        <p role="alert" className="error-text">
          {error}
        </p>
      )}

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-page-pattern" aria-hidden="true" />
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}