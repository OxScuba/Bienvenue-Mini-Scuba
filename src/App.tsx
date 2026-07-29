"use client";

import { useEffect, useState } from "react";
import { donationConfig } from "./donation-config";

function CopyButton({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      className="copy-button"
      type="button"
      onClick={copy}
      disabled={!value}
      aria-label={value ? `Copier ${label}` : `${label} bientôt disponible`}
    >
      {value ? (copied ? "Copié ✓" : "Copier") : "Bientôt"}
    </button>
  );
}

export default function Home() {
  useEffect(() => {
    const header = document.querySelector("[data-header]");
    const revealItems = document.querySelectorAll(".reveal");

    const updateHeader = () =>
      header?.classList.toggle("is-scrolled", window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return () => window.removeEventListener("scroll", updateHeader);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateHeader);
    };
  }, []);

  const btc = donationConfig.bitcoinAddress;
  const lightning = donationConfig.lightningAddress;

  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <header className="site-header" data-header>
        <a className="wordmark" href="#accueil" aria-label="Retour en haut">
          <span className="wordmark-mark" aria-hidden="true">
            ₿
          </span>
          <span>Bienvenue, Mini Scuba</span>
        </a>
        <nav aria-label="Navigation principale">
          <a href="#histoire">Notre histoire</a>
          <a href="#transmission">Pourquoi des sats ?</a>
          <a className="nav-cta" href="#contribuer">
            Contribuer
          </a>
        </nav>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="titre-principal">
          <img
            className="hero-background"
            src="./assets/images/hero.webp"
            alt=""
            width="1920"
            height="1072"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="hero-content reveal">
            <p className="eyebrow eyebrow-light">Une nouvelle aventure commence</p>
            <h1 id="titre-principal">
              Bienvenue,
              <strong>Mini Scuba</strong>
            </h1>
            <p className="hero-tagline">
              Quelques sats aujourd’hui,
              <br />
              un petit morceau de liberté pour demain.
            </p>
            <a className="button button-primary" href="#histoire">
              Découvrir son histoire <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note" aria-hidden="true">
            Premier bloc d’une vie entière
          </div>
        </section>

        <section className="intro section" id="histoire">
          <div className="intro-portrait reveal">
            <img
              src="./assets/images/profil.webp"
              alt="Scuba et Miss Scuba entourent tendrement leur futur enfant"
              width="720"
              height="720"
              loading="lazy"
            />
          </div>
          <div className="intro-copy reveal">
            <p className="eyebrow">Chapitre zéro</p>
            <h2>Nous pensions connaître l’aventure.</h2>
            <p className="display-line">Puis Mini Scuba a décidé d’arriver.</p>
            <p>
              Pendant des années, nous avons voyagé, plongé, traversé des
              frontières, découvert d’autres cultures et suivi Bitcoin un peu
              partout où il nous emmenait.
            </p>
            <p>
              Et soudain, les billets d’avion, les fonds marins et les routes
              lointaines ont trouvé un concurrent sérieux : un tout petit être
              qui ne possède encore ni passeport, ni nœud Bitcoin, ni la moindre
              idée de ce qui l’attend.
            </p>
            <p className="closing-line">Mais qui occupe déjà une place immense.</p>
          </div>
        </section>

        <section className="story section section-blue" aria-labelledby="aventure-title">
          <figure className="story-image reveal">
            <img
              src="./assets/images/aventure.webp"
              alt="Scuba tente de comprendre la notice du berceau sous le regard amusé de Miss Scuba"
              width="1600"
              height="995"
              loading="lazy"
            />
            <figcaption>Pièce n° 01 — La notice était pourtant très claire</figcaption>
          </figure>
          <div className="story-copy reveal">
            <p className="eyebrow eyebrow-orange">Préparatifs en cours</p>
            <h2 id="aventure-title">Une nouvelle aventure commence</h2>
            <p>
              Miss Scuba veille à ce que tout soit prêt. Scuba découvre que
              monter un berceau demande parfois davantage de concentration que
              configurer un portefeuille multisignature.
            </p>
            <p>
              Les vêtements sont minuscules. Les listes s’allongent. Les
              questions aussi.
            </p>
            <blockquote>
              Pour cette aventure, aucune notice ne sera vraiment suffisante.
            </blockquote>
          </div>
        </section>

        <section className="why section" id="transmission" aria-labelledby="why-title">
          <div className="why-copy reveal">
            <p className="eyebrow">Le cadeau du temps long</p>
            <h2 id="why-title">Pourquoi des sats ?</h2>
            <p>
              Les jouets seront aimés, malmenés, perdus sous un meuble et
              parfois retrouvés plusieurs années plus tard dans un état que la
              science peine encore à expliquer.
            </p>
            <p>
              Les vêtements deviendront trop petits à une vitesse probablement
              contraire aux lois de la physique.
            </p>
            <p className="display-line">Les sats, eux, pourront attendre.</p>
            <p>
              Ils pourront accompagner Mini Scuba pendant qu’il apprendra à
              marcher, à parler, à lire, à réfléchir et, un jour, à choisir son
              propre chemin.
            </p>
          </div>
          <figure className="why-image reveal">
            <img
              src="./assets/images/premiers-sats.webp"
              alt="Scuba et Miss Scuba déposent les premiers sats de leur enfant dans un petit coffre"
              width="1600"
              height="995"
              loading="lazy"
            />
            <figcaption>Pièce n° 02 — Ses premiers sats</figcaption>
          </figure>
        </section>

        <section className="possibilities section" aria-labelledby="possibilities-title">
          <header className="section-heading reveal">
            <p className="eyebrow eyebrow-light">Un choix qui lui appartiendra</p>
            <h2 id="possibilities-title">Demain, peut-être…</h2>
          </header>
          <div className="possibility-grid">
            {[
              ["01", "Un voyage", "Pour découvrir le monde à son tour."],
              ["02", "Un projet", "Pour transformer une idée en réalité."],
              ["03", "Des études", "Pour apprendre ce qu’il aura choisi."],
              ["04", "Une entreprise", "Pour construire plutôt que patienter."],
              ["05", "L’inattendu", "Une aventure impossible à prévoir aujourd’hui."],
            ].map(([number, title, text]) => (
              <article className="possibility-card reveal" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="possibility-ending reveal">
            Nous ne savons pas encore ce qu’il voudra en faire.
            <strong> Et c’est précisément ce qui nous plaît.</strong>
          </p>
        </section>

        <section className="transmission section" aria-labelledby="transmission-title">
          <div className="transmission-copy reveal">
            <p className="eyebrow">Ce que nous voulons lui transmettre</p>
            <h2 id="transmission-title">Des repères, pas une route tracée.</h2>
            <p>
              Nous ne pourrons pas prévoir le monde dans lequel Mini Scuba
              grandira, supprimer tous les obstacles de sa route ou choisir ses
              rêves à sa place. Et ce ne serait probablement pas lui rendre
              service.
            </p>
          </div>
          <ul className="values-list reveal">
            <li>
              <span>Curiosité</span>
              Comprendre avant de juger.
            </li>
            <li>
              <span>Courage</span>
              Essayer avant de renoncer.
            </li>
            <li>
              <span>Responsabilité</span>
              Assumer ses choix et prendre soin de ce qui lui appartient.
            </li>
            <li>
              <span>Liberté</span>
              Choisir son chemin sans tracer celui des autres.
            </li>
          </ul>
        </section>

        <section className="donate section" id="contribuer" aria-labelledby="donate-title">
          <header className="donate-heading reveal">
            <span className="bitcoin-orbit" aria-hidden="true">₿</span>
            <p className="eyebrow eyebrow-orange">Chaque contribution compte</p>
            <h2 id="donate-title">Déposer une petite lumière sur son chemin</h2>
            <p>
              Il n’existe pas de participation trop petite. Un sat reste un sat.
              Chaque contribution rejoindra la première épargne Bitcoin de Mini
              Scuba, conservée pour le temps long.
            </p>
          </header>

          <div className="donation-grid">
            <article className="donation-card reveal">
              <div className="donation-icon" aria-hidden="true">₿</div>
              <p className="eyebrow">Bitcoin · On-chain</p>
              <h3>Adresse Bitcoin</h3>
              {donationConfig.bitcoinQr ? (
                <img
                  className="qr-image"
                  src={donationConfig.bitcoinQr}
                  alt="QR code de l’adresse Bitcoin de Mini Scuba"
                  width="640"
                  height="640"
                  loading="lazy"
                />
              ) : (
                <div className="qr-placeholder" aria-label="QR code Bitcoin bientôt disponible">
                  <span>QR</span>
                  <small>Bientôt disponible</small>
                </div>
              )}
              <div className="address-row">
                <code>{btc || "bc1q… adresse à venir"}</code>
                <CopyButton value={btc} label="l’adresse Bitcoin" />
              </div>
            </article>

            <article className="donation-card donation-card-lightning reveal">
              <div className="donation-icon" aria-hidden="true">⚡</div>
              <p className="eyebrow">Lightning · Instantané</p>
              <h3>Adresse Lightning</h3>
              {donationConfig.lightningQr ? (
                <img
                  className="qr-image"
                  src={donationConfig.lightningQr}
                  alt="QR code de l’adresse Lightning de Mini Scuba"
                  width="640"
                  height="640"
                  loading="lazy"
                />
              ) : (
                <div className="qr-placeholder" aria-label="QR code Lightning bientôt disponible">
                  <span>QR</span>
                  <small>Bientôt disponible</small>
                </div>
              )}
              <div className="address-row">
                <code>{lightning || "adresse@lightning… à venir"}</code>
                <CopyButton value={lightning} label="l’adresse Lightning" />
              </div>
            </article>
          </div>

          <p className="donation-note reveal">
            Les adresses et QR codes seront ajoutés avant l’ouverture officielle
            de la cagnotte. Aucun paiement n’est actuellement possible depuis
            cette page.
          </p>
        </section>

        <section className="horizon section" aria-labelledby="horizon-title">
          <img
            className="horizon-background"
            src="./assets/images/horizon.webp"
            alt=""
            width="1600"
            height="893"
            loading="lazy"
          />
          <div className="horizon-shade" />
          <div className="horizon-copy reveal">
            <p className="eyebrow eyebrow-light">Le commencement d’une vie entière</p>
            <h2 id="horizon-title">L’horizon lui appartiendra.</h2>
            <p>
              Nous ne pourrons pas choisir sa destination. Nous pouvons seulement
              lui offrir de l’amour, quelques repères et une première réserve de
              liberté.
            </p>
          </div>
        </section>

        <section className="thanks section">
          <div className="thanks-copy reveal">
            <p className="eyebrow">Merci</p>
            <h2>Vous participez à la toute première page de son histoire.</h2>
            <p>
              Merci à notre famille, à nos amis, aux lecteurs des « Petites
              Leçons de Frédéric », aux bitcoiners, aux plebs, aux voyageurs et
              à tous ceux qui croisent notre route.
            </p>
            <p>
              Nous serons là pour apprendre à Mini Scuba à regarder, à
              comprendre et à choisir par lui-même.
            </p>
            <strong>Bienvenue dans l’aventure, Mini Scuba. ⚡️</strong>
            <span>Scuba &amp; Miss Scuba</span>
          </div>
          <a className="button button-dark reveal" href="#accueil">
            Revenir au début <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer>
        <div>
          <strong>Bienvenue, Mini Scuba ⚡️</strong>
          <span>Quelques sats aujourd’hui, un peu de liberté demain.</span>
        </div>
        <p>
          Site statique, sans cookie, sans compte et sans collecte de données
          personnelles.
        </p>
        <a href="https://x.com/Scuba_Wizard" target="_blank" rel="noreferrer">
          @Scuba_Wizard
        </a>
      </footer>
    </>
  );
}
