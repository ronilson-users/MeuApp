import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomTabBar({ state, descriptors, navigation }) {
 return (
  <View style={styles.tabBar}>
   {state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel || options.title || route.name;

    const isFocused = state.index === index;

    const onPress = () => {
     if (!isFocused) navigation.navigate(route.name);
    };

    const iconName =
     route.name === 'home'
      ? 'home-outline'
      : route.name === 'explore'
       ? 'search-outline'
       : 'qr-code-outline';

    if (route.name === 'qrcode') {
     return (
      <TouchableOpacity
       key={route.key}
       onPress={onPress}
       style={styles.qrButton}
      >
       <Ionicons name="qr-code-outline" size={30} color="#fff" />
      </TouchableOpacity>
     );
    }

    return (
     <TouchableOpacity
      key={route.key}
      onPress={onPress}
      style={styles.tab}
     >
      <Ionicons name={iconName} size={24} color={isFocused ? '#273747' : '#999'} />
      <Text style={{ color: isFocused ? '#273747' : '#999', fontSize: 12 }}>{label}</Text>
     </TouchableOpacity>
    );
   })}
  </View>
 );
}

const styles = StyleSheet.create({
 tabBar: {
  flexDirection: 'row',
  height: 60,
  backgroundColor: '#fff',
  justifyContent: 'space-around',
  alignItems: 'center',
  elevation: 10,
  borderTopWidth: 0.3,
  borderTopColor: '#ccc',
 },
 tab: {
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
 },
 qrButton: {
  position: 'absolute',
  bottom: 70,
  right: 15,
  backgroundColor: '#273747',
  width: 70,
  height: 70,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  alignSelf: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 8,
  elevation: 6,
 },
});