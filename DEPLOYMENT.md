# Deployment Guide - Post Office Finder BD

## Pre-Deployment Checklist

Before deploying to production, ensure you have completed the following:

### 1. Environment Setup
- [ ] Create `.env` file from `.env.example`
- [ ] Configure all environment variables
- [ ] Verify API endpoints are correct for production
- [ ] Test all features in development mode

### 2. Code Quality
- [ ] Run `npm run lint` and fix all errors
- [ ] Run TypeScript type checking: `npx tsc --noEmit`
- [ ] Test on both Android and iOS (if applicable)
- [ ] Test offline functionality
- [ ] Verify all images and assets are optimized

### 3. App Configuration
- [ ] Update version number in `app.json` and `package.json`
- [ ] Update `versionCode` (Android) in `app.json`
- [ ] Set correct bundle identifiers
- [ ] Add privacy policy URL (if required)
- [ ] Configure app icons and splash screens
- [ ] Update app description and metadata

### 4. EAS Configuration
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login to Expo: `eas login`
- [ ] Configure EAS project: `eas build:configure`
- [ ] Update `projectId` in `app.json` with your actual project ID

---

## Building for Production

### Prerequisites

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure Project**
   ```bash
   eas build:configure
   ```

### Android Build

#### APK (for testing)
```bash
npm run build:preview
# or
eas build --platform android --profile preview
```

#### AAB (for Play Store)
```bash
npm run build:android
# or
eas build --platform android --profile production
```

### iOS Build

```bash
npm run build:ios
# or
eas build --platform ios --profile production
```

**Note**: iOS builds require:
- Apple Developer Account ($99/year)
- Certificates and provisioning profiles
- macOS for local builds (or use EAS Build)

### Build Both Platforms

```bash
eas build --platform all --profile production
```

---

## Over-The-Air (OTA) Updates

OTA updates allow you to push JavaScript/asset updates without rebuilding the app.

### Setup

1. Configure in `app.json`:
   ```json
   "updates": {
     "url": "https://u.expo.dev/your-project-id-here"
   }
   ```

2. Publish an update:
   ```bash
   eas update --branch production --message "Bug fixes and improvements"
   ```

### Update Channels

- **production**: For live app users
- **preview**: For internal testing
- **development**: For development builds

---

## App Store Submission

### Google Play Store (Android)

1. **Prepare Store Listing**
   - App name: Post Office Finder
   - Short description (80 chars max)
   - Full description (4000 chars max)
   - Screenshots (at least 2)
   - Feature graphic (1024x500)
   - App icon (512x512)

2. **Build AAB**
   ```bash
   npm run build:android
   ```

3. **Upload to Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Create new app or select existing
   - Upload AAB file
   - Complete store listing
   - Set pricing and distribution
   - Submit for review

### Apple App Store (iOS)

1. **Prepare App Store Connect**
   - Create app in [App Store Connect](https://appstoreconnect.apple.com)
   - Fill in app information
   - Add screenshots for all required device sizes
   - Write app description

2. **Build IPA**
   ```bash
   npm run build:ios
   ```

3. **Upload to App Store**
   - Download IPA from EAS Build
   - Use Transporter app or `eas submit`
   - Submit for review

---

## Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
API_BASE_URL=https://api.zippopotam.us/bd/

# Environment
NODE_ENV=production

# App Configuration
APP_NAME=Post Office Finder
APP_VERSION=1.0.0

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_ERROR_TRACKING=true
```

---

## Testing Production Build

### Android

1. **Install APK on device**
   ```bash
   # Download APK from EAS Build
   adb install path/to/app.apk
   ```

2. **Test all features**
   - Search functionality
   - Location permissions
   - Profile image upload
   - Offline mode
   - Map integration

### iOS

1. **Install via TestFlight**
   - Upload build to App Store Connect
   - Add internal testers
   - Install TestFlight app
   - Download and test

---

## Monitoring and Analytics

### Error Tracking (Optional)

To add Sentry for error tracking:

1. Install Sentry:
   ```bash
   npx expo install @sentry/react-native
   ```

2. Configure in `app.json`:
   ```json
   "plugins": [
     [
       "@sentry/react-native/expo",
       {
         "organization": "your-org",
         "project": "your-project"
       }
     ]
   ]
   ```

3. Initialize in app:
   ```typescript
   import * as Sentry from '@sentry/react-native';
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     enableInExpoDevelopment: false,
   });
   ```

### Analytics (Optional)

Consider adding:
- Firebase Analytics
- Amplitude
- Mixpanel

---

## Troubleshooting

### Build Fails

1. **Clear cache**
   ```bash
   expo start -c
   ```

2. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Check EAS Build logs**
   ```bash
   eas build:list
   ```

### App Crashes

1. Check error logs in EAS Build
2. Test locally with production build
3. Enable Sentry for crash reporting

### OTA Updates Not Working

1. Verify `runtimeVersion` matches
2. Check update channel configuration
3. Ensure app is connected to internet

---

## Version Management

### Semantic Versioning

Follow [semver](https://semver.org/):
- **MAJOR**: Breaking changes (2.0.0)
- **MINOR**: New features (1.1.0)
- **PATCH**: Bug fixes (1.0.1)

### Update Checklist

Before each release:
1. Update `version` in `app.json` and `package.json`
2. Increment `versionCode` (Android) in `app.json`
3. Update `CHANGELOG.md`
4. Create git tag: `git tag v1.0.0`
5. Build and test
6. Submit to stores

---

## Support and Maintenance

### Regular Maintenance

- Monitor crash reports
- Review user feedback
- Update dependencies monthly
- Test on new OS versions
- Optimize performance

### Emergency Updates

For critical bugs:
1. Fix the issue
2. Test thoroughly
3. Push OTA update (if possible)
4. Or submit expedited review to stores

---

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [EAS Update](https://docs.expo.dev/eas-update/introduction/)
- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)

---

## Contact

For deployment issues or questions:
- Developer: Abdur Rahman
- Email: abdurrahman19011@gmail.com
- GitHub: [@AbdurRahman-202416](https://github.com/AbdurRahman-202416)
