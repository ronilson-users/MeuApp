// app/_layout.tsx ou app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/CustomTabBar'; // Ajuste o caminho

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    />
  );
}