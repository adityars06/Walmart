import { useIsFocused } from '@react-navigation/native';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const isFocused = useIsFocused();

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
          exif: false
        });
        console.log('Photo taken:', photo);
        setPhotoUri(photo.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const retakePhoto = () => {
    setPhotoUri(null);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Show Preview if Photo Taken */}
      {photoUri ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.camera} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={retakePhoto}>
              <Text style={styles.text}>📷 Retake</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        isFocused && (
          <View style={styles.cameraContainer}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.secondaryButton} onPress={toggleCameraFacing}>
                <Text style={styles.secondaryText}>🔄</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.text}>📸 Take Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#041f41",
  },
  message: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    margin: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: 300,
    height: 350,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#041f41",
  },
  secondaryText: {
    fontSize: 20,
    color: "#041f41",
  },
});