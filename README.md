# Gather.io - Developer Events Platform

![Gather.io](https://img.shields.io/badge/Gather.io-Developer%20Events%20Platform-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

A modern, responsive Progressive Web App for discovering and creating developer events, meetups, and conferences worldwide.

## 🚀 Live Demo

**Production URL:** [https://gatherio.netlify.app](https://gatherio.netlify.app)

## ✨ Features

### Core Features
- **Event Discovery** - Browse upcoming developer events with advanced filtering
- **Event Creation** - Comprehensive event creation with image upload
- **PWA Support** - Installable app with offline functionality
- **Real-time Search** - Search events by title, description, and tags
- **Multi-view Layout** - Grid and list views for events
- **Responsive Design** - Mobile-first design that works on all devices

### Technical Features
- **Next.js 16** - App Router with Server-Side Rendering
- **TypeScript** - Fully typed for better development experience
- **MongoDB Atlas** - Cloud database with optimized queries
- **Cloudinary** - Image upload and optimization
- **PWA** - Service worker, offline support, and app-like experience
- **Modern UI** - Tailwind CSS with custom design system

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful SVG icons
- **OGL** - WebGL background effects

### Backend
- **Next.js API Routes** - Serverless functions
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image and media management

### Deployment & Infrastructure
- **Netlify** - Hosting and continuous deployment
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - CDN for images

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Cloudinary account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/pborade90/gatherio.git
cd gatherio
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables**
```env
# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_URL=cloudinary://key:secret@cloud_name

# PostHog (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
gatherio/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   ├── events/        # Events CRUD operations
│   │   └── upload/        # Image upload handling
│   ├── events/            # Events pages
│   ├── create-event/      # Event creation page
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
│   ├── EventCard.tsx     # Event card component
│   ├── EventDetails.tsx  # Event details page
│   ├── CreateEventForm.tsx # Event creation form
│   ├── Navbar.tsx        # Navigation component
│   └── LightRays.tsx     # Background animation
├── database/             # Database models and types
│   ├── event.model.ts    # Mongoose event model
│   └── index.ts          # Database connection
├── lib/                  # Utility libraries
│   ├── actions/          # Server actions
│   ├── constants.ts      # Application constants
│   ├── utils.ts          # Helper functions
│   └── mongodb.ts        # MongoDB connection
├── public/               # Static files
│   ├── icons/            # PWA icons
│   ├── manifest.json     # PWA manifest
│   └── sw.js            # Service worker
└── types/               # TypeScript type definitions
```

## 🚀 Deployment

### Netlify Deployment

1. **Connect Repository**
   - Fork this repository
   - Connect your GitHub repo to Netlify

2. **Environment Variables**
   - Set all environment variables in Netlify dashboard
   - `Site settings` → `Environment variables`

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Deploy**
   - Netlify will auto-deploy on git push
   - Or trigger manual deploy from Netlify dashboard

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_BASE_URL=https://your-domain.netlify.app
CLOUDINARY_URL=your_cloudinary_url
# ... other variables same as development
```

## 📱 PWA Features

- **Installable** - Add to home screen on mobile and desktop
- **Offline Support** - Basic functionality works offline
- **Fast Loading** - Service worker caching for performance
- **App-like Experience** - Full-screen mode on mobile

### Testing PWA
```bash
# Build and test PWA locally
npm run build
npm start

# Test with Lighthouse
# Open Chrome DevTools → Lighthouse → Run PWA audit
```

## 🗄 Database Schema

### Event Model
```typescript
interface IEvent {
  _id: ObjectId;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  organizer: string;
  tags: string[];
  agenda: string[];
  price?: number;
  capacity?: number;
  registrationUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 API Endpoints

### Events API
- `GET /api/events` - Get events with pagination and filtering
- `GET /api/events/[slug]` - Get single event by slug
- `POST /api/events` - Create new event
- `POST /api/upload` - Handle image uploads


## 🎨 UI Components

### Design System
- **Colors**: Custom gradient system with primary and accent colors
- **Typography**: Inter font family
- **Spacing**: 8px base unit system
- **Components**: Reusable card, button, and form components

### Key Components
- `EventCard` - Event listing card
- `CreateEventForm` - Multi-step event creation
- `LightRays` - Animated WebGL background
- `BookEvent` - Event registration form

## 🤝 Contributing

This project is only for educational purpose


### Code Style
- TypeScript strict mode enabled
- ESLint and Prettier configuration
- Component-driven development
- Mobile-first responsive design

## 🐛 Troubleshooting

### Common Issues

**Event details 404 on Netlify**
- Check MongoDB Atlas network access
- Verify environment variables in Netlify
- Test API endpoints directly

**Image upload failures**
- Verify Cloudinary configuration
- Check file size and format restrictions
- Review Cloudinary dashboard for errors

**PWA installation issues**
- Ensure manifest.json is accessible
- Check service worker registration
- Verify HTTPS in production


## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - Database solution
- **Cloudinary** - Image management platform

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ for the developer community**

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

</div>
