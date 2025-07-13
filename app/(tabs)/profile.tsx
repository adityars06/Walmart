import { Ionicons } from '@expo/vector-icons';
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

interface UserProfile {
  name: string;
  age: string;
  gender: string;
  height: string;
  email: string;
  phone: string;
}

interface HealthData {
  healthGoals: string[];
  allergies: string[];
  medicalConditions: string[];
  personalNote: string;
}

interface HealthApps {
  googleFit: { connected: boolean; connecting: boolean };
  appleFitness: { connected: boolean; connecting: boolean };
  samsungHealth: { connected: boolean; connecting: boolean };
}

export default function Profile() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isHealthDataModalVisible, setIsHealthDataModalVisible] = useState(false);
  const [isAppsModalVisible, setIsAppsModalVisible] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Peter',
    age: '28',
    gender: 'Male',
    height: '5\'6"',
    email: 'peter@email.com',
    phone: '+1 (555) 123-4567'
  });

  const [healthData, setHealthData] = useState<HealthData>({
    healthGoals: ['Weight Loss', 'Better Sleep', 'Improve Health'],
    allergies: ['Nut Allergy', 'Lactose Intolerance'],
    medicalConditions: ['PCOS'],
    personalNote: 'Looking to maintain a healthy lifestyle with balanced nutrition and regular exercise.'
  });

  const [healthApps, setHealthApps] = useState<HealthApps>({
    googleFit: { connected: true, connecting: false },
    appleFitness: { connected: false, connecting: false },
    samsungHealth: { connected: false, connecting: false }
  });

  const [uploadedReports, setUploadedReports] = useState([
    { id: 1, name: 'Health Report 2024.pdf', date: '2024-01-15', type: 'pdf' },
    { id: 2, name: 'Blood Test Results.docx', date: '2024-02-20', type: 'docx' }
  ]);

  const handleProfileUpdate = (field: keyof UserProfile, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleHealthDataUpdate = (field: keyof HealthData, value: string | string[]) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteReport = (id: number) => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setUploadedReports(prev => prev.filter(report => report.id !== id)) }
      ]
    );
  };

  const handleConnectApp = (appKey: keyof HealthApps) => {
    setHealthApps(prev => ({
      ...prev,
      [appKey]: { ...prev[appKey], connecting: true }
    }));
    
    // Simulate connection process
    setTimeout(() => {
      setHealthApps(prev => ({
        ...prev,
        [appKey]: { connected: true, connecting: false }
      }));
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Walmart Logo */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1280px-Walmart_logo.svg.png",
          }}
          style={styles.walmartLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity 
            onPress={() => setIsEditModalVisible(true)}
            style={styles.editButton}
          >
            <Ionicons name="pencil" size={18} color="#0071ce" />
          </TouchableOpacity>
        </View>
        {Object.entries(userProfile).map(([key, value]) => (
          <View key={key} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Text style={styles.infoValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Health Goals */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Health Goals</Text>
          <TouchableOpacity
            onPress={() => setIsHealthDataModalVisible(true)}
            style={styles.primaryButton}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tagsContainer}>
          {healthData.healthGoals.map((goal, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{goal}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Allergies */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Allergies</Text>
        </View>
        <View style={styles.tagsContainer}>
          {healthData.allergies.map((allergy, index) => (
            <View key={index} style={[styles.tag, styles.allergyTag]}>
              <Text style={styles.tagText}>{allergy}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Medical Conditions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Conditions</Text>
        </View>
        <View style={styles.tagsContainer}>
          {healthData.medicalConditions.map((condition, index) => (
            <View key={index} style={[styles.tag, styles.medicalTag]}>
              <Text style={styles.tagText}>{condition}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Personal Note */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Note</Text>
        </View>
        <Text style={styles.personalNote}>{healthData.personalNote}</Text>
      </View>

      {/* Health Apps */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Connected Health Apps</Text>
          <TouchableOpacity
            onPress={() => setIsAppsModalVisible(true)}
            style={styles.primaryButton}
          >
            <Ionicons name="settings" size={18} color="white" />
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.healthAppsContainer}>
          {Object.entries(healthApps).map(([key, app]) => (
            <View key={key} style={[styles.healthAppCard, app.connected && styles.healthAppCardConnected]}>
              <View style={styles.healthAppIconContainer}>
                {key === 'googleFit' ? (
                  <Image
                    source={require('../../assets/images/fitness-icon/google.webp')}
                    style={styles.healthAppIconImage}
                    resizeMode="contain"
                  />
                ) : key === 'appleFitness' ? (
                  <Image
                    source={require('../../assets/images/fitness-icon/apple.webp')}
                    style={styles.healthAppIconImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/fitness-icon/samsung.png')}
                    style={styles.healthAppIconImage}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text style={styles.healthAppName}>
                {key === 'googleFit' ? 'Google Fit' : key === 'appleFitness' ? 'Apple Fitness' : 'Samsung Health'}
              </Text>
              <Text style={[styles.healthAppStatus, app.connected && styles.healthAppStatusConnected]}>
                {app.connecting ? 'Connecting...' : app.connected ? 'Connected' : 'Not Connected'}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Reports Upload Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Reports</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="cloud-upload" size={18} color="white" />
            <Text style={styles.buttonText}>Upload</Text>
          </TouchableOpacity>
        </View>
        {uploadedReports.map((report) => (
          <View key={report.id} style={styles.reportItem}>
            <View style={styles.reportContent}>
              <Ionicons name="document-text" size={20} color="#1D4ED8" />
              <View style={styles.reportInfo}>
                <Text style={styles.reportName}>{report.name}</Text>
                <Text style={styles.reportDate}>Uploaded on {report.date}</Text>
              </View>
            </View>
            <TouchableOpacity 
              onPress={() => handleDeleteReport(report.id)} 
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
        {uploadedReports.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text" size={48} color="#BFDBFE" />
            <Text style={styles.emptyText}>No reports uploaded yet</Text>
            <Text style={styles.emptySubtext}>Upload your medical reports in PDF, DOC, or DOCX format</Text>
          </View>
        )}
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setIsEditModalVisible(false)}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {Object.entries(userProfile).map(([key, value]) => (
                <View key={key} style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <TextInput
                    style={styles.input}
                    value={value.toString()}
                    onChangeText={(text) => handleProfileUpdate(key as keyof UserProfile, text)}
                    keyboardType={key === 'age' ? 'numeric' : 'default'}
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Ionicons name="save" size={18} color="white" />
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Edit Health Data Modal */}
      <Modal
        visible={isHealthDataModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsHealthDataModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Health Data</Text>
              <TouchableOpacity onPress={() => setIsHealthDataModalVisible(false)}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Personal Note</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={healthData.personalNote}
                  onChangeText={(text) => handleHealthDataUpdate('personalNote', text)}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsHealthDataModalVisible(false)}
            >
              <Ionicons name="save" size={18} color="white" />
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Health Apps Modal */}
      <Modal
        visible={isAppsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAppsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Manage Health Apps</Text>
              <TouchableOpacity onPress={() => setIsAppsModalVisible(false)}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {Object.entries(healthApps).map(([key, app]) => (
                <View key={key} style={styles.appModalItem}>
                  <View style={styles.appModalIconContainer}>
                    {key === 'googleFit' ? (
                      <Image
                        source={require('../../assets/images/fitness-icon/google.webp')}
                        style={styles.appModalIcon}
                        resizeMode="contain"
                      />
                    ) : key === 'appleFitness' ? (
                      <Image
                        source={require('../../assets/images/fitness-icon/apple.webp')}
                        style={styles.appModalIcon}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/fitness-icon/samsung.png')}
                        style={styles.appModalIcon}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={styles.appModalInfo}>
                    <Text style={styles.appModalName}>
                      {key === 'googleFit' ? 'Google Fit' : key === 'appleFitness' ? 'Apple Fitness' : 'Samsung Health'}
                    </Text>
                    <Text style={styles.appModalStatus}>
                      {app.connecting ? 'Connecting...' : app.connected ? 'Connected' : 'Not Connected'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.connectButton, app.connected && styles.connectedButton]}
                    onPress={() => !app.connected && handleConnectApp(key as keyof HealthApps)}
                    disabled={app.connected || app.connecting}
                  >
                    <Text style={[styles.connectButtonText, app.connected && styles.connectedButtonText]}>
                      {app.connecting ? 'Connecting...' : app.connected ? 'Connected' : 'Connect'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsAppsModalVisible(false)}
            >
              <Ionicons name="close" size={18} color="white" />
              <Text style={styles.modalButtonText}>Done</Text>
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
    backgroundColor: '#041f41',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingTop: 60,
    marginBottom: 30,
  },
  walmartLogo: {
    width: 150,
    height: 60,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff15',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    color: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 113, 206, 0.2)',
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
  },
  infoLabel: {
    color: '#6cace4',
    textTransform: 'capitalize',
  },
  infoValue: {
    fontWeight: '500',
    color: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dietaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
  },
  dietaryLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  comboItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
  },
  comboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  comboName: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
  comboItems: {
    fontSize: 14,
    color: '#6cace4',
    marginBottom: 4,
  },
  comboCalories: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffc220',
  },
  reportItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 16,
  },
  reportDate: {
    fontSize: 14,
    color: '#6cace4',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 8,
    marginBottom: 4,
    color: '#6cace4',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6cace4',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 31, 65, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: '#041f41',
    borderRadius: 15,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#6cace4',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  modalContent: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6cace4',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6cace4',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButton: {
    marginTop: 24,
    backgroundColor: '#0071ce',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  dietaryModalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
  },
  dietaryModalLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(0, 113, 206, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  tagText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  allergyTag: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#EF4444',
  },
  medicalTag: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: '#F59E0B',
  },
  personalNote: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  healthAppsContainer: {
    gap: 12,
  },
  healthAppCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
    alignItems: 'center',
  },
  healthAppCardConnected: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  healthAppIconContainer: {
    marginBottom: 8,
  },
  healthAppIcon: {
    fontSize: 32,
  },
  healthAppIconImage: {
    width: 32,
    height: 32,
  },
  healthAppName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  healthAppStatus: {
    color: '#6cace4',
    fontSize: 10,
  },
  healthAppStatusConnected: {
    color: '#10B981',
  },
  appModalItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(108, 172, 228, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appModalIconContainer: {
    marginRight: 12,
  },
  appModalIcon: {
    width: 24,
    height: 24,
  },
  appModalInfo: {
    flex: 1,
  },
  appModalName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  appModalStatus: {
    color: '#6cace4',
    fontSize: 10,
  },
  connectButton: {
    backgroundColor: '#0071ce',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  connectedButton: {
    backgroundColor: '#10B981',
  },
  connectButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  connectedButtonText: {
    color: 'white',
  },
});