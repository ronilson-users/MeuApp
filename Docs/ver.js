import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
 View, Text, TouchableOpacity, StyleSheet, Image, Button,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerItem = ({ icon, label, onPress }) => (

 <TouchableOpacity
  onPress={onPress}
  style={styles.drawerItem}>
  <Ionicons
   name={icon} size={20}
   color="#fcfcfc"
   style={styles.drawerIcon} />

  <Text
   style={styles.drawerText}>{label}
  </Text>
 </TouchableOpacity>
);

const CustomDrawer = () => {
 const router = useRouter();
 const [userName, setUserName] = useState('');

 useEffect(() => {
  const loadUserData = async () => {
   try {
    const userData = await AsyncStorage.getItem('userData'); // Exemplo: salva como JSON
    if (userData) {
     const parsed = JSON.parse(userData);
     setUserName(parsed.name || 'Usuário');
    }
   } catch (e) {
    console.error('Erro ao carregar dados do usuário', e);
   }
  };

  loadUserData();
 }, []);

 const handleSignOut = async () => {
  await AsyncStorage.removeItem('userToken');
  router.replace('/');
 };

 const handleGoToProfile = () => {
  router.push('/perfil');
 };

 return (
  <View style={styles.container}>
   {/* Perfil */}
   <View style={styles.profileSection}>
    <Image
     source={require('../assets/images/avatar.png')}
     style={styles.image}
    />
    <View style={{ marginLeft: 10 }}>
     <Text style={styles.profileName}>{userName}</Text>
     <TouchableOpacity onPress={handleGoToProfile}>
      <Text style={styles.profileLink}>Ver perfil</Text>
     </TouchableOpacity>
    </View>
   </View>

   {/* Menu de navegação */}
   <View style={styles.drawerBar}>
    <DrawerItem icon="home" label="Home" onPress={() => router.replace('/(drawer)/home')} />
    <DrawerItem icon="restaurant" label="Abrir Mesa" onPress={() => router.replace('/(drawer)/abrir-mesa')} />
    <DrawerItem icon="create" label="Criar Mesa" onPress={() => router.replace('/(drawer)/criar-mesa')} />
    <DrawerItem icon="receipt" label="Pedido" onPress={() => router.replace('/(drawer)/pedido-mesa')} />
   </View>

   {/* Logout */}
   <View style={styles.logoutSection}>
    <Button title="Sign Out" onPress={handleSignOut} color="#ff5555" />
   </View>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#273747',
  justifyContent: 'space-between',
 },
 profileSection: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 25,
 },
 profileName: {
  color: '#fcfcfc',
  fontSize: 18,
  fontWeight: 'bold',
 },
 profileLink: {
  color: '#80d4ff',
  fontSize: 14,
  marginTop: 4,
 },
 image: {
  width: 60,
  height: 60,
  borderRadius: 30,
 },
 drawerBar: {
  marginTop: 20,
 },
 drawerItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 10,
 },
 drawerIcon: {
  marginRight: 10,
 },
 drawerText: {
  color: '#fcfcfc',
  fontSize: 16,
 },
 logoutSection: {
  marginBottom: 20,
 },
});

export default CustomDrawer;