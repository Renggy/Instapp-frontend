<template>
  <div class="d-flex align-items-center mb-3">
    <h2 class="username me-4 mb-0">{{ user.user_name }}</h2>
    <button class="btn btn-light me-2">Edit Profile</button>
    <button class="btn btn-light"><i class="bi bi-gear"></i></button>
  </div>
  <div class="d-flex gap-4 mb-3">
    <div><strong>{{ user.post_count }}</strong> posts</div>
    <div><strong>{{ user.followers_count }}</strong> followers</div>
    <div><strong>{{ user.followings_count }}</strong> following</div>
  </div>
  <div class="profile-bio">
    <div class="fw-bold">{{ user.user_full_name }}</div>
    <div v-if="user.user_bio">
      <div v-html="user.user_bio"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { User } from '@/types/Users';
  import type { PropType } from 'vue';

  defineProps({
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  })
</script>
<style scoped>
  .username {
    font-size: 1.75rem;
    font-weight: 300;
  }
</style>
