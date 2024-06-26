import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Slot } from "expo-router";
import { SessionProvider } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    "Lato-Bold_2": require("@/assets/fonts/Lato-Bold_2.ttf"),
  });
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Lato-Bold_2": require("../assets/fonts/Lato-Bold_2.ttf"),
    "Lato-Hairline_2": require("../assets/fonts/Lato-Hairline_2.ttf"),
    "Lato-Heavy_1": require("../assets/fonts/Lato-Heavy_1.ttf"),
    "Lato-Black_2": require("../assets/fonts/Lato-Black_2.ttf"),
    "Lato-Thin_0": require("../assets/fonts/Lato-Thin_0.ttf"),
    "Lato-Italic_1": require("../assets/fonts/Lato-Italic_1.ttf"),
    "Lato-Light_3": require("../assets/fonts/Lato-Light_3.ttf"),
    "Lato-Regular_2": require("../assets/fonts/Lato-Regular_2.ttf"),
    "Lato-Medium_0": require("../assets/fonts/Lato-Medium_0.ttf"),
  });

  useEffect(() => {
    //loadFonts()
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="ShowImageScreen/index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="History/index"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
