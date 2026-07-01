# 🍎 APP STORE SUBMISSION GUIDE

Your iOS app is ready! Follow these steps to submit to the App Store.

---

## 📋 BEFORE YOU START

You need:
1. ✅ Apple Developer Account ($99/year) - https://developer.apple.com
2. ✅ Mac with Xcode installed
3. ✅ Your app bundle ID: `com.gogonegirl.app`

---

## 🔧 STEP 1: Open Project in Xcode

1. **Open Finder**
2. Go to: `/Users/shivanidalakoti/Desktop/workspace/gogonegirl/app/ios/App`
3. **Double-click** `App.xcworkspace` (NOT App.xcodeproj)
4. Xcode opens with your iOS project

---

## 👤 STEP 2: Configure Team & Signing

1. In Xcode, select **"App"** in the left sidebar
2. Click the **"General"** tab
3. Under **"Identity"**, make sure:
   - **Bundle Identifier**: `com.gogonegirl.app`
   - **Version**: `1.0`
   - **Build**: `1`

4. Under **"Signing & Capabilities"**:
   - Click **"+ Capability"**
   - Select **"Push Notifications"** (optional, for later)

5. For **Team**:
   - Click **"Team"** dropdown
   - Select your Apple Developer account
   - Xcode auto-creates provisioning profiles

---

## 📱 STEP 3: Test on Simulator

1. Select **iPhone 15** from the device selector (top left)
2. Click **"Product"** → **"Build"** (or press Cmd+B)
3. Click **"Product"** → **"Run"** (or press Cmd+R)
4. App launches in simulator
5. Test all features work!

---

## 🏪 STEP 4: Create App Store Listing

1. Go to: **https://appstoreconnect.apple.com**
2. Click **"My Apps"**
3. Click **"+"** → **"New App"**
4. Fill in:
   - **Name**: Go Gone Girl
   - **Bundle ID**: com.gogonegirl.app
   - **SKU**: gogonegirl (any unique ID)
   - **Primary Language**: English
5. Click **"Create"**

---

## 📸 STEP 5: Add App Details

In App Store Connect, add:

### General Information
- **Description**: Women-focused travel booking platform for curated trips
- **Keywords**: travel, women, trips, booking
- **Support URL**: https://gogonegirl.vercel.app
- **Privacy Policy URL**: Add a privacy policy (required for App Store)

### App Preview & Screenshots
- Upload 2-5 screenshots showing:
  1. Home page with trips
  2. Trip details
  3. Booking flow
  4. Dashboard

### Pricing & Availability
- Free app (no in-app purchases)
- Available in all countries

---

## 🔒 STEP 6: Privacy Policy (Required!)

Create a simple privacy policy:

```
PRIVACY POLICY

Go Gone Girl collects:
- User email and password (for authentication)
- Booking information (trip selection, dates)
- We do NOT collect location data
- We do NOT share data with third parties

For questions: gogonegirl@gmail.com
```

Add this URL to your website or use a service like:
- https://www.freeprivacypolicy.com

---

## ✅ STEP 7: Build for Release

In Xcode:

1. Select **"Any iOS Device (arm64)"** (not simulator)
2. Click **"Product"** → **"Archive"**
3. Wait for build to complete
4. Window opens with your archive
5. Click **"Distribute App"**
6. Select **"App Store Connect"**
7. Follow the prompts

---

## 📤 STEP 8: Submit to App Store

Back in App Store Connect:

1. Go to your app
2. Click **"App Store"** tab
3. Click **"Prepare for Submission"** button
4. Fill in required info (content rating, etc.)
5. Click **"Submit for Review"**
6. Wait 1-3 days for Apple review ✅

---

## ⏸️ WHAT TO EXPECT

- **Submission Time**: 1-3 days
- **Rejection Reasons**: 
  - Missing privacy policy
  - App crashes
  - Features don't work
- **Approval**: You'll get email when approved
- **Live**: Appears in App Store immediately

---

## 🚀 AFTER APPROVAL

Once live:

1. Share App Store link: `https://apps.apple.com/app/go-gone-girl/id...`
2. Update your website
3. Start marketing!

---

## 📞 TROUBLESHOOTING

**Build fails**: 
- Check you have latest Xcode
- Run `pod install` in ios/App folder

**Signing issues**:
- Check Apple Developer account has active membership
- Try "Automatic" signing in Xcode

**App crashes on device**:
- Check iPhone is on latest iOS
- Check app loads at https://gogonegirl.vercel.app first

---

## 📚 HELPFUL LINKS

- Xcode Build Guide: https://developer.apple.com/documentation/xcode/building-for-the-app-store
- App Store Connect: https://appstoreconnect.apple.com
- Capacitor iOS Guide: https://capacitorjs.com/docs/ios

---

## 🎉 YOU'VE GOT THIS!

Your app is ready. Follow these steps and you'll be in the App Store in a few days!

Questions? The Capacitor docs are excellent: https://capacitorjs.com

Good luck! 🚀
