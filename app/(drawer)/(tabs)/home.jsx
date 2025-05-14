import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ButtonComponent from '@/components/ButtonComponent.jsx'


export default function HomeScreen() {
  const router = useRouter();
 
  useEffect(() => {
   const checkAuth = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (!userToken) {
     router.push('/SignInScreen');
    }
   };
 
   checkAuth();
  }, []);
 
  return (
   <View style={styles.container}>
    <Text>Bem Vindo a Home Sceen</Text>
    <ButtonComponent
     title="Logout"
     onPress={async () => {
      await AsyncStorage.removeItem('userToken');
      router.push('/SignInScreen');
     }}
    />
   </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 },
 title: {
  color: '#242424',
 }
});
