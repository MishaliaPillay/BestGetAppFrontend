import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "", // This hides the title
          headerShown: true, // This keeps the header visible
        }}
      />
    </Stack>
  );
}
