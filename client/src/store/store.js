import { create } from 'zustand';

/**
 * Zustand store for managing authentication state.
 */
export const useAuthStore = create((set) => ({
    auth: {
        username: '',
        active: false, // Indicates whether the user is authenticated
    },
    setUsername: (name) =>
        set((state) => ({ auth: {...state.auth, username: name } })),
    setActive: (isActive) =>
        set((state) => ({ auth: {...state.auth, active: isActive }})),
}));
