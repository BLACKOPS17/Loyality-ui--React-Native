import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, Lock, Link as LinkIcon } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const LoginScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.content} 
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContent}>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to keep your streak alive.</Text>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Mail color={theme.colors.textMuted} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor={theme.colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Lock color={theme.colors.textMuted} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={theme.colors.textMuted}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity style={styles.forgotBtn}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <ScaleButton 
                  style={styles.primaryBtn}
                  onPress={() => navigation.navigate('Main')}
                >
                  <Text style={styles.primaryBtnText}>Login</Text>
                </ScaleButton>

                <ScaleButton style={styles.secondaryBtn}>
                  <LinkIcon color={theme.colors.text} size={20} />
                  <Text style={styles.secondaryBtnText}>Connect with Partner Code</Text>
                </ScaleButton>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.linkText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </FadeInView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { flexGrow: 1 },
  innerContent: { padding: theme.spacing.xl, flex: 1, justifyContent: 'center' },
  title: { color: theme.colors.text, fontSize: theme.typography.fontSize.xxl, fontFamily: theme.typography.fontFamily.headline, marginBottom: theme.spacing.sm },
  subtitle: { color: theme.colors.textMuted, fontSize: theme.typography.fontSize.md, fontFamily: theme.typography.fontFamily.body, marginBottom: theme.spacing.xxl },
  form: { marginTop: theme.spacing.xl },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, paddingHorizontal: theme.spacing.lg, paddingVertical: 4, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border },
  input: { flex: 1, height: 48, color: theme.colors.text, marginLeft: theme.spacing.md, fontFamily: theme.typography.fontFamily.body },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: theme.spacing.xl },
  forgotText: { color: theme.colors.accent, fontFamily: theme.typography.fontFamily.bodyMedium },
  primaryBtn: { backgroundColor: theme.colors.accent, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', marginBottom: theme.spacing.md, ...theme.shadow.md },
  primaryBtnText: { color: '#FFFFFF', fontSize: theme.typography.fontSize.md, fontFamily: theme.typography.fontFamily.bodyBold },
  secondaryBtn: { flexDirection: 'row', backgroundColor: theme.colors.background, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border, marginBottom: theme.spacing.xl },
  secondaryBtnText: { color: theme.colors.text, marginLeft: theme.spacing.md, fontFamily: theme.typography.fontFamily.bodyMedium },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.xl },
  footerText: { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily.body },
  linkText: { color: theme.colors.accent, fontFamily: theme.typography.fontFamily.bodyBold },
});
