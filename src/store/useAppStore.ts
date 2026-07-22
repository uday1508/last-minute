import { create } from 'zustand';
import { UserProfile, signInWithGoogle, signOutGoogle } from '../services/authService';

export interface ChecklistTask {
  id: string;
  title: string;
  completed: boolean;
}

interface AppState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  isOnboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => void;
  signInWithGoogleAction: () => Promise<boolean>;
  signOutAction: () => Promise<void>;
  tasks: ChecklistTask[];
  toggleTask: (id: string) => void;
  resetTasks: () => void;
}

const initialTasks: ChecklistTask[] = [
  { id: '1', title: 'Laptop', completed: true },
  { id: '2', title: 'Charger', completed: true },
  { id: '3', title: 'Wallet', completed: true },
  { id: '4', title: 'ID Card', completed: true },
  { id: '5', title: 'Water Bottle', completed: false },
  { id: '6', title: 'Lunch Box', completed: false },
  { id: '7', title: 'Notebook & Pen', completed: false },
  { id: '8', title: 'Passport', completed: false },
  { id: '9', title: 'Keys', completed: false },
  { id: '10', title: 'Headphones', completed: false },
  { id: '11', title: 'Suitcase', completed: false },
  { id: '12', title: 'Camera', completed: false },
];

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthenticating: false,
  isOnboardingCompleted: false,

  setOnboardingCompleted: (isOnboardingCompleted) => set({ isOnboardingCompleted }),

  signInWithGoogleAction: async () => {
    set({ isAuthenticating: true });
    try {
      const userProfile = await signInWithGoogle();
      set({
        user: userProfile,
        isAuthenticated: true,
        isOnboardingCompleted: true,
        isAuthenticating: false,
      });
      return true;
    } catch (error) {
      console.warn('Sign-in failed:', error);
      set({ isAuthenticating: false });
      return false;
    }
  },

  signOutAction: async () => {
    await signOutGoogle();
    set({
      user: null,
      isAuthenticated: false,
      isOnboardingCompleted: false,
    });
  },

  tasks: initialTasks,
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  resetTasks: () => set({ tasks: initialTasks }),
}));
