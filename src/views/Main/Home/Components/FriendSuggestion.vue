<template>
  <!-- Profil Pengguna -->
  <div class="d-flex align-items-center mb-4">
    <img :src="auth.user.user_avatar" alt="Profil" class="rounded-circle me-3" width="32px" height="32px">
    <div>
      <div class="fw-bold">{{ auth.user.user_name }}</div>
      <div class="text-muted">{{ auth.user.user_full_name }}</div>
    </div>
    <div class="ms-auto text-decoration-none small text-primary" style="cursor: pointer;">Switch</div>
  </div>

  <!-- Header Sugesti -->
  <div class="d-flex justify-content-between align-items-center mb-2">
    <span class="fw-bold text-muted small">Suggested for you</span>
    <div class="text-decoration-none small fw-bold text-primary" style="cursor: pointer;">See All</div>
  </div>

  <!-- Daftar Sugesti -->
  <div class="d-flex flex-column gap-3">
    <div class="d-flex align-items-center" v-for="user in suggestUser" :key="user.user_id">
      <img :src="user.user_avatar" alt="Profil Sugesti" class="rounded-circle me-3" width="32px" height="32px">
      <div>
        <div class="fw-bold small">{{ user.user_name }}</div>
        <div class="text-muted small">{{user.user_full_name}}</div>
      </div>
      <RouterLink :to="`/${user.user_name}`" class="ms-auto text-decoration-none small">
        {{ user.is_following ? 'Unfollow' : 'Follow' }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  import axiosInstance from '@/services/axios';

  import type { User } from '@/types/Users';

  const auth = useAuthStore();
  const suggestUser = ref<User[]>([]);

  const loadSuggestUsers = async () => {
    await axiosInstance.get('/home/suggest')
      .then((resp) => {
        suggestUser.value = resp.data.data;
      })
  }

  onMounted(() => loadSuggestUsers());
</script>
