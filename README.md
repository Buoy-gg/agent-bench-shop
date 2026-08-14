# Agent Bench Shop

A small offline-first storefront app built with Expo / React Native. Browse benches, add them to your cart, check out.

## Stack

- **Expo + expo-router** — four screens: Products, Product Detail, Cart, Checkout
- **React Query + fetch** — server data, with persisted cache (AsyncStorage) for offline-first browsing after the first load
- **Zustand** — cart state, persisted across restarts
- **expo-secure-store** — auth token storage

The app talks to a small HTTP API served locally (`API_URL` in `app.config.ts`).

## Running

```bash
npm install
npm run ios
```

Requires the API server to be running locally.
