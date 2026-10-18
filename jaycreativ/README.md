# Jonas Webworks — Local build & preview

This project contains a simple build script that injects `components/header.html` and `components/footer.html` into each top-level HTML page and writes the result to `dist/`.

How to use:

1. Install Node.js (if you don't have it).
2. From the project root, run:

```bash
npm run build
```

3. Serve the `dist/` folder with a local HTTP server (recommended). Example using Python:

```bash
# from project root
cd dist
python -m http.server 8000
```

Then open `http://localhost:8000/index.html` in your browser. The header and footer will be injected into the built pages, so they will display correctly when previewing.

Notes:
- This script writes output to `dist/` and copies `css/`, `js/`, `assets/`, and `components/` into `dist/`.
- You can edit source files in the project root; re-run `npm run build` to regenerate `dist/`.