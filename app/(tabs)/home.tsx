import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [showLocationLoading, setShowLocationLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [loadingText, setLoadingText] = useState("Analyzing your location...");
  
  // Animation refs for loading spinner
  const spinnerAnim1 = useRef(new Animated.Value(0)).current;
  const spinnerAnim2 = useRef(new Animated.Value(0)).current;
  const spinnerAnim3 = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentHour = new Date().getHours();
  let greeting = "Good evening";

  const fullTypewriterText = "Good evening, Peter!";

  // Typewriter effect
  useEffect(() => {
    if (typewriterIndex < fullTypewriterText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(prev => prev + fullTypewriterText[typewriterIndex]);
        setTypewriterIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typewriterIndex]);

  const handleLocationPermissionAllow = () => {
    setShowLocationPermission(false);
    setShowLocationLoading(true);
    
    // Start spinner animation
    const createSpinnerAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };
    
    // Start all spinner animations
    createSpinnerAnimation(spinnerAnim1, 0).start();
    createSpinnerAnimation(spinnerAnim2, 200).start();
    createSpinnerAnimation(spinnerAnim3, 400).start();
    
    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();
    
    // Simulate location fetching process
    const loadingSteps = [
      "Analyzing your location...",
      "Finding nearby Walmart stores...",
      "Checking store availability...",
      "Almost done..."
    ];
    
    let stepIndex = 0;
    const loadingInterval = setInterval(() => {
      if (stepIndex < loadingSteps.length - 1) {
        stepIndex++;
        setLoadingText(loadingSteps[stepIndex]);
      }
    }, 1000);
    
    // Complete the process after 4 seconds
    setTimeout(() => {
      clearInterval(loadingInterval);
      setShowLocationLoading(false);
      setSelectedLocation("Sacramento Supercenter Walmart");
      // Reset animations
      spinnerAnim1.setValue(0);
      spinnerAnim2.setValue(0);
      spinnerAnim3.setValue(0);
      progressAnim.setValue(0);
    }, 4000);
  };

  const handleLocationPermissionDeny = () => {
    setShowLocationPermission(false);
  };

  const smartPicks = [
    {
      id: 1,
      name: "Quinoa Packs",
      brand: "Kirkland Signature",
      price: "$8.99",
      image: require('../../assets/images/home/smartpick/quinoapacks-kirkland.avif'),
    },
    {
      id: 2,
      name: "Biotin Shampoo",
      brand: "OGX",
      price: "$6.49",
      image: require('../../assets/images/home/smartpick/shampoo-biotin.webp'),
    },
    {
      id: 3,
      name: "Coconut Water",
      brand: "Vita Coco",
      price: "$5.49",
      image: require('../../assets/images/home/smartpick/coconut-water.avif'),
    },
    {
      id: 4,
      name: "Pure Protein Bar",
      brand: "Pure Protein",
      price: "$12.99",
      image: require('../../assets/images/home/smartpick/pureprotein.avif'),
    },
    {
      id: 5,
      name: "Gatorade",
      brand: "Gatorade",
      price: "$4.99",
      image: require('../../assets/images/need of the hour/gatorade.jpeg'),
    },
  ];

  const discountPicks = [
    {
      id: 1,
      name: "Organic Almonds",
      brand: "Blue Diamond",
      originalPrice: "$9.99",
      discountPrice: "$6.99",
      discount: "30% OFF",
      image: require('../../assets/images/home/discount/organic almonds.webp'),
    },
    {
      id: 2,
      name: "Greek Yogurt",
      brand: "Chobani",
      originalPrice: "$5.49",
      discountPrice: "$3.99",
      discount: "27% OFF",
      image: require('../../assets/images/home/discount/greek yogurt.jpeg'),
    },
    {
      id: 3,
      name: "Vitamin D3",
      brand: "Nature Made",
      originalPrice: "$12.99",
      discountPrice: "$8.99",
      discount: "31% OFF",
      image: require('../../assets/images/home/discount/vitamin d3.jpeg'),
    },
    {
      id: 4,
      name: "Organic Honey",
      brand: "Nature Nate's",
      originalPrice: "$7.99",
      discountPrice: "$5.49",
      discount: "31% OFF",
      image: require('../../assets/images/home/discount/organic honey.webp'),
    },
    {
      id: 5,
      name: "Protein Powder",
      brand: "Optimum Nutrition",
      originalPrice: "$39.99",
      discountPrice: "$29.99",
      discount: "25% OFF",
      image: require('../../assets/images/home/discount/organic honey.webp'),
    },
  ];

  const recentScans = [
    {
      id: 1,
      name: "Canyon Bakers Bread",
      status: "Safe",
      statusDetail: "",
      image: require('../../assets/images/home/recentScans/CanyonBakehouse bread.webp'),
    },
    {
      id: 2,
      name: "Puracy Shampoo",
      status: "Unsafe",
      statusDetail: "Contains parabens - not suitable for thin hair",
      image: require('../../assets/images/home/recentScans/puracy-shampoo-citrus.webp'),
    },
    {
      id: 3,
      name: "Chicken Party Wings",
      status: "Safe",
      statusDetail: "",
      image: require('../../assets/images/home/recentScans/Chicken Party Wings.webp'),
    },
    {
      id: 4,
      name: "Sunscreen",
      status: "Cautious",
      statusDetail: "Contains Homosalate - may disrupt hormone levels",
      image: require('../../assets/images/home/recentScans/sunscreen.webp'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity 
          style={styles.locationButton} 
          onPress={() => setShowLocationPermission(true)}
        >
          <Text style={styles.locationIcon}>🏪</Text>
          <Text style={styles.locationText}>
            {selectedLocation || "Select your location"}
          </Text>
        </TouchableOpacity>
        
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
          }}
          style={styles.topLogo}
          resizeMode="contain"
        />
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.typewriterText}>{typewriterText}</Text>
          <View style={styles.cursor} />
        </View>

        {/* Health Stats Card */}
        <View style={styles.healthStatsCard}>
          <View style={styles.healthStatsHeader}>
            <Image
              source={require('../../assets/images/fitness-icon/tracker.png')}
              style={styles.trackerIcon}
              resizeMode="contain"
            />
            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statIconText}>👣</Text>
                  </View>
                  <Text style={styles.statValue}>12,391</Text>
                  <Text style={styles.statLabel}>Steps</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statIconText}>🔥</Text>
                  </View>
                  <Text style={styles.statValue}>193</Text>
                  <Text style={styles.statLabel}>Calories</Text>
                </View>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statIconText}>⏰</Text>
                  </View>
                  <Text style={styles.statValue}>98</Text>
                  <Text style={styles.statLabel}>Active Min</Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <Text style={styles.statIconText}>🚴‍♂️</Text>
                  </View>
                  <Text style={styles.statValue}>3 km</Text>
                  <Text style={styles.statLabel}>Cycling</Text>
                </View>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.tailoredButton}
            onPress={() => router.push('/tailoredSection')}
          >
            <Text style={styles.tailoredButtonText}>Tailored Products for You</Text>
          </TouchableOpacity>
        </View>

        {/* Smart Picks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Smart Picks for You</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {smartPicks.map((item) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            ))}
            <TouchableOpacity style={styles.discoverMoreCard}>
              <View style={styles.discoverMoreIcon}>
                <Text style={styles.discoverMoreIconText}>🔍</Text>
              </View>
              <Text style={styles.discoverMoreText}>Discover More</Text>
              <Text style={styles.discoverMoreArrow}>→</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Discount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏷️ Discounts In Store</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {discountPicks.map((item) => (
              <View key={item.id} style={styles.discountCard}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>{item.discount}</Text>
                </View>
                <Image source={item.image} style={styles.productImage} />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productBrand}>{item.brand}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                  <Text style={styles.discountPrice}>{item.discountPrice}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Scans Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Recent Scans</Text>
          <View style={styles.recentScansContainer}>
            {recentScans.map((item) => (
              <TouchableOpacity key={item.id} style={styles.recentScanCard}>
                <Image source={item.image} style={styles.recentScanImage} />
                <View style={styles.recentScanInfo}>
                  <Text style={styles.recentScanName}>{item.name}</Text>
                  <Text style={[
                    styles.recentScanStatus, 
                    { 
                      color: item.status === "Safe" ? "#22c55e" : 
                            item.status === "Unsafe" ? "#ef4444" : 
                            item.status === "Cautious" ? "#f59e0b" : "#ffc220" 
                    }
                  ]}>
                    {item.status}
                  </Text>
                  {item.statusDetail && (
                    <Text style={styles.recentScanDetail}>{item.statusDetail}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Scans</Text>
            <Text style={styles.viewAllArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Location Permission Modal */}
      <Modal
        visible={showLocationPermission}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationPermission(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.permissionModalContent}>
            <View style={styles.permissionIconContainer}>
              <Text style={styles.permissionIcon}>📍</Text>
            </View>
            <Text style={styles.permissionTitle}>Allow Location Access</Text>
            <Text style={styles.permissionMessage}>
              Walmart TrueCart+ would like to access your location to show nearby stores and provide personalized shopping experience.
            </Text>
            <View style={styles.permissionButtons}>
              <TouchableOpacity 
                style={styles.permissionDenyButton} 
                onPress={handleLocationPermissionDeny}
              >
                <Text style={styles.permissionDenyText}>Don't Allow</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.permissionAllowButton} 
                onPress={handleLocationPermissionAllow}
              >
                <Text style={styles.permissionAllowText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Location Loading Modal */}
      <Modal
        visible={showLocationLoading}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.loadingModalContent}>
            <View style={styles.loadingSpinner}>
              <Animated.View style={[
                styles.spinnerDot1,
                {
                  opacity: spinnerAnim1,
                  transform: [{ 
                    scale: spinnerAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3]
                    })
                  }]
                }
              ]} />
              <Animated.View style={[
                styles.spinnerDot2,
                {
                  opacity: spinnerAnim2,
                  transform: [{ 
                    scale: spinnerAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3]
                    })
                  }]
                }
              ]} />
              <Animated.View style={[
                styles.spinnerDot3,
                {
                  opacity: spinnerAnim3,
                  transform: [{ 
                    scale: spinnerAnim3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3]
                    })
                  }]
                }
              ]} />
            </View>
            <Text style={styles.loadingTitle}>{loadingText}</Text>
            <View style={styles.loadingProgress}>
              <Animated.View style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f41",
  },
  
  // Top Bar Styles
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#041f41",
    borderBottomWidth: 1,
    borderBottomColor: "#0071ce",
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 10,
  },
  locationIcon: {
    fontSize: 18,
    color: "#ffc220",
    marginRight: 8,
  },
  locationText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
    flexWrap: "wrap",
  },
  topLogo: {
    width: 120,
    height: 40,
  },
  
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  
  // Greeting Section
  greetingSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 25,
  },
  typewriterText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    lineHeight: 30,
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: "#ffc220",
    marginLeft: 2,
  },
  
  // Health Stats Card
  healthStatsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  healthStatsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  trackerIcon: {
    width: 140,
    height: 140,
    marginRight: 10,
  },
  healthStatsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  statsContainer: {
    flex: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff20",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 18,
    color: "#ffffff",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
  },
  healthMessage: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  tailoredButton: {
    backgroundColor: "#ffc220",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  tailoredButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#041f41",
  },
  
  // Sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
  },
  
  // Horizontal Scroll
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  horizontalScrollContent: {
    paddingRight: 20,
  },
  
  // Product Cards
  productCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 160,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6cace4",
  },
  productImage: {
    width: 130,
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
    textAlign: "center",
  },
  productBrand: {
    fontSize: 12,
    color: "#6cace4",
    marginBottom: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffc220",
  },
  
  // Discover More Card
  discoverMoreCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: 160,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#ffc220",
    borderStyle: "dashed",
    alignSelf: "center",
    marginTop: 50,
  },
  discoverMoreIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ffc220",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  discoverMoreIconText: {
    fontSize: 16,
    color: "#041f41",
  },
  discoverMoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
    textAlign: "center",
  },
  discoverMoreArrow: {
    fontSize: 16,
    color: "#ffc220",
    fontWeight: "bold",
  },
  
  // Discount Cards
  discountCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 160,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffc220",
    position: "relative",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ffc220",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#041f41",
  },
  priceContainer: {
    alignItems: "center",
  },
  originalPrice: {
    fontSize: 12,
    color: "#6cace4",
    textDecorationLine: "line-through",
    marginBottom: 2,
  },
  discountPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffc220",
  },
  
  // Recent Scans
  recentScansContainer: {
    gap: 12,
  },
  recentScanCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6cace4",
  },
  recentScanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  recentScanInfo: {
    flex: 1,
  },
  recentScanName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 6,
  },
  recentScanStatus: {
    fontSize: 14,
    fontWeight: "500",
  },
  recentScanDetail: {
    fontSize: 12,
    color: "#6cace4",
    marginTop: 4,
    lineHeight: 16,
  },
  
  // View All Button
  viewAllButton: {
    backgroundColor: "#ffffff15",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6cace4",
  },
  viewAllButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    marginRight: 8,
  },
  viewAllArrow: {
    fontSize: 16,
    color: "#ffc220",
    fontWeight: "bold",
  },
  
  // Modal Overlay
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(4, 31, 65, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  
  // Permission Modal Styles
  permissionModalContent: {
    backgroundColor: "#041f41",
    borderRadius: 20,
    padding: 30,
    width: "100%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#6cace4",
    alignItems: "center",
  },
  permissionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0071ce",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  permissionIcon: {
    fontSize: 24,
    color: "#ffffff",
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 15,
  },
  permissionMessage: {
    fontSize: 16,
    color: "#6cace4",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButtons: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  permissionDenyButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: "#6cace4",
    alignItems: "center",
  },
  permissionDenyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6cace4",
  },
  permissionAllowButton: {
    flex: 1,
    backgroundColor: "#0071ce",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  permissionAllowText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  
  // Loading Modal Styles
  loadingModalContent: {
    backgroundColor: "#041f41",
    borderRadius: 20,
    padding: 40,
    width: "100%",
    maxWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 2,
    borderColor: "#6cace4",
    alignItems: "center",
  },
  loadingSpinner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    height: 40,
  },
  spinnerDot1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0071ce",
    marginHorizontal: 2,
    transform: [{ scale: 1 }],
  },
  spinnerDot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#6cace4",
    marginHorizontal: 2,
    transform: [{ scale: 1.2 }],
  },
  spinnerDot3: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ffc220",
    marginHorizontal: 2,
    transform: [{ scale: 1 }],
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 25,
  },
  loadingProgress: {
    width: "100%",
    height: 4,
    backgroundColor: "#ffffff15",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#0071ce",
    borderRadius: 2,
  },
});
