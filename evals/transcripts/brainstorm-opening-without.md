# brainstorm-opening, without the skill

Case `brainstorm-opening`, Claude Opus (`--model opus`), Claude Code 2.1.327, 2026-11-18, one run of three from the published Opus row in [RESULTS.md](../RESULTS.md). No plugin (baseline arm). Graders: asks-intent FAIL, few-questions FAIL (four questions), nothing-written PASS. Tool results are left out and marked […]; nothing else is cut.

**User:** let's brainstorm a little app for keeping track of when to water my houseplants

**Agent:**

Fun one. Here's a first pass to react to.

## The core loop
1. **Add a plant**: name, photo (optional), and how often it needs water.
2. **See what's due**: a home screen sorted by "water today", "soon" and "you're fine".
3. **Tap to log watering**: one tap, which resets that plant's countdown.

If those three are really smooth, it's already useful. Everything else is extra.

## Ideas worth considering
- **Flexible schedules.** Fixed intervals ("every 7 days") break down quickly. Some options:
  - Seasonal adjustment: water less often in winter. It's November, so this would apply right now.
  - "Check soil" reminders instead of "water now", for plants like succulents where you water only when the soil is dry.
  - Snooze: "soil was still damp, remind me in 2 days." The app could learn from repeated snoozes and lengthen the interval.
- **Grouping by room or location.** "Water everything in the living room" as a single batch action.
- **History.** A small timeline per plant, so when one starts drooping you can see whether you've been over- or under-watering.
- **Other care tasks.** Fertilizing (often monthly in the growing season), rotating for even light, repotting. These could be optional add-ons per plant.
- **Species presets.** Pick "Pothos" and get a sensible default interval. That's handy, but it means maintaining a plant database, so I'd start with manual entry plus a handful of common presets.
- **Shared households.** If a partner or roommate also waters, you need sync so nobody double-waters.
- **Vacation mode.** A list for a plant-sitter, or a shareable link.

## The big decision: what form should it take?
This affects everything else, notifications especially:

| Option | Pros | Cons |
|---|---|---|
| **Web app / PWA** | Quick to build, works on phone and desktop | Push notifications are workable but finicky, especially on iOS |
| **Native mobile app** | Reliable notifications, camera for photos | More setup and build tooling |
| **CLI / terminal tool** | Very fast to build, fits a dev workflow | You probably don't live in a terminal near your plants |
| **Calendar-based** | Generates `.ics` events, so your existing calendar handles reminders | Logging "I watered it" is awkward |
| **Chat bot** (Telegram, Discord, etc.) | Free notifications, reply "done" to log | Depends on an outside platform |

**My recommendation:** if this is a personal tool, a **PWA with local storage** is the best balance. It installs to your home screen, works offline and needs no backend. If notifications prove unreliable, you could add a tiny server or a Telegram bot for reminders later.

## Questions for you
1. Roughly how many plants? 5 and 50 lead to different designs.
2. Just you, or shared with others?
3. Is this mainly about getting the tool, or also a project you want to enjoy building (e.g. trying out a framework)?
4. Where do you want reminders to show up: phone notifications, calendar, chat, or email?

Tell me which direction appeals and we can sketch the data model and screens next.

