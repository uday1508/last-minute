import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { Platform } from 'react-native';

const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * Light tap — for navigation dots, minor toggles
 */
export const hapticLight = () => {
  if (Platform.OS === 'ios') {
    ReactNativeHapticFeedback.trigger('impactLight', options);
  } else {
    ReactNativeHapticFeedback.trigger('impactLight', options);
  }
};

/**
 * Medium tap — for button presses (Next, Skip, theme selection)
 */
export const hapticMedium = () => {
  ReactNativeHapticFeedback.trigger('impactMedium', options);
};

/**
 * Heavy tap — for important actions (Let's Get Started, reset)
 */
export const hapticHeavy = () => {
  ReactNativeHapticFeedback.trigger('impactHeavy', options);
};

/**
 * Success — for task completion checkmarks
 */
export const hapticSuccess = () => {
  ReactNativeHapticFeedback.trigger('notificationSuccess', options);
};

/**
 * Selection change — for scrolling between slides
 */
export const hapticSelection = () => {
  ReactNativeHapticFeedback.trigger('selection', options);
};
