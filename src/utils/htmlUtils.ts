/** Remove HTML tags and collapse whitespace */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')    // strip tags
    .replace(/&[^;\s]+;/g, ' ')  // strip entities
    .replace(/\s+/g, ' ')        // collapse spaces
    .trim();
}
