<template>
  <div class="profile-picture-wrapper">
    <img :src="user.user_avatar ?? `https://i.pravatar.cc/150?u=a042581f4e29026704d`"
      alt="Profile Picture"
      class="profile-picture rounded-circle" />
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
  .profile-picture-wrapper {
    width           : 130px;
    height          : 130px;
    border-radius   : 50%;
    border          : 3px solid #dbdbdb;
    display         : inline-flex;
    align-items     : center;
    justify-content : center;
    padding         : 3px;
  }

  .profile-picture {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
</style>
