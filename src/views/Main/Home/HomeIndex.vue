<template>
  <div class="home-view">
    <!-- Stories Section -->
    <!-- <div class="stories-container mb-4">
      <div class="story-item text-center" v-for="i in 8" :key="`story-${i}`">
        <div class="story-avatar-wrapper">
          <img
            :src="`https://i.pravatar.cc/64?u=story${i}`"
            class="story-avatar"
            alt="story avatar"
          />
        </div>
        <span class="story-username">user_{{ i }}</span>
      </div>
    </div> -->

    <div class="posts-feed d-flex flex-column gap-4">
      <div class="card post-card border-0" v-for="post in posts" :key="post.id">
        <div class="card-header bg-white border-0 d-flex align-items-center px-0 py-3">
          <img
            :src="post.user.avatar"
            alt="user avatar"
            class="rounded-circle me-3"
            width="32"
            height="32"
          />
          <span class="fw-bold me-auto">{{ post.user.username }}</span>
          <button class="btn btn-sm"><i class="bi bi-three-dots"></i></button>
        </div>

        <!-- Post Image -->
        <img :src="post.imageUrl" class="card-img-top rounded-0" alt="post image" />

        <!-- Post Body -->
        <div class="card-body px-0 py-3">
          <!-- Action Buttons -->
          <div class="post-actions d-flex gap-3 fs-4 mb-2">
            <i class="bi bi-heart"></i>
            <i class="bi bi-chat"></i>
            <i class="bi bi-send"></i>
            <i class="bi bi-bookmark ms-auto"></i>
          </div>

          <!-- Likes -->
          <div class="post-likes fw-bold mb-2">{{ post.likes }} likes</div>

          <!-- Caption -->
          <div class="post-caption">
            <span class="fw-bold me-1">{{ post.user.username }}</span>
            <span>{{ post.caption }}</span>
          </div>

          <!-- View Comments -->
          <button
            @click="openPostModal(post)"
            class="btn btn-link p-0 text-muted text-decoration-none small d-block my-2 text-start"
          >
            View all {{ post.commentsCount }} comments
          </button>

          <!-- Add Comment -->
          <div class="add-comment">
            <input
              type="text"
              class="form-control form-control-sm border-0 px-0"
              placeholder="Add a comment..."
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Post Detail Modal -->
    <PostDetailModal :post="selectedPost" @close="closePostModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PostDetailModal from '@/components/PostDetailModal.vue';
import { Post } from '@/types';

// Placeholder data, nantinya ini akan datang dari API
const posts = ref<Post[]>([
  {
    id: 1,
    user: {
      username: 'nature_lover',
      avatar: 'https://i.pravatar.cc/32?u=nature_lover'
    },
    imageUrl: 'https://picsum.photos/600/600?random=1',
    likes: 1204,
    caption: 'Menikmati indahnya senja di pegunungan. Sungguh luar biasa!',
    commentsCount: 88
  },
  {
    id: 2,
    user: {
      username: 'foodie_journey',
      avatar: 'https://i.pravatar.cc/32?u=foodie_journey'
    },
    imageUrl: 'https://picsum.photos/600/600?random=2',
    likes: 2543,
    caption: 'Pasta carbonara terenak yang pernah saya coba. #food #pasta',
    commentsCount: 213
  }
]);

const selectedPost = ref<Post | null>(null);

function openPostModal(post: Post) {
  selectedPost.value = post;
}

function closePostModal() {
  selectedPost.value = null;
}
</script>

<style scoped>
.stories-container {
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  gap: 1rem;
  /* Hide scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.stories-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}

.story-item {
  flex: 0 0 auto;
  width: 70px;
}

.story-avatar-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  margin: 0 auto 4px;
}

.story-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid white;
  object-fit: cover;
}

.story-username {
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-card {
  border: 1px solid var(--bs-border-color-translucent);
}

.post-actions i {
  cursor: pointer;
}

.add-comment input:focus {
  box-shadow: none;
}
</style>
