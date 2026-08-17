# PhilmZone 🎬

PhilmZone is a movie streaming and discovery web application built with **Next.js 16, React, Tailwind CSS, StreamHG API, and TMDB API**.

The application gets the actual video files from **StreamHG** and uses **TMDB** to enrich those movies with information such as posters, descriptions, ratings, release dates, and trailers.

---

# 🏗️ How PhilmZone Works

PhilmZone has three main parts:

```text
                    ┌─────────────────────┐
                    │       User          │
                    │   Web Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js        │
                    │     Frontend        │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
       ┌──────────────────┐        ┌──────────────────┐
       │  Next.js API     │        │      TMDB        │
       │     Routes       │        │      API         │
       └────────┬─────────┘        └──────────────────┘
                │
                ▼
       ┌──────────────────┐
       │     StreamHG     │
       │       API        │
       └──────────────────┘