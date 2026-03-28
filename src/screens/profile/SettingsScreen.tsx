import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Lock, LogOut, Trash2, Zap, Settings as SettingsIcon, ChevronRight } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const SettingsScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = React.useState({
    daily: true,
    partner: true,
    leaderboard: false,
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.navigate('Auth') },
    ]);
  };

  const renderItem = (icon: any, title: string, subtitle?: string, action?: any, rightElement?: any) => (
    <ScaleButton style={styles.item} onPress={action}>
      <View style={styles.itemIcon}>
        {icon}
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        {subtitle && <Text style={styles.itemSub}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight color={theme.colors.textMuted} size={20} />}
    </ScaleButton>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <ScaleButton onPress={() => navigation.goBack()}>
            <ChevronLeft color={theme.colors.text} size={24} />
          </ScaleButton>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 24 }} />
        </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionHeader}>Notifications</Text>
        <View style={styles.section}>
          {renderItem(<Bell color={theme.colors.text} size={20} />, 'Daily Reminder', 'Get notified to take your photo', undefined, 
            <Switch 
              value={notifications.daily} 
              onValueChange={(v) => setNotifications({...notifications, daily: v})}
              trackColor={{ false: theme.colors.card, true: theme.colors.accent }}
            />
          )}
          {renderItem(<Bell color={theme.colors.text} size={20} />, 'Partner Upload', 'Notify me when my partner uploads', undefined,
            <Switch 
              value={notifications.partner} 
              onValueChange={(v) => setNotifications({...notifications, partner: v})}
              trackColor={{ false: theme.colors.card, true: theme.colors.accent }}
            />
          )}
        </View>

        <Text style={styles.sectionHeader}>Premium</Text>
        <ScaleButton style={styles.premiumCard}>
          <View style={styles.premiumHeader}>
            <Zap color={theme.colors.goldDark} size={24} fill={theme.colors.goldDark} />
            <Text style={styles.premiumTitle}>Unlock Pro Features</Text>
          </View>
          <Text style={styles.premiumText}>Get infinite streak freezes and exclusive photo filters.</Text>
          <ChevronRight color={theme.colors.goldDark} size={20} />
        </ScaleButton>

        <Text style={styles.sectionHeader}>Account</Text>
        <View style={styles.section}>
          {renderItem(<SettingsIcon color={theme.colors.text} size={20} />, 'Edit Name')}
          {renderItem(<Lock color={theme.colors.text} size={20} />, 'Change Password')}
        </View>

        <View style={styles.footer}>
          <ScaleButton style={styles.logoutBtn} onPress={handleLogout}>
            <LogOut color={theme.colors.accent} size={20} />
            <Text style={styles.logoutText}>Logout</Text>
          </ScaleButton>

          <ScaleButton style={styles.deleteBtn}>
            <Trash2 color={theme.colors.textMuted} size={18} />
            <Text style={styles.deleteText}>Delete Account</Text>
          </ScaleButton>
          
          <Text style={styles.version}>Loyalty Version 1.0.0</Text>
        </View>
      </ScrollView>
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.background },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  content: { padding: theme.spacing.lg },
  sectionHeader: { color: theme.colors.textMuted, fontSize: 12, fontFamily: theme.typography.fontFamily.bodyBold, textTransform: 'uppercase', marginBottom: 12, marginTop: 24, marginLeft: 4 },
  section: { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.md, overflow: 'hidden', borderWidth: 1, borderColor: theme.colors.border },
  item: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  itemIcon: { width: 32, alignItems: 'center' },
  itemContent: { flex: 1, marginLeft: 12 },
  itemTitle: { color: theme.colors.text, fontSize: 14, fontFamily: theme.typography.fontFamily.bodyMedium },
  itemSub: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2, fontFamily: theme.typography.fontFamily.body },
  premiumCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(212, 175, 55, 0.05)', padding: theme.spacing.xl, borderRadius: theme.borderRadius.lg, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.2)' },
  premiumHeader: { flex: 1 },
  premiumTitle: { color: theme.colors.goldDark, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold, marginBottom: 4 },
  premiumText: { color: theme.colors.goldDark, fontSize: 12, flex: 1, marginRight: 20, fontFamily: theme.typography.fontFamily.body },
  footer: { marginTop: 40, paddingBottom: 40 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg, backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md, marginBottom: 20 },
  logoutText: { color: theme.colors.accent, fontFamily: theme.typography.fontFamily.bodyBold, marginLeft: 12 },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 },
  deleteText: { color: theme.colors.textMuted, marginLeft: 8, fontSize: 12, fontFamily: theme.typography.fontFamily.body },
  version: { color: theme.colors.textMuted, fontSize: 10, textAlign: 'center', marginTop: 20, fontFamily: theme.typography.fontFamily.body },
});
