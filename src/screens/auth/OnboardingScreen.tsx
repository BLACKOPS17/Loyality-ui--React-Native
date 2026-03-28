import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Flame, Heart, Trophy } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Your Love, Documented',
    description: 'Take a daily photo together and capture the moments that matter.',
    icon: Heart,
  },
  {
    id: '2',
    title: 'Build Your Streak',
    description: 'The longer the streak, the stronger the bond. Keep the flame alive!',
    icon: Flame,
  },
  {
    id: '3',
    title: 'Win the Ultimate Prize',
    description: 'Compete for an all-expenses-paid dream wedding or a luxury vacation.',
    icon: Trophy,
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <ScaleButton 
          style={styles.skipButton} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.skipText}>Skip</Text>
        </ScaleButton>

      <FlatList
        data={SLIDES}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <item.icon color={theme.colors.accent} size={120} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <View style={styles.paginator}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 20, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View 
                style={[styles.dot, { width: dotWidth, opacity }]} 
                key={i.toString()} 
              />
            );
          })}
        </View>

        <ScaleButton
          style={styles.button}
          onPress={() => {
            if (currentIndex < SLIDES.length - 1) {
              //@ts-ignore
              slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
            } else {
              navigation.navigate('Register');
            }
          }}
        >
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </ScaleButton>
      </View>
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  skipButton: { padding: theme.spacing.lg, alignSelf: 'flex-end' },
  skipText: { color: theme.colors.textMuted, fontFamily: theme.typography.fontFamily.bodyMedium, fontSize: theme.typography.fontSize.md },
  slide: { width, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl },
  title: { color: theme.colors.text, fontSize: theme.typography.fontSize.xl, fontFamily: theme.typography.fontFamily.headline, textAlign: 'center', marginTop: theme.spacing.xl, marginBottom: theme.spacing.md },
  description: { color: theme.colors.textMuted, fontSize: theme.typography.fontSize.md, fontFamily: theme.typography.fontFamily.body, textAlign: 'center', paddingHorizontal: theme.spacing.xl, lineHeight: 24 },
  footer: { padding: theme.spacing.xl, alignItems: 'center', paddingBottom: 40 },
  paginator: { flexDirection: 'row', height: 60, alignItems: 'center' },
  dot: { height: 8, borderRadius: 4, backgroundColor: theme.colors.accent, marginHorizontal: 6 },
  button: { backgroundColor: theme.colors.accent, width: '100%', padding: theme.spacing.lg, borderRadius: theme.borderRadius.md, alignItems: 'center', ...theme.shadow.md },
  buttonText: { color: '#FFFFFF', fontSize: theme.typography.fontSize.md, fontFamily: theme.typography.fontFamily.bodyBold },
});
