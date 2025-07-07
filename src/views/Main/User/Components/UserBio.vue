<template>
  <div class="d-flex align-items-center mb-3">
    <h2 class="username me-4 mb-0">{{ user.user_name }}</h2>
    <span v-if="auth.user.user_id == user.user_id">
      <button class="btn btn-light me-2 btn-sm fw-semibold">Edit Profile</button>
      <button class="btn btn-light btn-sm fw-semibold me-2">View Archive</button>
      <i class="bi bi-gear-wide"></i>
    </span>
    <span v-else>
      <button v-if="!isFollow" class="btn btn-primary me-2 btn-sm fw-semibold" @click="follow">Follow</button>
      <button v-else class="btn btn-primary me-2 btn-sm fw-semibold" @click="follow">Unfollow</button>
      <button class="btn btn-light me-2 btn-sm fw-semibold">Send Message</button>
    </span>
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
  import axiosInstance from '@/services/axios';

  import { useAuthStore } from '@/stores/auth';
  import { onMounted, ref, type PropType } from 'vue';

  import type { User } from '@/types/Users';

  const auth = useAuthStore();
  const emit = defineEmits(['update-user-info']);
  const isFollow = ref<boolean>(false);

  const prop = defineProps({
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  })

  const follow = async () => {
    await axiosInstance.post(`/${prop.user.user_name}/follow`)
      .then(() => {
        isFollowed(); // Memperbarui status tombol (Follow/Unfollow)
        emit('update-user-info'); // Memberi tahu parent untuk memuat ulang data
      });
  }

  const isFollowed = async () => {
    await axiosInstance.get(`/${prop.user.user_name}/is-follow`)
      .then((resp) => isFollow.value = resp.data.data);
  }

  onMounted(() => {
    if (auth.user.user_id != prop.user.user_id) {
      isFollowed();
    }
  });
</script>
<style scoped>
  .username {
    font-size: 1.75rem;
    font-weight: 300;
  }
</style>
