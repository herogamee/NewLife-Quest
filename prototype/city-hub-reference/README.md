# Owner-selected NewLife Quest City Hub — click-region alignment lab

This is a **standalone coordinate/hotspot QA tool**, not an RPGJS app, deployable game build, or functional backend.

## Run without installation

Open `index.html` in a browser (including `file://`). Its only dependency is `map-data.js` in the same directory. Use the file picker at the top to choose the owner's approved composite screenshot:

`ChatGPT Image Oct 14, 2026, 10_48_32 PM.png` — **1672 × 941** pixels.

You may also put a **local-only** copy in this folder as `city-hub-reference.png`; it will load automatically. The PNG is *not* included in GitHub, and the default blank gradient is not game art. The local file should not be confused with a copyright/license-cleared production background.

Toggle **Show hit regions**, click 10 buildings, and check that the highlight covers the visible building/site rather than a floating Thai label. Switch Thai/English to test accessible names, Tab/Enter/Space and touch. The details panel reports stable IDs; it does not open working in-game services.

## Files

- `map-data.js` — canonical reference dimensions, 10 bilingual place IDs with SVG hit polygons, 6 reserved UI regions, 4 planned-but-unpictured facilities.
- `index.html` — dependency-free responsive image/hotspot verification harness; no authentication, game state or external assets.
- `map-data.test.mjs` — source contract regression checks; run `node --test map-data.test.mjs`.
- [Full reconciliation and discrepancies](../../docs/product/CITY-HUB-REFERENCE-MAP-2026-10-16.md).

## Not delivered by this alignment tool

- Original screenshot import / layered artwork, runtime City Hub scene, RPGJS service wiring, networking, localization QA in actual game, Living City integration, visual comparison screenshots, combat/navigation testing.
- New Inn, Clinic, Training Yard or Town Gate locations: these aren't depicted in the chosen image, so their placement must not be invented.

Once the owner imports proper production art, Codex may refine polygon shapes, replace this harness with engine-native hit testing and bind service IDs to the existing game authority. Merge/deploy only after owner approval.
