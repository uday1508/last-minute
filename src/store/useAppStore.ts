import { create } from 'zustand';

export interface ChecklistTask {
  id: string;
  title: string;
  completed: boolean;
}

interface AppState {
  isOnboardingCompleted: boolean;
  setOnboardingCompleted: (value: boolean) => void;
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
  isOnboardingCompleted: false,
  setOnboardingCompleted: (isOnboardingCompleted) => set({ isOnboardingCompleted }),
  tasks: initialTasks,
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  resetTasks: () => set({ tasks: initialTasks }),
}));
