import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Flame, ChevronRight, Clock } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_LEADERBOARD, MOCK_USER } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const LeaderboardScreen = () => {
  const renderItem = ({ item }: any) => {
    const isTop3 = item.rank <= 3;
    const rankColor = item.rank === 1 ? theme.colors.gold : item.rank === 2 ? '#C0C0C0' : item.rank === 3 ? '#CD7F32' : theme.colors.textMuted;

    return (
      <View style={[styles.itemContainer, item.rank === MOCK_USER.rank && styles.userItem]}>
        <View style={styles.rankSection}>
          <Text style={[styles.rankNumber, { color: rankColor }]}>{item.rank}</Text>
          <View style={styles.avatar}>
            {item.avatarUrl ? (
              <Image source={{ uri: item.avatarUrl }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{item.name.split(' & ').map((n: string) => n[0]).join('')}</Text>
            )}
          </View>
          <View>
            <Text style={styles.coupleName}>{item.name}</Text>
            <Text style={styles.daysActive}>{item.daysActive} days active</Text>
          </View>
        </View>
        
        <View style={styles.streakSection}>
          <Flame color={theme.colors.accent} size={16} fill={theme.colors.accent} />
          <Text style={styles.streakText}>{item.streak}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Yearly Trip Leaderboard</Text>
          <View style={styles.countdownContainer}>
            <Clock color={theme.colors.goldDark} size={16} />
            <Text style={styles.countdownText}>{MOCK_USER.daysToReset} days remaining</Text>
          </View>
        </View>

        <FlatList
          data={MOCK_LEADERBOARD}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <ScaleButton style={styles.userRankCard}>
              <View style={styles.rankBadge}>
                <Trophy color={theme.colors.goldDark} size={24} />
                <Text style={styles.userRankText}>Your Rank</Text>
              </View>
              <View style={styles.userRow}>
                <Text style={styles.userRankValue}>#{MOCK_USER.rank}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{MOCK_USER.name}</Text>
                  <Text style={styles.userStreak}>🔥 {MOCK_USER.streak} day streak</Text>
                </View>
                <ChevronRight color={theme.colors.textMuted} size={24} />
              </View>
            </ScaleButton>
          }
        />
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: theme.spacing.lg, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.background },
  title: { color: theme.colors.text, fontSize: theme.typography.fontSize.lg, fontFamily: theme.typography.fontFamily.headline },
  countdownContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  countdownText: { color: theme.colors.goldDark, fontSize: 13, marginLeft: 6, fontFamily: theme.typography.fontFamily.bodyBold },
  listContent: { padding: theme.spacing.lg },
  userRankCard: { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.md, padding: theme.spacing.lg, marginBottom: theme.spacing.xl, borderWidth: 2, borderColor: theme.colors.gold, ...theme.shadow.md },
  rankBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  userRankText: { color: theme.colors.goldDark, fontSize: 12, fontWeight: 'bold', marginLeft: 8, textTransform: 'uppercase' },
  userRow: { flexDirection: 'row', alignItems: 'center' },
  userRankValue: { color: theme.colors.text, fontSize: 32, fontFamily: theme.typography.fontFamily.headline, marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { color: theme.colors.text, fontSize: 16, fontWeight: 'bold', fontFamily: theme.typography.fontFamily.bodyBold },
  userStreak: { color: theme.colors.accent, fontSize: 14, marginTop: 2, fontFamily: theme.typography.fontFamily.bodyMedium },
  itemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  userItem: { backgroundColor: theme.colors.accentSoft, borderRadius: 8, paddingHorizontal: 8 },
  rankSection: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rankNumber: { fontSize: 18, fontFamily: theme.typography.fontFamily.headline, width: 30, textAlign: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12, overflow: 'hidden' },
  avatarImage: { width: '100%', height: '100%' },
  avatarText: { color: theme.colors.text, fontSize: 12, fontWeight: 'bold' },
  coupleName: { color: theme.colors.text, fontSize: 15, fontFamily: theme.typography.fontFamily.bodyMedium },
  daysActive: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  streakSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  streakText: { color: theme.colors.text, marginLeft: 6, fontSize: 14, fontWeight: 'bold' },
});
