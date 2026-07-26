import { FOOTER } from "@/data/content";

/** Minimal footer with an oversized wordmark that anchors the archive. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__meta">
          <span className="site-footer__tag">{FOOTER.tagline}</span>
          <span className="site-footer__legal">{FOOTER.legal}</span>
        </div>
        <nav className="site-footer__links" aria-label="Social">
          {FOOTER.links.map((link) => (
            <a key={link.label} href={link.href} className="site-footer__link">
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <div className="site-footer__wordmark" aria-hidden="true">
        {FOOTER.wordmark}
      </div>

      <div className="site-footer__base">
        <span>© {year}</span>
        <span>Designed in motion</span>
      </div>
    </footer>
  );
}
