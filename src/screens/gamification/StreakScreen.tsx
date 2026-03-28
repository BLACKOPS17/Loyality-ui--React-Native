import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame, ChevronLeft, Zap, Calendar, Heart } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_USER, STREAK_HISTORY } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const StreakScreen = ({ navigation }: any) => {
  const flameAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(flameAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(flameAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [flameAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <ScaleButton onPress={() => navigation.goBack()}>
            <ChevronLeft color={theme.colors.text} size={24} />
          </ScaleButton>
          <Text style={styles.headerTitle}>Streak Status</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.flameContainer}>
            <Animated.View style={{ transform: [{ scale: flameAnim }] }}>
              <Flame color={theme.colors.accent} size={120} fill={theme.colors.accent} />
            </Animated.View>
            <Text style={styles.streakCount}>{MOCK_USER.streak}</Text>
            <Text style={styles.streakLabel}>Days Active</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>52</Text>
              <Text style={styles.statLabel}>Longest</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{MOCK_USER.streak}</Text>
              <Text style={styles.statLabel}>Current</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>112</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.freezeCard}>
            <View style={styles.freezeHeader}>
              <Zap color={theme.colors.goldDark} size={24} fill={theme.colors.goldDark} />
              <Text style={styles.freezeTitle}>Streak Freeze Available</Text>
            </View>
            <Text style={styles.freezeDesc}>Don't let a busy day break your bond. Use a freeze to save your streak!</Text>
            <ScaleButton style={styles.freezeBtn}>
              <Text style={styles.freezeBtnText}>Use Freeze (1 left)</Text>
            </ScaleButton>
          </View>

          <Text style={styles.sectionTitle}>Last 30 Days</Text>
          <View style={styles.grid}>
            {STREAK_HISTORY.map((item) => (
              <View 
                key={item.day} 
                style={[
                  styles.gridItem,
                  item.status === 'uploaded' && styles.gridUploaded,
                  item.status === 'missed' && styles.gridMissed,
                  item.status === 'future' && styles.gridFuture,
                ]}
              >
                {item.status === 'uploaded' ? (
                  <Heart color="white" size={12} fill="white" />
                ) : (
                  <Text style={styles.gridText}>{item.day}</Text>
                )}
              </View>
            ))}
          </View>

          <View style={styles.partnerCard}>
            <Calendar color={theme.colors.textMuted} size={20} />
            <Text style={styles.partnerText}>
              You and {MOCK_USER.partnerName} have synced streaks!
            </Text>
          </View>
        </ScrollView>
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  content: { padding: theme.spacing.xl },
  flameContainer: { alignItems: 'center', marginVertical: theme.spacing.xxl },
  streakCount: { color: theme.colors.text, fontSize: 64, fontFamily: theme.typography.fontFamily.headline, marginTop: theme.spacing.md },
  streakLabel: { color: theme.colors.accent, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold, textTransform: 'uppercase', letterSpacing: 2 },
  statsRow: { flexDirection: 'row', backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, marginBottom: theme.spacing.xxl, ...theme.shadow.sm, borderWidth: 1, borderColor: theme.colors.border },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { color: theme.colors.text, fontSize: 20, fontFamily: theme.typography.fontFamily.headline },
  statLabel: { color: theme.colors.textMuted, fontSize: 12, marginTop: 4, fontFamily: theme.typography.fontFamily.body },
  statDivider: { width: 1, height: '60%', backgroundColor: theme.colors.border, alignSelf: 'center' },
  freezeCard: { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.lg, padding: theme.spacing.xl, marginBottom: theme.spacing.xl, borderWidth: 1, borderColor: theme.colors.gold, ...theme.shadow.md },
  freezeHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  freezeTitle: { color: theme.colors.goldDark, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold, marginLeft: 10 },
  freezeDesc: { color: theme.colors.textMuted, fontSize: 13, lineHeight: 18, marginBottom: 16, fontFamily: theme.typography.fontFamily.body },
  freezeBtn: { backgroundColor: theme.colors.goldDark, padding: 12, borderRadius: 8, alignItems: 'center' },
  freezeBtnText: { color: '#FFFFFF', fontFamily: theme.typography.fontFamily.bodyBold },
  sectionTitle: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline, marginBottom: theme.spacing.lg },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItem: { width: '12%', aspectRatio: 1, borderRadius: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridUploaded: { backgroundColor: theme.colors.success },
  gridMissed: { backgroundColor: theme.colors.accent },
  gridFuture: { backgroundColor: theme.colors.surface },
  gridText: { color: theme.colors.textMuted, fontSize: 10, fontFamily: theme.typography.fontFamily.body },
  partnerCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.xl, padding: theme.spacing.md },
  partnerText: { color: theme.colors.textMuted, marginLeft: 8, fontStyle: 'italic', fontFamily: theme.typography.fontFamily.body },
} as any);
