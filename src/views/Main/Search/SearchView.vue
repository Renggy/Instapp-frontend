<template>
  <h4 class="mb-4">Pencarian</h4>
  <div class="input-group mb-4">
    <input
      type="text"
      class="form-control bg-light"
      placeholder="Cari"
      v-model="searchQuery"
    />
  </div>
  <div class="search-results border-top">
    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="searchResults.length > 0">
      <div v-for="user in searchResults" :key="user.user_id">
        <UserProfile :data="user"/>
      </div>
    </div>

    <div v-else-if="wasSearched" class="text-center text-muted py-5">
      Tidak ada hasil ditemukan.
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, watch } from 'vue';
  import axiosInstance from '@/services/axios';
  import type { User } from '@/types/Users';
  import UserProfile from '@/components/Search/UserProfile.vue';

  const searchQuery   = ref('');
  const searchResults = ref<User[]>([]);
  const isLoading     = ref(false);
  const wasSearched   = ref(false);

  let debounceTimer: number;

  watch(searchQuery, (newValue) => {
    clearTimeout(debounceTimer);
    searchResults.value = [];
    wasSearched.value   = false;

    if (newValue.trim() === '') {
      isLoading.value = false;
      return;
    }

    debounceTimer = window.setTimeout(async () => {
      isLoading.value = true;
      await axiosInstance.get('/search', {
        params: { q: newValue }
      }).then(resp => {
        searchResults.value = resp.data.data;
        if (searchResults.value.length  == 0) {
          wasSearched.value = true;
        }
      }).catch(() => {}).finally(() => isLoading.value = false);
    }, 500);
  });
</script>
<style scoped>
.search-container {
  max-width: 550px;
  margin: 0 auto;
}
.form-control {
  border: none;
  padding: 0.75rem 1rem;
  background-color: #efefef;
  border-radius: 0.5rem;
}
.form-control:focus {
  box-shadow: none;
  background-color: #efefef;
}
.search-results {
  min-height: 300px;
}
</style>
