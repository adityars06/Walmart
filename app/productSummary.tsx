import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ProductSummary() {
  const router = useRouter();
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  const handleGoBack = () => {
    router.back();
  };

  const handleViewAlternatives = () => {
    Alert.alert('View Alternatives', 'Redirecting to alternative products...');
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', 'Safer baby lotion alternative added to your cart!');
  };

  const handleCheckAnother = () => {
    Alert.alert('Scanner', 'Opening camera to scan another product...');
  };

  const handleInfoPress = () => {
    setShowInfoModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#041f41" />
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
                uri: "https://m.media-amazon.com/images/I/51ffcjn8NlL.jpg"
              }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Johnson's Baby Lotion</Text>
              <Text style={styles.productBrand}>15 fl oz • Gentle & Mild</Text>
              <Text style={styles.productPrice}>$5.49</Text>
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
            <TouchableOpacity style={styles.infoButton} onPress={handleInfoPress}>
              <Ionicons name="information-circle-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>❌ This contains potentially harmful ingredients</Text>
            <Text style={styles.alertDescription}>
              Based on your health profile, this product may contain chemicals not suitable for sensitive baby skin.
            </Text>
          </View>
        </View>

        {/* Better Alternatives */}
        <View style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <View style={styles.recommendationIconContainer}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            </View>
            <View style={styles.recommendationTitleContainer}>
              <Text style={styles.recommendationTitle}>Safer Alternatives</Text>
              <Text style={styles.recommendationSubtitle}>Better for sensitive baby skin</Text>
            </View>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alternativesScroll}>
            <View style={styles.alternativeItem}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/61Q0lc371ZL._UF894,1000_QL80_.jpg"
                }}
                style={styles.alternativeImage}
              />
              <Text style={styles.alternativeName}>Aveeno Baby Daily Moisture</Text>
              <Text style={styles.alternativeBrand}>Aveeno • 18 fl oz</Text>
              <Text style={styles.alternativeFeatures}>🌿 Fragrance-free, paraben-free</Text>
              <Text style={styles.alternativePrice}>$8.99</Text>
            </View>
            
            <View style={styles.alternativeItem}>
              <Image
                source={{
                  uri: "https://images.mamaearth.in/catalog/product/2/1/21441_rcocrweybxmahsa1_white_bg.jpg?format=auto&height=600"
                }}
                style={styles.alternativeImage}
              />
              <Text style={styles.alternativeName}>Mamaearth Baby Lotion</Text>
              <Text style={styles.alternativeBrand}>Mamaearth • 400ml</Text>
              <Text style={styles.alternativeFeatures}>🌿 Shea butter, calendula, aloe</Text>
              <Text style={styles.alternativePrice}>$7.49</Text>
            </View>
            
            <View style={styles.alternativeItem}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/71CcOCW2y8L.jpg"
                }}
                style={styles.alternativeImage}
              />
              <Text style={styles.alternativeName}>Sebamed Baby Lotion</Text>
              <Text style={styles.alternativeBrand}>Sebamed • 13.5 fl oz</Text>
              <Text style={styles.alternativeFeatures}>🌿 pH 5.5, eczema-friendly</Text>
              <Text style={styles.alternativePrice}>$12.99</Text>
            </View>
            
            <View style={styles.alternativeItem}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/51ZqVC2RQ7L._UF894,1000_QL80_.jpg"
                }}
                style={styles.alternativeImage}
              />
              <Text style={styles.alternativeName}>The Moms Co. Natural</Text>
              <Text style={styles.alternativeBrand}>The Moms Co. • 200ml</Text>
              <Text style={styles.alternativeFeatures}>🌿 USDA organic, toxin-free</Text>
              <Text style={styles.alternativePrice}>$9.99</Text>
            </View>
            
            <View style={styles.alternativeItem}>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/61oXJROzJKL._UF1000,1000_QL80_.jpg"
                }}
                style={styles.alternativeImage}
              />
              <Text style={styles.alternativeName}>Cetaphil Baby Daily</Text>
              <Text style={styles.alternativeBrand}>Cetaphil • 13.5 fl oz</Text>
              <Text style={styles.alternativeFeatures}>🌿 Hypoallergenic, calendula</Text>
              <Text style={styles.alternativePrice}>$8.49</Text>
            </View>
          </ScrollView>
        </View>

        {/* Frequently Bought Together */}
        <View style={styles.frequentlyBoughtCard}>
          <Text style={styles.frequentlyBoughtTitle}>Frequently Bought Together</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.frequentlyBoughtScroll}>
            <View style={styles.frequentlyBoughtItem}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>15% OFF</Text>
              </View>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/61PixFeG93L.jpg"
                }}
                style={styles.frequentlyBoughtImage}
              />
              <Text style={styles.frequentlyBoughtName}>Aveeno Baby Wash</Text>
              <Text style={styles.frequentlyBoughtBrand}>Aveeno • 18 fl oz</Text>
              <Text style={styles.frequentlyBoughtFeatures}>🌿 Tear-free, soap-free</Text>
              <Text style={styles.frequentlyBoughtPrice}>$6.99</Text>
            </View>
            <View style={styles.frequentlyBoughtItem}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>20% OFF</Text>
              </View>
              <Image
                source={{
                  uri: "https://images.mamaearth.in/catalog/product/b/a/baby_wipes_01_fop_white_bg.jpg?format=auto&height=600"
                }}
                style={styles.frequentlyBoughtImage}
              />
              <Text style={styles.frequentlyBoughtName}>Mamaearth Baby Wipes</Text>
              <Text style={styles.frequentlyBoughtBrand}>Mamaearth • 80 wipes</Text>
              <Text style={styles.frequentlyBoughtFeatures}>🌿 Plant-based, biodegradable</Text>
              <Text style={styles.frequentlyBoughtPrice}>$4.99</Text>
            </View>
            <View style={styles.frequentlyBoughtItem}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>10% OFF</Text>
              </View>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/71CcOCW2y8L.jpg"
                }}
                style={styles.frequentlyBoughtImage}
              />
              <Text style={styles.frequentlyBoughtName}>Sebamed Baby Cream</Text>
              <Text style={styles.frequentlyBoughtBrand}>Sebamed • 6.8 fl oz</Text>
              <Text style={styles.frequentlyBoughtFeatures}>🌿 pH 5.5, dermatologist tested</Text>
              <Text style={styles.frequentlyBoughtPrice}>$8.49</Text>
            </View>
            <View style={styles.frequentlyBoughtItem}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>25% OFF</Text>
              </View>
              <Image
                source={{
                  uri: "https://m.media-amazon.com/images/I/51ZqVC2RQ7L._UF894,1000_QL80_.jpg"
                }}
                style={styles.frequentlyBoughtImage}
              />
              <Text style={styles.frequentlyBoughtName}>Baby Massage Oil</Text>
              <Text style={styles.frequentlyBoughtBrand}>The Moms Co. • 200ml</Text>
              <Text style={styles.frequentlyBoughtFeatures}>🌿 Organic, vitamin E enriched</Text>
              <Text style={styles.frequentlyBoughtPrice}>$7.99</Text>
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
            <Text style={styles.primaryButtonText}>Add Safer Alternative</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton} onPress={handleCheckAnother}>
            <Ionicons name="scan" size={20} color="#6c757d" />
            <Text style={styles.quickActionText}>Scan Another</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="heart-outline" size={20} color="#6c757d" />
            <Text style={styles.quickActionText}>Save Alternative</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="share-outline" size={20} color="#6c757d" />
            <Text style={styles.quickActionText}>Share Results</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Info Modal */}
      <Modal
        visible={showInfoModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowInfoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="warning" size={28} color="#EF4444" />
              </View>
              <Text style={styles.modalTitle}>Why is this harmful?</Text>
              <TouchableOpacity 
                style={styles.modalCloseButton} 
                onPress={() => setShowInfoModal(false)}
              >
                <Ionicons name="close" size={24} color="#6c757d" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                Contains parabens and artificial fragrance, which can irritate sensitive baby skin.
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => setShowInfoModal(false)}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  backText: {
    color: '#041f41',
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
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
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
    width: 90,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041f41',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0071ce',
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
    backgroundColor: '#fff5f5',
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
  infoButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
    color: '#041f41',
    marginBottom: 8,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
  },
  recommendationCard: {
    backgroundColor: '#f0fff4',
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
  alternativesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  alternativeItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 180,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  alternativeImage: {
    width: 110,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'center',
  },
  alternativeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#041f41',
    marginBottom: 4,
    textAlign: 'center',
  },
  alternativeBrand: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
    textAlign: 'center',
  },
  alternativeFeatures: {
    fontSize: 11,
    color: '#10B981',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0071ce',
    textAlign: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ffc220',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#041f41',
  },
  frequentlyBoughtCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  frequentlyBoughtTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041f41',
    marginBottom: 16,
  },
  frequentlyBoughtScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  frequentlyBoughtItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    width: 180,
    borderWidth: 1,
    borderColor: '#e9ecef',
    position: 'relative',
  },
  frequentlyBoughtImage: {
    width: 110,
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
    alignSelf: 'center',
  },
  frequentlyBoughtName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#041f41',
    marginBottom: 4,
    textAlign: 'center',
  },
  frequentlyBoughtBrand: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 8,
    textAlign: 'center',
  },
  frequentlyBoughtFeatures: {
    fontSize: 11,
    color: '#10B981',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 14,
  },
  frequentlyBoughtPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0071ce',
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
    backgroundColor: 'rgba(0, 113, 206, 0.1)',
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
    color: '#6c757d',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIconContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#041f41',
  },
  modalCloseButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(108, 117, 125, 0.1)',
  },
  modalBody: {
    marginBottom: 24,
  },
  modalText: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
    textAlign: 'left',
  },
  modalButton: {
    backgroundColor: '#0071ce',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
