import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, Platform, TouchableOpacity, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, Award, Trophy, Heart, Flame, MapPin, Calendar, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';
import { useAppContext } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export const ProfileScreen = ({ navigation }: any) => {
  const { user } = useAppContext();
  
  const HIGHLIGHTS = [
    { id: '1', title: 'Sunset at Pier', date: 'Oct 12', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=300&fit=crop' },
    { id: '2', title: 'First Hike', date: 'Sep 28', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&h=300&fit=crop' },
    { id: '3', title: 'Coffee Date', date: 'Sep 15', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop' },
  ];

  const MEMORIES = Array.from({ length: 12 }, (_, i) => ({
    id: String(i),
    url: `https://images.unsplash.com/photo-${[
      '1516589174184-c6856bf960b943d7',
      '1523438885200-e635ba2c371e',
      '1529626455594-4ff0802cfb7e',
      '1531746020798-e6953c6e8e04',
      '1518196775791-2e1bbd387eb8',
      '1511895426328-dc8714191300'
    ][i % 6]}?w=300&h=300&fit=crop`
  }));

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
        {/* Hero Header */}
        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1511108690759-009324a903df?w=800&q=80' }} 
            style={styles.heroImage} 
          />
          <LinearGradient
            colors={['transparent', 'rgba(18, 18, 18, 1)']}
            style={styles.gradient}
          />
          
          {/* Settings Button moved to a more prominent overlay area */}

          <View style={styles.coupleHeader}>
            <View style={styles.avatarOverlap}>
              <View style={[styles.avatarWrapper, styles.avatarMain]}>
                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              </View>
              <View style={[styles.avatarWrapper, styles.avatarPartner]}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop' }} 
                  style={styles.avatar} 
                />
              </View>
              <View style={styles.heartFloat}>
                <Heart color={theme.colors.accent} size={14} fill={theme.colors.accent} />
              </View>
            </View>
            
            <View style={styles.textDetails}>
              <Text style={styles.coupleName}>{user.name}</Text>
              <View style={styles.infoRow}>
                <MapPin color="rgba(255,255,255,0.6)" size={12} />
                <Text style={styles.infoText}>London, UK</Text>
                <View style={styles.dot} />
                <Calendar color="rgba(255,255,255,0.6)" size={12} />
                <Text style={styles.infoText}>Since June 2022</Text>
              </View>
            </View>
          </View>
        </View>

        <FadeInView delay={200}>
          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.iconCircle}>
                <Flame color={theme.colors.accent} size={20} fill={theme.colors.accent} />
              </View>
              <Text style={styles.statVal}>{user.streak}</Text>
              <Text style={styles.statLab}>Streak</Text>
            </View>
            <View style={[styles.statCard, styles.statCardMiddle]}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(245, 200, 66, 0.1)' }]}>
                <Trophy color={theme.colors.gold} size={20} />
              </View>
              <Text style={styles.statVal}>#{user.rank}</Text>
              <Text style={styles.statLab}>Rank</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(184, 134, 11, 0.1)' }]}>
                <Award color={theme.colors.goldDark} size={20} />
              </View>
              <Text style={styles.statVal}>112</Text>
              <Text style={styles.statLab}>Days</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionGrid}>
            <ScaleButton style={styles.mainAction} onPress={() => navigation.navigate('StreakDetail')}>
              <View style={styles.actionIcon}>
                <Flame color={theme.colors.accent} size={20} />
              </View>
              <Text style={styles.actionText}>Streak Progress</Text>
              <ChevronRight color={theme.colors.textMuted} size={18} />
            </ScaleButton>
            
            <View style={styles.actionRow}>
              <ScaleButton style={styles.subAction} onPress={() => navigation.navigate('Badges')}>
                <Award color={theme.colors.gold} size={18} />
                <Text style={styles.subActionText}>Badges</Text>
              </ScaleButton>
              <ScaleButton style={styles.subAction} onPress={() => navigation.navigate('Rewards')}>
                <Trophy color={theme.colors.goldDark} size={18} />
                <Text style={styles.subActionText}>Rewards</Text>
              </ScaleButton>
            </View>
          </View>

          {/* Captured Moments */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Captured Moments</Text>
            <TouchableOpacity><Text style={styles.viewAll}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.highlightsScroll}
            contentContainerStyle={styles.highlightsContent}
          >
            {HIGHLIGHTS.map((item) => (
              <ScaleButton key={item.id} style={styles.highlightCard}>
                <Image source={{ uri: item.url }} style={styles.highlightImg} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.highlightGradient}
                />
                <View style={styles.highlightOverlay}>
                  <Text style={styles.highlightDate}>{item.date}</Text>
                  <Text style={styles.highlightTitle} numberOfLines={1}>{item.title}</Text>
                </View>
              </ScaleButton>
            ))}
          </ScrollView>

          {/* Memory Grid */}
          <View style={styles.gridHeader}>
            <Text style={styles.sectionTitle}>Timeline History</Text>
          </View>
          <View style={styles.memoryGrid}>
            {MEMORIES.map((item) => (
              <View key={item.id} style={styles.memoryBox}>
                <Image source={{ uri: item.url }} style={styles.memoryImg} />
              </View>
            ))}
          </View>
        </FadeInView>
      </ScrollView>

      {/* Top Header Overlay */}
      <View style={styles.headerOverlay}>
        <ScaleButton 
          style={styles.settingsBtn} 
          onPress={() => navigation.navigate('Settings')}
        >
          <Settings color="#FFFFFF" size={22} strokeWidth={2.5} />
        </ScaleButton>
      </View>

      {/* SafeArea Padding for overlap */}
      <SafeAreaView edges={['top']} style={styles.safeTop} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollPadding: { paddingBottom: 60 },
  safeTop: { position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' },
  
  heroContainer: { height: 380, width: '100%', position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  gradient: { ...StyleSheet.absoluteFillObject },
  headerOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 100, zIndex: 100, flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 50 : 40 },
  settingsBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  
  coupleHeader: { position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center', zIndex: 5 },
  avatarOverlap: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, position: 'relative' },
  avatarWrapper: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: theme.colors.background, overflow: 'hidden', backgroundColor: theme.colors.surface },
  avatarMain: { zIndex: 2 },
  avatarPartner: { marginLeft: -25, zIndex: 1 },
  avatar: { width: '100%', height: '100%' },
  heartFloat: { position: 'absolute', bottom: -5, left: '50%', marginLeft: -15, width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', zIndex: 3, ...theme.shadow.sm },
  
  textDetails: { alignItems: 'center', paddingHorizontal: 20 },
  coupleName: { color: '#FFFFFF', fontSize: 28, fontFamily: theme.typography.fontFamily.headline, marginBottom: 6, textAlign: 'center' },
  infoRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' },
  infoText: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginHorizontal: 6, fontFamily: theme.typography.fontFamily.body },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)' },

  statsContainer: { flexDirection: 'row', backgroundColor: theme.colors.background, marginHorizontal: 20, marginTop: -30, borderRadius: 20, padding: 20, ...theme.shadow.md, borderWidth: 1, borderColor: theme.colors.border },
  statCard: { flex: 1, alignItems: 'center' },
  statCardMiddle: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: theme.colors.border },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(232, 41, 76, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statVal: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline },
  statLab: { color: theme.colors.textMuted, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 },

  actionGrid: { padding: 20 },
  mainAction: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, marginBottom: 16, ...theme.shadow.sm },
  actionIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(232, 41, 76, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  actionText: { flex: 1, color: theme.colors.text, fontSize: 15, fontFamily: theme.typography.fontFamily.bodyBold },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  subAction: { width: '48%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, ...theme.shadow.sm },
  subActionText: { color: theme.colors.text, marginLeft: 10, fontSize: 13, fontFamily: theme.typography.fontFamily.bodyBold },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 10, marginBottom: 15 },
  sectionTitle: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline },
  viewAll: { color: theme.colors.accent, fontSize: 14, fontFamily: theme.typography.fontFamily.bodyBold },
  
  highlightsScroll: { marginBottom: 10 },
  highlightsContent: { paddingLeft: 20, paddingRight: 20 },
  highlightCard: { width: 150, height: 200, borderRadius: 20, overflow: 'hidden', marginRight: 15, position: 'relative', ...theme.shadow.md },
  highlightImg: { width: '100%', height: '100%' },
  highlightGradient: { ...StyleSheet.absoluteFillObject },
  highlightOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12 },
  highlightDate: { color: 'rgba(255,255,255,0.7)', fontSize: 10, fontFamily: theme.typography.fontFamily.body, marginBottom: 2 },
  highlightTitle: { color: '#FFFFFF', fontSize: 13, fontFamily: theme.typography.fontFamily.bodyBold },

  gridHeader: { paddingHorizontal: 20, marginTop: 25, marginBottom: 15 },
  memoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 18 },
  memoryBox: { width: '33.33%', aspectRatio: 1, padding: 2 },
  memoryImg: { width: '100%', height: '100%', borderRadius: 12 },
});
