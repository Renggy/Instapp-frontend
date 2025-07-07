<template>
    <div class="row">
      <div class="col-lg-8">
        <div class="home-view" v-if="posts.length > 0">
          <div class="posts-feed d-flex flex-column gap-4">
            <div class="card post-card border-0" v-for="post in posts" :key="post.id">
              <div class="card-header bg-white border-0 d-flex align-items-center px-0 py-3">
                <div class="d-inline justify-content-center align-items-center border border-2 rounded-circle" style="width: 35px; height: 35px;">
                  <img
                    :src="post.user?.user_avatar"
                    alt="user avatar"
                    class="rounded-circle me-3"
                    width="32"
                    height="32"
                  />
                </div>
                <div class="ms-2 me-auto">
                  <RouterLink :to="`/${post.user?.user_name}`" class="fw-semibold text-decoration-none text-dark">
                    {{ post.user?.user_name }}
                  </RouterLink>
                  <span>
                    &#8226; {{ post.created_at }}
                  </span>
                </div>
                <button class="btn btn-sm"><i class="bi bi-three-dots"></i></button>
              </div>

              <!-- Post Image -->
              <div class="post-image-container">
                <img :src="post.post_media_url" class="post-image rounded-3" alt="post image" />
              </div>

              <!-- Post Body -->
              <div class="card-body px-0 py-3">
                <div class="post-actions d-flex gap-3 fs-4 mb-2">
                  <i :class="['bi', post.is_like ? 'bi-heart-fill text-danger' : 'bi-heart']"
                    style="cursor: pointer;"
                    @click="like(post)"></i>
                  <i class="bi bi-chat"
                    @click="openPostModal(post)"></i>
                  <i class="bi bi-send"></i>
                  <i class="bi bi-bookmark ms-auto"></i>
                </div>

                <!-- Likes -->
                <div class="post-likes fw-bold mb-2">{{ post.likes_count }} likes</div>

                <!-- Caption -->
                <div class="post-caption">
                  <span class="fw-bold me-1">{{ post.user?.user_name }}</span>
                  <span>{{ post.post_caption }}</span>
                </div>

                <!-- View Comments -->
                <button
                  v-if="post.comments_count
                    && post.comments_count > 0"
                  @click="openPostModal(post)"
                  class="btn btn-link p-0 text-muted text-decoration-none small d-block my-2 text-start">
                  View all {{ post.comments_count }} comments
                </button>

                <!-- Add Comment -->
                <div class="add-comment d-flex justify-content-between gap-3">
                  <input
                    type="text"
                    class="form-control form-control-sm border-0 px-0"
                    placeholder="Add a comment..."
                    v-model="post.comment_user"/>
                  <button
                      @click="comment(post)"
                      :disabled="post.comment_user == undefined
                        || post.comment_user.length == 0"
                      class="btn btn-link p-0 text-decoration-none"
                      style="cursor: pointer;">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="home-view d-flex flex-column align-items-center justify-content-center gap-4" style="height: 100vh;" v-else>
          <div class="d-flex align-items-center justify-content-center border border-2 rounded-circle p-1 border-dark" style="width: 50px; height: 50px;">
            <i class="bi bi-camera fs-3 p-0 m-0"></i>
          </div>
          <div class="fw-semibold fs-3">No Posts</div>
          Upload photos or follow other users to start viewing posts.
        </div>
      </div>
      <div class="col-lg-4">
        <FriendSuggestion />
      </div>
    </div>

    <!-- Post Detail Modal -->
    <PostDetailModal ref="postDetailModal" />
</template>

<script setup lang="ts">
  import { onMounted, ref, useTemplateRef } from 'vue';
  import PostDetailModal from '@/components/PostDetailModal.vue';
  import FriendSuggestion from './Components/FriendSuggestion.vue';
  import axiosInstance from '@/services/axios';
  import type { Post } from '@/types/Posts';

  // Placeholder data, nantinya ini akan datang dari API
  const posts              = ref<Post[]>([]);
  const postDetailModalRef = useTemplateRef<InstanceType <typeof PostDetailModal>>('postDetailModal');

  function openPostModal(post: Post) {
    postDetailModalRef.value?.modalOpen(post);
  }

  const comment = async (post: Post) => {
    const postId  = post.post_id;
    const comment = post.comment_user;
    await axiosInstance.post(`/post/${postId}/comment`, {
      comment : comment
    })
      .then(() => feed())
      .finally(() => post.comment_user = '');
  }

  const like = async (post: Post) => {
    const postId  = post.post_id;
    await axiosInstance.post(`/post/${postId}/like`)
      .then(() => feed());
  }

  const feed = async () => {
    await axiosInstance.get('/home')
      .then((resp) => {
        posts.value = resp.data.data;
      })
  }

  onMounted(() => feed());
</script>

<style scoped>

.card.post-card {
  border: 1px solid var(--bs-border-color-translucent);
  border-radius: 8px;
}

.post-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: #f0f0f0;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
