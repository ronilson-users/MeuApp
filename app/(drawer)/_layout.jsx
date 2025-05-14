import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../../components/CustonDrawer';
import { useAuth } from '../../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';
import { Redirect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // Added for icons

export default function DrawerLayout() {
 const { user, loading } = useAuth();

 if (loading) {
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" />
   </View>
  );
 }

 if (!user) {
  return <Redirect href="/(auth)/SignInScreen" />;
 }

 return (
  <Drawer
   drawerContent={(props) => <CustomDrawer {...props} />}
   screenOptions={{
    headerShown: true,
    drawerStyle: {
     backgroundColor: '#2b3034',
     width: 240,
    },
    headerTintColor: '#fff',
    headerStyle: {
     backgroundColor: '#273747',
    },
    drawerActiveTintColor: '#fff',
    drawerInactiveTintColor: '#aaa',
   }}
   initialRouteName="(tabs)"
  >
   {/* Groups of routes */}
   <Drawer.Screen
    name="(tabs)"
    options={{
     title: 'Início',
     drawerLabel: 'Início',
     drawerIcon: ({ color, size }) => (
      <MaterialIcons name="home" size={size} color={color} />
     )
    }}
   />

   {/* Individual routes */}
   <Drawer.Screen
    name="abrir-mesa"
    options={{
     title: 'Abrir Mesa',
     drawerLabel: 'Abrir Mesa',
     drawerIcon: ({ color, size }) => (
      <MaterialIcons name="restaurant" size={size} color={color} />
     )
    }}
   />
   <Drawer.Screen
    name="criar-mesa"
    options={{
     title: 'Criar Mesa',
     drawerLabel: 'Criar Mesa',
     drawerIcon: ({ color, size }) => (
      <MaterialIcons name="add-circle" size={size} color={color} />
     )
    }}
   />
   <Drawer.Screen
    name="pedido-mesa"
    options={{
     title: 'Pedido Mesa',
     drawerLabel: 'Pedido Mesa',
     drawerIcon: ({ color, size }) => (
      <MaterialIcons name="shopping-cart" size={size} color={color} />
     )
    }}
   />
  </Drawer>
 );
}