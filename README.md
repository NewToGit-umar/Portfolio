# Umar Farooq Portfolio

Accessible developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm run lint
npm run build
```

## Deploy from GitHub

### Vercel

1. Push this repository to GitHub.
2. Open [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep the detected framework as **Next.js**.
4. Use `npm run build` as the build command and leave the output directory empty.
5. Select **Deploy**.

### Netlify

1. Push this repository to GitHub.
2. Open [app.netlify.com/start](https://app.netlify.com/start) and choose **Import from Git**.
3. Select the repository and set the build command to `npm run build`.
4. Set the publish directory to `.next`.
5. Deploy the site.

The site is a static App Router portfolio with no server secrets or required environment variables. The contact form opens the visitor's email app and addresses `codewithumar0@gmail.com`.

## Accessibility

The circular accessibility controls provide larger text, a font-size stepper, high contrast, a color-safe palette, reduced motion, underlined links, stronger focus rings, wider spacing, a reading guide, a larger cursor, dyslexia-friendly typography, and reset preferences. Settings persist locally in the visitor's browser.
