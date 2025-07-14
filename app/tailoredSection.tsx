import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// Partner Carousel Component
const PartnerCarousel = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const partners = [
    { id: 1, name: 'Gluten Free', image: require('../assets/images/banner/glutenfree.webp') },
    { id: 2, name: 'Garmin', image: require('../assets/images/banner/garmin.jpg') },
    { id: 3, name: 'Cycles', image: require('../assets/images/banner/cycle.jpg') },
    { id: 4, name: 'Prime', image: require('../assets/images/banner/prime.jpeg') },
  ];

  const cardWidth = screenWidth - 60; // Leaving 30px margin on each side
  const cardMargin = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % partners.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * (cardWidth + cardMargin),
          animated: true,
        });
        return nextIndex;
      });
    }, 4000); // Increased to 4 seconds for better viewing

    return () => clearInterval(interval);
  }, [partners.length, cardWidth, cardMargin]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.partnerCarousel}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.partnerScrollContent}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        snapToInterval={cardWidth + cardMargin}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {partners.map((partner, index) => {
          const inputRange = [
            (index - 1) * (cardWidth + cardMargin),
            index * (cardWidth + cardMargin),
            (index + 1) * (cardWidth + cardMargin),
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={partner.id}
              style={[
                styles.partnerCard3D,
                {
                  width: cardWidth,
                  transform: [{ scale }, { translateY }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity style={styles.partnerCardInner}>
                <Image 
                  source={partner.image} 
                  style={styles.partnerImage} 
                  resizeMode="cover" 
                />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {partners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { opacity: currentIndex === index ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Countdown Timer Component
const CountdownTimer = ({ endTime }: { endTime: string }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 55 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.countdownContainer}>
      <Text style={styles.countdownLabel}>Offer ends in</Text>
      <View style={styles.countdownTimer}>
        <Text style={styles.countdownTime}>
          {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </Text>
      </View>
    </View>
  );
};

// Product Section Component
const ProductSection = ({ title, products, showCountdown = false }: {
  title: string;
  products: any[];
  showCountdown?: boolean;
}) => {
  return (
    <View style={styles.productSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        {products.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image 
              source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
              style={styles.productImage} 
            />
            {product.badge && (
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeText}>{product.badge}</Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <View style={styles.priceContainer}>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                )}
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              {showCountdown && <CountdownTimer endTime="02:34:55" />}
              {product.hasOnlineLink && (
                <TouchableOpacity 
                  style={styles.onlineLinkButton}
                  onPress={() => {
                    if (product.productUrl) {
                      // In a real app, you would use Linking.openURL(product.productUrl)
                      console.log('Opening product URL:', product.productUrl);
                    }
                  }}
                >
                  <Text style={styles.onlineLinkText}>{product.onlineText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
        
        {/* View All Card */}
        <TouchableOpacity style={styles.viewAllCard}>
          <View style={styles.viewAllIconContainer}>
            <Text style={styles.viewAllIcon}>→</Text>
          </View>
          <View style={styles.viewAllInfo}>
            <Text style={styles.viewAllText}>View All</Text>
            <Text style={styles.viewAllSubtext}>{title}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// Main Tailored Section Component
export default function TailoredSection() {
  const router = useRouter();

  // Dummy data
  const needOfTheHourProducts = [
    {
      id: 1,
      name: 'Protein Bar',
      brand: 'RiteBite',
      price: '$12.99',
      image: require('../assets/images/need of the hour/proteinbar.webp'),
    },
    {
      id: 2,
      name: 'Electrolyte Drink',
      brand: 'Gatorade',
      price: '$4.99',
      image: require('../assets/images/need of the hour/gatorade.jpeg'),
    },
    {
      id: 3,
      name: 'Cooling Pad',
      brand: 'IcyHot',
      price: '$8.99',
      image: require('../assets/images/need of the hour/coolingpad.png'),
    },
    {
      id: 4,
      name: 'Multivitamins',
      brand: 'vedamins',
      price: '$15.99',
      image: require('../assets/images/need of the hour/multivitamins.jpg'),
    },
  ];

  const bikerProducts = [
    {
      id: 1,
      name: 'Cycling Gloves',
      brand: 'Pearl Izumi',
      price: '$29.99',
      image: require('../assets/images/trending/gloves.jpg'),
    },
    {
      id: 2,
      name: 'Bike Helmet',
      brand: 'Giro',
      price: '$89.99',
      image: require('../assets/images/trending/helmet.webp'),
    },
    {
      id: 3,
      name: 'Garmin Edge 530',
      brand: 'Garmin',
      price: '$299.99',
      image: require('../assets/images/trending/garmin-edge-530.webp'),
    },
    {
      id: 4,
      name: 'Hydration Pack',
      brand: 'CamelBak',
      price: '$79.99',
      image: require('../assets/images/trending/camelback hydration pack.jpg'),
    },
  ];

  const celiacProducts = [
    {
      id: 1,
      name: 'Almond Cookies',
      brand: 'Wheat Free',
      price: '$8.99',
      image: require('../assets/images/must try/Almond cookies wheafree.webp'),
    },
    {
      id: 2,
      name: 'HighKey Cookies',
      brand: 'HighKey',
      price: '$6.99',
      image: require('../assets/images/must try/Highkey cookies.webp'),
    },
    {
      id: 3,
      name: 'Glutino Fudge',
      brand: 'Glutino',
      price: '$12.99',
      image: require('../assets/images/must try/glutino fudge.jpg'),
    },
  ];

  const dealsProducts = [
    {
      id: 1,
      name: 'Fitbit Versa 4',
      brand: 'Fitbit',
      price: '$149.99',
      originalPrice: '$199.99',
      badge: '25% OFF',
      image: require('../assets/images/instoredeals/fitbitversa4.webp'),
    },
    {
      id: 2,
      name: 'Garmin Forerunner',
      brand: 'Garmin',
      price: '$299.99',
      originalPrice: '$399.99',
      badge: '25% OFF',
      image: require('../assets/images/instoredeals/garmin forerunner.webp'),
    },
    {
      id: 3,
      name: 'Pivot Mountain Bike',
      brand: 'Pivot',
      price: '$1,299.99',
      originalPrice: '$1,599.99',
      badge: '19% OFF',
      image: require('../assets/images/instoredeals/pivot mountain bike.webp'),
    },
  ];

  const protectionProducts = [
    {
      id: 1,
      name: 'Bike Insurance',
      brand: 'Walmart Care',
      price: '$9.99/mo',
      image: require('../assets/images/protection&essentials/bikeinsurrance.webp'),
      hasOnlineLink: true,
      onlineText: 'Link to Buy',
    },
    {
      id: 2,
      name: 'Maintenance Kit',
      brand: 'Park Tool',
      price: '$24.99',
      image: require('../assets/images/protection&essentials/kit.jpg'),
    },
  ];

  const onlineOnlyProducts = [
    {
      id: 1,
      name: 'Fitbit Charge 6',
      brand: 'Fitbit',
      price: '$159.95',
      image: require('../assets/images/orderonline/Fitbit-Charge-6-Fitness-Tracker-with-Heart-Rate-GPS-Premium-Membership-Health-Tools-Obsidian-Black_be3fd220-fa23-4e3c-9863-bb87717a3c46.6950e0888dc224dce31d7eb697c3f15c.webp'),
      hasOnlineLink: true,
      onlineText: 'Order Online',
      productUrl: 'https://www.walmart.com/ip/Fitbit-Charge-6-Fitness-Tracker-with-Heart-Rate-GPS-Premium-Membership-Health-Tools-Obsidian-Black/5087333627?classType=VARIANT&athbdg=L1600&adsRedirect=true',
    },
    {
      id: 2,
      name: 'Motocross Jersey',
      brand: 'Willbros',
      price: '$49.99',
      image: require('../assets/images/orderonline/motorcross jersey.webp'),
      hasOnlineLink: true,
      onlineText: 'Order Online',
      productUrl: 'https://www.walmart.com/ip/Willbros-Motocross-Jersey-and-Pant-Combo-Dirt-Bike-Gear-Set-Racewear-MX-Ride-Cycling-Offroad-Suit-Jersey-Adult-M-Pants-W32/1219296599?classType=VARIANT&from=/search',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Walmart Logo Header */}
      <View style={styles.logoHeader}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
          }}
          style={styles.walmartLogo}
          resizeMode="contain"
        />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Partner Promotions Carousel */}
        <PartnerCarousel />

        {/* Personalized Headline */}
        <View style={styles.headlineSection}>
          <Text style={styles.personalizedHeadline}>
            Products curated for you by{' '}
            <Text style={styles.walmartLifestyleText}>Walmart LifeStyle</Text>
          </Text>
        </View>

        {/* Product Sections */}
        <ProductSection title="Need of The Hour" products={needOfTheHourProducts} />
        <ProductSection title="Trending in the Bikers Community" products={bikerProducts} />
        <ProductSection title="Must Try: Celiac-Friendly Products" products={celiacProducts} />
        <ProductSection title="In-Store Deals Just for You" products={dealsProducts} showCountdown={true} />
        <ProductSection title="Protection & Essentials" products={protectionProducts} />

        {/* Online-Only Products */}
        <View style={styles.onlineSection}>
          <Text style={styles.onlineHeadline}>Hot picks, just not on the shelf — order online now!</Text>
          <ProductSection title="" products={onlineOnlyProducts} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041f41',
  },
  
  // Logo Header Styles
  logoHeader: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6cace4',
  },
  walmartLogo: {
    width: 160,
    height: 50,
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6cace4',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },

  // Partner Carousel Styles
  partnerCarousel: {
    marginVertical: 20,
    height: 280,
  },
  partnerScrollContent: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  partnerCard3D: {
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  partnerCardInner: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  partnerImage: {
    width: '100%',
    height: '100%',
  },
  partnerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(4, 31, 65, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffc220',
    marginHorizontal: 4,
  },
  partnerCard: {
    width: 100,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  partnerLogo: {
    width: 80,
    height: 40,
  },

  // Headline Styles
  headlineSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  personalizedHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
  },
  walmartLifestyleText: {
    color: '#ffb3d9',
    textShadowColor: '#ff69b4',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  // Product Section Styles
  productSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  horizontalScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  productCard: {
    backgroundColor: '#ffffff15',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 180,
    borderWidth: 1,
    borderColor: '#6cace4',
    position: 'relative',
  },
  productImage: {
    width: 150,
    height: 140,
    borderRadius: 10,
    marginBottom: 12,
  },
  productBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ffc220',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  productBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#041f41',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  productBrand: {
    fontSize: 12,
    color: '#6cace4',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#6cace4',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffc220',
  },

  // Online Link Button Styles
  onlineLinkButton: {
    backgroundColor: '#0071ce',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    alignSelf: 'center',
  },
  onlineLinkText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  // View All Card Styles
  viewAllCard: {
    backgroundColor: '#ffffff10',
    borderRadius: 15,
    padding: 12,
    marginRight: 15,
    width: 120,
    height: 110,
    borderWidth: 2,
    borderColor: '#ffc220',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewAllIconContainer: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#ffc220',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  viewAllIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#041f41',
  },
  viewAllInfo: {
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffc220',
    marginBottom: 2,
    textAlign: 'center',
  },
  viewAllSubtext: {
    fontSize: 10,
    color: '#6cace4',
    textAlign: 'center',
    lineHeight: 12,
  },

  // Countdown Timer Styles
  countdownContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  countdownLabel: {
    fontSize: 10,
    color: '#6cace4',
    marginBottom: 4,
  },
  countdownTimer: {
    backgroundColor: '#ffc220',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countdownTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#041f41',
  },

  // Online Section Styles
  onlineSection: {
    backgroundColor: '#ffffff10',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  onlineHeadline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffc220',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
});
