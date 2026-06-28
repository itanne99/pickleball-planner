import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Pickleball Planner - Manage leagues, teams, players, and matches for your pickleball organization." />
        <meta name="keywords" content="pickleball, league, tournament, team, match, scorecard, DUPR" />
        <meta name="author" content="Pickleball Planner" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pickleball Planner" />
        <meta property="og:description" content="Manage leagues, teams, players, and matches for your pickleball organization." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
