<template>
  <div class="modal fade" ref="modalRef" v-show="modalIsOpen">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div v-if="dataPost" class="row g-0">
            <!-- Kolom Gambar -->
            <div class="col-lg-7 bg-dark d-flex justify-content-center align-items-center">
              <img :src="dataPost.post_media_url || 'https://picsum.photos/600/600?random=1'" class="img-fluid post-image" alt="Post image" />
            </div>

            <!-- Kolom Detail & Komentar -->
            <div class="col-lg-5 d-flex flex-column">
              <!-- Header -->
              <div class="d-flex align-items-center p-3 border-bottom">
                <img
                  :src="dataPost.user?.user_avatar"
                  alt="user avatar"
                  class="rounded-circle me-3"
                  width="32"
                  height="32"
                />
                <span class="fw-bold me-auto">{{ dataPost.user?.user_name }}</span>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <!-- Bagian Komentar (Scrollable) -->
              <div class="comments-section flex-grow-1 p-3">
                <div class="d-flex mb-3">
                  <img
                    :src="dataPost.user?.user_avatar"
                    alt="user avatar"
                    class="rounded-circle me-3"
                    width="32"
                    height="32"
                  />
                  <div>
                    <span class="fw-bold me-1">{{ dataPost.user?.user_name }}</span>
                    <span>{{ dataPost.post_caption }}</span>
                    <div class="text-muted small mt-1">{{ dataPost.created_at }}</div>
                  </div>
                </div>

                <div class="d-flex mb-3" v-for="(i, index) in dataPost.comments" :key="`comment-${index}`">
                  <img
                    :src="`${i.user?.user_avatar}`"
                    alt="commenter avatar"
                    class="rounded-circle me-3"
                    width="32"
                    height="32"
                  />
                  <div>
                    <span class="fw-bold me-1">{{ i.user?.user_name }}</span>
                    <span>{{ i.post_comment_text }}</span>
                    <div class="text-muted small mt-1">{{ i.created_at}}</div>
                  </div>
                </div>
              </div>

              <!-- Aksi & Tambah Komentar -->
              <div class="border-top p-3">
                <div class="post-actions d-flex gap-3 fs-4 mb-2">
                  <i :class="['bi', dataPost.is_like ? 'bi-heart-fill text-danger' : 'bi-heart']"
                    style="cursor: pointer;"
                    @click="like">
                  </i>
                  <i class="bi bi-chat"></i>
                  <i class="bi bi-send"></i>
                <i class="bi bi-bookmark ms-auto"></i>
                </div>
                <span class="fw-semibold"
                  v-if="dataPost.likes_count && dataPost.likes_count > 0">
                  {{ dataPost?.likes_count }} like
                </span>
                <!-- <div class="post-likes fw-bold mb-2">{{ post.likes }} likes</div> -->
                <div class="add-comment d-flex justify-content-between">
                  <input
                    type="text"
                    class="form-control form-control-sm border-0 px-0"
                    placeholder="Add a comment..."
                    v-model="commentPost"
                  />
                  <button
                      @click="comment"
                      :disabled="commentPost.length === 0"
                      class="btn btn-link p-0 text-decoration-none"
                      style="cursor: pointer;"
                    >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';

import type { Post } from '@/types/Posts';
import axiosInstance from '@/services/axios';

const modalRef      = ref<HTMLElement | null>(null);
const modalInstance = ref<Modal | null>(null);
const modalIsOpen   = ref<boolean>(false);
const selectedPost  = ref<Post>({} as Post);
const dataPost      = ref<Post | null>({} as Post);
const commentPost   = ref<string>('');

const modalOpen = (prop : Post) => {
  modalIsOpen.value  = true;
  selectedPost.value = prop;
  loadPost();
}

const loadPost = async () => {
  const postId = selectedPost.value.post_id;
  await axiosInstance.get(`/post/${postId}`)
    .then((resp) => dataPost.value = resp.data.data);
}

const comment = async () => {
  const postId = selectedPost.value.post_id;
  await axiosInstance.post(`/post/${postId}/comment`, {
    comment : commentPost.value
  })
  .then(() => loadPost())
  .finally(() => commentPost.value = '');
}

const like = async () => {
  const postId = selectedPost.value.post_id;
  await axiosInstance.post(`/post/${postId}/like`)
    .then(() => loadPost());
}

onMounted(() => {
  if (modalRef.value) {
    modalInstance.value = new Modal(modalRef.value);
    modalRef.value.addEventListener('hidden.bs.modal', () => {
      modalIsOpen.value = false;
      dataPost.value = null;
    });
  }
});

watch(modalIsOpen, (open) => {
  if (open) modalInstance.value?.show();
  else modalInstance.value?.hide();
})

defineExpose({ modalOpen });
</script>

<style scoped>
.modal-content {
  border: none;
  border-radius: 0.5rem;
  background-color: var(--bs-body-bg);
}

.post-image {
  max-height: 90vh;
  object-fit: contain;
}

.comments-section {
  overflow-y: auto;
  /* Sesuaikan tinggi maksimal agar pas di layar */
  max-height: calc(90vh - 250px);
}

.add-comment input:focus {
  box-shadow: none;
}
</style>
