# NewLife Quest — City Hub reference-map reconciliation (owner selection, 2026-10-16)

**Status:** Owner selected the **2026-10-14 22:48:32 City Hub mockup** again on 2026-10-16. This supersedes the **“Home visual pending”** status in [the 2026-10-10 City Hub direction PR #7](https://github.com/herogamee/NewLife-Quest/pull/7) **for this reference image and its composition**, not for the finished layered art, gameplay implementation, security or new world lore.

## What was actually in GitHub

- `main`: `prototype/web-pixel-rpg-v0.1/index.html` implements a small starter village and slime meadow, **not** this graphical City Hub.
- The separate unmerged `codex/rpgjs-v0.2` work contains a `Willowbrook` walkable village (e.g. `src/game/content.json`, `src/tiled/village.tmx`), **not** the ten-building menu hub. Those are a separate gameplay map; do **not** overwrite village/Tiled coordinates with illustrated-Hub coordinates.
- PR #7 describes City Hub interactions, but its earlier mockup layout was explicitly undecided. The owner chose this newer reference afterward.

**This PR supplies the actual image-space hit-region contract plus a standalone alignment tool. It does not claim to integrate a playable City Hub into the RPGJS runtime, import the image binary, or implement any missing service.**

## Owner-selected visual reference

- Owner's screenshot: `ChatGPT Image Oct 14, 2026, 10_48_32 PM.png`, **1672 × 941 pixels** (pixel dimensions inspected).
- Look: bright detailed rural-ish anime-fantasy waterfront town; guild in the center, river/harbor at lower right, mountains and stone bridge in the distance. Chibi figures and living city atmosphere.
- UI: NewLife Quest logo centered top; player status top-left; currency/settings top-right; 3 quick actions on right; expanded chat lower-left; **compact round menu icons lower-right** (not a full-width giant gold bottom navigation).
- It is a **composite mockup** with HUD and Thai labels baked into the screenshot. Production must split artwork, localizable text, HUD and clickable overlays; **do not ship a screenshot as the final interactive game**.
- PNG binary is **not yet uploaded to the repository**. There is no faithful in-repo visual background to display until its authorized import. Do not substitute an unrelated town image.
- Target baseline for responsive gameplay remains 1920 × 1080 **landscape design viewport**, with independent scene coordinates based on the 1672 × 941 reference and deliberate scaling/cropping.

## Reconciled building locations (visual coordinate regions, not gameplay tiles)

`prototype/city-hub-reference/map-data.js` is the machine-readable source of truth. SVG polygons mark **visible building silhouettes/sites, never only floating labels**; they are initial approximations to refine against the clean production artwork.

| Stable ID | Thai label seen in approved image | English localization | Placement | Service route (conceptual; NOT wired) |
| --- | --- | --- | --- | --- |
| `smithy` | โรงตีเหล็ก | Smithy | upper left | `smithy` |
| `honor-hall` | หอเกียรติยศ | Hall of Honor | upper middle-left | `honor-hall` |
| `adventurer-guild` | กิลด์นักผจญภัย | Adventurer Guild | central upper / largest | `guild` |
| `auction-house` | ประมูล | Auction House | upper right | `auction` |
| `dungeon-gate` | ดันเจี้ยน | Dungeon | far upper right / mountain | `underfold-gate` |
| `market` | ตลาด | Market | middle left | `market` |
| `wedding-chapel` | โบสถ์วิวาห์ | Wedding Chapel | central left, below guild | `wedding` |
| `academy` | สำนักศึกษา | Academy | lower left, above chat | `academy` |
| `hot-springs` | บ่อน้ำพุร้อน | Hot Springs | middle right | `hot-springs` |
| `river-harbor` | ท่าเรือแม่น้ำ | River Harbor | lower right, above compact toolbar | `harbor` |

### Important discrepancies with earlier functional plans

Earlier PR #7 included **inn/hotel, clinic, training yard, and town gate**, but **none has an identified building or label in this selected image**. Do not silently repurpose the academy, wedding chapel or harbor as an inn/clinic/gate, and do not invent a hotspot. Retain existing world plans and routes; actual visual inclusion/access needs a later owner decision or a separate discoverable service UI, implemented with authorization. The earlier lower-left **inn-above-chat** requirement becomes **academy-above-chat** for this approved image; any future inn still must avoid the chat-safe zone.

Honor Hall, Wedding Chapel, Hot Springs and Auction House are visual destinations, **not proof of implemented gameplay systems**. Underfold entry must continue to enforce rank, permits and progression on the authoritative backend. Location IDs remain stable irrespective of locale.

## How to test alignment

1. Open `prototype/city-hub-reference/index.html` locally in a browser (no build dependencies), or serve the folder as static content.
2. The owner-selected PNG is not bundled in the repository. Use the **Load reference PNG** field to select the exact image locally, or add a file named `city-hub-reference.png` alongside the HTML for a local-only preview.
3. Turn on **Show hit regions** and click all ten original illustrated buildings. A panel reports the bilingual name and stable ID. Polygons are intentionally invisible until focus/hover or test mode.
4. Switch between Thai and English; click with mouse, tap, and navigate hotspots with Tab then Enter/Space. Check at desktop 1920×1080, a narrower 16:9 window and phone landscape.
5. Inspect UI safe areas: clickable silhouettes must remain accessible without relying on nameplates or hidden UI; chat lower-left and compact lower-right toolbar keep their zones.
6. Before production integration, import a clean (no embedded Thai HUD/labels) source image with provenance and license; refine polygons to actual artwork, bind service IDs to the same backend as Living City, validate constraints and runtime performance.

## Integration/ownership

- Do **not** mutate `prototype/web-pixel-rpg-v0.1/index.html`, `codex/rpgjs-v0.2` Tiled layouts, quests, saves or server gameplay as part of this visual reconciliation.
- The City Hub is a **service-navigation mode** after character selection; Living City remains walkable and must share authoritative state and IDs.
- Preserve Player-First World, English/Thai localization parity ([Issue #6](https://github.com/herogamee/NewLife-Quest/issues/6)), landscape controls and accessibility.
- Codex remains implementation/technical lead per `AGENTS.md`; merging to `main`, deployment, major system expansion, login/currency access rules require owner approval.
