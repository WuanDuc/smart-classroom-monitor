import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import scale from "@/constants/responsive";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "hidden",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: Colors[colorScheme ?? "light"].background,
          elevation: 0,
          shadowOpacity: 0,
          height: scale(60),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="aboutUs"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "information" : "information-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
