# Assets

The mark reads `/a`: skills are slash commands, and the collection is amagdy's. One orange stroke is the only colour.

| Role | Hex |
|---|---|
| ink, light pages | `#0d0f12` |
| text, dark pages | `#f0f6fc` |
| orange, the slash | `#ff5a1f` |

Type: Geist Mono, weight 600 for names and 400 for notes, licensed under the SIL Open Font License 1.1.
All text in these files is converted to outlines, so they need no fonts and no licence file.
Serve the light and dark files with `<picture>` and `prefers-color-scheme`.

| File | Use |
|---|---|
| `wordmark-light.svg`, `wordmark-dark.svg` | top of the README (320 px wide) |
| `mark.svg`, `mark-dark.svg` | the mark on light or dark pages, 16 px and up |
| `logo.png`, `logo-dark.png` | 512 px: plugin manifests (`logo`, `logoDark`) |
| `social-preview.png` (source `.svg`) | 1280x640 social preview, uploaded in repository settings |
| `flow-light.svg`, `flow-dark.svg` | the README's flow diagram |

The PNGs are rendered from the SVGs:

```sh
rsvg-convert -w 512 -h 512 mark.svg -o logo.png
rsvg-convert -w 512 -h 512 mark-dark.svg -o logo-dark.png
rsvg-convert -w 1280 -h 640 social-preview.svg -o social-preview.png
```
