/**
 * Normalizes DATABASE_URL for the `pg` driver (Prisma 7 adapter).
 * Explicit sslmode avoids the pg v8→v9 deprecation warning for prefer/require/verify-ca.
 */
export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  const parsed = new URL(url);
  const sslmode = parsed.searchParams.get("sslmode");
  const legacySslModes = new Set(["prefer", "require", "verify-ca"]);

  if (!sslmode) {
    parsed.searchParams.set("sslmode", "verify-full");
  } else if (legacySslModes.has(sslmode) && !parsed.searchParams.has("uselibpqcompat")) {
    parsed.searchParams.set("sslmode", "verify-full");
  }

  return parsed.toString();
}
