<template>
  <RouterLink :to="`/${data?.user_name}`" class="d-flex my-3 align-items-center gap-3 user-row p-3 text-decoration-none text-reset">
    <div class="rounded-circle border border-secondary border-2 p-1 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;">
      <img
        :src="data?.user_avatar"
        alt="user avatar"
        class="rounded-circle"
        width="32"
        height="32"
      />
    </div>

    <div>
      <div class="fw-bold me-1">{{ data?.user_name }}</div>
      <div>{{ data?.user_full_name }}</div>
    </div>
  </RouterLink>
</template>
<script setup lang="ts">
  import type { User } from '@/types/Users';
  import type { PropType } from 'vue';

  defineProps({
    data : Object as PropType<User>
  })
</script>
<style scoped>
  .user-row {
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .user-row:hover {
    background-color: #f8f9fa; /* atau warna lain */
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
</style>
