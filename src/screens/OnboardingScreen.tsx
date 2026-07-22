import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  Extrapolate,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  useAnimatedRef,
  SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Sun,
  Briefcase,
  Plane,
  Dumbbell,
  ShoppingCart,
  Grid,
  Search,
  Check,
  ChevronRight,
  Sparkles,
  Luggage,
  Calendar,
  Layers,
  Sparkle,
  Compass,
} from 'lucide-react-native';
import { useAppStore } from '../store/useAppStore';
import { themes } from '../theme/theme';
import { hapticMedium, hapticHeavy, hapticSelection } from '../utils/haptics';

// Background images for card slides (dark/light variants)
const SLIDE_BACKGROUNDS = {
  categories: {
    dark: require('../assets/images/slide_categories_dark.png'),
    light: require('../assets/images/slide_categories_light.png'),
  },
  templates: {
    dark: require('../assets/images/slide_templates_dark.png'),
    light: require('../assets/images/slide_categories_dark.png'), // reuse dark categories as fallback
  },
  checklist: {
    dark: require('../assets/images/slide_templates_dark.png'), // reuse templates dark
    light: require('../assets/images/slide_categories_light.png'), // reuse categories light
  },
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Slides Data definitions
const SLIDES = [
  {
    key: 'slide1',
    title: 'Never forget\nwhat matters',
    highlight: 'what matters',
    highlightColor: '#C084FC', // Purple light accent
    subtext: 'Your smart checklist companion for every moment of life.',
  },
  {
    key: 'slide2',
    title: 'For every part\nof your life',
    highlight: 'your life',
    highlightColor: '#818CF8', // Indigo light accent
    subtext: "From daily routines to big adventures, we've got you covered.",
  },
  {
    key: 'slide3',
    title: 'Organized\nthe smart way',
    highlight: 'the smart way',
    highlightColor: '#FBBF24', // Orange/yellow
    subtext: 'Beautiful categories help you find and access your checklists in seconds.',
  },
  {
    key: 'slide4',
    title: 'Ready-made\ntemplates',
    highlight: 'templates',
    highlightColor: '#34D399', // Green
    subtext: 'Hundreds of beautiful templates to get you started instantly.',
  },
  {
    key: 'slide5',
    title: 'Check, track\nand go!',
    highlight: 'and go!',
    highlightColor: '#60A5FA', // Blue
    subtext: 'Quickly check items, track progress and leave worry-free.',
  },
  {
    key: 'slide6',
    title: 'Sync everywhere,\nalways with you',
    highlight: 'always with you',
    highlightColor: '#F472B6', // Pink
    subtext: 'Access your lists on all your devices, anytime, even offline.',
  },
];

// Helper to render title with highlighted text color
const renderTitle = (title: string, highlight: string, highlightColor: string, isDark: boolean) => {
  const parts = title.split(highlight);
  return (
    <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>
      {parts[0]}
      <Text style={{ color: highlightColor }}>{highlight}</Text>
      {parts[1]}
    </Text>
  );
};

// Google Logo SVG component
const GoogleIcon = ({ size = 20 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </Svg>
);

export const OnboardingScreen = () => {
  const setOnboardingCompleted = useAppStore((state) => state.setOnboardingCompleted);
  const signInWithGoogleAction = useAppStore((state) => state.signInWithGoogleAction);
  const isAuthenticating = useAppStore((state) => state.isAuthenticating);
  const systemColorScheme = useColorScheme();
  const isDark = systemColorScheme === 'dark';
  const insets = useSafeAreaInsets();

  const handleGoogleSignIn = async () => {
    hapticHeavy();
    await signInWithGoogleAction();
  };

  // Base theme colors for onboarding splash screens
  const colors = isDark ? themes.midnight.dark : themes.midnight.light;

  const scrollX = useSharedValue(0);
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    hapticMedium();
    if (activeIndex === SLIDES.length - 1) {
      setOnboardingCompleted(true);
    } else {
      const nextIndex = activeIndex + 1;
      scrollViewRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  // const handleSkip = () => {
  //   setOnboardingCompleted(true);
  // };

  const handleSkip = () => {
    hapticMedium();
    const lastIndex = SLIDES.length - 1;

    // 1. Smoothly scroll to the final slide
    scrollViewRef.current?.scrollTo({
      x: lastIndex * SCREEN_WIDTH,
      animated: true
    });

    // 2. Set the active state index to the final page
    setActiveIndex(lastIndex);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Skip Button */}
      <View style={[styles.header, { top: insets.top + 10 }]}>
        {activeIndex < SLIDES.length - 1 ? (
          <TouchableOpacity onPress={handleSkip} activeOpacity={0.7} style={styles.skipButton}>
            <Text style={[styles.skipText, { color: colors.subtext }]}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      {/* Slide Scroll Container */}
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          if (index !== activeIndex) {
            hapticSelection();
          }
          setActiveIndex(index);
        }}
        style={styles.scrollView}
      >
        {SLIDES.map((slide, index) => {
          return (
            <View key={slide.key} style={styles.slideContainer}>
              {/* Graphic Component Container */}
              <View style={styles.graphicContainer}>
                <SlideGraphic index={index} isDark={isDark} scrollX={scrollX} />
              </View>

              {/* Text Info Container */}
              <View style={styles.infoContainer}>
                {renderTitle(slide.title, slide.highlight, slide.highlightColor, isDark)}
                <Text style={[styles.subtext, { color: colors.subtext }]}>
                  {slide.subtext}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Bottom Control Bar */}
      <View style={[styles.footer, { bottom: insets.bottom + 20 }]}>
        {/* If last screen, show Continue with Google and Guest options, else show Pagination & Next Button */}
        {activeIndex === SLIDES.length - 1 ? (
          <View style={styles.lastPageFooter}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              disabled={isAuthenticating}
              activeOpacity={0.85}
              style={[
                styles.googleButton,
                { backgroundColor: '#FFFFFF' },
              ]}
            >
              {isAuthenticating ? (
                <ActivityIndicator color="#1F2937" size="small" />
              ) : (
                <View style={styles.googleBtnInner}>
                  <GoogleIcon size={20} />
                  <Text style={styles.googleButtonText}>Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                hapticMedium();
                setOnboardingCompleted(true);
              }}
              activeOpacity={0.7}
              style={styles.guestButton}
            >
              <Text style={[styles.guestButtonText, { color: isDark ? 'rgba(255,255,255,0.7)' : '#6B7280' }]}>
                Continue as Guest
              </Text>
            </TouchableOpacity>

            {/* Dots below the button */}
            <View style={styles.dotsBelowContainer}>
              <PaginationDots scrollX={scrollX} isDark={isDark} />
            </View>
          </View>
        ) : (
          <View style={styles.standardFooter}>
            <PaginationDots scrollX={scrollX} isDark={isDark} />

            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={0.8}
              style={[styles.nextCircleButton, { backgroundColor: colors.primary }]}
            >
              <ChevronRight color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

// --- PAGINATION DOTS WITH DYNAMIC ACCENT COLORS ---
const PaginationDots = ({ scrollX, isDark }: { scrollX: SharedValue<number>; isDark: boolean }) => {
  return (
    <View style={styles.dotsContainer}>
      {SLIDES.map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];

          // Expand active dot
          const width = interpolate(
            scrollX.value,
            inputRange,
            [8, 24, 8],
            Extrapolate.CLAMP
          );

          const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.3, 1, 0.3],
            Extrapolate.CLAMP
          );

          // Dynamic colors corresponding to active slide
          const colorsList = SLIDES.map((s) => s.highlightColor);
          const defaultDotColor = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';

          // Interpolate current dot color based on scrollX
          const backgroundColor = interpolateColor(
            scrollX.value,
            [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH,
            ],
            [defaultDotColor, colorsList[index], defaultDotColor]
          );

          return {
            width,
            opacity,
            backgroundColor,
          };
        });

        return <Animated.View key={`dot-${index}`} style={[styles.dot, animatedStyle]} />;
      })}
    </View>
  );
};

// --- SLIDE GRAPHICS COMPONENT ---
const SlideGraphic = ({ index, isDark, scrollX }: { index: number; isDark: boolean; scrollX: SharedValue<number> }) => {
  const floatAnim = useSharedValue(0);

  React.useEffect(() => {
    // Start continuous floating animation
    floatAnim.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1800 }),
        withTiming(10, { duration: 1800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    // Slight parallax / scale transition based on active scrollX
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.8, 1, 0.8],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.4, 1, 0.4],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale }, { translateY: floatAnim.value }],
      opacity,
    };
  });

  if (index === 0) {
    // Page 1: 3D Box Illustration
    return (
      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        <Image
          source={require('../assets/images/onboarding_box.png')}
          style={styles.mainIllustration}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  if (index === 1) {
    // Page 2: 3D Character Illustration
    return (
      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        <Image
          source={require('../assets/images/onboarding_character.png')}
          style={styles.mainIllustration}
          resizeMode="contain"
        />
      </Animated.View>
    );
  }

  if (index === 2) {
    // Page 3: 3D styled grid categories with background image
    const bgSource = isDark ? SLIDE_BACKGROUNDS.categories.dark : SLIDE_BACKGROUNDS.categories.light;
    return (
      <ImageBackground
        source={bgSource}
        style={styles.slideBgImage}
        imageStyle={styles.slideBgImageInner}
        resizeMode="cover"
      >
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <GridTile title="Morning Routines" bg="#FEF3C7" iconColor="#D97706" delay={0}>
              <Sun size={28} color="#D97706" />
            </GridTile>
            <GridTile title="Office" bg="#DBEAFE" iconColor="#2563EB" delay={150}>
              <Briefcase size={28} color="#2563EB" />
            </GridTile>
          </View>
          <View style={styles.gridRow}>
            <GridTile title="Travel" bg="#E0F2FE" iconColor="#0284C7" delay={300}>
              <Plane size={28} color="#0284C7" />
            </GridTile>
            <GridTile title="Gym" bg="#D1FAE5" iconColor="#059669" delay={450}>
              <Dumbbell size={28} color="#059669" />
            </GridTile>
          </View>
          <View style={styles.gridRow}>
            <GridTile title="Shopping" bg="#FFEDD5" iconColor="#EA580C" delay={600}>
              <ShoppingCart size={28} color="#EA580C" />
            </GridTile>
            <GridTile title="And More" bg="#F3E8FF" iconColor="#9333EA" delay={750}>
              <Grid size={28} color="#9333EA" />
            </GridTile>
          </View>
        </View>
      </ImageBackground>
    );
  }

  if (index === 3) {
    // Page 4: Ready-made templates stack with background image
    const colors = isDark ? themes.midnight.dark : themes.midnight.light;
    const bgSource = isDark ? SLIDE_BACKGROUNDS.templates.dark : SLIDE_BACKGROUNDS.templates.light;
    return (
      <ImageBackground
        source={bgSource}
        style={styles.slideBgImage}
        imageStyle={styles.slideBgImageInner}
        resizeMode="cover"
      >
        <View style={[styles.cardContainer, { backgroundColor: isDark ? 'rgba(20,16,44,0.85)' : 'rgba(255,255,255,0.9)', borderColor: colors.border }]}>
          <View style={styles.templateHeader}>
            <Text style={[styles.templateTitle, { color: colors.text }]}>Templates</Text>
            <View style={[styles.circleCheckIcon, { backgroundColor: '#10B981' }]}>
              <Check color="#FFFFFF" size={14} strokeWidth={3} />
            </View>
          </View>

          {/* Search Mock */}
          <View style={[styles.searchBarMock, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)' }]}>
            <Search size={18} color={colors.subtext} style={{ marginRight: 8 }} />
            <Text style={{ color: colors.subtext, fontSize: 13 }}>Search templates...</Text>
          </View>

          {/* Template List */}
          <ScrollView scrollEnabled={false} style={styles.templateList}>
            <TemplateItem title="Goa Trip (15 Days)" items="15 Items" bg="#E0F2FE" textColor={colors.text} subtextColor={colors.subtext}>
              <Compass size={18} color="#0284C7" />
            </TemplateItem>
            <TemplateItem title="Office Checklist" items="12 Items" bg="#DBEAFE" textColor={colors.text} subtextColor={colors.subtext}>
              <Briefcase size={18} color="#2563EB" />
            </TemplateItem>
            <TemplateItem title="Grocery Shopping" items="29 Items" bg="#FEF3C7" textColor={colors.text} subtextColor={colors.subtext}>
              <ShoppingCart size={18} color="#D97706" />
            </TemplateItem>
            <TemplateItem title="Newborn Baby Bag" items="24 Items" bg="#F3E8FF" textColor={colors.text} subtextColor={colors.subtext}>
              <Sparkles size={18} color="#9333EA" />
            </TemplateItem>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  if (index === 4) {
    // Page 5: Checklist items progress with background image
    const colors = isDark ? themes.midnight.dark : themes.midnight.light;
    const bgSource = isDark ? SLIDE_BACKGROUNDS.checklist.dark : SLIDE_BACKGROUNDS.checklist.light;
    return (
      <ImageBackground
        source={bgSource}
        style={styles.slideBgImage}
        imageStyle={styles.slideBgImageInner}
        resizeMode="cover"
      >
        <View style={[styles.cardContainer, { backgroundColor: isDark ? 'rgba(20,16,44,0.85)' : 'rgba(255,255,255,0.9)', borderColor: colors.border }]}>
          <View style={styles.checklistHeader}>
            <View>
              <Text style={[styles.checklistTitle, { color: colors.text }]}>Office Checklist</Text>
              <Text style={[styles.checklistSub, { color: colors.subtext }]}>8 / 12 Completed</Text>
            </View>
            <Text style={[styles.checklistPercent, { color: '#3B82F6' }]}>67%</Text>
          </View>

          {/* Progress Bar */}
          <View style={[styles.progressBarOuter, { backgroundColor: isDark ? '#1E1B4B' : '#E0E7FF' }]}>
            <View style={[styles.progressBarInner, { width: '67%', backgroundColor: '#3B82F6' }]} />
          </View>

          {/* Checklist List */}
          <View style={styles.checklistItems}>
            <ChecklistItem title="Laptop" checked={true} textColor={colors.text} subtextColor={colors.subtext} />
            <ChecklistItem title="Charger" checked={true} textColor={colors.text} subtextColor={colors.subtext} />
            <ChecklistItem title="Wallet" checked={true} textColor={colors.text} subtextColor={colors.subtext} />
            <ChecklistItem title="ID Card" checked={true} textColor={colors.text} subtextColor={colors.subtext} />
            <ChecklistItem title="Water Bottle" checked={false} textColor={colors.text} subtextColor={colors.subtext} />
            <ChecklistItem title="Lunch Box" checked={false} textColor={colors.text} subtextColor={colors.subtext} />
          </View>

          {/* Floating Checkmark Button on Card */}
          <View style={[styles.cardFloatingCheck, { backgroundColor: '#3B82F6', shadowColor: '#3B82F6' }]}>
            <Check color="#FFFFFF" size={24} strokeWidth={3} />
          </View>
        </View>
      </ImageBackground>
    );
  }

  // Page 6: Synced Devices 3D Graphic
  return (
    <Animated.View style={[styles.imageWrapper, animatedStyle]}>
      <Image
        source={require('../assets/images/onboarding_sync.png')}
        style={styles.mainIllustration}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

// --- GRID TILE FOR PAGE 3 ---
const GridTile = ({ title, bg, iconColor, children, delay }: { title: string; bg: string; iconColor: string; children: React.ReactNode; delay: number }) => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withDelay(delay, withTiming(1, { duration: 600 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 650 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.tileCard, animatedStyle]}>
      <View style={[styles.tileIconContainer, { backgroundColor: bg }]}>
        {children}
      </View>
      <Text style={styles.tileText}>{title}</Text>
    </Animated.View>
  );
};

// --- TEMPLATE LIST ITEM FOR PAGE 4 ---
const TemplateItem = ({ title, items, bg, textColor, subtextColor, children }: { title: string; items: string; bg: string; textColor: string; subtextColor: string; children: React.ReactNode }) => {
  return (
    <View style={styles.templateItemRow}>
      <View style={[styles.templateIconWrapper, { backgroundColor: bg }]}>
        {children}
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.templateItemTitle, { color: textColor }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.templateItemSub, { color: subtextColor }]}>{items}</Text>
      </View>
    </View>
  );
};

// --- CHECKLIST ITEM FOR PAGE 5 ---
const ChecklistItem = ({ title, checked, textColor, subtextColor }: { title: string; checked: boolean; textColor: string; subtextColor: string }) => {
  return (
    <View style={styles.checklistItemRow}>
      <View style={[
        styles.checkBox,
        checked ? { backgroundColor: '#3B82F6', borderColor: '#3B82F6' } : { borderColor: 'rgba(156,163,175,0.4)' }
      ]}>
        {checked && <Check color="#FFFFFF" size={10} strokeWidth={3} />}
      </View>
      <Text style={[
        styles.checklistItemText,
        { color: textColor },
        checked && styles.checklistItemTextCompleted
      ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    fontSize: 15,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    paddingHorizontal: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  graphicContainer: {
    width: SCREEN_WIDTH - 48,
    height: SCREEN_HEIGHT * 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT * 0.1,
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIllustration: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 38,
    fontFamily: 'Outfit-Bold',
  },
  subtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 16,
    fontFamily: 'Outfit-Medium',
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    zIndex: 10,
  },
  standardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastPageFooter: {
    alignItems: 'center',
    width: '100%',
  },
  googleButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  googleBtnInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Outfit-Bold',
    marginLeft: 10,
  },
  guestButton: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  guestButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Outfit-Medium',
  },
  dotsBelowContainer: {
    marginTop: 24,
  },
  nextCircleButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  // GRID FOR PAGE 3
  gridContainer: {
    width: '100%',
    height: '100%',
    padding: 16,
    justifyContent: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tileCard: {
    width: (SCREEN_WIDTH - 80 - 16) / 2,
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  tileText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
  },
  // CARD STACK FOR PAGE 4 & 5
  cardContainer: {
    width: SCREEN_WIDTH - 64,
    height: '92%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    elevation: 4,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  circleCheckIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarMock: {
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  templateList: {
    flex: 1,
  },
  templateItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(156,163,175,0.15)',
  },
  templateIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateItemTitle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Outfit-Bold',
  },
  templateItemSub: {
    fontSize: 10,
    marginTop: 2,
  },
  // CHECKLIST FOR PAGE 5
  checklistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  checklistSub: {
    fontSize: 12,
    marginTop: 2,
  },
  checklistPercent: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  progressBarOuter: {
    height: 6,
    borderRadius: 3,
    marginBottom: 16,
    width: '100%',
    overflow: 'hidden',
  },
  progressBarInner: {
    height: '100%',
    borderRadius: 3,
  },
  checklistItems: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  checklistItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checklistItemText: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
  },
  checklistItemTextCompleted: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  cardFloatingCheck: {
    position: 'absolute',
    bottom: -15,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  slideBgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideBgImageInner: {
    borderRadius: 24,
    resizeMode: 'cover',
  },
});
