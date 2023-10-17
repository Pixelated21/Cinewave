<p align="center">
<a href=https://github.com/Pixelated21/Cinewave target="_blank">
<img src='/placeholder.jpg' width="100%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/code-size/Pixelated21/Cinewave" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/Pixelated21/Cinewave" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/Pixelated21/Cinewave" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/Pixelated21/Cinewave" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

Cinewave is a movie surfing project that utilizes various libraries and tools, including auth/drizzle-adapter, radix-ui/react, next-auth, tailwindcss, and more.

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [📝 Project Summary](#project-summary)

* [💻 Stack](#stack)

* [⚙️ Setting Up](#setting-up)

* [🚀 Run Locally](#run-locally)

* [🙌 Contributors](#contributors)

* [☁️ Deploy](#deploy)

* [📄 License](#license)

## 📁 Project Structure

```bash
├── .dockerignore
├── .env.local.example
├── .eslintrc.json
├── .gitignore
├── .husky
│   ├── commit-msg
│   ├── pre-commit
│   └── pre-push
├── .vscode
│   └── settings.json
├── Dockerfile
├── LICENSE
├── README.md
├── commitlint.config.js
├── components.json
├── docker-compose.yml
├── docker
│   └── production
│       ├── Dockerfile
│       └── docker-compose.yml
├── drizzle.config.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── assets
│   │   ├── banner-sm.png
│   │   ├── banner.png
│   │   ├── icons
│   │   │   └── play-icon.svg
│   │   ├── profile_default.png
│   │   └── six-sided-dice.svg
│   ├── logo.svg
│   ├── next.svg
│   ├── temp
│   │   ├── Bayonetta.(Character).full.1787833 (1).jpg
│   │   ├── cute-animation.gif
│   │   └── rimuru.jpg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── (detail)
│   │   │   ├── collection
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   ├── movie
│   │   │   │   └── [id]
│   │   │   │       ├── loading.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── person
│   │   │   │   └── [id]
│   │   │   │       └── page.tsx
│   │   │   └── series
│   │   │       └── [id]
│   │   │           ├── loading.tsx
│   │   │           └── page.tsx
│   │   ├── _actions
│   │   │   ├── bookmark.ts
│   │   │   ├── collection.ts
│   │   │   ├── movie.ts
│   │   │   ├── person.ts
│   │   │   ├── resource.ts
│   │   │   ├── search.ts
│   │   │   ├── series.ts
│   │   │   ├── shared_list.ts
│   │   │   ├── shared_resource.ts
│   │   │   └── user.ts
│   │   ├── _config
│   │   │   └── site.ts
│   │   ├── api
│   │   │   ├── auth
│   │   │   │   └── [...nextauth]
│   │   │   │       └── route.ts
│   │   │   ├── bookmark
│   │   │   │   └── route.ts
│   │   │   ├── shared_list
│   │   │   │   └── route.ts
│   │   │   └── shared_resource
│   │   │       └── route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── home
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── movie
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── search
│   │   │   └── [query]
│   │   │       └── page.tsx
│   │   ├── series
│   │   │   └── page.tsx
│   │   ├── share-space
│   │   │   ├── [linkId]
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── try-me
│   │       └── page.tsx
│   ├── components
│   │   ├── NavigationBar.tsx
│   │   ├── actions
│   │   │   ├── add-shared-resource.tsx
│   │   │   └── resource-add-to-watchlist-button.tsx
│   │   ├── auth-button.tsx
│   │   ├── badges
│   │   │   └── Badge.tsx
│   │   ├── cards
│   │   │   ├── BookmarkCard.tsx
│   │   │   ├── CastCard.tsx
│   │   │   ├── SharedList.tsx
│   │   │   ├── TrailerCard.tsx
│   │   │   ├── TrendingCard.tsx
│   │   │   ├── movie
│   │   │   │   ├── MovieCard.tsx
│   │   │   │   ├── MovieCardBlurEffect.tsx
│   │   │   │   ├── MovieCardOriginal.tsx
│   │   │   │   └── SmallMovieCard.tsx
│   │   │   └── series
│   │   │       ├── SeriesCard.tsx
│   │   │       ├── SeriesCardBlurEffect.tsx
│   │   │       └── SmallSeriesCard.tsx
│   │   ├── layouts
│   │   │   └── LayoutSection.tsx
│   │   ├── loading
│   │   │   └── ResourceDetailsLoading.tsx
│   │   ├── modal
│   │   │   └── index.jsx
│   │   ├── navigation-links.tsx
│   │   ├── pagination-controls.tsx
│   │   ├── sections
│   │   │   ├── detail
│   │   │   │   ├── MovieDetailsModal.tsx
│   │   │   │   └── TrailerSection.tsx
│   │   │   ├── home
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   └── ResourceListingSection.tsx
│   │   │   └── tryme
│   │   │       ├── TryMeCarrousel.tsx
│   │   │       └── TryMeRandomizer.tsx
│   │   ├── ui
│   │   │   ├── avatar.tsx
│   │   │   ├── button.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── home
│   │   │   │   └── genreLink.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── search.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── use-toast.ts
│   │   └── utils
│   │       └── tailwind-indicator.tsx
│   ├── data
│   │   ├── genres.ts
│   │   ├── languages.ts
│   │   └── ratings.ts
│   ├── lib
│   │   ├── auth.ts
│   │   ├── db
│   │   │   ├── index.ts
│   │   │   └── schema
│   │   │       ├── account.ts
│   │   │       ├── bookmark.ts
│   │   │       ├── resource.ts
│   │   │       ├── session.ts
│   │   │       ├── sharedList.ts
│   │   │       ├── sharedResource.ts
│   │   │       ├── user.ts
│   │   │       └── verificationToken.ts
│   │   ├── fonts.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   ├── providers
│   │   └── SessionProvider.tsx
│   └── types
│       ├── env.ts
│       ├── index.ts
│       └── next-auth.d.ts
├── tailwind.config.js
└── tsconfig.json
```

## 📝 Project Summary

- [src/app](src/app): Main application directory containing various components and sections.
- [src/components](src/components): Reusable UI components and layouts.
- [src/app/api](src/app/api): API directory for handling server communication.
- [src/app/home](src/app/home): Home page component with main application functionality.
- [src/app/movie](src/app/movie): Movie-related components and functionality.
- [src/app/series](src/app/series): Series-related components and functionality.
- [src/components/cards](src/components/cards): Reusable card components for movies and series.
- [src/components/sections/detail](src/components/sections/detail): Detail section components for movies, series, and persons.
- [src/components/sections/home](src/components/sections/home): Home section components for the main application.
- [src/components/ui/home](src/components/ui/home): UI components specifically designed for the home page.

## 💻 Stack

- [next](https://nextjs.org/): React framework for building server-side rendered and static websites.
- [react](https://reactjs.org/): JavaScript library for building user interfaces.
- [axios](https://axios-http.com/): Promise-based HTTP client for making API requests.
- [tailwindcss](https://tailwindcss.com/): Utility-first CSS framework for styling web applications.
- [next-auth](https://next-auth.js.org/): Authentication library for Next.js applications.
- [drizzle-kit](https://www.drizzlekit.com/): Toolkit for building data-driven React applications.
- [typescript](https://www.typescriptlang.org/): Typed superset of JavaScript that compiles to plain JavaScript.
- [prettier](https://prettier.io/): Opinionated code formatter to maintain consistent code style.

## ⚙️ Setting Up

#### Your Environment Variable

- Step 1

- Step 2

## 🚀 Run Locally
1.Clone the Cinewave repository:
```sh
git clone https://github.com/Pixelated21/Cinewave
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors
<a href="https://github.com/Pixelated21/Cinewave/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Pixelated21/Cinewave" />
</a>

## ☁️ Deploy

`[Application name](Your App URL)`

## 📄 License

This project is licensed under the **MIT License** - see the [**MIT License**](https://github.com/Pixelated21/Cinewave/blob/main/LICENSE) file for details.

