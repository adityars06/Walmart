import { useIsFocused } from '@react-navigation/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Animated, Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const isFocused = useIsFocused();
  const router = useRouter();
  
  // Animation for shutter button feedback
  const buttonScale = useRef(new Animated.Value(1)).current;

  const takePhoto = async () => {
    if (cameraRef.current && !isProcessing) {
      try {
        // Immediate visual feedback with button animation
        Animated.sequence([
          Animated.timing(buttonScale, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(buttonScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          })
        ]).start();
        
        setIsProcessing(true);
        
        // Optimized photo capture settings for speed
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.6, // Reduced for faster processing
          base64: false,
          exif: false,
          skipProcessing: true // Skip internal processing for speed
        });
        
        console.log('Photo taken:', photo);
        setPhotoUri(photo.uri);
        
        // Auto-redirect to product summary after 2 seconds
        setTimeout(() => {
          router.push('/productSummary');
        }, 2000);
      } catch (error) {
        console.error('Error taking photo:', error);
        setIsProcessing(false);
      }
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    setIsProcessing(false);
  };

  const pickImageFromGallery = async () => {
    try {
      // Request gallery permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Gallery permission denied');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.6,
      });

      if (!result.canceled && result.assets[0]) {
        setIsProcessing(true);
        setPhotoUri(result.assets[0].uri);
        
        // Auto-redirect to product summary after 2 seconds
        setTimeout(() => {
          router.push('/productSummary');
        }, 2000);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#041f41" />
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionMessage}>
            We need access to your camera to scan products and provide personalized recommendations
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Enable Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#041f41" />
      
      {/* Show Processing/Preview if Photo Taken */}
      {photoUri ? (
        <View style={styles.previewContainer}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Product Scanned Successfully!</Text>
            <Text style={styles.previewSubtitle}>Analyzing product details...</Text>
          </View>
          
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <View style={styles.processingOverlay}>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
              <Text style={styles.processingText}>Processing...</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
            <Text style={styles.retakeButtonText}>📷 Scan Another Product</Text>
          </TouchableOpacity>
        </View>
      ) : (
        isFocused && (
          <View style={styles.cameraContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Product Scanner</Text>
              <Text style={styles.headerSubtitle}>Point your camera at any product</Text>
            </View>

            {/* Camera View with Overlay */}
            <View style={styles.cameraWrapper}>
              <CameraView ref={cameraRef} style={styles.camera} facing="back" />
              
              {/* Scanning Overlay */}
              <View style={styles.scanOverlay}>
                <View style={styles.scanFrame}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                </View>
                <Text style={styles.scanText}>Position product within the frame</Text>
              </View>
            </View>

            {/* Bottom Controls */}
            <View style={styles.controlsContainer}>
              {/* Gallery Button */}
              <TouchableOpacity 
                style={styles.galleryButton}
                onPress={pickImageFromGallery}
                activeOpacity={0.8}
              >
                <View style={styles.galleryIconContainer}>
                  <View style={styles.galleryIconFrame}>
                    <View style={styles.galleryIconInner} />
                    <View style={styles.galleryIconCorner} />
                  </View>
                  <View style={styles.galleryIconDots}>
                    <View style={styles.galleryDot} />
                    <View style={styles.galleryDot} />
                    <View style={styles.galleryDot} />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Shutter Button */}
              <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                <TouchableOpacity 
                  style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]} 
                  onPress={takePhoto}
                  disabled={isProcessing}
                  activeOpacity={0.8}
                >
                  <View style={styles.shutterCircle}>
                    <View style={[styles.shutterInner, isProcessing && styles.shutterProcessing]} />
                  </View>
                </TouchableOpacity>
              </Animated.View>

              {/* Placeholder for symmetry */}
              <View style={styles.galleryButton} />
            </View>
          </View>
        )
      )}
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: '#041f41',
  },
  
  // Permission Styles
  permissionContainer: {
    flex: 1,
    backgroundColor: '#041f41',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  permissionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    maxWidth: 350,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041f41',
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionMessage: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#0071ce',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  permissionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // Camera Container
  cameraContainer: {
    flex: 1,
  },
  
  // Header Styles
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6cace4',
    textAlign: 'center',
  },

  // Camera Wrapper
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  camera: {
    width: screenWidth - 40,
    height: screenHeight * 0.5,
    borderRadius: 24,
    overflow: 'hidden',
  },

  // Scan Overlay
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#ffc220',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(4, 31, 65, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Controls
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 60,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 113, 206, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 113, 206, 0.3)',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  galleryIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  galleryIconFrame: {
    width: 24,
    height: 18,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 3,
    backgroundColor: 'transparent',
    position: 'relative',
    marginBottom: 4,
  },
  galleryIconInner: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1,
  },
  galleryIconCorner: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 6,
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  galleryIconDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 2,
  },
  galleryDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#ffffff',
  },
  captureButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 6,
    borderColor: '#ffffff',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  shutterCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0071ce',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  shutterInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  shutterProcessing: {
    backgroundColor: '#ffc220',
  },

  // Preview Styles
  previewContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  previewHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  previewSubtitle: {
    fontSize: 16,
    color: '#6cace4',
    textAlign: 'center',
  },
  imagePreviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  previewImage: {
    width: screenWidth - 60,
    height: screenHeight * 0.4,
    borderRadius: 20,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(4, 31, 65, 0.8)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ffc220',
    marginHorizontal: 4,
  },
  dot1: {
    animationDelay: '0s',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  processingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  retakeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  retakeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});