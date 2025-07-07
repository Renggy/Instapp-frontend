import { ref } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '@/types/Users';

import cookies from '@/services/cookies'
import axiosInstance from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token : cookies.getToken() || null,
    user  : ref<User>({} as User)
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setAuthData(token: string, user: User) {
      this.token = token;
      this.user  = user;
      cookies.saveToken(this.token);
    },

    clearAuthData() {
      this.token = null;
      this.user  = {} as User;
      cookies.destroyToken();
    },

    async verifyAuth() {
      if (!cookies.getToken()) this.clearAuthData();
      if ( cookies.getToken()) {
        await axiosInstance.get("/auth/verify")
          .then(resp => {
            this.setAuthData(cookies.getToken(), resp.data.data.user);
          })
          .catch(()  => this.clearAuthData())
      }
    },
  },
})
