import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Lock, Flame, Calendar, Award, Trophy, Clock, Heart, Zap, Sun, Moon, Map, Crown, Camera } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_BADGES } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

const ICON_MAP: any = {
  Flame, Calendar, Award, Trophy, Clock, Heart, Zap, Sun, Moon, Map, Crown, Camera
};

export const BadgesScreen = ({ navigation }: any) => {
  const renderBadge = ({ item }: any) => {
    const IconComponent = ICON_MAP[item.icon] || Flame;

    return (
      <ScaleButton style={styles.badgeItem}>
        <View style={[styles.iconContainer, !item.unlocked && styles.lockedIcon]}>
          <IconComponent 
            color={item.unlocked ? theme.colors.gold : theme.colors.textMuted} 
            size={32} 
          />
          {!item.unlocked && (
            <View style={styles.lockBadge}>
              <Lock color="white" size={10} />
            </View>
          )}
        </View>
        <Text style={[styles.badgeName, !item.unlocked && styles.lockedText]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.badgeDesc} numberOfLines={2}>
          {item.description}
        </Text>
      </ScaleButton>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <ScaleButton onPress={() => navigation.goBack()}>
            <ChevronLeft color={theme.colors.text} size={24} />
          </ScaleButton>
          <Text style={styles.headerTitle}>Unlocked Badges</Text>
          <View style={{ width: 24 }} />
        </View>

      <FlatList
        data={MOCK_BADGES}
        renderItem={renderBadge}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, backgroundColor: theme.colors.background },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  listContent: { padding: theme.spacing.md },
  columnWrapper: { justifyContent: 'flex-start' },
  badgeItem: { width: '33%', padding: 8, alignItems: 'center', marginBottom: theme.spacing.xl },
  iconContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', marginBottom: 10, position: 'relative', borderWidth: 1, borderColor: theme.colors.border, ...theme.shadow.sm },
  lockedIcon: { opacity: 0.5, backgroundColor: theme.colors.surface },
  lockBadge: { position: 'absolute', bottom: 4, right: 4, backgroundColor: theme.colors.border, padding: 4, borderRadius: 10, borderWidth: 1, borderColor: theme.colors.surface },
  badgeName: { color: theme.colors.text, fontSize: 12, fontFamily: theme.typography.fontFamily.bodyBold, textAlign: 'center', marginBottom: 4 },
  lockedText: { color: theme.colors.textMuted },
  badgeDesc: { color: theme.colors.textMuted, fontSize: 10, textAlign: 'center', fontFamily: theme.typography.fontFamily.body },
});
