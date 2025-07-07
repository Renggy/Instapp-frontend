<template>
    <div v-if="userInformation" class="profile-page">
      <!-- Profile Header -->
      <header class="profile-header mb-4" v-if="userInformation">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-4 text-center mb-3 mb-md-0">
              <UserPicture :user="userInformation" />
            </div>
            <div class="col-md-8">
              <UserBio
                :user="userInformation"
                @update-user-info="loadUserInformation" />
            </div>
          </div>
        </div>
      </header>

      <!-- Content Tabs -->
      <nav class="nav nav-tabs justify-content-around border-0 mb-4 border-bottom">
        <div class="nav-link active pb-0" href="#" aria-current="page">
          <i class="bi bi-grid-3x3 fs-5"></i>
        </div>
        <div class="nav-link pb-0" href="#" v-if="userInformation.user_id == auth.user.user_id">
          <i class="bi bi-bookmark fs-5"></i>
        </div>
        <div class="nav-link pb-0" href="#">
          <i class="bi bi-person-square fs-5"></i>
        </div>
      </nav>

      <div class="posts-grid" v-if="userPost.length > 0">
        <div class="row g-3">
          <div class="col-sm-4" v-for="item in userPost" :key="item.post_id">
            <div class="post-item">
              <img
                :src="item.post_media_url"
                class="img-fluid"
                :alt="`Post ${item.post_caption}`"
              />
              <div class="post-overlay" @click="detailPosting?.modalOpen(item)">
                <span class="me-3"><i class="bi bi-heart-fill"></i>{{ item.likes_count }}</span>
                <span><i class="bi bi-chat-fill"></i> {{ item.comments_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PostEmpty v-else :user="userInformation" />
    </div>
    <NotFound v-else />
    <PostDetailModal ref="detailPosting"/>
</template>
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { useAuthStore } from '@/stores/auth';
  import { ref, watch, useTemplateRef } from 'vue';

  import type { User } from '@/types/Users';
  import type { Post } from '@/types/Posts';

  import UserBio from './Components/UserBio.vue';
  import NotFound from '@/components/NotFound.vue';
  import PostEmpty from './Components/PostEmpty.vue';
  import UserPicture from './Components/UserPicture.vue';
  import axiosInstance from '@/services/axios';
  import PostDetailModal from '@/components/PostDetailModal.vue';

  const route           = useRoute();
  const auth            = useAuthStore();
  const paramUsername   = ref<string | null>(typeof route.params.username === 'string' ? route.params.username : null);
  const userInformation = ref<User | undefined>();
  const userPost        = ref<Post[]>([]);
  const detailPosting   = useTemplateRef<InstanceType <typeof PostDetailModal> >('detailPosting');

  const loadUserInformation = async () => {
    try {
      const resp = await axiosInstance.get(`/${paramUsername.value}`);
      userInformation.value = resp.data.data;
    } catch (error) {
      console.error("Error loading user information:", error);
      userInformation.value = undefined;
    }
  }

  const loadUserPost = async () => {
    try {
      const resp = await axiosInstance.get(`/${paramUsername.value}/post`);
      userPost.value = resp.data.data;
    } catch (error) {
      console.error("Error loading user posts:", error);
      userPost.value = [];
    }
  }

  // Handling Ketika Bolak Balik Karena Username Menggunakan Path Param /:username
  watch(
    () => route.params.username,
    async (newUsername) => {
      if (typeof newUsername === 'string' && newUsername) {
        paramUsername.value = newUsername;
        await loadUserInformation();
        await loadUserPost();
      }
    },
    { immediate: true }
  );

</script>
<style scoped>
.nav-tabs .nav-link {
  border: none;
  border-top: 1px solid transparent;
  color: #8e8e8e;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-tabs .nav-link.active {
  border-bottom: 2px solid black;
}

.post-item {
  position: relative;
  cursor: pointer;
  width: auto;
  height: 410px;
  position: relative;
  background-color: silver;
}

.post-item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* atau cover tergantung keinginan */
}

.post-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: 600;
}

.post-item:hover .post-overlay {
  opacity: 1;
}
</style>
