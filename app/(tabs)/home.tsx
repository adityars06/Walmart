import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  const currentHour = new Date().getHours();
  let greeting = "Good morning";

  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  const smartPicks = [
    {
      id: 1,
      name: "Oat Milk",
      brand: "Silk",
      price: "$4.99",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Almond Butter",
      brand: "Justin's",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1601050690591-3131980d4c3e?w=200&h=200&fit=crophttps://images-cdn.ubuy.co.in/63663c231e0d5d200034f742-justin-39-s-classic-no-stir-gluten-free.jpg",
    },
    {
      id: 3,
      name: "Coconut Yogurt",
      brand: "So Delicious",
      price: "$5.49",
      image: "https://images.unsplash.com/photo-1571212515416-6bf6ca2f5847?w=200&h=200&fit=crop",
    },
    {
      id: 4,
      name: "Gluten-Free Bread",
      brand: "Canyon Bakehouse",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
    },
  ];

  const recentScans = [
    {
      id: 1,
      name: "Bread",
      status: "Safe",
      image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=120&h=120&fit=crop",
    },
    {
      id: 2,
      name: "Face Cream",
      status: "Check Required",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop",
    },
    {
      id: 3,
      name: "Shampoo",
      status: "Safe",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=120&h=120&fit=crop",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.greeting}>{greeting}, John</Text>
      <Text style={styles.dietInfo}>You're on a nut-free, dairy-free diet</Text>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About This App</Text>
        <Text style={styles.aboutText}>
          Shop smarter with AI-powered product scanning. We help you identify safe products based on your dietary
          restrictions and suggest better alternatives when needed.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Picks for You</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {smartPicks.map((item) => (
            <TouchableOpacity key={item.id} style={styles.pickCard}>
              <Image source={{ uri: item.image }} style={styles.pickImage} />
              <Text style={styles.pickName}>{item.name}</Text>
              <Text style={styles.pickBrand}>{item.brand}</Text>
              <Text style={styles.pickPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Recent Scans</Text>
        <View style={styles.recentScansContainer}>
          {recentScans.map((item) => (
            <TouchableOpacity key={item.id} style={styles.scanCard}>
              <Image source={{ uri: item.image }} style={styles.scanImage} />
              <View style={styles.scanInfo}>
                <Text style={styles.scanName}>{item.name}</Text>
                <Text style={[styles.scanStatus, { color: item.status === "Safe" ? "#4CAF50" : "#FF9800" }]}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.startScanButton} onPress={() => router.push("/camera")}>
        <Text style={styles.startScanText}>Scan Now</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041f41",
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 20,
    alignSelf: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "left",
    marginBottom: 5,
    fontFamily: "System",
  },
  dietInfo: {
    fontSize: 16,
    color: "#fbbf24",
    textAlign: "left",
    marginBottom: 30,
    fontWeight: "500",
    fontFamily: "System",
  },
  aboutContainer: {
    backgroundColor: "#ffffff10",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  aboutTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "System",
  },
  aboutText: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 22,
    fontFamily: "System",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 15,
    fontFamily: "System",
  },
  horizontalScroll: {
    marginLeft: -20,
    paddingLeft: 20,
  },
  pickCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    width: 140,
    alignItems: "center",
  },
  pickImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  pickName: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "System",
  },
  pickBrand: {
    color: "#bbb",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "System",
  },
  pickPrice: {
    color: "#fbbf24",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "System",
  },
  recentScansContainer: {
    gap: 10,
  },
  scanCard: {
    backgroundColor: "#ffffff15",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  scanInfo: {
    flex: 1,
  },
  scanName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: "System",
  },
  scanStatus: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "System",
  },
  startScanButton: {
    backgroundColor: "#fbbf24",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: "center",
    marginTop: 10,
  },
  startScanText: {
    color: "#041f41",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
  },
  bottomSpacing: {
    height: 30,
  },
});
