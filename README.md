# Post Office Finder BD

A mobile application for finding post office locations and details across Bangladesh. Users can search for post offices by postal code to get detailed information about locations, coordinates, and other relevant details.

## Features

- Search post offices by postal code
- View detailed location information including coordinates
- User profile management with avatar upload
- About section with app information
- Clean and intuitive user interface
- Real-time data fetching from postal code API

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
│   └── Loading.tsx          # Loading spinner component
├── services/                # API services
│   └── api.ts               # HTTP client configuration
└── global.css               # Global styles
```

## Installation

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm start
   ```

3. Open the app using one of these options:
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

## Development

This project uses file-based routing with Expo Router. Edit files in the `app/` directory and changes will automatically reload on your device.

## License

MIT
