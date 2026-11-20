# MEDARA CLINIC — сайт дерматологической клиники (Алматы)

Client site for **MEDARA CLINIC** (Instagram @medara_clinic, 256K): dermatologist Долек Анара Мейрамовна — «доказательная медицина, опыт более 10 лет, лечение акне, розацеа, пятен постакне, онлайн/офлайн консультации». ул. Желтоксан 138, Алматы, WhatsApp +7 701 283 33 92 (wa.me/77012833392), free own parking. Licence № 20017397 from 19.11.2020 (дерматокосметология).

Brief (2026-11-20): «сделай теперь лучше и круче сайт» — after the LIVESTA ONE site. **Talk to the user in Russian; site copy is Russian** (Instagram is Russian). Read `docs/STATUS.md` first.

## Commands
```bash
npm run build && npm start               # production on :3026
kill $(lsof -ti tcp:3026 -sTCP:LISTEN)   # restart only our port
npm run lint && npx tsc --noEmit         # must stay clean
open -a "Google Chrome" http://localhost:3026
research/.venv/bin/python -I scripts/build_video.py .   # Pexels clips (re-download to research/video-raw, URLs in STATUS) → public/video + posters
```
`node_modules` → symlink to `~/Desktop/nudes/node_modules`; `research/.venv` → `~/Desktop/nudes/research/.venv` (Pillow, imageio-ffmpeg). The user's disk is tight: raw Instagram photos and clips were deleted after building.

## Stack
Next.js 15 App Router · React 19 · TS strict · plain CSS (`src/app/globals.css`, tokens in `:root`) · fonts **Geologica** (light display) + **Onest** via next/font — sans only, no serif/italic (the user rejected those on CORSO); the serif appears only in the MEDARA wordmark like the clinic's sign · no UI/animation libraries.

## Layout
```
src/app/            / · /problemy · /problemy/[slug] (7) · /ceny · /rezultaty · /vrachi · /kontakty · 404 · sitemap · robots
src/components/     Header (mega menu of concerns, mobile menu) · Booking (sheet → opens WhatsApp with a composed message + plan) · Chrome (Intro, MobileBar, PlanUI pill+drawer)
                    PriceList (search, scroll-spy contents, «+» → Мой план) · Media (Clip: video plays on screen; Compare: before/after slider) · Contacts (stylised SVG map) · Footer · Shared · Icons · Effects
src/components/home Home.tsx: HeroLens («dermatoscope» lens = 2× video copy in a circle following the cursor), Explorer (concern tabs), Journey (pinned horizontal), ResultsRail, Days (schedule, today outlined)
src/lib/            site.ts (contacts, team + schedule, legal line) · prices.ts (full price list from the pinned «PRICE LIST» post) · concerns.ts (7 concern pages) · cases.ts (before/after) · plan.tsx (Мой план context, openBooking) · format.ts (tg)
```
Rules: no backend — booking/plan go to WhatsApp. Never put state classes on `[data-reveal]` (Effects sets data-in). Medical copy stays cautious (no promises) and every page carries `legal` («Имеются противопоказания…»). Only name a person on a photo if Instagram names them (only Динара Миятбековна, post with her caption).
Playwright MCP drives the user's Chrome; background tabs freeze transitions — inject `*{transition:none!important}` and set `data-in` before screenshots.
