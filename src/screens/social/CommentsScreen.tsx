import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ChevronLeft } from 'lucide-react-native';
import { theme } from '../../theme/theme';
import { MOCK_COMMENTS } from '../../data/mockData';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';

export const CommentsScreen = ({ navigation, route }: any) => {
  const { coupleName } = route.params || { coupleName: 'Couple' };
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: String(Date.now()),
      name: 'You',
      text: newComment,
      time: 'Just now',
    };
    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.container}>
        <View style={styles.header}>
          <ScaleButton onPress={() => navigation.goBack()}>
            <ChevronLeft color={theme.colors.text} size={24} />
          </ScaleButton>
        <Text style={styles.headerTitle}>Comments • {coupleName}</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentName}>{item.name}</Text>
                <Text style={styles.commentTime}>{item.time}</Text>
              </View>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={theme.colors.textMuted}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <ScaleButton onPress={handleAddComment}>
            <Send color={newComment.trim() ? theme.colors.accent : theme.colors.textMuted} size={24} />
          </ScaleButton>
        </View>
      </KeyboardAvoidingView>
    </FadeInView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.lg, borderBottomWidth: 1, borderBottomColor: theme.colors.border, backgroundColor: theme.colors.background },
  headerTitle: { color: theme.colors.text, fontSize: 16, fontFamily: theme.typography.fontFamily.bodyBold },
  listContent: { padding: theme.spacing.lg },
  commentItem: { flexDirection: 'row', marginBottom: theme.spacing.xl },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.surface, justifyContent: 'center', alignItems: 'center', marginRight: theme.spacing.md },
  avatarText: { color: theme.colors.text, fontSize: 10, fontWeight: 'bold' },
  commentContent: { flex: 1 },
  commentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  commentName: { color: theme.colors.text, fontFamily: theme.typography.fontFamily.bodyBold, fontSize: 12, marginRight: 8 },
  commentTime: { color: theme.colors.textMuted, fontSize: 10, fontFamily: theme.typography.fontFamily.body },
  commentText: { color: theme.colors.text, fontSize: 14, lineHeight: 20, fontFamily: theme.typography.fontFamily.body },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.lg, borderTopWidth: 1, borderTopColor: theme.colors.border, backgroundColor: theme.colors.background },
  input: { flex: 1, color: theme.colors.text, fontSize: 14, maxHeight: 100, marginRight: theme.spacing.md, fontFamily: theme.typography.fontFamily.body },
});
