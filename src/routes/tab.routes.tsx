import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import { StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Profile from "../screens/Profile";
import { useTheme } from "../context/ThemeContext";
import Query from "../screens/Query";
import shadow from "../utils/styles";
import Duvidas from "../screens/Duvidas";
import Feed from "../screens/Feed";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  const { theme } = useTheme();
  return (
    <>
      <StatusBar
        backgroundColor={theme.COLORS.PRIMARY}
        barStyle="light-content"
      />
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.COLORS.BACKGROUND,
            position: "absolute",
            borderTopColor: theme.COLORS.PRIMARY,
            padding: 15,
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 30,
            borderWidth: 2.5,
            borderColor: theme.COLORS.PRIMARY,
            height: 80,
            ...shadow.shadowOverlay,
          },
        }}
      >
        <Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="heart"
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />

        <Screen
          name="Duvidas"
          component={Duvidas}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="info"
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Screen
          name="Query"
          component={Query}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="calendar"
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="user"
                size={focused ? size + 10 : size}
                color={focused ? theme.COLORS.PRIMARY : theme.COLORS.TITLE}
              />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Navigator>
    </>
  );
}
