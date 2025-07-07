<template>
  <div class="modal fade" ref="modalElements" v-show="modalIsOpen">
    <div class="modal-dialog modal-dialog-centered" :class="{'modal-lg' : currentStep > 1}">
      <div class="modal-content rounded rounded-5">
        <!-- Header -->
        <div class="modal-header d-flex align-items-center justify-content-between py-2">
          <button v-if="currentStep == 2" @click="goBack" class="btn border-0 p-0">
            <i class="bi bi-arrow-left fs-4"></i>
          </button>
          <h1 class="modal-title fs-5 fw-bold mx-auto">
            <span v-if="currentStep === 1">Buat postingan baru</span>
            <span v-if="currentStep === 2">Caption</span>
            <span v-if="currentStep === 3">Membagikan</span>
            <span v-if="currentStep === 4">Kiriman Telah Dibagikan</span>
          </h1>
          <button v-if="currentStep == 2"
              @click="posting"
              :disabled="caption.length == 0"
              class="btn btn-link p-0 text-decoration-none fw-semibold"
              style="cursor: pointer;">
            Kirim
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body" style="height: 400px;">
          <!-- Step 1: Pilih Gambar -->
          <div v-if="currentStep === 1"
               class="d-flex align-items-center justify-content-center flex-column h-100 gap-3"
               @dragover.prevent
               @drop.prevent="handleDrop">
            <IconPosting />
            <div class="fs-4">Seret foto di sini</div>
            <button class="btn btn-sm btn-primary fw-semibold" @click="triggerFileInput">
              Pilih dari komputer
            </button>
            <input type="file" accept="image/*" class="d-none" ref="fileInputRef" @change="handleFileChange">
          </div>

          <!-- Step 2: Preview + Caption -->
          <div v-if="currentStep === 2" class="row h-100">
            <div class="col-lg-8">
              <div class="frame">
                <img
                  v-if="filePreviewUrl"
                  :src="filePreviewUrl"
                  class="object-fit-contain border rounded"
                  alt="Image Preview"
                />
              </div>
            </div>
            <div class="col-lg-4">
              <textarea v-model="caption" class="form-control" rows="6" placeholder="Tulis caption..."></textarea>
            </div>
          </div>

          <!-- Step 3: Loding Posting -->
          <div v-if="currentStep === 3" class="h-100 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-warning" role="status"
              style="width: 5rem; height: 5rem;" >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <!-- Step 4: Posting Success -->
          <div v-if="currentStep === 4" class="h-100 d-flex flex-column align-items-center justify-content-center gap-2">
            <img src="https://static.cdninstagram.com/rsrc.php/v4/yb/r/sHkePOqEDPz.gif" alt="" style="width: 5rem; height: 5rem;">
            Postingan anda telah dibagikan
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, defineExpose } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';

import IconPosting from './Icon/IconPosting.vue';
import axiosInstance from '@/services/axios';
import { useAuthStore } from '@/stores/auth';

const modalElements = ref<HTMLElement | null>(null);
const modalInstance = ref<Modal | null>(null);
const modalIsOpen   = ref(false);

const fileInputRef    = ref<HTMLInputElement | null>(null);
const filePreviewUrl  = ref<string | null>(null);
const fileSelected    = ref<File | null>(null);
const caption         = ref('');
const currentStep     = ref(1);
const auth            = useAuthStore();
const router          = useRouter();

const modalOpen = () => modalIsOpen.value = true;
const triggerFileInput = () => fileInputRef.value?.click();

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    processFile(target.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0];
  if (file) processFile(file);
};

const processFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    alert("Hanya gambar yang diperbolehkan.");
    return;
  }
  if (filePreviewUrl.value) URL.revokeObjectURL(filePreviewUrl.value);

  filePreviewUrl.value = URL.createObjectURL(file);
  fileSelected.value   = file;
  currentStep.value    = 2;
};

const posting = async () => {
  if (!fileSelected.value) return;
  const formData = new FormData();
  formData.append('image', fileSelected.value, 'post.jpg');
  formData.append('caption', caption.value);

  currentStep.value++;
  await axiosInstance.post(`/${auth.user.user_name}/post`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(()  => {
    currentStep.value++;
    setTimeout(() => {
      modalIsOpen.value = false;
    }, 1500);
  })
  .catch(() => currentStep.value--)
};

const goBack = () => resetState();
const resetState = () => {
  if (filePreviewUrl.value) URL.revokeObjectURL(filePreviewUrl.value);
  filePreviewUrl.value  = null;
  fileSelected.value    = null;
  caption.value         = '';
  currentStep.value     = 1;
  if (fileInputRef.value) fileInputRef.value.value = '';
};

onMounted(() => {
  if (modalElements.value) {
    modalInstance.value = new Modal(modalElements.value);
    modalElements.value.addEventListener('hidden.bs.modal', () => {
      modalIsOpen.value = false;
      if (currentStep.value === 4) {
        const profilePath = `/${auth.user.user_name}`;
        if (router.currentRoute.value.path === profilePath) {
          router.go(0); // Refresh Paksa
        } else {
          router.push(profilePath);
        }
      }
      resetState();
    });
  }
});

onUnmounted(() => {
  resetState();
});

watch(modalIsOpen, (open) => {
  if ( open) modalInstance.value?.show();
  if (!open) modalInstance.value?.hide();
});

defineExpose({ modalOpen });
</script>
<style scoped>
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    overflow: hidden;
    border-radius: 0.5rem;
  }

  .frame img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain; /* atau cover tergantung keinginan */
  }

</style>
