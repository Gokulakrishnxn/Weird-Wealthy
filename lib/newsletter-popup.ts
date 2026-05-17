export const NEWSLETTER_POPUP_STORAGE_KEY = "ww-newsletter-popup-seen";

export function hasSeenNewsletterPopup(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return localStorage.getItem(NEWSLETTER_POPUP_STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function markNewsletterPopupSeen() {
  try {
    localStorage.setItem(NEWSLETTER_POPUP_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}
