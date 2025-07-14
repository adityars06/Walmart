import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Logo Header Component
const LogoHeader = () => (
  <View style={styles.logoHeader}>
    <Image
      source={{
        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
      }}
      style={styles.walmartLogo}
      resizeMode="contain"
    />
  </View>
);

// Community Intro Component
const CommunityIntro = () => (
  <View style={styles.introSection}>
    <Text style={styles.welcomeHeading}>
      Welcome to <Text style={styles.yellowText}>Walmart Community!</Text>
    </Text>
    
    <Image
      source={require('../../assets/images/community/comm.png')}
      style={styles.communityImage}
      resizeMode="contain"
    />
    
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>
        Connect with people who share your lifestyle, goals, and health journeys.
      </Text>
      <Text style={styles.descriptionText}>
        Ask questions, share tips, and explore community events tailored to your interests.
      </Text>
    </View>
  </View>
);

// CTA Button Component
const CTAButton = () => {
  const router = useRouter();
  
  const handleGetStarted = () => {
    router.push('/commsub');
  };

  return (
    <TouchableOpacity 
      style={styles.getStartedButton}
      onPress={handleGetStarted}
      activeOpacity={0.8}
    >
      <Text style={styles.getStartedButtonText}>Get Started</Text>
      <Ionicons name="arrow-forward" size={20} color="#ffffff" style={styles.buttonIcon} />
    </TouchableOpacity>
  );
};

export default function Community() {
  return (
    <View style={styles.container}>
      {/* Background Geometric Shapes */}
      <View style={styles.backgroundShapes}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
        <View style={[styles.shape, styles.shape4]} />
      </View>
      
      <View style={styles.content}>
        <LogoHeader />
        <CommunityIntro />
        <CTAButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f41",
  },
  
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  
  // Logo Header Styles
  logoHeader: {
    alignItems: "center",
    marginBottom: 15,
  },
  walmartLogo: {
    width: 180,
    height: 50,
  },
  
  // Intro Section Styles
  introSection: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  welcomeHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 30,
  },
  yellowText: {
    color: "#ffc220",
  },
  communityImage: {
    width: 280,
    height: 220,
    marginBottom: 15,
  },
  descriptionContainer: {
    paddingHorizontal: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: "#6cace4",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
  
  // CTA Button Styles
  getStartedButton: {
    backgroundColor: "#0071ce",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 5,
  },
  
  // Background Geometric Shapes
  backgroundShapes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  shape: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
  },
  shape1: {
    width: 120,
    height: 120,
    top: 100,
    left: -40,
    transform: [{ rotate: "45deg" }],
  },
  shape2: {
    width: 80,
    height: 80,
    top: 250,
    right: -20,
    borderRadius: 40,
  },
  shape3: {
    width: 100,
    height: 100,
    bottom: 200,
    left: 20,
    transform: [{ rotate: "30deg" }],
  },
  shape4: {
    width: 60,
    height: 60,
    top: 400,
    right: 50,
    borderRadius: 30,
    transform: [{ rotate: "60deg" }],
  },
});
