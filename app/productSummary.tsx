import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductSummary() {
  const router = useRouter();
  
  const handleGoBack = () => {
    router.back();
  };

  const handleViewAlternatives = () => {
    Alert.alert('View Alternatives', 'Redirecting to alternative products...');
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', 'Saltes Butter added to your cart with 10% discount!');
  };

  const handleCheckAnother = () => {
    Alert.alert('Scanner', 'Opening camera to scan another product...');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
          }}
          style={styles.topLogo}
          resizeMode="contain"
        />
      </View>

      {/* Product Analysis Results */}
      <View style={styles.resultsSection}>
        {/* Scanned Product */}
        <View style={styles.productCard}>
          <View style={styles.productHeader}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=200&h=200&fit=crop"
              }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Jif Creamy Peanut Butter</Text>
              <Text style={styles.productBrand}>18 oz jar • Natural</Text>
              <Text style={styles.productPrice}>$4.98</Text>
            </View>
            <View style={styles.productBadge}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.badgeText}>Scanned</Text>
            </View>
          </View>
        </View>

        {/* Health Alert */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>
              <Ionicons name="warning" size={24} color="#EF4444" />
            </View>
            <View style={styles.alertTitleContainer}>
              <Text style={styles.alertTitle}>Health Alert</Text>
              <Text style={styles.alertSubtitle}>Not recommended for you</Text>
            </View>
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>❌ This contains dairy and nuts</Text>
            <Text style={styles.alertDescription}>
              Based on your health profile, this product contains allergens that may affect you.
            </Text>
          </View>
        </View>

        {/* Better Alternative */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <View style={styles.recommendationIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <View style={styles.recommendationTitleContainer}>
              <Text style={styles.recommendationTitle}>Recommended Alternative</Text>
              <Text style={styles.recommendationSubtitle}>Perfect match for your needs</Text>
            </View>
          </View>
          
          <View style={styles.alternativeProduct}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=200&h=200&fit=crop"
              }}
              style={styles.alternativeImage}
            />
            <View style={styles.alternativeInfo}>
              <Text style={styles.alternativeText}>✅ Salted Butter - Natural</Text>
              <Text style={styles.alternativeBrand}>Justin's • 16 oz</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.alternativePrice}>$8.49</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>10% OFF</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Complementary Products */}
        <View style={styles.suggestionsCard}>
          <Text style={styles.suggestionsTitle}>Frequently bought together</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
            <View style={styles.suggestionItem}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=120&h=120&fit=crop"
                }}
                style={styles.suggestionImage}
              />
              <Text style={styles.suggestionText}>Whole Wheat Bread</Text>
              <Text style={styles.suggestionPrice}>$2.98</Text>
            </View>
            <View style={styles.suggestionItem}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1571212515416-6bf6ca2f5847?w=120&h=120&fit=crop"
                }}
                style={styles.suggestionImage}
              />
              <Text style={styles.suggestionText}>Organic Honey</Text>
              <Text style={styles.suggestionPrice}>$6.99</Text>
            </View>
            <View style={styles.suggestionItem}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=120&h=120&fit=crop"
                }}
                style={styles.suggestionImage}
              />
              <Text style={styles.suggestionText}>Banana</Text>
              <Text style={styles.suggestionPrice}>$1.48/lb</Text>
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleViewAlternatives}>
            <Ionicons name="search" size={18} color="#0071ce" />
            <Text style={styles.secondaryButtonText}>View All Alternatives</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton} onPress={handleAddToCart}>
            <Ionicons name="cart" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Add Almond Butter</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleCheckAnother}>
            <Ionicons name="scan" size={20} color="#6cace4" />
            <Text style={styles.quickActionText}>Scan Another</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="heart-outline" size={20} color="#6cace4" />
            <Text style={styles.quickActionText}>Save Alternative</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="share-outline" size={20} color="#6cace4" />
            <Text style={styles.quickActionText}>Share Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041f41',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#041f41',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  backText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  topLogo: {
    width: 160,
    height: 40,
  },
  resultsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  productCard: {
    backgroundColor: '#ffffff15',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6cace4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#6cace4',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffc220',
  },
  productBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  badgeText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  alertIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alertTitleContainer: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF4444',
    marginBottom: 2,
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#EF4444',
    opacity: 0.8,
  },
  alertContent: {
    paddingLeft: 64,
  },
  alertText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 8,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 14,
    color: '#6cace4',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recommendationTitleContainer: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 2,
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#10B981',
    opacity: 0.8,
  },
  alternativeProduct: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alternativeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  alternativeInfo: {
    flex: 1,
  },
  alternativeText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: 4,
  },
  alternativeBrand: {
    fontSize: 14,
    color: '#6cace4',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alternativePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffc220',
  },
  discountBadge: {
    backgroundColor: '#ffc220',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#041f41',
  },
  suggestionsCard: {
    backgroundColor: '#ffffff15',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  suggestionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  suggestionItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 100,
  },
  suggestionImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  suggestionPrice: {
    fontSize: 12,
    color: '#ffc220',
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0071ce',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(0, 113, 206, 0.2)',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#0071ce',
  },
  secondaryButtonText: {
    color: '#0071ce',
    fontSize: 16,
    fontWeight: '700',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  quickActionButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  quickActionText: {
    color: '#6cace4',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
});
