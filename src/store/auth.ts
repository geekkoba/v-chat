// store/auth.ts
import { createStore } from 'vuex';
import { AuthState, User } from './types';

const store = createStore<AuthState>({
    state: {
        user: null,
        isLoggedIn: false,
    },
    mutations: {
        setUser(state, user: User | null) {
            state.user = user;
            state.isLoggedIn = !!user;
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
        },
    },
    actions: {
        async checkSession({ commit }) {
            try {
                const response = await fetch('http://localhost:3000/api/session', {
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.loggedIn) {
                    commit('setUser', data.user);
                } else {
                    commit('setUser', null);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                commit('setUser', null);
            }
        },
        async logout({ commit }) {
            commit('logout');
            await fetch('http://localhost:3000/api/logout', {
                method: 'POST',
                credentials: 'include',
            });
        },
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
        user: (state) => state.user,
    },
});

export default store;
