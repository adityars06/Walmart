import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function UserInfo() {
  const router = useRouter();
  
  // Basic Info State
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  
  // Health Goals State
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  const [customHealthGoal, setCustomHealthGoal] = useState('');
  const [showCustomHealthGoalInput, setShowCustomHealthGoalInput] = useState(false);
  
  // Allergies State
  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState('');
  const [showCustomAllergyInput, setShowCustomAllergyInput] = useState(false);
  
  // Medical Conditions State
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [customMedicalCondition, setCustomMedicalCondition] = useState('');
  const [showCustomMedicalConditionInput, setShowCustomMedicalConditionInput] = useState(false);
  
  // Personal Note State
  const [personalNote, setPersonalNote] = useState('');
  
  // Upload State
  const [reportUploaded, setReportUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Health Apps State
  const [healthApps, setHealthApps] = useState({
    googleFit: { connected: false, connecting: false },
    appleFitness: { connected: false, connecting: false },
    samsungHealth: { connected: false, connecting: false }
  });
  
  // Permission Modal State
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<{name: string, displayName: string, key: string} | null>(null);

  const healthGoalOptions = [
    'Weight Loss',
    'Bulking',
    'Improve Muscle Tone',
    'Increase Stamina',
    'Better Sleep',
    'Improve Health',
    
    'Reduce Stress',
    'Medical Condition Management',
    
    'Increase Nutrition',
    'Add Custom'
  ];

  const allergyOptions = [
    'Celiac',
    'Latex Allergy',
    'Fragrance Sensitivity',
    'Nut Allergy',
    "Paraben Allergy",
    'Lactose Intolerance',
    'Gluten Sensitivity (Non-Celiac)',
    'Artificial Sweeteners',
    'Soy Allergy',
    "Nickel Allergy",
    'Add Custom'
  ];

  const medicalConditionOptions = [
    'Diabetes',
    'ADHD / ADD',
    'IBS (Irritable Bowel Syndrome)',
    'Pregnancy',
    "PCOS",
    "High BP",
    "Cholesterol",
    'Thyroid Disorders',
    'Hair Fall',
    'Depression / Anxiety',
    'Add Custom'
  ];

  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const toggleSelection = (item: string, currentSelections: string[], setSelections: (selections: string[]) => void) => {
    if (currentSelections.includes(item)) {
      setSelections(currentSelections.filter(selected => selected !== item));
    } else {
      setSelections([...currentSelections, item]);
    }
  };

  const handleAllergyToggle = (allergy: string) => {
    if (allergy === 'Add Custom') {
      setShowCustomAllergyInput(!showCustomAllergyInput);
      if (showCustomAllergyInput) {
        setCustomAllergy('');
      }
    } else {
      toggleSelection(allergy, allergies, setAllergies);
    }
  };

  const handleHealthGoalToggle = (goal: string) => {
    if (goal === 'Add Custom') {
      setShowCustomHealthGoalInput(!showCustomHealthGoalInput);
      if (showCustomHealthGoalInput) {
        setCustomHealthGoal('');
      }
    } else {
      toggleSelection(goal, healthGoals, setHealthGoals);
    }
  };

  const handleMedicalConditionToggle = (condition: string) => {
    if (condition === 'Add Custom') {
      setShowCustomMedicalConditionInput(!showCustomMedicalConditionInput);
      if (showCustomMedicalConditionInput) {
        setCustomMedicalCondition('');
      }
    } else {
      toggleSelection(condition, medicalConditions, setMedicalConditions);
    }
  };

  const addCustomAllergy = () => {
    if (customAllergy.trim()) {
      setAllergies([...allergies, customAllergy.trim()]);
      setCustomAllergy('');
      setShowCustomAllergyInput(false);
    }
  };

  const addCustomHealthGoal = () => {
    if (customHealthGoal.trim()) {
      setHealthGoals([...healthGoals, customHealthGoal.trim()]);
      setCustomHealthGoal('');
      setShowCustomHealthGoalInput(false);
    }
  };

  const addCustomMedicalCondition = () => {
    if (customMedicalCondition.trim()) {
      setMedicalConditions([...medicalConditions, customMedicalCondition.trim()]);
      setCustomMedicalCondition('');
      setShowCustomMedicalConditionInput(false);
    }
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*', 'text/*'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        
        // Show loading modal
        setShowUploadModal(true);
        
        // Simulate upload process (2 seconds)
        setTimeout(() => {
          setReportUploaded(true);
          setUploadedFileName(file.name);
          setShowUploadModal(false);
          Alert.alert('Success', `${file.name} uploaded successfully!`);
        }, 2000);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
      console.log('DocumentPicker Error: ', error);
    }
  };

  const healthAppsData = [
    { 
      key: 'googleFit',
      name: 'googlefit', 
      displayName: 'Google Fit', 
      image: require('../assets/images/fitness-icon/google.webp'),
      color: '#4285F4' 
    },
    { 
      key: 'appleFitness',
      name: 'applefitness', 
      displayName: 'Apple Fitness', 
      image: require('../assets/images/fitness-icon/apple.webp'),
      color: '#000000' 
    },
    { 
      key: 'samsungHealth',
      name: 'samsunghealth', 
      displayName: 'Samsung Health', 
      image: require('../assets/images/fitness-icon/samsung.png'),
      color: '#1BA1E2' 
    }
  ];

  const handleHealthAppConnect = (app: {key: string, name: string, displayName: string}) => {
    setSelectedApp(app);
    setShowPermissionModal(true);
  };

  const handlePermissionAllow = () => {
    if (selectedApp) {
      setShowPermissionModal(false);
      
      // Set connecting state
      setHealthApps(prev => ({
        ...prev,
        [selectedApp.key]: { ...prev[selectedApp.key as keyof typeof prev], connecting: true }
      }));
      
      // Simulate connection process
      setTimeout(() => {
        setHealthApps(prev => ({
          ...prev,
          [selectedApp.key]: { connected: true, connecting: false }
        }));
        setSelectedApp(null);
        Alert.alert(
          'Success! ✅', 
          `Connected to ${selectedApp.displayName} successfully.\n\nYour health data will help us provide better recommendations.`,
          [{ text: 'Got it!', style: 'default' }]
        );
      }, 2000);
    }
  };

  const handlePermissionDeny = () => {
    setShowPermissionModal(false);
    setSelectedApp(null);
  };

  const handleSubmit = () => {
    if (!age || !gender || !height) {
      Alert.alert('Missing Information', 'Please fill in all basic information fields.');
      return;
    }
    
    Alert.alert(
      'Profile Created!', 
      'Your health profile has been created successfully.',
      [
        {
          text: 'Continue',
          onPress: () => router.push('/(tabs)/home')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png"
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>Help us personalize your shopping experience</Text>
      </View>

      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.optionsRow}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderButton,
                  gender === option && styles.selectedButton
                ]}
                onPress={() => setGender(option)}
              >
                <Text style={[
                  styles.optionText,
                  gender === option && styles.selectedText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Health Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What are your health goals?</Text>
        <View style={styles.optionsGrid}>
          {healthGoalOptions.map((goal) => (
            <TouchableOpacity
              key={goal}
              style={[
                goal === 'Add Custom' ? styles.addCustomButton : styles.toggleButton,
                (healthGoals.includes(goal) || (goal === 'Add Custom' && showCustomHealthGoalInput)) && styles.selectedButton
              ]}
              onPress={() => handleHealthGoalToggle(goal)}
            >
              <Text style={[
                styles.optionText,
                (healthGoals.includes(goal) || (goal === 'Add Custom' && showCustomHealthGoalInput)) && styles.selectedText
              ]}>
                {goal}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {showCustomHealthGoalInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter custom health goal"
              value={customHealthGoal}
              onChangeText={setCustomHealthGoal}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addButton} onPress={addCustomHealthGoal}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Allergies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allergies</Text>
        <View style={styles.optionsGrid}>
          {allergyOptions.map((allergy) => (
            <TouchableOpacity
              key={allergy}
              style={[
                allergy === 'Add Custom' ? styles.addCustomButton : styles.toggleButton,
                (allergies.includes(allergy) || (allergy === 'Add Custom' && showCustomAllergyInput)) && styles.selectedButton
              ]}
              onPress={() => handleAllergyToggle(allergy)}
            >
              <Text style={[
                styles.optionText,
                (allergies.includes(allergy) || (allergy === 'Add Custom' && showCustomAllergyInput)) && styles.selectedText
              ]}>
                {allergy}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {showCustomAllergyInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter custom allergy"
              value={customAllergy}
              onChangeText={setCustomAllergy}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addButton} onPress={addCustomAllergy}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Medical Conditions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Conditions</Text>
        <View style={styles.optionsGrid}>
          {medicalConditionOptions.map((condition) => (
            <TouchableOpacity
              key={condition}
              style={[
                condition === 'Add Custom' ? styles.addCustomButton : styles.toggleButton,
                (medicalConditions.includes(condition) || (condition === 'Add Custom' && showCustomMedicalConditionInput)) && styles.selectedButton
              ]}
              onPress={() => handleMedicalConditionToggle(condition)}
            >
              <Text style={[
                styles.optionText,
                (medicalConditions.includes(condition) || (condition === 'Add Custom' && showCustomMedicalConditionInput)) && styles.selectedText
              ]}>
                {condition}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {showCustomMedicalConditionInput && (
          <View style={styles.customInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter custom medical condition"
              value={customMedicalCondition}
              onChangeText={setCustomMedicalCondition}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addButton} onPress={addCustomMedicalCondition}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Health Apps Integration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connect Your Health Apps</Text>
        <Text style={styles.sectionSubtitle}>Sync your activity data for personalized recommendations</Text>
        
        <View style={styles.healthAppsContainer}>
          {healthAppsData.map((app) => {
            const appState = healthApps[app.key as keyof typeof healthApps];
            return (
              <TouchableOpacity
                key={app.key}
                style={[
                  styles.healthAppCard,
                  appState.connected && styles.healthAppCardConnected,
                  appState.connecting && styles.healthAppCardConnecting
                ]}
                onPress={() => handleHealthAppConnect(app)}
                disabled={appState.connected || appState.connecting}
              >
                <View style={styles.healthAppIconContainer}>
                  <Image 
                    source={app.image}
                    style={styles.healthAppIcon}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.healthAppName}>{app.displayName}</Text>
                <View style={styles.healthAppStatus}>
                  {appState.connecting ? (
                    <Text style={styles.healthAppStatusText}>Connecting...</Text>
                  ) : appState.connected ? (
                    <Text style={styles.healthAppStatusTextConnected}>✓ Connected</Text>
                  ) : (
                    <Text style={styles.healthAppStatusText}>Tap to Connect</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Personal Note */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add your personal note</Text>
        <Text style={styles.sectionSubtitle}>Share any additional information that might help us personalize your experience (optional)</Text>
        <TextInput
          style={styles.textAreaInput}
          placeholder="Tell us more about your health journey, specific dietary needs, or any other information you'd like to share..."
          value={personalNote}
          onChangeText={setPersonalNote}
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      {/* Upload Reports */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upload Reports</Text>
        <Text style={styles.sectionSubtitle}>Upload any medical reports for better recommendations</Text>
        
        <TouchableOpacity 
          style={[styles.uploadButton, reportUploaded && styles.uploadedButton]}
          onPress={handleFileUpload}
          disabled={reportUploaded}
        >
          <Text style={[styles.uploadButtonText, reportUploaded && styles.uploadedText]}>
            {reportUploaded ? `✓ ${uploadedFileName} Uploaded Successfully` : '📄 Upload Medical Reports'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Complete Profile</Text>
      </TouchableOpacity>

      {/* Upload Loading Modal */}
      <Modal visible={showUploadModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Uploading report...</Text>
            <View style={styles.loadingDots}>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Permission Modal */}
      <Modal visible={showPermissionModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.permissionModalContent}>
            <View style={styles.permissionModalHeader}>
              <Text style={styles.permissionModalTitle}>Allow Access</Text>
              <Text style={styles.permissionModalSubtitle}>
                Walmart TrueCart+ would like to access {selectedApp?.displayName}
              </Text>
            </View>
            
            <View style={styles.permissionModalBody}>
              <View style={styles.permissionIconWrapper}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png"
                  }}
                  style={styles.permissionWalmartLogo}
                  resizeMode="contain"
                />
                <Text style={styles.permissionArrow}>→</Text>
                <View style={styles.permissionAppIcon}>
                  <Image 
                    source={
                      selectedApp?.name === 'googlefit' ? require('../assets/images/fitness-icon/google.webp') :
                      selectedApp?.name === 'applefitness' ? require('../assets/images/fitness-icon/apple.webp') :
                      selectedApp?.name === 'samsunghealth' ? require('../assets/images/fitness-icon/samsung.png') :
                      undefined
                    }
                    style={styles.permissionAppImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              
              <Text style={styles.permissionModalSubtitle}>
                This will allow TrueCart+ to read your health and fitness data to provide personalized product recommendations.
              </Text>
            </View>
            
            <View style={styles.permissionModalButtons}>
              <TouchableOpacity style={styles.permissionModalButton} onPress={handlePermissionDeny}>
                <Text style={styles.permissionModalDenyText}>Don't Allow</Text>
              </TouchableOpacity>
              <View style={styles.permissionModalButtonSeparator} />
              <TouchableOpacity style={styles.permissionModalButton} onPress={handlePermissionAllow}>
                <Text style={styles.permissionModalAllowText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#041f41',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 160,
    height: 55,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6cace4',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 15,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#6cace4',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#041f41',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041f41',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#6cace4',
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#fafbfc',
    shadowColor: '#6cace4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textAreaInput: {
    borderWidth: 2,
    borderColor: '#6cace4',
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    backgroundColor: '#fafbfc',
    minHeight: 120,
    textAlignVertical: 'top',
    shadowColor: '#6cace4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  genderButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#6cace4',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 85,
    shadowColor: '#6cace4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  toggleButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#6cace4',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    shadowColor: '#6cace4',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addCustomButton: {
    backgroundColor: '#fef3cd',
    borderWidth: 2,
    borderColor: '#ffc220',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    shadowColor: '#ffc220',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedButton: {
    backgroundColor: '#0071ce',
    borderColor: '#0071ce',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#041f41',
    textAlign: 'left',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  customInputContainer: {
    flexDirection: 'column',
    gap: 12,
    marginTop: 20,
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc220',
  },
  addButton: {
    backgroundColor: '#ffc220',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    shadowColor: '#ffc220',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#041f41',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#6cace4',
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 25,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#6cace4',
    borderStyle: 'dashed',
    shadowColor: '#6cace4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  uploadedButton: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    borderStyle: 'solid',
    shadowColor: '#22c55e',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 22,
  },
  uploadedText: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#ffc220',
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginVertical: 30,
    alignItems: 'center',
    shadowColor: '#ffc220',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041f41',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 31, 65, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#041f41',
    marginBottom: 20,
    fontWeight: '600',
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    fontSize: 24,
    color: '#0071ce',
  },
  
  // Google Fit Styles
  googleFitContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleFitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  // Health Apps Styles
  healthAppsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  healthAppCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#f3f4f6',
  },
  healthAppCardConnected: {
    borderColor: '#22c55e',
    backgroundColor: '#f0fdf4',
  },
  healthAppCardConnecting: {
    borderColor: '#6b7280',
    backgroundColor: '#f9fafb',
  },
  healthAppIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  healthAppIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  healthAppName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#041f41',
    textAlign: 'center',
    marginBottom: 6,
  },
  healthAppStatus: {
    alignItems: 'center',
  },
  healthAppStatusText: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
  },
  healthAppStatusTextConnected: {
    fontSize: 10,
    color: '#22c55e',
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Permission Modal Styles
  permissionModalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    maxWidth: 340,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  permissionModalHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  permissionModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#041f41',
    textAlign: 'center',
    marginBottom: 8,
  },
  permissionModalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  permissionModalBody: {
    padding: 24,
    alignItems: 'center',
  },
  permissionIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionWalmartLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  permissionArrow: {
    fontSize: 20,
    color: '#6b7280',
    marginHorizontal: 16,
  },
  permissionAppIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  permissionAppImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  permissionAppEmoji: {
    fontSize: 20,
  },
  permissionModalButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  permissionModalButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  permissionModalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  permissionModalDenyText: {
    color: '#6b7280',
  },
  permissionModalAllowText: {
    color: '#0071ce',
  },
  permissionModalButtonSeparator: {
    width: 1,
    backgroundColor: '#f3f4f6',
  },
  
  // Google Fit Legacy Styles
  googleFitIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  googleFitIcon: {
    fontSize: 24,
  },
  googleFitInfo: {
    flex: 1,
  },
  googleFitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#041f41',
    marginBottom: 4,
  },
  googleFitDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  googleFitButton: {
    backgroundColor: '#0071ce',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#0071ce',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  googleFitButtonConnected: {
    backgroundColor: '#22c55e',
    shadowColor: '#22c55e',
  },
  googleFitButtonLoading: {
    backgroundColor: '#6b7280',
    shadowColor: '#6b7280',
  },
  googleFitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  googleFitButtonTextConnected: {
    color: '#ffffff',
  },
  syncBadge: {
    backgroundColor: '#dcfce7',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  syncBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16a34a',
    textAlign: 'center',
  },
});
