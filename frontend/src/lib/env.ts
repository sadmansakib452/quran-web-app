export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Set it in frontend/.env (see .env.example)."
    );
  }
  try {
    // Validate URL format early; keep original string for fetch.
    // eslint-disable-next-line no-new
    new URL(raw);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_API_BASE_URL: ${raw}`);
  }
  return raw.replace(/\/+$/, "");
}

