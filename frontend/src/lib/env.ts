export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  const isProd = process.env.NODE_ENV === "production";

  // Dev convenience: allow running the whole monorepo locally without setting env.
  // In production deployments (e.g. Vercel), we must not fall back to localhost.
  if (!raw) {
    if (!isProd) return "http://localhost:8787";
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Set it in the deployment environment."
    );
  }
  try {
    // Validate URL format early; keep original string for fetch.
    new URL(raw);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_API_BASE_URL: ${raw}`);
  }
  return raw.replace(/\/+$/, "");
}

