import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

type DietaryPrefKey = 'vegan' | 'lactoseIntolerant' | 'glutenFree' | 'kosher' | 'halal' | 'nutAllergy';

interface UserProfile {
  name: string;
  age: number;
  weight: string;
  height: string;
  email: string;
  phone: string;
}

type DietaryPrefs = {
  [key in DietaryPrefKey]: boolean;
};

interface SavedCombo {
  id: number;
  name: string;
  items: string;
  calories: number;
}

interface UploadedReport {
  id: number;
  name: string;
  date: string;
  type: string;
}

export default function Profile() {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddComboModalVisible, setIsAddComboModalVisible] = useState(false);
  const [isDietaryEditModalVisible, setIsDietaryEditModalVisible] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Sarah Johnson',
    age: 28,
    weight: '65 kg',
    height: '5\'6"',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567'
  });

  const [dietaryPrefs, setDietaryPrefs] = useState<DietaryPrefs>({
    vegan: true,
    lactoseIntolerant: true,
    glutenFree: false,
    kosher: false,
    halal: false,
    nutAllergy: false
  });

  const [savedCombos, setSavedCombos] = useState<SavedCombo[]>([
    { id: 1, name: 'Power Breakfast', items: 'Oatmeal + Banana + Almond Butter', calories: 350 },
    { id: 2, name: 'Green Smoothie', items: 'Spinach + Mango + Coconut Milk', calories: 280 }
  ]);

  const [uploadedReports, setUploadedReports] = useState<UploadedReport[]>([
    { id: 1, name: 'Health Report 2024.pdf', date: '2024-01-15', type: 'pdf' },
    { id: 2, name: 'Blood Test Results.docx', date: '2024-02-20', type: 'docx' }
  ]);

  const [newCombo, setNewCombo] = useState({ name: '', items: '', calories: '' });

  const handleDietaryToggle = (pref: DietaryPrefKey) => {
    setDietaryPrefs(prev => ({ ...prev, [pref]: !prev[pref] }));
  };

  const handleAddCombo = () => {
    if (newCombo.name && newCombo.items && newCombo.calories) {
      setSavedCombos(prev => [...prev, {
        id: Date.now(),
        name: newCombo.name,
        items: newCombo.items,
        calories: parseInt(newCombo.calories)
      }]);
      setNewCombo({ name: '', items: '', calories: '' });
      setIsAddComboModalVisible(false);
    }
  };

  const handleDeleteCombo = (id: number) => {
    Alert.alert(
      'Delete Combo',
      'Are you sure you want to delete this combo?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => setSavedCombos(prev => prev.filter(combo => combo.id !== id)) }
      ]
    );
  };

  const handleProfileUpdate = (field: keyof UserProfile, value: string | number) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
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

  const getDietaryLabel = (key: string) => {
    const labels: { [key: string]: string } = {
      vegan: 'Vegan',
      lactoseIntolerant: 'Lactose Intolerant',
      glutenFree: 'Gluten Free',
      kosher: 'Kosher',
      halal: 'Halal',
      nutAllergy: 'Nut Allergy'
    };
    return labels[key] || key;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={28} color="#1E40AF" />
          </View>
          <Text style={styles.title}>Profile</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setIsEditModalVisible(true)}
          style={styles.headerButton}
        >
          <Ionicons name="pencil" size={20} color="#1D4ED8" />
        </TouchableOpacity>
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {Object.entries(userProfile).map(([key, value]) => (
          <View key={key} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
            <Text style={styles.infoValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Dietary Preferences */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <TouchableOpacity
            onPress={() => setIsDietaryEditModalVisible(true)}
            style={styles.primaryButton}
          >
            <Ionicons name="pencil" size={18} color="white" />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        {Object.entries(dietaryPrefs).map(([key, value]) => (
          <View key={key} style={styles.dietaryItem}>
            <Text style={styles.dietaryLabel}>{getDietaryLabel(key)}</Text>
            <Switch 
              value={value} 
              onValueChange={() => handleDietaryToggle(key as DietaryPrefKey)}
              trackColor={{ false: '#ccc', true: '#FDB503' }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>

      {/* Saved Combos */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Combos</Text>
          <TouchableOpacity
            onPress={() => setIsAddComboModalVisible(true)}
            style={styles.primaryButton}
          >
            <Ionicons name="add" size={18} color="white" />
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {savedCombos.map((combo) => (
          <View key={combo.id} style={styles.comboItem}>
            <View style={styles.comboHeader}>
              <Text style={styles.comboName}>{combo.name}</Text>
              <TouchableOpacity 
                onPress={() => handleDeleteCombo(combo.id)} 
                style={styles.deleteButton}
              >
                <Ionicons name="trash" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.comboItems}>{combo.items}</Text>
            <Text style={styles.comboCalories}>{combo.calories} calories</Text>
          </View>
        ))}
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

      {/* Edit Dietary Preferences Modal */}
      <Modal
        visible={isDietaryEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDietaryEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Dietary Preferences</Text>
              <TouchableOpacity onPress={() => setIsDietaryEditModalVisible(false)}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {Object.entries(dietaryPrefs).map(([key, value]) => (
                <View key={key} style={styles.dietaryModalItem}>
                  <Text style={styles.dietaryModalLabel}>{getDietaryLabel(key)}</Text>
                  <Switch 
                    value={value} 
                    onValueChange={() => handleDietaryToggle(key as DietaryPrefKey)}
                    trackColor={{ false: '#ccc', true: '#FDB503' }}
                    thumbColor="#fff"
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsDietaryEditModalVisible(false)}
            >
              <Ionicons name="save" size={18} color="white" />
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Combo Modal */}
      <Modal
        visible={isAddComboModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddComboModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Combo</Text>
              <TouchableOpacity onPress={() => setIsAddComboModalVisible(false)}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <TextInput
                placeholder="Combo Name"
                style={styles.input}
                value={newCombo.name}
                onChangeText={(text) => setNewCombo({ ...newCombo, name: text })}
              />
              <TextInput
                placeholder="Items"
                style={[styles.input, styles.textarea]}
                value={newCombo.items}
                onChangeText={(text) => setNewCombo({ ...newCombo, items: text })}
                multiline
                numberOfLines={3}
              />
              <TextInput
                placeholder="Calories"
                style={styles.input}
                value={newCombo.calories}
                onChangeText={(text) => setNewCombo({ ...newCombo, calories: text })}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              onPress={handleAddCombo}
              style={styles.modalButton}
            >
              <Ionicons name="add" size={18} color="white" />
              <Text style={styles.modalButtonText}>Add Combo</Text>
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
    backgroundColor: '#E6F3FF',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#DBEAFE',
  },
  section: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1E3A8A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoLabel: {
    color: '#64748B',
    textTransform: 'capitalize',
  },
  infoValue: {
    fontWeight: '500',
    color: '#1E3A8A',
  },
  primaryButton: {
    backgroundColor: '#1D4ED8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  dietaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  dietaryLabel: {
    color: '#1E3A8A',
    fontSize: 16,
  },
  comboItem: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  comboHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  comboName: {
    fontWeight: '600',
    color: '#1E3A8A',
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
  comboItems: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  comboCalories: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D97706',
  },
  reportItem: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
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
    color: '#1E3A8A',
    fontSize: 16,
  },
  reportDate: {
    fontSize: 14,
    color: '#64748B',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 8,
    marginBottom: 4,
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A8A',
  },
  modalContent: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#64748B',
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#93C5FD',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
  },
  textarea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButton: {
    marginTop: 24,
    backgroundColor: '#1D4ED8',
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
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  dietaryModalLabel: {
    color: '#1E3A8A',
    fontSize: 16,
  },
});