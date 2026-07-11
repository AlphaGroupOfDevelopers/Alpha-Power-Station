interface SiteContentItem {
  key: string;
  value: string;
  type: string;
  section: string;
}

export async function getSiteContent(section: string): Promise<Record<string, string>> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/site-content?section=${encodeURIComponent(section)}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return {};
    const items: SiteContentItem[] = await response.json();
    return Object.fromEntries(items.map((item) => [item.key, item.value]));
  } catch {
    return {};
  }
}

export function pick(content: Record<string, string>, key: string, fallback: string): string {
  return content[key] ?? fallback;
}

export function pickJSON<T>(content: Record<string, string>, key: string, fallback: T): T {
  const raw = content[key];
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
