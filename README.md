# ChurchCommunityApp

A church/nonprofit community app built with Expo, React Native, and TypeScript. Includes a home dashboard, project fundraising, prayer requests, a community feed, and shared goals — all running on local mock data with no backend.

## Screenshots

| Home | Projects | Prayer Requests |
| --- | --- | --- |
| ![Home Dashboard](screenshots/home.png) | ![Projects](screenshots/projects.png) | ![Prayer Requests](screenshots/prayer.png) |

| Community Feed | Shared Goals | Add a Prayer Request |
| --- | --- | --- |
| ![Community Feed](screenshots/feed.png) | ![Shared Goals](screenshots/goals.png) | ![Add a Prayer Request](screenshots/prayer-modal.png) |

Still missing a Project Details shot — to add it (or replace any of the above):
1. Take a screenshot from the Expo Go app (or a simulator) for the screen.
2. Drop the image file into the [screenshots/](screenshots/) folder, e.g. `project-details.png`.
3. Add a row/cell referencing it above, e.g. `![Project Details](screenshots/project-details.png)`.
4. Commit the image along with this file — GitHub will render it automatically once pushed.

## Getting Started

```bash
npm install
npm start
```

Then scan the QR code with Expo Go, or press `a` / `i` in the terminal for an emulator/simulator.

## Features

- **Home Dashboard** — quick stats, featured project, and previews of prayer requests, feed, and goals
- **Projects** — browse fundraising projects with progress bars
- **Project Details** — full project view with a mock donation flow and updates
- **Prayer Requests** — post requests and mark that you've prayed
- **Community Feed** — announcements, testimonies, and event posts with likes
- **Shared Goals** — community-wide goals with contributor avatars

## Tech Stack

- Expo (SDK 54) + React Native + TypeScript
- React Navigation (bottom tabs + native stack)
- Local mock data only — no backend, no real payments
