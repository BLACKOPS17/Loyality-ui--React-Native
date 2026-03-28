import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Trophy, ChevronRight, CheckCircle2, Clock, Heart, Flame, Sparkles, MessageCircle } from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Animated } from 'react-native';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';
import { useAppContext } from '../../context/AppContext';

const { width } = Dimensions.get('window');

const ProgressRing = ({ streak, total = 100 }: { streak: number; total?: number }) => {
  const size = 180;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(streak / total, 1);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.ringContainer}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.surface}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={theme.colors.accent}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.ringContent}>
        <Flame color={theme.colors.accent} size={40} fill={theme.colors.accent} />
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakLabel}>DAY STREAK</Text>
      </View>
    </View>
  );
};

export const HomeScreen = ({ navigation }: any) => {
  const { user } = useAppContext();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Dynamic Hub Header */}
        <View style={styles.hubHeader}>
          <View style={styles.headerTop}>
            <View style={styles.coupleAvatars}>
              <Image source={{ uri: user.avatarUrl }} style={styles.miniAvatar} />
              <View style={styles.avatarOverlap}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop' }} 
                  style={styles.miniAvatar} 
                />
              </View>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good morning, Love</Text>
              <Text style={styles.daysCounter}>942 Days Together</Text>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <MessageCircle color={theme.colors.text} size={24} />
              <View style={styles.unreadDot} />
            </TouchableOpacity>
          </View>
        </View>

        <FadeInView delay={200}>
          {/* Visual Streak Ring */}
          <View style={styles.progressionSection}>
            <ProgressRing streak={user.streak} />
            <Text style={styles.milestoneText}>7 days until "Week Warriors" Badge</Text>
          </View>

          {/* Daily Photo Mission Card */}
          <View style={styles.missionCard}>
            <LinearGradientBackground />
            <View style={styles.missionIcon}>
              <Sparkles color={theme.colors.gold} size={24} />
            </View>
            <View style={styles.missionInfo}>
              <Text style={styles.missionLabel}>TODAY'S MISSION</Text>
              <Text style={styles.missionTitle}>Capture a morning coffee together</Text>
              <Text style={styles.missionSub}>+5 Bonus Points for reaching 50 days!</Text>
            </View>
          </View>

          {/* Main Action Area */}
          <View style={styles.uploadSection}>
            {!user.hasUploadedToday ? (
              <ScaleButton 
                style={styles.bigCameraBtn}
                onPress={() => navigation.navigate('Camera')}
              >
                <Camera color="#FFFFFF" size={32} />
                <Text style={styles.bigCameraText}>Complete Mission</Text>
              </ScaleButton>
            ) : (
              <TouchableOpacity 
                style={styles.viewMemoryBtn}
                onPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })}
              >
                <Image source={{ uri: user.todayPhotoUrl }} style={styles.todayPreview} />
                <View style={styles.viewOverlay}>
                  <CheckCircle2 color={theme.colors.success} size={20} />
                  <Text style={styles.viewText}>Memory Captured</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Partner Activity Sleek Bar */}
          <View style={styles.partnerBar}>
            <View style={styles.partnerInfo}>
              <View style={styles.statusDot} />
              <Text style={styles.partnerStatus}>
                {user.partnerName} is <Text style={styles.activeText}>active</Text>
              </Text>
            </View>
            <Text style={styles.partnerAction}>Waiting for their photo...</Text>
          </View>

          {/* Secondary Info Grid */}
          <View style={styles.infoGrid}>
            <ScaleButton style={styles.infoCard} onPress={() => navigation.navigate('Main', { screen: 'LeaderboardTab' })}>
              <Trophy color={theme.colors.gold} size={20} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Global Rank</Text>
                <Text style={styles.infoValue}>#{user.rank}</Text>
              </View>
              <ChevronRight color={theme.colors.textMuted} size={16} />
            </ScaleButton>
            
            <View style={styles.infoCard}>
              <Clock color={theme.colors.textMuted} size={20} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Yearly Reset</Text>
                <Text style={styles.infoValue}>{user.daysToReset} Days</Text>
              </View>
            </View>
          </View>
        </FadeInView>
      </ScrollView>
      <SafeAreaView edges={['top']} />
    </View>
  );
};

// Simple pseudo-gradient using absolute views since I don't want to over-complicate imports in a single file
const LinearGradientBackground = () => (
  <View style={StyleSheet.absoluteFill}>
    <View style={{ flex: 1, backgroundColor: theme.colors.surface, borderRadius: 20 }} />
    <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(232, 41, 76, 0.05)', borderRadius: 20 }} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.lg, paddingBottom: 40 },
  
  hubHeader: { marginBottom: theme.spacing.xl, marginTop: 10 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  coupleAvatars: { flexDirection: 'row', alignItems: 'center' },
  miniAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.background },
  avatarOverlap: { marginLeft: -12 },
  headerText: { flex: 1, marginLeft: 15 },
  greeting: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline },
  daysCounter: { color: theme.colors.textMuted, fontSize: 12, fontFamily: theme.typography.fontFamily.body },
  notificationBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center' },
  unreadDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.accent, borderWidth: 2, borderColor: theme.colors.surface },

  progressionSection: { alignItems: 'center', marginVertical: 20 },
  ringContainer: { justifyContent: 'center', alignItems: 'center', position: 'relative' },
  ringContent: { position: 'absolute', alignItems: 'center' },
  streakNumber: { color: theme.colors.text, fontSize: 36, fontFamily: theme.typography.fontFamily.headline, marginTop: 4 },
  streakLabel: { color: theme.colors.textMuted, fontSize: 10, letterSpacing: 2, fontFamily: theme.typography.fontFamily.bodyBold },
  milestoneText: { color: theme.colors.textMuted, fontSize: 13, marginTop: 15, fontFamily: theme.typography.fontFamily.bodyMedium },

  missionCard: { flexDirection: 'row', padding: 20, borderRadius: 20, marginBottom: 25, position: 'relative', overflow: 'hidden' },
  missionIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(245, 200, 66, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  missionInfo: { flex: 1 },
  missionLabel: { color: theme.colors.gold, fontSize: 10, fontFamily: theme.typography.fontFamily.bodyBold, letterSpacing: 1, marginBottom: 4 },
  missionTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.headline, marginBottom: 4 },
  missionSub: { color: theme.colors.textMuted, fontSize: 12, fontFamily: theme.typography.fontFamily.body },

  uploadSection: { marginBottom: 25 },
  bigCameraBtn: { backgroundColor: theme.colors.accent, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 16, ...theme.shadow.md },
  bigCameraText: { color: '#FFFFFF', fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold, marginLeft: 12 },
  viewMemoryBtn: { width: '100%', height: 120, borderRadius: 16, overflow: 'hidden', position: 'relative' },
  todayPreview: { width: '100%', height: '100%', opacity: 0.6 },
  viewOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.3)' },
  viewText: { color: '#FFFFFF', marginLeft: 10, fontFamily: theme.typography.fontFamily.bodyBold, fontSize: 16 },

  partnerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 12, marginBottom: 20 },
  partnerInfo: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginRight: 10 },
  partnerStatus: { color: theme.colors.text, fontSize: 13, fontFamily: theme.typography.fontFamily.body },
  activeText: { color: '#4CAF50', fontFamily: theme.typography.fontFamily.bodyBold },
  partnerAction: { color: theme.colors.textMuted, fontSize: 11, fontFamily: theme.typography.fontFamily.body },

  infoGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  infoCard: { flex: 0.48, backgroundColor: theme.colors.background, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, flexDirection: 'row', alignItems: 'center' },
  infoContent: { flex: 1, marginLeft: 12 },
  infoTitle: { color: theme.colors.textMuted, fontSize: 10, fontFamily: theme.typography.fontFamily.body },
  infoValue: { color: theme.colors.text, fontSize: 14, fontFamily: theme.typography.fontFamily.bodyBold, marginTop: 2 },
});
