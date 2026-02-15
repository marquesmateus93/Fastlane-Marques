/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Switch,
} from 'react-native';

function App() {
  const navigation = useNavigation();
  const systemDarkMode = useColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const openLinkedInProfile = () => {
    const linkedInUrl = 'https://www.linkedin.com/in/mateus-marques-2832b7161/'; // Substitua pelo link do seu perfil
    Linking.openURL(linkedInUrl).catch((err) =>
      console.error('Failed to open LinkedIn URL:', err)
    );
  };

  const backgroundColor = isDarkMode ? '#000' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: textColor }]}>Marques</Text>

      <Image source={require('./assets/hey_there.png')} style={styles.homeImage} />


      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, { color: textColor }]}>
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#000'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>
      <TouchableOpacity style={styles.linkedInButton} onPress={openLinkedInProfile}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
          }}
          style={styles.linkedInLogo}
        />
        <Text style={[styles.buttonText, { color: '#fff', marginLeft: 10 }]}>
          LinkedIn Profile
        </Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={[styles.footerTitle, { color: textColor }]}>Rate the app</Text>
        <View style={styles.footerButtons}>
          
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('You Are Amazing!')}
          >
            <Text style={[styles.footerButtonText, { color: textColor }]}>Liked</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => navigation.navigate('Ignored!')}
          >
            <Text style={[styles.footerButtonText, { color: textColor }]}>I didn't Like</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  homeImage: {
    width: 300, // Largura da imagem
    height: 300, // Altura da imagem
    marginVertical: 20, // Espaçamento vertical
    resizeMode: 'center', // Ajusta a imagem dentro do espaço definido
  },
  switchContainer: {
    position: 'absolute',
    top: 50,
    left: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  linkedInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#0077B5', // Azul característico do LinkedIn
    marginTop: 20,
  },
  linkedInLogo: {
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#0077B5', // Azul característico do LinkedIn
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  selectedButton: {
    backgroundColor: '#388E3C', // Verde mais escuro para o botão selecionado
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default App;