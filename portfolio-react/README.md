# Marwan Mostafa — Portfolio (React + Tailwind CSS v4)

## Run
```bash
npm install
cp .env.example .env     # add your Formspree endpoint
npm run dev
npm run build            # production build in /dist
```

## Where things live
- `src/data/`        content you edit: projects, certificates, skills, site info (links, email)
- `src/i18n/`        English + Arabic strings (add a key to both files)
- `src/context/`     theme, language (+ RTL), recruiter mode
- `src/hooks/`       useInView, useScrollSpy, useScrolled, useGithubRepos
- `src/components/`  layout/ sections/ features/ ui/
- `src/index.css`    Tailwind v4 `@theme` design tokens + dark theme overrides
- `public/images/`   profile.jpg, certs/

## To finish
1. Add `public/images/profile.jpg`
2. Fill `demo` / `github` / `figma` URLs in `src/data/projects.js`
3. Add certificate images/links in `src/data/certificates.js`
4. Set `VITE_FORMSPREE_URL` in `.env`
