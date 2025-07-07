<template>
  <img :src="user.user_avatar ?? `https://i.pravatar.cc/150?u=a042581f4e29026704d`"
    alt="Profile Picture"
    class="profile-picture rounded-circle" />
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
  .profile-picture {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
</style>
