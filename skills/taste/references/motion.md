# Motion discipline

Motion is a tool the design read may call for. Nothing here fires automatically.

## Motivation

Before adding any animation, answer "what does this communicate?" Valid answers: hierarchy (directing attention), storytelling (revealing content in a sequence that matches a narrative), feedback (acknowledging a user action), state transition (showing that something changed). "It looked cool" is not an answer. A scroll library everywhere because it is installed is amateur. If the reason does not fit one sentence, drop the animation.

## Claimed equals shown

If the motion dial is above 4, the page must actually move: an entry transition on the hero, reveal on key sections, and hover physics on primary actions at minimum. A static page that claims high motion is broken. Conversely, if working motion is out of scope, drop the dial to 3 and ship a clean static page. Never ship half-built motion: cut-off scroll triggers, jumpy entries, missing cleanup.

## Which tool

- UI, tile, and state-change motion: the repository's animation library or CSS transitions.
- Simple "appear as it enters the viewport" reveals: a viewport-aware reveal from the animation library or CSS scroll-driven animation. Do not pull in a scroll-pinning library for this.
- Full-page scroll storytelling, pinning, horizontal panning: a dedicated scroll-trigger library, isolated in a leaf component with cleanup on unmount.
- 3D or canvas backgrounds: a WebGL library, same isolation rule.
- Never mix two animation engines in the same component tree; they fight over frames.
- Use the library the repository already has before adding another. Check policy before introducing a dependency.

## Rules

- Animate only `transform` and `opacity`. Never animate top, left, width, or height.
- Use `will-change` only on elements that will actually animate.
- Never attach a raw `scroll` event listener or compute scroll progress into framework state on every frame. Use the animation library's scroll values, a scroll-trigger library, an intersection observer, or CSS `animation-timeline`.
- Continuous pointer-driven values (cursor position, magnetic hover, physics) live in motion values outside the render cycle, never in component state.
- Layout and shared-element transitions apply to elements that genuinely reorder, expand, or persist across routes. Do not wrap static content "for safety".
- Stagger a reveal only where sequence matters; keep parent and children in the same client tree.
- Every effect registered in an effect hook has a cleanup function.
- Components that use motion, scroll listeners, or pointer physics are isolated client leaves; static layout renders on the server where the framework supports it.
- Full-height sections use dynamic viewport height, not `100vh`, so mobile browser chrome does not cause jumps.
- Grain and noise overlays go on a fixed, pointer-events-none element, never on a scrolling container.
- Spring easing for physical interactions; no linear easing on UI motion.
- Perpetual effects (pulse, typewriter, float, shimmer) belong only where a section benefits from liveness, such as status or live feeds. Informational sections stay still.
- Horizontal text marquees at most once per page.

## Pinning patterns

When the design read calls for a sticky card stack or a horizontal scroll pan:

- The pinned section starts when its top reaches the viewport top, not when it reaches the center. Starting early shows half a slide.
- Stack: every card except the last is pinned with no pin spacing; the previous card scales and fades as the next card scrolls in, driven by the next card's trigger.
- Pan: pin the wrapper, scrub the inner track horizontally, and set the scroll distance to the track width minus the viewport width, recomputed on refresh.
- Both revert cleanly on unmount and collapse to a plain vertical stack under reduced motion.

## Reduced motion

Any motion above dial 3 must honor `prefers-reduced-motion`. In the animation library, read the reduced-motion hook and render static. In CSS, gate animations behind `prefers-reduced-motion: no-preference` or disable them under `reduce`. Infinite loops, parallax, scroll pinning, and magnetic physics all collapse to static or instant states.

## Performance targets

Largest contentful paint under 2.5 seconds (hero image prioritised or preloaded), interaction latency under 200 milliseconds, cumulative layout shift under 0.1 (space reserved for images, fonts, embeds). Lazy-load anything not above the fold and be aware that animation and 3D libraries are not small. Measure with the project's performance tooling before calling the page done.
