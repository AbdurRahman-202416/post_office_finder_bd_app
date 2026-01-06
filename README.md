# Post Office Finder BD

A mobile application for finding post office locations and details across Bangladesh. Users can search for post offices by postal code to get detailed information about locations, coordinates, and other relevant details.

## Features

- 🔍 Search post offices by postal code
- 📍 View detailed location information including coordinates
- 👤 User profile management with avatar upload
- 📱 Offline support with intelligent caching
- 🔄 Pull-to-refresh functionality
- 🌐 Real-time network status monitoring
- 🗺️ Interactive map integration (Google Maps)
- 💾 Persistent data storage
- ⚡ Optimized performance with React Query
- 🎯 Haptic feedback for better UX
- 🛡️ Comprehensive error handling
- 📊 Type-safe with TypeScript
- 🎨 Clean and intuitive user interface

## Tech Stack

- React Native with Expo
- TypeScript
- NativeWind for styling (Tailwind CSS)
- Expo Router for navigation
- Axios for HTTP requests
- React Native Reanimated for smooth animations

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── (tabs)/                  # Tab navigation group
│   ├── _layout.tsx          # Tab layout configuration
│   ├── index.tsx            # Home screen - postal code search
│   ├── profile.tsx          # Profile screen - user management
│   └── about.tsx            # About screen
├── components/              # Reusable components
│   ├── Loading.tsx          # Loading spinner component
│   ├── ErrorBoundary.tsx    # Error boundary for crash handling
│   ├── OfflineBanner.tsx    # Offline status indicator
│   └── EmptyState.tsx       # Empty state component
├── services/                # API and storage services
│   ├── api.ts               # HTTP client configuration
│   └── storage.ts           # AsyncStorage wrapper with caching
├── hooks/                   # Custom React hooks
│   ├── useDebounce.ts       # Debounce hook for search
│   └── useNetworkStatus.ts  # Network connectivity hook
├── types/                   # TypeScript type definitions
│   └── api.ts               # API and data types
└── global.css               # Global styles
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AbdurRahman-202416/post_office_finder_bd_app.git
   cd post_office_finder_bd_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open the app using one of these options:**
   - Scan the QR code with Expo Go app
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Press 'w' for web browser

## API Integration

The app uses the Zippopotam.us API to fetch post office data for Bangladesh. The API endpoint is configured in `app/services/api.ts`.

Example usage:
- Search postal code "10000" to get post offices in Dhaka area
- Returns location names, coordinates, and region details

## Available Scripts

- `npm start` - Start development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run build:android` - Build Android production app
- `npm run build:ios` - Build iOS production app
- `npm run build:preview` - Build preview version for testing
- `npm run export` - Export static files

## Production Build

For detailed production build and deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Start

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Build for Android**
   ```bash
   npm run build:android
   ```

4. **Build for iOS**
   ```bash
   npm run build:ios
   ```

## Development

This project uses file-based routing with Expo Router. Edit files in the `app/` directory and changes will automatically reload on your device.

### Production Optimizations

This app includes several production-ready optimizations:

- **Offline Support**: Cached search results available offline
- **Error Boundaries**: Graceful error handling with recovery options
- **Network Monitoring**: Real-time connectivity status
- **Performance**: React Query caching, memoization, and lazy loading
- **Type Safety**: Full TypeScript coverage
- **Storage**: Persistent data with AsyncStorage
- **Haptic Feedback**: Enhanced user experience on mobile devices

### Key Technologies

- **React Native 0.81.5** - Mobile framework
- **Expo SDK 54** - Development platform
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS for React Native
- **React Query** - Data fetching and caching
- **Expo Router** - File-based navigation
- **AsyncStorage** - Local data persistence

## Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=https://api.zippopotam.us/bd/
NODE_ENV=development
APP_NAME=Post Office Finder
APP_VERSION=1.0.0
```

## License

MIT
