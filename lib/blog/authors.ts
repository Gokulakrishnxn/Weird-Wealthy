/** Stable portrait per author (Dicebear notionists, dark-friendly) */
export function getAuthorAvatar(authorName: string): string {
  const seed = encodeURIComponent(authorName.trim());
  return `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&size=128&backgroundColor=1c1c1e`;
}

export function getAuthorInitials(authorName: string): string {
  return authorName
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function resolveAuthorAvatar(
  author: string,
  authorAvatar?: string
): string {
  return authorAvatar ?? getAuthorAvatar(author);
}
