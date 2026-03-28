import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, Animated, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, MessageCircle, MapPin, MoreHorizontal, Flame, Plus } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_FEED } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

const HeartAnimation = ({ visible, onComplete }: { visible: boolean; onComplete: () => void }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.5,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(onComplete);
        }, 300);
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.heartOverlay, { transform: [{ scale }], opacity }]}>
      <Heart color={theme.colors.accent} size={100} fill={theme.colors.accent} />
    </Animated.View>
  );
};

export const FeedScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [animatingPostId, setAnimatingPostId] = useState<string | null>(null);
  const lastTap = useRef<{ [key: string]: number }>({});

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleDoubleTap = (postId: string) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (lastTap.current[postId] && (now - lastTap.current[postId]) < DOUBLE_TAP_DELAY) {
      if (!likedPosts[postId]) {
        toggleLike(postId);
      }
      setAnimatingPostId(postId);
    } else {
      lastTap.current[postId] = now;
    }
  };

  const renderPost = ({ item }: any) => {
    const isLiked = likedPosts[item.id] || false;
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.coupleName.split(' & ').map((n: string) => n[0]).join('')}</Text>
            </View>
            <View>
              <Text style={styles.coupleName}>{item.coupleName}</Text>
              <View style={styles.locationContainer}>
                <MapPin color={theme.colors.textMuted} size={12} />
                <Text style={styles.locationText}>{item.location}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity>
            <MoreHorizontal color={theme.colors.textMuted} size={20} />
          </TouchableOpacity>
        </View>

        <Pressable 
          style={styles.photoContainer} 
          onPress={() => handleDoubleTap(item.id)}
        >
          {item.photoUrl ? (
            <Image source={{ uri: item.photoUrl }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Heart color="rgba(255,255,255,0.05)" size={100} />
            </View>
          )}
          
          <HeartAnimation 
            visible={animatingPostId === item.id} 
            onComplete={() => setAnimatingPostId(null)} 
          />

          <View style={styles.streakBadge}>
            <Flame color={theme.colors.text} size={14} fill={theme.colors.text} />
            <Text style={styles.streakText}>{item.streak} days</Text>
          </View>
        </Pressable>

        <View style={styles.cardFooter}>
          <View style={styles.actions}>
            <ScaleButton style={styles.actionBtn} onPress={() => toggleLike(item.id)}>
              <Heart 
                color={isLiked ? theme.colors.accent : theme.colors.text} 
                fill={isLiked ? theme.colors.accent : 'transparent'} 
                size={24} 
              />
              <Text style={[styles.actionText, isLiked && { color: theme.colors.accent }]}>
                {isLiked ? item.likes + 1 : item.likes}
              </Text>
            </ScaleButton>
            <ScaleButton 
              style={styles.actionBtn}
              onPress={() => navigation.navigate('Comments', { coupleName: item.coupleName })}
            >
              <MessageCircle color={theme.colors.text} size={24} />
              <Text style={styles.actionText}>Comment</Text>
            </ScaleButton>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Waterfall Feed</Text>
          <ScaleButton onPress={() => navigation.navigate('Camera')}>
            <Plus color={theme.colors.accent} size={24} />
          </ScaleButton>
        </View>
      <FlatList
        data={MOCK_FEED}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.accent} />
        }
      />
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.background },
  title: { color: theme.colors.text, fontSize: 18, fontFamily: theme.typography.fontFamily.headline },
  listContent: { padding: theme.spacing.md },
  card: { backgroundColor: theme.colors.background, borderRadius: theme.borderRadius.md, marginBottom: theme.spacing.xl, overflow: 'hidden', ...theme.shadow.sm },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.md },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.md, overflow: 'hidden' },
  avatarText: { color: theme.colors.text, fontSize: 12, fontWeight: 'bold' },
  coupleName: { color: theme.colors.text, fontSize: 14, fontFamily: theme.typography.fontFamily.bodyBold },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  locationText: { color: theme.colors.textMuted, fontSize: 10, marginLeft: 4, fontFamily: theme.typography.fontFamily.body },
  photoContainer: { width: '100%', aspectRatio: 0.8, backgroundColor: theme.colors.surface, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  photo: { width: '100%', height: '100%' },
  photoPlaceholder: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  heartOverlay: { position: 'absolute', zIndex: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 10 },
  streakBadge: { position: 'absolute', bottom: 12, left: 12, backgroundColor: 'rgba(192, 57, 43, 0.85)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  streakText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  cardFooter: { padding: theme.spacing.md },
  actions: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionText: { color: theme.colors.text, marginLeft: 8, fontSize: 12, fontFamily: theme.typography.fontFamily.bodyMedium },
  timestamp: { color: theme.colors.textMuted, fontSize: 10, textTransform: 'uppercase', fontFamily: theme.typography.fontFamily.body },
});
