# A Genshin Memory 🌌

> **Link:** https://a-genshin-memory.vercel.app/

A sleek, interactive React application that allows users to search, view, and save Genshin Impact player profiles using their in-game UID. Built with a focus on clean architecture, responsive design, and deep integration with Genshin's complex character data.

## Features

* **Real-time Profile Fetching:** Enter any valid Genshin Impact UID to instantly pull public account data, including Adventure Rank, Abyss progress, and Imaginarium Theater stats.
* **Shareable URLs:** Features a custom URL hash routing system (`/#profile?uid=123456789`). You can copy your URL and send it to friends, and the app will automatically fetch the correct profile on load while preserving smooth page scrolling.
* **Detailed Character Showcases:** Click on any showcased character to open a detailed modal displaying their weapon, artifact sets, and combat statistics.
* **Favorites System:** Save your friends' or your own alternate accounts to a persistent favorites list for one-click access.

## Tech Stack

* **Frontend:** React.js
* **Styling:** Vanilla CSS (CSS Modules / Global Styles)
* **Data Source:** [Enka.Network API](https://enka.network/)

## Project Structure

The project is structured for scalability, keeping UI components strictly separated from data-fetching and utility logic:

```text
src/
├── assests/
├── components/          # Reusable UI components (Profiles, Characters, Modals)
├── hooks/               # Custom React hooks (useGenshinProfile, useHashUid, useFavorites)
├── pages/               # Helper functions and JSON dictionaries (genshinUtils.js)
├── utils/               # Top-level page components (Home.jsx)
└── App.jsx              # Main application entry point
```

## How to Use

**1. Search:** Enter a Genshin Impact UID in the top search bar (Note: The user must have "Show Character Details" enabled in their in-game settings for artifacts/weapons to appear).

**2. Save:** Click "Save Account" to add the profile to your quick-access favorites list.

**3. Explore:** Scroll down to view the player's showcased characters and namecards. Click on any character card to view their detailed build.

**4. Share:** Copy the URL from your browser to share that exact profile layout with anyone.

## Acknowledgments

* Character data, splash art, and stat APIs provided by the incredible Enka.Network.
* Game assets and data belong to HoYoverse. This is a fan-made tool and is not affiliated with HoYoverse.