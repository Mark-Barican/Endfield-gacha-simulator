"use client";

import { useEffect, useMemo, useState } from "react";

const BASE_SIX_STAR_RATE = 0.008;
const PITY_START = 66;
const PITY_INCREMENT = 0.05;
const MAX_PITY = 80;
const GUARANTEE_120 = 120;
const RATE_UP_240 = 240;
const BASE_FIVE_STAR_RATE = 0.08;

const TICKETS_SIX_STAR = 2000;
const TICKETS_FIVE_STAR = 200;
const TICKETS_FOUR_STAR = 20;

const sixStarPool = [
  { name: "Laevatain", featured: true, rateUp: true },
  { name: "Gilberta", featured: false, rateUp: true },
  { name: "Yvonne", featured: false, rateUp: true },
  { name: "Ardelia", featured: false, rateUp: false },
  { name: "Ember", featured: false, rateUp: false },
  { name: "Last Rite", featured: false, rateUp: false },
  { name: "Pogranichnik", featured: false, rateUp: false },
  { name: "Lifeng", featured: false, rateUp: false },
];

const fiveStarPool = [
  "Alesh",
  "Arclight",
  "Chen Qianyu",
  "Perlica",
  "Avywenna",
  "Da Pan",
  "Snowshine",
  "Wulfgard",
  "Xaihi",
];

const fourStarPool = ["Akekuri", "Antal", "Catcher", "Estella", "Fluorite"];

type ResultItem = {
  name: string;
  rarity: 4 | 5 | 6;
  featured: boolean;
  rateUp?: boolean;
  tickets: number;
};

type GameState = {
  totalPulls: number;
  sixStarPity: number;
  fiveStarPity: number;
  arsenalTickets: number;
  sixStarCount: number;
  featuredCount: number;
  pullsSinceLastFeatured: number;
};

const initialState: GameState = {
  totalPulls: 0,
  sixStarPity: 0,
  fiveStarPity: 0,
  arsenalTickets: 0,
  sixStarCount: 0,
  featuredCount: 0,
  pullsSinceLastFeatured: 0,
};

const imageMap: Record<string, string> = {
  Laevatain: "/6-star/Laevatain_full.webp",
  Gilberta: "/6-star/Gilberta_full.webp",
  Yvonne: "/6-star/Yvonne_full.webp",
  Ardelia: "/6-star/ardelia.36d836c7.webp",
  Ember: "/6-star/Ember_full.webp",
  "Last Rite": "/6-star/lastrite.c66bd542.webp",
  Pogranichnik: "/6-star/pogranichnik.6983f122.webp",
  Lifeng: "/6-star/Lifeng_full.webp",
  Alesh: "/5-star/alesh.bfe6a583.webp",
  Arclight: "/5-star/Arclight_full.webp",
  "Chen Qianyu": "/5-star/Chen_Qianyu_full.webp",
  Perlica: "/5-star/Perlica_full.webp",
  Avywenna: "/5-star/Avywenna_full.webp",
  "Da Pan": "/5-star/Da_Pan_full.webp",
  Snowshine: "/5-star/Snowshine_full.webp",
  Wulfgard: "/5-star/Wulfguard_full.webp",
  Xaihi: "/5-star/Xaihi_full.webp",
  Akekuri: "/4-star/akekuri.8678d37f.webp",
  Antal: "/4-star/antal.51fa71d3.webp",
  Catcher: "/4-star/catcher.3812760d.webp",
  Estella: "/4-star/estella.fbad0dc2.webp",
  Fluorite: "/4-star/fluorite.9071d26e.webp",
};

const faceFocusMap: Record<string, string> = {
  Laevatain: "50% 8%",
  Gilberta: "50% 12%",
  Yvonne: "50% 12%",
  Ardelia: "50% 10%",
  Ember: "50% 14%",
  "Last Rite": "50% 10%",
  Pogranichnik: "55% 12%",
  Lifeng: "50% 10%",
  Alesh: "50% 12%",
  Arclight: "50% 8%",
  "Chen Qianyu": "55% 10%",
  Perlica: "50% 12%",
  Avywenna: "50% 10%",
  "Da Pan": "50% 12%",
  Snowshine: "50% 12%",
  Wulfgard: "50% 10%",
  Xaihi: "50% 10%",
  Akekuri: "50% 12%",
  Antal: "50% 12%",
  Catcher: "50% 12%",
  Estella: "50% 12%",
  Fluorite: "50% 12%",
};

const calculateSixStarRate = (pity: number) => {
  if (pity < PITY_START) {
    return BASE_SIX_STAR_RATE;
  }
  return Math.min(1, BASE_SIX_STAR_RATE + (pity - 65) * PITY_INCREMENT);
};

const pullSixStar = (state: GameState, isFeatured: boolean): ResultItem => {
  state.sixStarCount += 1;
  if (isFeatured) {
    state.featuredCount += 1;
    const featured = sixStarPool.find((unit) => unit.featured);
    return {
      name: featured ? featured.name : "Featured",
      rarity: 6,
      featured: true,
      rateUp: false,
      tickets: TICKETS_SIX_STAR,
    };
  }

  const rateUpChars = sixStarPool.filter(
    (unit) => unit.rateUp && !unit.featured,
  );
  const baseChars = sixStarPool.filter(
    (unit) => !unit.rateUp && !unit.featured,
  );

  const roll = Math.random();
  let unit = baseChars[Math.floor(Math.random() * baseChars.length)];
  let isRateUp = false;
  if (roll < 0.7 && rateUpChars.length > 0) {
    unit = rateUpChars[Math.floor(Math.random() * rateUpChars.length)];
    isRateUp = true;
  }

  return {
    name: unit.name,
    rarity: 6,
    featured: false,
    rateUp: isRateUp,
    tickets: TICKETS_SIX_STAR,
  };
};

const pullFiveStar = (): ResultItem => {
  const unit = fiveStarPool[Math.floor(Math.random() * fiveStarPool.length)];
  return {
    name: unit,
    rarity: 5,
    featured: false,
    tickets: TICKETS_FIVE_STAR,
  };
};

const pullFourStar = (): ResultItem => {
  const unit = fourStarPool[Math.floor(Math.random() * fourStarPool.length)];
  return {
    name: unit,
    rarity: 4,
    featured: false,
    tickets: TICKETS_FOUR_STAR,
  };
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isPulling, setIsPulling] = useState(false);
  const [pullVersion, setPullVersion] = useState(0);

  const totalRate = useMemo(() => {
    const currentSixStarRate = calculateSixStarRate(gameState.sixStarPity);
    const remainingRate = 1 - currentSixStarRate;
    const currentFiveStarRate = BASE_FIVE_STAR_RATE * remainingRate;
    const currentFourStarRate = Math.max(0, remainingRate - currentFiveStarRate);
    return {
      six: currentSixStarRate,
      five: currentFiveStarRate,
      four: currentFourStarRate,
    };
  }, [gameState.sixStarPity]);

  const runPulls = (count: number) => {
    setIsPulling(true);
    setPullVersion((prev) => prev + 1);
    const nextState: GameState = { ...gameState };
    const nextResults: ResultItem[] = [];

    for (let i = 0; i < count; i += 1) {
      nextState.totalPulls += 1;
      nextState.sixStarPity += 1;
      nextState.fiveStarPity += 1;
      nextState.pullsSinceLastFeatured += 1;

      const currentSixStarRate = calculateSixStarRate(nextState.sixStarPity);
      const remainingRate = 1 - currentSixStarRate;
      const currentFiveStarRate = BASE_FIVE_STAR_RATE * remainingRate;
      const guaranteed5Star = nextState.fiveStarPity >= 10;

      let result: ResultItem;

      if (nextState.sixStarPity >= MAX_PITY) {
        const isFeatured =
          Math.random() < 0.5 ||
          nextState.pullsSinceLastFeatured >= GUARANTEE_120;
        result = pullSixStar(nextState, isFeatured);
        nextState.sixStarPity = 0;
        nextState.fiveStarPity = 0;
        if (isFeatured) {
          nextState.pullsSinceLastFeatured = 0;
        }
      } else if (nextState.totalPulls % RATE_UP_240 === 0) {
        result = pullSixStar(nextState, true);
        nextState.sixStarPity = 0;
        nextState.fiveStarPity = 0;
        nextState.pullsSinceLastFeatured = 0;
        result.tickets = 0;
      } else if (
        nextState.pullsSinceLastFeatured >= GUARANTEE_120 &&
        nextState.featuredCount === 0
      ) {
        result = pullSixStar(nextState, true);
        nextState.sixStarPity = 0;
        nextState.fiveStarPity = 0;
        nextState.pullsSinceLastFeatured = 0;
      } else {
        const roll = Math.random();

        if (roll < currentSixStarRate) {
          const isFeatured =
            Math.random() < 0.5 ||
            nextState.pullsSinceLastFeatured >= GUARANTEE_120;
          result = pullSixStar(nextState, isFeatured);
          nextState.sixStarPity = 0;
          nextState.fiveStarPity = 0;
          if (isFeatured) {
            nextState.pullsSinceLastFeatured = 0;
          }
        } else if (roll < currentSixStarRate + currentFiveStarRate || guaranteed5Star) {
          result = pullFiveStar();
          nextState.fiveStarPity = 0;
        } else {
          result = pullFourStar();
        }
      }

      nextState.arsenalTickets += result.tickets;
      nextResults.push(result);
    }

    setGameState(nextState);
    setResults(nextResults);
    window.setTimeout(() => {
      setIsPulling(false);
    }, 650);
  };

  const resetGacha = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      setGameState(initialState);
      setResults([]);
    }
  };

  useEffect(() => {
    if (results.length === 0) {
      setIsPulling(false);
    }
  }, [results.length]);

  const showGuaranteeNotice =
    gameState.pullsSinceLastFeatured >= GUARANTEE_120 &&
    gameState.featuredCount === 0;

  return (
    <div className="page">
      <div className="header">
        <div>
          <h1>Arknights Endfield Gacha Simulator</h1>
          <p className="subtitle">Let's Go Gambling!</p>
        </div>
        <div className="header-badge">Chartered Banner</div>
      </div>

      <div className="banner-row">
        <div className="featured-line">
          <span className="chip featured">Laevatain</span>
          <span className="chip rate-up">Gilberta</span>
          <span className="chip rate-up">Yvonne</span>
        </div>
        <div className="rate-info">
          6★ {Math.round(totalRate.six * 10000) / 100}% · 5★{" "}
          {Math.round(totalRate.five * 10000) / 100}% · 4★{" "}
          {Math.round(totalRate.four * 10000) / 100}%
        </div>
      </div>

      {showGuaranteeNotice && (
        <div className="guarantee-notice">
          Next 6★ is GUARANTEED to be Laevatain (120 pulls without featured).
        </div>
      )}

      <div className="stats-compact">
        <div className="stat-card">
          <div className="stat-label">Total</div>
          <div className="stat-value">{gameState.totalPulls}</div>
        </div>
        <div className="stat-card pity-info">
          <div className="stat-label">6★ Pity</div>
          <div className="stat-value">{gameState.sixStarPity}</div>
        </div>
        <div className="stat-card pity-info">
          <div className="stat-label">5★ Pity</div>
          <div className="stat-value">{gameState.fiveStarPity}</div>
        </div>
        <div className="stat-card arsenal-info">
          <div className="stat-label">Tickets</div>
          <div className="stat-value">
            {gameState.arsenalTickets.toLocaleString()}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">6★ Pulled</div>
          <div className="stat-value">{gameState.sixStarCount}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Featured</div>
          <div className="stat-value">{gameState.featuredCount}</div>
        </div>
      </div>

      <div className="actions">
        <button className="pull-btn" onClick={() => runPulls(1)}>
          <span>Pull x1</span>
        </button>
        <button className="pull-10-btn" onClick={() => runPulls(10)}>
          <span>Pull x10</span>
        </button>
        <button className="reset-btn" onClick={resetGacha}>
          <span>Reset</span>
        </button>
      </div>

      <div
        className={`results-panel ${isPulling ? "pulling" : ""}`}
        key={`results-${pullVersion}`}
      >
        {results.length === 0 ? (
          <div className="results-empty">
            <div className="spark" />
            <p>Your pulls will appear here.</p>
          </div>
        ) : (
          <div className="results-grid">
            {results.map((result, index) => {
              const classes = [
                "result-card",
                `rarity-${result.rarity}`,
                result.featured ? "featured" : "",
                result.rarity === 6 && result.rateUp ? "rate-up" : "",
              ]
                .filter(Boolean)
                .join(" ");
              const stars = "★".repeat(result.rarity);
              const imageSrc = imageMap[result.name];
              return (
                <div className={classes} key={`${result.name}-${index}`}>
                  <div className="portrait">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={result.name}
                        style={{
                          objectPosition:
                            faceFocusMap[result.name] ?? "50% 12%",
                        }}
                      />
                    ) : (
                      <div className="portrait-fallback" />
                    )}
                  </div>
                  <div className="result-meta">
                    <div className="result-stars">{stars}</div>
                    <div className="result-name">{result.name}</div>
                    <div className="result-tickets">
                      <img src="/Arsenal_Ticket.webp" alt="Arsenal ticket" />
                      <span>{result.tickets.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="info-compact">
        <div>
          <h3>Gacha Mechanics</h3>
          <p>
            Base rates: 6★ 0.8% · 5★ 8% · 4★ 91.2%. 6★ pity increases starting at
            pull 66 with hard pity at 80.
          </p>
        </div>
        <div>
          <h3>Guarantees</h3>
          <p>
            First 6★ within 120 pulls is guaranteed featured. Every 240 pulls
            guarantees a featured 6★.
          </p>
        </div>
        <div>
          <h3>Tickets</h3>
          <p>
            Arsenal tickets: 6★ 2000 · 5★ 200 · 4★ 20. Rate-up has higher weight
            when off-banner.
          </p>
        </div>
      </div>
    </div>
  );
}
