import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import { ScreenId, useThemeStore } from '../store/useThemeStore';
import { useTheme } from '../theme/useTheme';
import { PICTURE_PRESETS, VIDEO_PRESETS } from '../theme/theme';

interface ScreenBackgroundWrapperProps {
  screenId: ScreenId;
  children: React.ReactNode;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Animated Video Loop Simulation layer for smooth motion when video background is selected
const AnimatedVideoBackground = ({ videoPresetId }: { videoPresetId: string }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;
  const moveValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 18000,
        useNativeDriver: true,
      })
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    const moveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(moveValue, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(moveValue, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    );

    spinAnimation.start();
    pulseAnimation.start();
    moveAnimation.start();

    return () => {
      spinAnimation.stop();
      pulseAnimation.stop();
      moveAnimation.stop();
    };
  }, [spinValue, pulseValue, moveValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.35],
  });

  const translateX = moveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 60],
  });

  const translateY = moveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 40],
  });

  const isCosmic = videoPresetId.includes('cosmic') || videoPresetId.includes('aurora');
  const isRain = videoPresetId.includes('rain') || videoPresetId.includes('city');
  const isDigital = videoPresetId.includes('digital') || videoPresetId.includes('flow');

  const orb1Color = isCosmic ? '#7C3AED' : isRain ? '#0EA5E9' : isDigital ? '#00F0FF' : '#EC4899';
  const orb2Color = isCosmic ? '#C084FC' : isRain ? '#38BDF8' : isDigital ? '#FF007F' : '#34D399';
  const orb3Color = isCosmic ? '#3B82F6' : isRain ? '#10B981' : isDigital ? '#FFE600' : '#F97316';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View
        style={[
          styles.animatedOrb,
          {
            backgroundColor: orb1Color,
            width: SCREEN_WIDTH * 0.9,
            height: SCREEN_WIDTH * 0.9,
            borderRadius: SCREEN_WIDTH * 0.45,
            top: -100,
            left: -50,
            transform: [{ rotate: spin }, { scale }],
            opacity: 0.35,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.animatedOrb,
          {
            backgroundColor: orb2Color,
            width: SCREEN_WIDTH * 0.8,
            height: SCREEN_WIDTH * 0.8,
            borderRadius: SCREEN_WIDTH * 0.4,
            bottom: -80,
            right: -60,
            transform: [{ translateX }, { translateY }],
            opacity: 0.3,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.animatedOrb,
          {
            backgroundColor: orb3Color,
            width: SCREEN_WIDTH * 0.7,
            height: SCREEN_WIDTH * 0.7,
            borderRadius: SCREEN_WIDTH * 0.35,
            top: SCREEN_HEIGHT * 0.3,
            alignSelf: 'center',
            transform: [{ scale }, { translateY }],
            opacity: 0.25,
          },
        ]}
      />
    </View>
  );
};

export const ScreenBackgroundWrapper: React.FC<ScreenBackgroundWrapperProps> = ({
  screenId,
  children,
}) => {
  const { colors } = useTheme();
  const screenBackgrounds = useThemeStore((state) => state.screenBackgrounds);
  const config = screenBackgrounds[screenId] || {
    mode: 'solid',
    pictureUri: 'midnight_nebula',
    videoUri: 'cosmic_aurora',
    overlayOpacity: 0.4,
    blurRadius: 0,
  };

  const getPictureUri = (keyOrUri: string) => {
    const preset = PICTURE_PRESETS.find((p) => p.id === keyOrUri);
    return preset ? preset.uri : keyOrUri;
  };

  const getVideoThumbnailUri = (keyOrUri: string) => {
    const preset = VIDEO_PRESETS.find((v) => v.id === keyOrUri);
    return preset ? preset.thumbnail : keyOrUri;
  };

  if (config.mode === 'picture') {
    const imageUri = getPictureUri(config.pictureUri);
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ImageBackground
          source={{ uri: imageUri }}
          blurRadius={config.blurRadius || 0}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          {/* Overlay mask for high legibility */}
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.background,
                opacity: Math.max(0.2, config.overlayOpacity ?? 0.45),
              },
            ]}
          />
        </ImageBackground>
        {children}
      </View>
    );
  }

  if (config.mode === 'video') {
    const thumbnailUri = getVideoThumbnailUri(config.videoUri);
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Background Image base layer */}
        <ImageBackground
          source={{ uri: thumbnailUri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        >
          {/* Animated video motion loop overlay */}
          <AnimatedVideoBackground videoPresetId={config.videoUri} />

          {/* Semi-transparent dark/light tint overlay for readability */}
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.background,
                opacity: Math.max(0.25, config.overlayOpacity ?? 0.5),
              },
            ]}
          />
        </ImageBackground>
        {children}
      </View>
    );
  }

  // Solid theme background
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  animatedOrb: {
    position: 'absolute',
  },
});
