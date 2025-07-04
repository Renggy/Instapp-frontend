<template>
  <div
    class="modal fade"
    ref="modalRef"
    tabindex="-1"
    aria-labelledby="postModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div v-if="post" class="row g-0">
            <!-- Kolom Gambar -->
            <div class="col-lg-7 bg-dark d-flex justify-content-center align-items-center">
              <img :src="post.imageUrl" class="img-fluid post-image" alt="Post image" />
            </div>

            <!-- Kolom Detail & Komentar -->
            <div class="col-lg-5 d-flex flex-column">
              <!-- Header -->
              <div class="d-flex align-items-center p-3 border-bottom">
                <img
                  :src="post.user.avatar"
                  alt="user avatar"
                  class="rounded-circle me-3"
                  width="32"
                  height="32"
                />
                <span class="fw-bold me-auto">{{ post.user.username }}</span>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <!-- Bagian Komentar (Scrollable) -->
              <div class="comments-section flex-grow-1 p-3">
                <!-- Caption Postingan -->
                <div class="d-flex mb-3">
                  <img
                    :src="post.user.avatar"
                    alt="user avatar"
                    class="rounded-circle me-3"
                    width="32"
                    height="32"
                  />
                  <div>
                    <span class="fw-bold me-1">{{ post.user.username }}</span>
                    <span>{{ post.caption }}</span>
                    <div class="text-muted small mt-1">2d</div>
                  </div>
                </div>

                <!-- Daftar Komentar (Placeholder) -->
                <div class="d-flex mb-3" v-for="i in 5" :key="`comment-${i}`">
                  <img
                    :src="`https://i.pravatar.cc/32?u=commenter${i}`"
                    alt="commenter avatar"
                    class="rounded-circle me-3"
                    width="32"
                    height="32"
                  />
                  <div>
                    <span class="fw-bold me-1">commenter_{{ i }}</span>
                    <span>This is a sample comment. Looks great!</span>
                    <div class="text-muted small mt-1">1d</div>
                  </div>
                </div>
              </div>

              <!-- Aksi & Tambah Komentar -->
              <div class="border-top p-3">
                <div class="post-actions d-flex gap-3 fs-4 mb-2">
                  <i class="bi bi-heart"></i>
                  <i class="bi bi-chat"></i>
                  <i class="bi bi-send"></i>
                  <i class="bi bi-bookmark ms-auto"></i>
                </div>
                <div class="post-likes fw-bold mb-2">{{ post.likes }} likes</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';
import type { Post } from '@/types'; // Kita akan buat file types ini

const props = defineProps<{
  post: Post | null;
}>();

const emit = defineEmits(['close']);

const modalRef = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

onMounted(() => {
  if (modalRef.value) {
    modalInstance = new Modal(modalRef.value);
    modalRef.value.addEventListener('hidden.bs.modal', () => {
      emit('close');
    });
  }
});

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      modalInstance?.show();
    } else {
      modalInstance?.hide();
    }
  }
);
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
