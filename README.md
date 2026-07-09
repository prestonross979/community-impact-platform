# Community Impact Platform

*A mobile platform designed to strengthen community engagement for churches and nonprofit organizations through transparent fundraising, project tracking, prayer requests, and shared community goals.*

Community Impact Platform explores how modern mobile technology can help mission-driven organizations build stronger relationships with their communities while increasing transparency, engagement, and trust.

Instead of relying on separate platforms for donations, communication, announcements, and community interaction, this project brings those experiences together into one intuitive mobile application.

**Built with Expo, React Native, and TypeScript.**


## App Preview

| Home | Projects | Prayer Requests |
| --- | --- | --- |
| ![Home Dashboard](screenshots/home.png) | ![Projects](screenshots/projects.png) | ![Prayer Requests](screenshots/prayer.png) |

| Community Feed | Shared Goals | Add a Prayer Request |
| --- | --- | --- |
| ![Community Feed](screenshots/feed.png) | ![Shared Goals](screenshots/goals.png) | ![Add a Prayer Request](screenshots/prayer-modal.png) |

## The Problem

Churches and nonprofit organizations play a vital role in strengthening their communities, yet many rely on several disconnected tools to manage communication, fundraising, volunteer engagement, and community support.

Prayer requests are often shared through text messages or social media. Fundraising campaigns live on separate donation platforms. Announcements are distributed through email, Facebook, or weekly bulletins. Volunteer opportunities become scattered across different communication channels.

While each of these tools serves an individual purpose, they rarely work together as one cohesive experience.

This fragmentation creates several challenges:

* Supporters have limited visibility into how donations are making an impact.
* Community engagement often declines between services, events, or campaigns.
* Administrative teams spend valuable time managing multiple platforms instead of focusing on their mission.
* Members miss opportunities to stay involved through prayer, volunteering, and shared community initiatives.
* Organizations struggle to maintain long-term relationships with supporters beyond individual donations.

Mission-driven organizations thrive when people feel connected—not only to the organization itself, but also to the people, projects, and purpose behind it. Building those connections should be simple, transparent, and accessible from one place.

## The Solution

Community Impact Platform brings fundraising, communication, prayer, and community engagement together into a single mobile experience.

Rather than treating donations as isolated transactions, the platform encourages ongoing participation by allowing supporters to follow fundraising progress, celebrate milestones, share prayer requests, participate in community-wide goals, and stay connected through regular updates.

The objective is not simply to collect donations—it is to strengthen trust, improve transparency, and create a more engaged community around a shared mission.

By replacing several disconnected experiences with one unified platform, organizations can spend less time managing technology and more time serving the people who depend on them.

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

## Current Status

This project is currently an **MVP (Minimum Viable Product)** focused on validating the user experience and overall product concept.

The application is fully interactive, but all data is currently stored using local mock data. This allows the core workflows—including fundraising, prayer requests, community engagement, and shared goals—to be explored without requiring backend infrastructure.

### Current Implementation

* Interactive mobile interface built with Expo and React Native
* Local state management
* Mock fundraising campaigns
* Simulated donation workflow
* Prayer request creation and interaction
* Community feed
* Shared goals and progress tracking

### Planned for Production

* Secure user authentication
* Cloud database
* Persistent user accounts
* Real-time synchronization
* Payment processing
* Push notifications
* Organization administration dashboard
* Volunteer management
* Analytics and reporting

## Getting Started

```bash
npm install
npm start
```

Then scan the QR code with Expo Go, or press `a` / `i` in the terminal for an emulator/simulator.


