# Fastlane Marques

I am a DevOps engineer, and this app is intended to serve as a portfolio showcasing my Fastlane expertise. Fastlane is responsible for building and publishing the app to both the App Store and the Google Play Store. The CI/CD pipelines in this project are powered by [Piperoad](https://github.com/marquesmateus93/piperoad), a dedicated project that centralizes and standardizes reusable automation workflows, enabling scalable and maintainable pipeline management.

## About the project

**Fastlane Marques** is a cross-platform mobile application (Android and iOS) built with React Native. The home screen displays the developer’s name, a welcome image, and offers the user:

- **Light/Dark Theme** — toggle between light and dark mode using a switch  
- **LinkedIn Link** — a button that opens the professional LinkedIn profile  
- **App Rating** — options “Liked it” or “Didn’t like it” that lead to different feedback screens  

The navigation flow takes users who liked the app to a thank-you screen, and those who didn’t to another screen with a humorous response.

## Technologies

- **React Native** 0.80  
- **TypeScript**  
- **React Navigation** (Stack Navigator)  
- **Fastlane** — build and publishing automation for App Store and Google Play Store  

## Prerequisites

- **Node.js** >= 18  
- **React Native** — environment set up according to the [official documentation](https://reactnative.dev/docs/set-up-your-environment)  
- **Android Studio** (for Android)  
- **Xcode** (for iOS, macOS only)  

## How to run

1. Run the Android app:
   ```bash
   make start-android
   ```

2. (Optional) Stop the emulator:
   ```bash
   make stop-android
   ```

## Fastlane Setup

The following values are required to run Fastlane lanes:

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VERSION_NAME` | App version (e.g., `1.0.0`). If omitted, the value from `package.json` is used. | ❌ |
| `VERSION_CODE` | Numeric version code (e.g., `1`, `2`, `15`). | ✅ |
| `PACKAGE_NAME` | Package identifier (e.g., `com.fastlanemarques.dev`). Used when `PACKAGE_NAME_BASE` is not defined. | ⚠️ |
| `PACKAGE_NAME_BASE` | Base identifier (e.g., `com.fastlanemarques`). Used together with `FLAVOR` to generate `PACKAGE_NAME_FINAL`. | ⚠️ |
| `FLAVOR` | Flavor name (e.g., `dev`, `prod`). Used when `PACKAGE_NAME_BASE` is defined; in this case `PACKAGE_NAME_FINAL = PACKAGE_NAME_BASE.FLAVOR`. | ⚠️ |

### Environment Files

| File | Path | Description | Required |
|------|------|-------------|----------|
| `Google Service Account (JSON)` | `android/google-service.json` | Service account credentials file used by Fastlane to authenticate and publish the app to the Google Play Store. | ✅ |
| `Keystore (.keystore/.jks)` | `android/key.keystore` | File used to sign the Android app for release builds. | ✅ |
| `keystore.properties` | `android/keystore.properties` | Configuration file containing the keystore path, passwords, and key alias used during the signing process. | ✅ |

**Usage Example:**
```bash
export VERSION_NAME="0.0.1"
export VERSION_CODE="1"
export PACKAGE_NAME="com.fastlanemarques.dev"
cd android && bundle exec fastlane deploy_android
```

## How to test the pipeline locally

You can test the Android deploy pipeline locally using Act, which simulates GitHub Actions on your machine.

### Prerequisites

- [Act](https://github.com/nektos/act)
- [Docker](https://docs.docker.com/desktop/setup/install/mac-install/)

### Tree Files

```
.github/
├── act/
│   ├── pipelines/
│   │   └── deploy-android.yaml      #Act pipeline file
│   ├── secrets                      #Secrets variables file
│   └── workflow_dispatch_event.json #workflow_dispatch event file simulator
```

### Provisioning the secrets

#### Encode the sensitive files

```sh
base64 -i #{YOUR_GOOGLE_SERVICE_ACCOUNT_FILE_PATH}
```
```sh
base64 -i #{YOUR_KEYSTORE_FILE_PATH}
```
```sh
base64 -i #{YOUR_KEYSTORE_PROPERTIES_FILE_PATH}
```

#### Save each value into `.github/act/secrets` file

```sh
GOOGLE_SERVICE_ACCOUNT_JSON='#{YOUR_BASE64_SERVICE_ACCOUNT_ENCODED}'
ANDROID_KEYSTORE='#{YOUR_BASE64_KEYSTORE_ENCODED}'
ANDROID_KEYSTORE_PROPERTIES='#{YOUR_BASE64_KEYSTORE_PROPERTIES_ENCODED}'
```

#### Run the Act

```sh
make act-deploy-android
```