// Expo/MeuApp/app/_layout.jsx
import 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}