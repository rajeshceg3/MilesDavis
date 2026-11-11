# Verify MilesDavis
Miles Davis: A Lived Memory - immersive jazz tribute (vite + React).
## Launch
`npm install`, then `npm run dev` or `npm run build && npm run preview`.
## Doctor
`python3 .cursor/skills/verify-miles-davis/verify.py`
## Drive
Runs the vitest suite, builds with vite, renders the built app in headless Chromium asserting the boot marker and zero JS console errors.
## Evidence
`.cursor/skills/verify-miles-davis/evidence.json`
## Cleanup
Static server terminated after the render.
## Known boundaries
Render smoke only; scene quality unverified.
