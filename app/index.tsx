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
        <Text style={styles.subtitle}>
          Personalize your Walmart shopping with health-smart alerts and product guidance – tailored just for you.
        </Text>
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
          <Text style={styles.featureEmoji}>🥗</Text>
          <Text style={styles.featureText}>Smart Nutrition</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureEmoji}>⏰</Text>
          <Text style={styles.featureText}>Save Time</Text>
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
    paddingTop: 140,
    paddingHorizontal: 30,
    alignItems: 'center',
    zIndex: 5,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '300',
    marginBottom: 20,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 50,
    marginRight: 15,
  },
  brandTitle: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
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
