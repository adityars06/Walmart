'use client';
import React, { useState } from 'react';
import { User, Edit3, Save, X, Plus, Trash2, Upload, FileText } from 'lucide-react';

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
    setSavedCombos(prev => prev.filter(combo => combo.id !== id));
  };

  const handleProfileUpdate = (field: keyof UserProfile, value: string | number) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (fileExtension && ['pdf', 'doc', 'docx'].includes(fileExtension)) {
          const newReport = {
            id: Date.now() + Math.random(),
            name: file.name,
            date: new Date().toISOString().split('T')[0],
            type: fileExtension
          };
          setUploadedReports(prev => [...prev, newReport]);
        }
      });
    }
  };

  const handleDeleteReport = (id: number) => {
    setUploadedReports(prev => prev.filter(report => report.id !== id));
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

  const styles = {
    container: {
      backgroundColor: '#E6F3FF',
      color: '#1E293B',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '24px'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#FEF3C7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarIcon: {
      color: '#1E40AF'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1E3A8A',
      margin: 0
    },
    headerButton: {
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: '#DBEAFE',
      color: '#1D4ED8',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    sectionsContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px'
    },
    section: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#1E3A8A',
      margin: 0
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    infoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#EFF6FF',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #DBEAFE'
    },
    infoLabel: {
      color: '#64748B',
      textTransform: 'capitalize' as const
    },
    infoValue: {
      fontWeight: '500',
      color: '#1E3A8A'
    },
    primaryButton: {
      backgroundColor: '#1D4ED8',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      transition: 'background-color 0.2s'
    },
    dietaryList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px'
    },
    dietaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EFF6FF',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #DBEAFE'
    },
    dietaryLabel: {
      color: '#1E3A8A'
    },
    toggle: {
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      position: 'relative' as const,
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    toggleButton: {
      width: '20px',
      height: '20px',
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute' as const,
      top: '2px',
      left: '2px',
      transition: 'transform 0.2s',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
    },
    comboList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px'
    },
    comboItem: {
      backgroundColor: '#EFF6FF',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #DBEAFE'
    },
    comboHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    comboName: {
      fontWeight: '600',
      color: '#1E3A8A',
      margin: 0
    },
    deleteButton: {
      color: '#EF4444',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px'
    },
    comboItems: {
      fontSize: '14px',
      color: '#64748B',
      margin: '0 0 4px 0'
    },
    comboCalories: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#D97706',
      margin: 0
    },
    uploadButton: {
      backgroundColor: '#1D4ED8',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      transition: 'background-color 0.2s'
    },
    hiddenInput: {
      display: 'none'
    },
    reportsList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px'
    },
    reportItem: {
      backgroundColor: '#EFF6FF',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #DBEAFE',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    reportContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    reportIcon: {
      color: '#1D4ED8'
    },
    reportName: {
      fontWeight: '600',
      color: '#1E3A8A',
      margin: 0
    },
    reportDate: {
      fontSize: '14px',
      color: '#64748B',
      margin: 0
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '32px',
      color: '#64748B'
    },
    emptyIcon: {
      color: '#BFDBFE',
      marginBottom: '8px'
    },
    emptyText: {
      margin: '0 0 4px 0'
    },
    emptySubtext: {
      fontSize: '14px',
      margin: 0
    },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '24px',
      width: '100%',
      maxWidth: '448px',
      margin: '16px'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1E3A8A',
      margin: 0
    },
    closeButton: {
      color: '#6B7280',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px'
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    inputLabel: {
      fontSize: '14px',
      color: '#64748B',
      textTransform: 'capitalize' as const,
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #93C5FD',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box' as const
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '6px',
      border: '1px solid #93C5FD',
      fontSize: '14px',
      outline: 'none',
      boxSizing: 'border-box' as const,
      height: '80px',
      resize: 'vertical' as const
    },
    modalButton: {
      marginTop: '24px',
      width: '100%',
      backgroundColor: '#1D4ED8',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    dietaryModalItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EFF6FF',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #DBEAFE'
    },
    dietaryModalLabel: {
      color: '#1E3A8A'
    },
    toggleLabel: {
      cursor: 'pointer'
    },
    hiddenCheckbox: {
      display: 'none'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.avatar}>
            <User size={28} style={styles.avatarIcon} />
          </div>
          <h1 style={styles.title}>Profile</h1>
        </div>
        <button 
          onClick={() => setIsEditModalVisible(true)}
          style={styles.headerButton}
        >
          <Edit3 size={20} />
        </button>
      </div>

      {/* Personal Info */}
      <div style={styles.sectionsContainer}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Personal Information</h2>
          <div style={styles.grid}>
            {Object.entries(userProfile).map(([key, value]) => (
              <div key={key} style={styles.infoItem}>
                <span style={styles.infoLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span style={styles.infoValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Dietary Preferences</h2>
            <button
              onClick={() => setIsDietaryEditModalVisible(true)}
              style={styles.primaryButton}
            >
              <Edit3 size={18} />
              Edit
            </button>
          </div>
          <div style={styles.dietaryList}>
            {Object.entries(dietaryPrefs).map(([key, value]) => (
              <div key={key} style={styles.dietaryItem}>
                <span style={styles.dietaryLabel}>{getDietaryLabel(key)}</span>
                <div style={{...styles.toggle, backgroundColor: value ? '#FDB503' : '#ccc'}}>
                  <div style={{...styles.toggleButton, transform: value ? 'translateX(20px)' : 'translateX(0)'}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Combos */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Your Combos</h2>
            <button
              onClick={() => setIsAddComboModalVisible(true)}
              style={styles.primaryButton}
            >
              <Plus size={18} />
              Add
            </button>
          </div>
          <div style={styles.comboList}>
            {savedCombos.map((combo) => (
              <div key={combo.id} style={styles.comboItem}>
                <div style={styles.comboHeader}>
                  <h3 style={styles.comboName}>{combo.name}</h3>
                  <button 
                    onClick={() => handleDeleteCombo(combo.id)} 
                    style={styles.deleteButton}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p style={styles.comboItems}>{combo.items}</p>
                <p style={styles.comboCalories}>{combo.calories} calories</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reports Upload Section */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Medical Reports</h2>
            <label style={styles.uploadButton}>
              <Upload size={18} />
              Upload
              <input
                type="file"
                style={styles.hiddenInput}
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div style={styles.reportsList}>
            {uploadedReports.map((report) => (
              <div key={report.id} style={styles.reportItem}>
                <div style={styles.reportContent}>
                  <FileText size={20} style={styles.reportIcon} />
                  <div>
                    <h3 style={styles.reportName}>{report.name}</h3>
                    <p style={styles.reportDate}>Uploaded on {report.date}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteReport(report.id)} 
                  style={styles.deleteButton}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {uploadedReports.length === 0 && (
              <div style={styles.emptyState}>
                <FileText size={48} style={styles.emptyIcon} />
                <p style={styles.emptyText}>No reports uploaded yet</p>
                <p style={styles.emptySubtext}>Upload your medical reports in PDF, DOC, or DOCX format</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Profile</h2>
              <button onClick={() => setIsEditModalVisible(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              {Object.entries(userProfile).map(([key, value]) => (
                <div key={key} style={styles.inputGroup}>
                  <label style={styles.inputLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <input
                    style={styles.input}
                    value={value}
                    onChange={(e) => handleProfileUpdate(key as keyof UserProfile, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <button
              style={styles.modalButton}
              onClick={() => setIsEditModalVisible(false)}
            >
              <Save size={18} />
              Save
            </button>
          </div>
        </div>
      )}

      {/* Edit Dietary Preferences Modal */}
      {isDietaryEditModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Edit Dietary Preferences</h2>
              <button onClick={() => setIsDietaryEditModalVisible(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              {Object.entries(dietaryPrefs).map(([key, value]) => (
                <div key={key} style={styles.dietaryModalItem}>
                  <span style={styles.dietaryModalLabel}>{getDietaryLabel(key)}</span>
                  <label style={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      style={styles.hiddenCheckbox}
                      checked={value}
                      onChange={() => handleDietaryToggle(key as DietaryPrefKey)}
                    />
                    <div style={{...styles.toggle, backgroundColor: value ? '#FDB503' : '#ccc'}}>
                      <div style={{...styles.toggleButton, transform: value ? 'translateX(20px)' : 'translateX(0)'}}></div>
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <button
              style={styles.modalButton}
              onClick={() => setIsDietaryEditModalVisible(false)}
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Add Combo Modal */}
      {isAddComboModalVisible && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add Combo</h2>
              <button onClick={() => setIsAddComboModalVisible(false)} style={styles.closeButton}>
                <X size={20} />
              </button>
            </div>

            <div style={styles.modalContent}>
              <input
                placeholder="Combo Name"
                style={styles.input}
                value={newCombo.name}
                onChange={(e) => setNewCombo({ ...newCombo, name: e.target.value })}
              />
              <textarea
                placeholder="Items"
                style={styles.textarea}
                value={newCombo.items}
                onChange={(e) => setNewCombo({ ...newCombo, items: e.target.value })}
              />
              <input
                type="number"
                placeholder="Calories"
                style={styles.input}
                value={newCombo.calories}
                onChange={(e) => setNewCombo({ ...newCombo, calories: e.target.value })}
              />
            </div>

            <button
              onClick={handleAddCombo}
              style={styles.modalButton}
            >
              <Plus size={18} />
              Add Combo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}