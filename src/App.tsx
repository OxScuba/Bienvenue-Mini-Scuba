"use client";

import { useEffect, useState } from "react";
import { donationConfig } from "./donation-config";
import { translations, type Language } from "./translations";

const LANGUAGE_KEY = "mini-scuba-language";

function CopyButton({ value, label, copy, copied, soon }: {
  value: string; label: string; copy: string; copied: string; soon: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <button className="copy-button" type="button" onClick={handleCopy} disabled={!value}
      aria-label={value ? `${copy} ${label}` : `${label}: ${soon}`}>
      {value ? (isCopied ? copied : copy) : soon}
    </button>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    return saved === "en" ? "en" : "fr";
  });
  const t = translations[language];

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language);
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.metaDescription);
  }, [language, t.metaDescription, t.metaTitle]);

  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [language]);

  const setLang = (next: Language) => setLanguage(next);
  const btc = donationConfig.bitcoinAddress;
  const lightning = donationConfig.lightningAddress;
  const birth = donationConfig;
  const birthTxLabel = birth.birthTransactionId || t.birth.pending;

  return (
    <>
      <a className="skip-link" href="#contenu">{t.skip}</a>
      <header className="site-header" data-header>
        <a className="wordmark" href="#accueil" aria-label={t.top}>
          <span className="wordmark-mark" aria-hidden="true">₿</span>
          <span>{t.metaTitle.replace(" ⚡️", "")}</span>
        </a>
        <div className="header-actions">
          <nav aria-label={t.navLabel}>
            <a href="#histoire">{t.nav[0]}</a>
            <a href="#transmission">{t.nav[1]}</a>
            <a className="nav-cta" href="#contribuer">{t.nav[2]}</a>
          </nav>
          <div className="language-switch" role="group" aria-label="FR / EN">
            {(["fr", "en"] as const).map((code) => (
              <button key={code} type="button" className={language === code ? "is-active" : ""}
                aria-pressed={language === code} onClick={() => setLang(code)}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="titre-principal">
          <img className="hero-background" src="./assets/images/hero.webp" alt=""
            width="1920" height="1072" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-content reveal">
            <p className="eyebrow eyebrow-light">{t.heroEyebrow}</p>
            <h1 id="titre-principal">{t.welcome}<strong>Mini Scuba</strong></h1>
            <p className="hero-tagline">{t.heroTagline}</p>
            <a className="button button-primary" href="#histoire">{t.discover}<span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note" aria-hidden="true">{t.heroNote}</div>
        </section>

        <section className="intro section" id="histoire">
          <div className="intro-portrait reveal">
            <img src="./assets/images/profil.webp" alt={t.intro.alt} width="720" height="720" loading="lazy" />
          </div>
          <div className="intro-copy reveal">
            <p className="eyebrow">{t.intro.eyebrow}</p>
            <h2>{t.intro.title}</h2>
            <p className="display-line">{t.intro.display}</p>
            {t.intro.paragraphs.map((text) => <p key={text}>{text}</p>)}
            <p className="closing-line">{t.intro.closing}</p>
          </div>
        </section>

        <section className="story section section-blue" aria-labelledby="aventure-title">
          <figure className="story-image reveal">
            <img src="./assets/images/aventure.webp" alt={t.story.alt} width="1600" height="995" loading="lazy" />
            <figcaption>{t.story.caption}</figcaption>
          </figure>
          <div className="story-copy reveal">
            <p className="eyebrow eyebrow-orange">{t.story.eyebrow}</p>
            <h2 id="aventure-title">{t.story.title}</h2>
            {t.story.paragraphs.map((text) => <p key={text}>{text}</p>)}
            <blockquote>{t.story.quote}</blockquote>
          </div>
        </section>

        <section className="why section" id="transmission" aria-labelledby="why-title">
          <div className="why-copy reveal">
            <p className="eyebrow">{t.why.eyebrow}</p>
            <h2 id="why-title">{t.why.title}</h2>
            {t.why.paragraphs.map((text) => <p key={text}>{text}</p>)}
            <p className="display-line">{t.why.display}</p>
            <p>{t.why.last}</p>
          </div>
          <figure className="why-image reveal">
            <img src="./assets/images/premiers-sats.webp" alt={t.why.alt} width="1600" height="995" loading="lazy" />
            <figcaption>{t.why.caption}</figcaption>
          </figure>
        </section>

        <section className="possibilities section" aria-labelledby="possibilities-title">
          <header className="section-heading reveal">
            <p className="eyebrow eyebrow-light">{t.possibilities.eyebrow}</p>
            <h2 id="possibilities-title">{t.possibilities.title}</h2>
          </header>
          <div className="possibility-grid">
            {t.possibilities.cards.map(([number, title, text]) => (
              <article className="possibility-card reveal" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{text}</p>
              </article>
            ))}
          </div>
          <p className="possibility-ending reveal">{t.possibilities.ending}<strong>{t.possibilities.endingStrong}</strong></p>
        </section>

        <section className="transmission section" aria-labelledby="transmission-title">
          <div className="transmission-copy reveal">
            <p className="eyebrow">{t.values.eyebrow}</p>
            <h2 id="transmission-title">{t.values.title}</h2>
            <p>{t.values.text}</p>
          </div>
          <ul className="values-list reveal">
            {t.values.items.map(([title, text]) => <li key={title}><span>{title}</span>{text}</li>)}
          </ul>
        </section>

        <section className="donate section" id="contribuer" aria-labelledby="donate-title">
          <header className="donate-heading reveal">
            <span className="bitcoin-orbit" aria-hidden="true">₿</span>
            <p className="eyebrow eyebrow-orange">{t.donate.eyebrow}</p>
            <h2 id="donate-title">{t.donate.title}</h2>
            <p>{t.donate.text}</p>
          </header>
          <div className="donation-grid">
            <article className="donation-card reveal">
              <div className="donation-icon" aria-hidden="true">₿</div>
              <p className="eyebrow">Bitcoin · On-chain</p><h3>{t.donate.bitcoin}</h3>
              {donationConfig.bitcoinQr
                ? <img className="qr-image" src={donationConfig.bitcoinQr} alt={t.donate.qrBitcoin} width="640" height="640" loading="lazy" />
                : <div className="qr-placeholder"><span>QR</span><small>{t.donate.soon}</small></div>}
              <div className="address-row">
                <code>{btc || t.donate.bitcoinFallback}</code>
                <CopyButton value={btc} label={t.donate.copyBitcoin} copy={t.donate.copy} copied={t.donate.copied} soon={t.donate.soon} />
              </div>
            </article>
            <article className="donation-card donation-card-lightning reveal">
              <div className="donation-icon" aria-hidden="true">⚡</div>
              <p className="eyebrow">{t.donate.instant}</p><h3>{t.donate.lightning}</h3>
              {donationConfig.lightningQr
                ? <img className="qr-image" src={donationConfig.lightningQr} alt={t.donate.qrLightning} width="640" height="640" loading="lazy" />
                : <div className="qr-placeholder"><span>QR</span><small>{t.donate.soon}</small></div>}
              <div className="address-row">
                <code>{lightning || t.donate.lightningFallback}</code>
                <CopyButton value={lightning} label={t.donate.copyLightning} copy={t.donate.copy} copied={t.donate.copied} soon={t.donate.soon} />
              </div>
            </article>
          </div>
          <p className="donation-note reveal">{t.donate.note}</p>
        </section>

        <section className="birth-proof section" id="naissance" aria-labelledby="birth-title">
          <header className="birth-heading reveal">
            <p className="eyebrow eyebrow-orange">{t.birth.eyebrow}</p>
            <h2 id="birth-title">{t.birth.title}</h2>
            <p>{t.birth.text}</p>
          </header>
          <div className="birth-grid reveal">
            <article><span>{t.birth.block}</span><strong>{birth.birthBlockHeight || "—"}</strong><small>{birth.birthBlockHeight ? "" : t.birth.pending}</small></article>
            <article><span>{t.birth.transaction}</span><code>{birthTxLabel}</code>
              {birth.birthTransactionUrl
                ? <a href={birth.birthTransactionUrl} target="_blank" rel="noreferrer">{t.birth.view} ↗</a>
                : <span className="birth-link-disabled">{t.birth.view} ↗</span>}
            </article>
            <article><span>{t.birth.message}</span><code>{birth.birthOpReturnMessage || t.birth.pending}</code></article>
          </div>
        </section>

        <section className="horizon section" aria-labelledby="horizon-title">
          <img className="horizon-background" src="./assets/images/horizon.webp" alt="" width="1600" height="893" loading="lazy" />
          <div className="horizon-shade" />
          <div className="horizon-copy reveal">
            <p className="eyebrow eyebrow-light">{t.horizon.eyebrow}</p>
            <h2 id="horizon-title">{t.horizon.title}</h2><p>{t.horizon.text}</p>
          </div>
        </section>

        <section className="thanks section">
          <div className="thanks-copy reveal">
            <p className="eyebrow">{t.thanks.eyebrow}</p><h2>{t.thanks.title}</h2>
            {t.thanks.paragraphs.map((text) => <p key={text}>{text}</p>)}
            <strong>{t.thanks.strong}</strong><span>Scuba &amp; Miss Scuba</span>
          </div>
          <a className="button button-dark reveal" href="#accueil">{t.thanks.back}<span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <footer>
        <div><strong>{t.metaTitle}</strong><span>{t.footerTagline}</span></div>
        <p>{t.privacy}</p>
        <a href="https://x.com/Scuba_Wizard" target="_blank" rel="noreferrer">@Scuba_Wizard</a>
      </footer>
    </>
  );
}
