import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Share, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, Lock, Share2, Clipboard, Heart } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const RegisterScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(`L-${newCode}`);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Connect with me on Loyalty! My partner code is: ${code}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Account Details</Text>
            <View style={styles.inputContainer}>
              <User color={theme.colors.textMuted} size={20} />
              <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={theme.colors.textMuted} />
            </View>
            <View style={styles.inputContainer}>
              <Mail color={theme.colors.textMuted} size={20} />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor={theme.colors.textMuted} keyboardType="email-address" />
            </View>
            <View style={styles.inputContainer}>
              <Lock color={theme.colors.textMuted} size={20} />
              <TextInput style={styles.input} placeholder="Password" placeholderTextColor={theme.colors.textMuted} secureTextEntry />
            </View>
            <ScaleButton style={styles.primaryBtn} onPress={() => setStep(2)}>
              <Text style={styles.primaryBtnText}>Continue</Text>
            </ScaleButton>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Partner Connection</Text>
            <Text style={styles.stepSub}>Generate a code to share with your partner, or enter theirs below.</Text>
            
            {!code ? (
              <ScaleButton style={styles.actionBtn} onPress={generateCode}>
                <Text style={styles.actionBtnText}>Generate My Code</Text>
              </ScaleButton>
            ) : (
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>{code}</Text>
                <ScaleButton onPress={handleShare}>
                  <Share2 color={theme.colors.accent} size={24} />
                </ScaleButton>
              </View>
            )}

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.inputContainer}>
              <Clipboard color={theme.colors.textMuted} size={20} />
              <TextInput style={styles.input} placeholder="Enter Partner Code" placeholderTextColor={theme.colors.textMuted} />
            </View>

            <ScaleButton style={styles.primaryBtn} onPress={() => setStep(3)}>
              <Text style={styles.primaryBtnText}>Connect</Text>
            </ScaleButton>
          </View>
        );
      case 3:
        return (
          <View style={styles.centerStep}>
            <View style={styles.successIcon}>
              <Heart color={theme.colors.accent} size={64} fill={theme.colors.accent} />
            </View>
            <Text style={styles.stepTitle}>You're Connected!</Text>
            <Text style={styles.stepSub}>Your journey together begins today. Ready to start your streak?</Text>
            <ScaleButton 
              style={[styles.primaryBtn, { width: '100%', marginTop: theme.spacing.xxl }]} 
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.primaryBtnText}>Let's Go!</Text>
            </ScaleButton>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.innerContent}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Create Account</Text>
                <View style={styles.progressContainer}>
                  {[1, 2, 3].map((s) => (
                    <View 
                      key={s} 
                      style={[
                        styles.progressDot, 
                        step >= s && styles.progressDotActive
                      ]} 
                    />
                  ))}
                </View>
              </View>

              <View style={styles.formContainer}>
                {renderStep()}
              </View>

              {step < 3 && (
                <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Login</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  header: { marginBottom: theme.spacing.xxl },
  headerTitle: { color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontFamily: theme.typography.fontFamily.headline },
  progressContainer: { flexDirection: 'row', marginTop: theme.spacing.md },
  progressDot: { height: 4, flex: 1, backgroundColor: theme.colors.surface, marginHorizontal: 2, borderRadius: 2 },
  progressDotActive: { backgroundColor: theme.colors.accent },
  formContainer: { marginTop: theme.spacing.xl },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: theme.spacing.xl, paddingBottom: theme.spacing.xl },
  footerText: { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily.body },
  linkText: { color: theme.colors.accent, fontFamily: theme.typography.fontFamily.bodyBold },
  stepTitle: { color: theme.colors.text, fontSize: theme.typography.fontSize.lg, fontFamily: theme.typography.fontFamily.bodyBold, marginBottom: theme.spacing.sm },
  stepSub: { color: theme.colors.textMuted, fontSize: theme.typography.fontSize.md, marginBottom: theme.spacing.xl },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, paddingHorizontal: theme.spacing.lg, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border },
  input: { flex: 1, height: 48, color: theme.colors.text, marginLeft: theme.spacing.md, fontFamily: theme.typography.fontFamily.body },
  primaryBtn: { backgroundColor: theme.colors.accent, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', ...theme.shadow.md },
  primaryBtnText: { color: '#FFFFFF', fontSize: theme.typography.fontSize.md, fontFamily: theme.typography.fontFamily.bodyBold },
  actionBtn: { borderWidth: 1, borderColor: theme.colors.accent, padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', marginBottom: theme.spacing.xl },
  actionBtnText: { color: theme.colors.accent, fontWeight: 'bold' },
  codeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.colors.surface, padding: theme.spacing.xl, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.xl, borderStyle: 'dashed', borderWidth: 2, borderColor: theme.colors.accent },
  codeText: { color: theme.colors.text, fontSize: 32, fontFamily: theme.typography.fontFamily.headline, letterSpacing: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: theme.spacing.xl },
  line: { flex: 1, height: 1, backgroundColor: theme.colors.border },
  orText: { color: theme.colors.textMuted, marginHorizontal: theme.spacing.lg },
  centerStep: { alignItems: 'center', paddingTop: 4 },
  successIcon: { marginBottom: theme.spacing.xl },
});
