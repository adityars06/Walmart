import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dummy data for people
const dummyPeople = [
  {
    id: 1,
    username: "Alicia P.",
    tags: "Gluten-free, Cyclist"
  },
  {
    id: 2,
    username: "Marcus R.",
    tags: "Fitness enthusiast, Vegan"
  },
  {
    id: 3,
    username: "Sarah K.",
    tags: "Organic foods, Yoga"
  },
  {
    id: 4,
    username: "David L.",
    tags: "Keto diet, Weightlifting"
  },
  {
    id: 5,
    username: "Emma W.",
    tags: "Mindful eating, Runner"
  },
  {
    id: 6,
    username: "James M.",
    tags: "Plant-based, Crossfit"
  }
];

// Dummy data for events
const dummyEvents = [
  {
    id: 1,
    title: "Red Bull Cycle Trail",
    date: "Friday, July 25",
    time: "9:00 AM",
    location: "Sacramento Park",
    image: require('../assets/images/community/events/redbull.jpg')
  },
  {
    id: 2,
    title: "Run for Celiac – 5K",
    date: "Thursday, August 10",
    time: "8:00 AM",
    location: "Downtown Sacramento",
    image: require('../assets/images/community/events/celiac.png')
  },
  {
    id: 3,
    title: "Walmart Weekly Wellness Rides",
    date: "Every Saturday",
    time: "7:00 AM",
    location: "Various Locations",
    image: require('../assets/images/community/events/weekly wellness rides.jpeg')
  },
  {
    id: 4,
    title: "Healthy Cooking Workshop",
    date: "Sunday, July 21",
    time: "2:00 PM",
    location: "Community Center",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=150&fit=crop"
  },
  {
    id: 5,
    title: "Wellness Expo 2025",
    date: "Saturday, July 27",
    time: "10:00 AM",
    location: "Convention Hall",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=150&fit=crop"
  },
  {
    id: 6,
    title: "Organic Market Tour",
    date: "Sunday, July 28",
    time: "9:00 AM",
    location: "Farmers Market",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=150&fit=crop"
  }
];

// Community Header Component
const CommunityHeader = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={[styles.tabButton, activeTab === 'people' && styles.activeTab]}
      onPress={() => onTabChange('people')}
    >
      <Text style={[styles.tabText, activeTab === 'people' && styles.activeTabText]}>
        Find People
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tabButton, activeTab === 'events' && styles.activeTab]}
      onPress={() => onTabChange('events')}
    >
      <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
        Community Events
      </Text>
    </TouchableOpacity>
  </View>
);

// User Card Component
const UserCard = ({ user }: { user: typeof dummyPeople[0] }) => {
  const handleSendRequest = () => {
    console.log(`Request sent to ${user.username}`);
  };

  return (
    <View style={styles.userCard}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person" size={24} color="#6cace4" />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.userTags}>{user.tags}</Text>
      </View>
      <TouchableOpacity style={styles.requestButton} onPress={handleSendRequest}>
        <Text style={styles.requestButtonText}>Send Request</Text>
      </TouchableOpacity>
    </View>
  );
};

// Event Card Component
const EventCard = ({ event }: { event: typeof dummyEvents[0] }) => {
  const handleViewDetails = () => {
    console.log(`Viewing details for ${event.title}`);
  };

  // Handle both local images (require) and remote images (URI)
  const imageSource = typeof event.image === 'string' 
    ? { uri: event.image } 
    : event.image;

  return (
    <View style={styles.eventCard}>
      <Image source={imageSource} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.eventDetails}>
          <View style={styles.eventDetailRow}>
            <Ionicons name="calendar-outline" size={16} color="#6cace4" />
            <Text style={styles.eventDetailText}>{event.date}</Text>
          </View>
          <View style={styles.eventDetailRow}>
            <Ionicons name="time-outline" size={16} color="#6cace4" />
            <Text style={styles.eventDetailText}>{event.time}</Text>
          </View>
          <View style={styles.eventDetailRow}>
            <Ionicons name="location-outline" size={16} color="#6cace4" />
            <Text style={styles.eventDetailText}>{event.location}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={handleViewDetails}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// People List Component
const PeopleList = () => (
  <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
    <Text style={styles.sectionTitle}>Connect with like-minded people</Text>
    {dummyPeople.map((person) => (
      <UserCard key={person.id} user={person} />
    ))}
  </ScrollView>
);

// Events List Component
const EventsList = () => (
  <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
    <Text style={styles.sectionTitle}>Upcoming community events</Text>
    {dummyEvents.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </ScrollView>
);

export default function CommunitySub() {
  const [activeTab, setActiveTab] = useState('people');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Shapes */}
      <View style={styles.backgroundShapes}>
        <View style={[styles.shape, styles.shape1]} />
        <View style={[styles.shape, styles.shape2]} />
        <View style={[styles.shape, styles.shape3]} />
        <View style={[styles.shape, styles.shape4]} />
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Community</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tab Header */}
      <CommunityHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Body */}
      <View style={styles.content}>
        {activeTab === 'people' ? <PeopleList /> : <EventsList />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041f41',
  },

  // Background Shapes
  backgroundShapes: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  shape: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
  },
  shape1: {
    width: 120,
    height: 120,
    top: 100,
    left: -40,
    transform: [{ rotate: '45deg' }],
  },
  shape2: {
    width: 80,
    height: 80,
    top: 250,
    right: -20,
    borderRadius: 40,
  },
  shape3: {
    width: 100,
    height: 100,
    bottom: 200,
    left: 20,
    transform: [{ rotate: '30deg' }],
  },
  shape4: {
    width: 60,
    height: 60,
    top: 400,
    right: 50,
    borderRadius: 30,
    transform: [{ rotate: '60deg' }],
  },

  // Top Bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },

  // Header Tabs
  header: {
    flexDirection: 'row',
    backgroundColor: '#ffffff15',
    margin: 20,
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#0071ce',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6cace4',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  // Content
  content: {
    flex: 1,
    zIndex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },

  // User Card Styles
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff15',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#ffffff15',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6cace4',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  userTags: {
    fontSize: 14,
    color: '#6cace4',
  },
  requestButton: {
    backgroundColor: '#ffc220',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  requestButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#041f41',
  },

  // Event Card Styles
  eventCard: {
    backgroundColor: '#ffffff15',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#6cace4',
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventInfo: {
    padding: 16,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#6cace4',
    marginLeft: 8,
  },
  detailsButton: {
    backgroundColor: '#0071ce',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
