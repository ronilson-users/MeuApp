import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerItem = ({ icon, label, onPress }) => (
 <TouchableOpacity onPress={onPress} style={styles.drawerItem}>
  <Ionicons name={icon} size={20} color="#fcfcfc" style={styles.drawerIcon} />
  <Text style={styles.drawerText}>{label}</Text>
 </TouchableOpacity>
);

const CustomDrawer = () => {
 const router = useRouter();

 const handleSignOut = async () => {
  await AsyncStorage.removeItem('userToken');
  router.replace('/');
 };

 return (
  <View style={styles.container}>
   {/* Perfil */}
   <View style={styles.profileSection}>
    <Image
     source={require('../assets/images/avatar.png')}
     style={styles.image}
    />
    <Text style={styles.profileName}>{ }</Text>
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
  marginLeft: 10,
  fontSize: 18,
  fontWeight: 'bold',
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