import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X, Camera as CameraIcon, RotateCcw, Check, Image as ImageIcon, Zap, ZapOff } from 'lucide-react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../../theme/theme';
import { FadeInView, ScaleButton } from '../../components/AnimatedComponents';
import { useAppContext } from '../../context/AppContext';

const { width } = Dimensions.get('window');

export const CameraScreen = ({ navigation }: any) => {
  const { uploadPhoto } = useAppContext();
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
  const [hasCaptured, setHasCaptured] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    (async () => {
      if (!permission?.granted) await requestPermission();
      if (!mediaPermission?.granted) await requestMediaPermission();
    })();
  }, []);

  if (!permission) {
    return <View style={styles.loadingContainer}><ActivityIndicator color={theme.colors.accent} /></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>We need your permission to show the camera</Text>
        <ScaleButton style={styles.permissionBtn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant Permission</Text>
        </ScaleButton>
      </View>
    );
  }

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo) {
          setPhotoUri(photo.uri);
          setHasCaptured(true);
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to take photo');
      }
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setHasCaptured(true);
    }
  };

  const handleConfirm = () => {
    if (photoUri) {
      uploadPhoto(photoUri);
      Alert.alert('Success', 'Memory uploaded! Streak maintained.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {!hasCaptured ? (
        <CameraView 
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          facing="back"
          enableTorch={flash === 'on'}
        >
          <SafeAreaView style={styles.overlay}>
            <View style={styles.topControls}>
              <ScaleButton style={styles.iconBtn} onPress={() => navigation.goBack()}>
                <X color="#FFFFFF" size={28} />
              </ScaleButton>
              <ScaleButton style={styles.iconBtn} onPress={() => setFlash(f => f === 'on' ? 'off' : 'on')}>
                {flash === 'on' ? <Zap color={theme.colors.gold} size={24} fill={theme.colors.gold} /> : <ZapOff color="#FFFFFF" size={24} />}
              </ScaleButton>
            </View>

            <View style={styles.viewfinderContainer}>
               <View style={styles.guideFrame} />
            </View>

            <View style={styles.bottomControls}>
              <ScaleButton style={styles.sideBtn} onPress={handlePickImage}>
                <ImageIcon color="#FFFFFF" size={28} />
              </ScaleButton>
              
              <ScaleButton style={styles.captureBtn} onPress={handleCapture}>
                <View style={styles.captureInner} />
              </ScaleButton>
              
              <View style={styles.sideBtn} />
            </View>
          </SafeAreaView>
        </CameraView>
      ) : (
        <View style={styles.container}>
          <Image source={{ uri: photoUri! }} style={StyleSheet.absoluteFill} />
          <SafeAreaView style={styles.overlay}>
            <View style={styles.topControls}>
              <ScaleButton style={styles.iconBtn} onPress={() => setHasCaptured(false)}>
                <RotateCcw color="#FFFFFF" size={28} />
              </ScaleButton>
            </View>
            
            <View style={styles.confirmActions}>
              <ScaleButton style={styles.confirmBtn} onPress={handleConfirm}>
                <Check color="#FFFFFF" size={32} />
                <Text style={styles.confirmText}>Share Memory</Text>
              </ScaleButton>
            </View>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loadingContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  permissionContainer: { flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center', padding: 40 },
  permissionText: { color: theme.colors.text, fontSize: 16, textAlign: 'center', marginBottom: 20 },
  permissionBtn: { backgroundColor: theme.colors.accent, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  overlay: { flex: 1, justifyContent: 'space-between' },
  topControls: { flexDirection: 'row', justifyContent: 'space-between', padding: 20 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  viewfinderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  guideFrame: { width: width * 0.75, aspectRatio: 3/4, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' },
  bottomControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingBottom: 60 },
  sideBtn: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  captureBtn: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#FFFFFF', padding: 4, justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: '100%', height: '100%', borderRadius: 40, backgroundColor: '#FFFFFF' },
  confirmActions: { paddingBottom: 60, alignItems: 'center' },
  confirmBtn: { backgroundColor: theme.colors.accent, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30, ...theme.shadow.md },
  confirmText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
});
