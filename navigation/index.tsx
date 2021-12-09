import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import SvgIconSet from "../assets/images/icons/SvgIconSet";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../src/screens/HomeScreen";
import InsuranceScreen from "../src/screens/InsuranceScreen";
import InventoryScreen from "../src/screens/InventoryScreen";
import MenuScreen from "../src/screens/MenuScreen";
import NotFoundScreen from "../src/screens/NotFoundScreen";
import PostModalScreen from "../src/screens/PostModalScreen";
import RealtyScreen from "../src/screens/RealtyScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="PostModal"
          component={PostModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Inventory"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          tabBarIcon: ({ focused }) => (
            <SvgIconSet.HomeTabIcon focused={focused} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Insurance"
        component={InsuranceScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <SvgIconSet.InsuranceTabIcon focused={focused} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={({ navigation }: RootTabScreenProps<"Inventory">) => ({
          tabBarIcon: ({ focused }) => (
            <SvgIconSet.InventoryTabIcon focused={focused} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Realty"
        component={RealtyScreen}
        options={({ navigation }: RootTabScreenProps<"Realty">) => ({
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuScreen}
        options={({ navigation }: RootTabScreenProps<"Menu">) => ({
          tabBarIcon: ({ focused }) => (
            <SvgIconSet.MenuTabIcon focused={focused} />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={22} {...props} />;
}
