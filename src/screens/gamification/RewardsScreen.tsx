import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, Trophy, ChevronLeft, Info, Lock, CheckCircle2 } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_USER, MOCK_BADGES } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const RewardsScreen = ({ navigation }: any) => {
  const MILESTONES = [
    { title: '7 Days', badge: 'Week Warriors', unlocked: true },
    { title: '30 Days', badge: 'Monthly Devotion', unlocked: true },
    { title: '100 Days', badge: 'Century Couple', unlocked: false },
    { title: '365 Days', badge: 'Yearly Champions', unlocked: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <ScaleButton onPress={() => navigation.goBack()}>
            <ChevronLeft color={theme.colors.text} size={24} />
          </ScaleButton>
          <Text style={styles.headerTitle}>Rewards & Milestones</Text>
          <ScaleButton>
            <Info color={theme.colors.text} size={20} />
          </ScaleButton>
        </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Grand Prize Banner */}
        <View style={styles.heroCard}>
          <Text style={styles.heroSub}>Current Grand Prize</Text>
          <Text style={styles.heroTitle}>Maldives Trip for 2</Text>
          <View style={styles.prizeDetails}>
            <Trophy color={theme.colors.gold} size={24} />
            <Text style={styles.prizeText}>All expenses paid + Luxury Villa</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressCard}>
          <View style={styles.progressLabel}>
            <Text style={styles.progressText}>Your Streak: {MOCK_USER.streak}</Text>
            <Text style={styles.targetText}>Target: 365</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(MOCK_USER.streak / 365) * 100}%` }]} />
          </View>
          <Text style={styles.progressSub}>Keep uploading to maintain your spot!</Text>
        </View>

        {/* Milestones */}
        <Text style={styles.sectionTitle}>Journey Milestones</Text>
        {MILESTONES.map((item, index) => (
          <View key={index} style={[styles.milestoneCard, !item.unlocked && styles.lockedCard]}>
            <View style={styles.milestoneIcon}>
              <Award 
                color={item.unlocked ? theme.colors.gold : theme.colors.textMuted} 
                size={32} 
              />
            </View>
            <View style={styles.milestoneInfo}>
              <Text style={[styles.milestoneTitle, !item.unlocked && styles.lockedText]}>{item.title}</Text>
              <Text style={styles.milestoneBadge}>{item.badge}</Text>
            </View>
            {item.unlocked ? (
              <CheckCircle2 color={theme.colors.success} size={24} />
            ) : (
              <Lock color={theme.colors.textMuted} size={20} />
            )}
          </View>
        ))}

        {/* Rules */}
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>How to Win</Text>
          <Text style={styles.rulesText}>
            1. Take a daily photo with both partners visible.{"\n"}
            2. Reach 365 days to enter the yearly draw.{"\n"}
            3. Top 3 couples on the leaderboard win instantly at reset.
          </Text>
        </View>
      </ScrollView>
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, backgroundColor: theme.colors.background },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  content: { padding: theme.spacing.lg },
  heroCard: { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.lg, padding: theme.spacing.xl, marginBottom: theme.spacing.xl, borderWidth: 1, borderColor: theme.colors.gold, ...theme.shadow.md },
  heroSub: { color: theme.colors.goldDark, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, fontFamily: theme.typography.fontFamily.bodyBold },
  heroTitle: { color: theme.colors.text, fontSize: 24, fontFamily: theme.typography.fontFamily.headline, marginBottom: 12 },
  prizeDetails: { flexDirection: 'row', alignItems: 'center' },
  prizeText: { color: theme.colors.text, marginLeft: 10, fontSize: 14, fontFamily: theme.typography.fontFamily.bodyMedium },
  progressCard: { backgroundColor: theme.colors.surface, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.xl },
  progressLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  progressText: { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bodyBold },
  targetText: { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily.body },
  progressBar: { height: 8, backgroundColor: theme.colors.background, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: theme.colors.accent },
  progressSub: { color: theme.colors.textMuted, fontSize: 11, marginTop: 10, textAlign: 'center', fontFamily: theme.typography.fontFamily.body },
  sectionTitle: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline, marginBottom: theme.spacing.lg },
  milestoneCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.background, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow.sm },
  lockedCard: { opacity: 0.6, backgroundColor: theme.colors.surface },
  milestoneIcon: { width: 50, height: 50, borderRadius: 25, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.lg },
  milestoneInfo: { flex: 1 },
  milestoneTitle: { color: theme.colors.goldDark, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  lockedText: { color: theme.colors.textMuted },
  milestoneBadge: { color: theme.colors.text, fontSize: 14, marginTop: 2, fontFamily: theme.typography.fontFamily.bodyMedium },
  rulesCard: { padding: theme.spacing.xl, marginTop: theme.spacing.xl },
  rulesTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold, marginBottom: 12 },
  rulesText: { color: theme.colors.textMuted, fontSize: 14, lineHeight: 22, fontFamily: theme.typography.fontFamily.body },
});
