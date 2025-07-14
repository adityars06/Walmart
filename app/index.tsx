import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginSignup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Shapes */}
      <View style={styles.backgroundShapes}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
      </View>

      {/* Language Selector - Top Right */}
      <TouchableOpacity style={styles.languageSelector}>
        <Text style={styles.languageText}>🌐 English ▼</Text>
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Welcome to</Text>
        <View style={styles.brandContainer}>
          <Image 
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png"
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandTitle}>TrueCart+</Text>
        </View>
        
        {/* Tagline */}
        <Text style={styles.tagline}>
          Your health, your stats, your lifestyle — Walmart shopping made personal.
        </Text>
        
        {/* Bitmoji Avatar */}
        <Image
          source={require('../assets/images/bitmoji/index/index1.png')}
          style={styles.bitmojiImage}
          resizeMode="contain"
        />
      </View>

      {/* Login/Signup Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => {
            router.push('/userInfo');
          }}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => {
            router.push('/userInfo');
          }}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Features */}
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>🛡️</Text>
          <Text style={styles.featureText}>Allergy Protection</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>💚</Text>
          <Text style={styles.featureText}>Smart Shopping</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>⏰</Text>
          <Text style={styles.featureText}>Save Time</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>💰</Text>
          <Text style={styles.featureText}>Curated Deals</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041f41',
    justifyContent: 'space-between',
  },
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  shape: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
  },
  shape1: {
    width: 120,
    height: 120,
    top: 100,
    left: -40,
    transform: [{ rotate: '45deg' }],
  },
  shape2: {
    width: 80,
    height: 80,
    top: 200,
    right: -20,
    borderRadius: 40,
  },
  shape3: {
    width: 100,
    height: 100,
    bottom: 150,
    left: 20,
    transform: [{ rotate: '30deg' }],
  },
  languageSelector: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  languageText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  headerSection: {
    paddingTop: 120,
    paddingHorizontal: 30,
    alignItems: 'center',
    zIndex: 5,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 140,
    height: 42,
    marginRight: 12,
  },
  brandTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
    marginBottom: 15,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  bitmojiImage: {
    width: 180,
    height: 180,
    marginVertical: 20,
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    zIndex: 5,
  },
  loginButton: {
    backgroundColor: '#ffc220',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: '#041f41',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    paddingBottom: 50,
    zIndex: 5,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureText: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
});
