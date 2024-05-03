See in Docs docs.expo.dev

Step 1: npx create-expo-app ./

Step 2: npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

Step 3: For the property main, use the expo-router/entry as its value in the package.json. The initial client file is app/\_layout.js.

{
"main": "expo-router/entry"
}

Step 4: npx expo start -c 'for starting the expo app'\

Step 5: use nativewind for css styles just like tailwind css https://www.nativewind.dev/quick-starts/expo

Step 6: appwrite for using auth, db go to website ⭐ Appwrite: https://apwr.dev/JavaScriptMastery
com.asjad.aora
