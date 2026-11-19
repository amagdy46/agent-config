# Assets

The mark: a nuqta (the one question), then one reed stroke that dips once and runs out. One dot is the accent.

| Role | Hex | On `#ffffff` | On `#0d1117` |
|---|---|---|---|
| ink | `#161514` | 18.2:1 | 1.0:1 |
| paper | `#F1EADB` | 1.2:1 | 15.8:1 |
| teal, light pages | `#0F5E63` | 7.5:1 | 2.5:1 |
| teal, dark pages | `#4FA8A2` | 2.8:1 | 6.7:1 |

Ink on paper 15.2:1, teal on paper 6.3:1. Serve light and dark files with `<picture>` and `prefers-color-scheme`.
Type: IBM Plex Sans and IBM Plex Sans Arabic, weight 600, licensed under the SIL Open Font License 1.1.
All text in these files is converted to outlines, so they need no fonts and no licence file.

| File | Use |
|---|---|
| `wordmark-light.svg`, `wordmark-dark.svg` | top of the README (360 px wide) |
| `mark.svg`, `mark-dark.svg` | the mark on light or dark pages, 24 px and up |
| `mark-16.svg`, `mark-16-dark.svg` | the pixel-drawn cut for 16 to 24 px, light or dark pages |
| `mark-mono.svg` | one colour; takes `currentColor` when inlined |
| `logo.png`, `logo-dark.png` | 512 px, transparent: plugin manifests (`logo`, `logoDark`) |
| `social-preview.png` (source `.svg`) | 1280x640 social preview, uploaded in repository settings |
| `flow-light.svg`, `flow-dark.svg` | the README's flow diagram |

Clear space: one nuqta's width around the mark, the height of the "m" around the wordmark.

To swap the mark, replace the six `mark*.svg` files, paste the new paths into
the mark's `<g>` in each wordmark and in `social-preview.svg` (the group that
holds the nuqta and the stroke), then re-render the PNGs. Keep the file names.

```sh
rsvg-convert -w 512 -h 512 mark.svg -o logo.png
rsvg-convert -w 512 -h 512 mark-dark.svg -o logo-dark.png
rsvg-convert -w 1280 -h 640 social-preview.svg -o social-preview.png
```
