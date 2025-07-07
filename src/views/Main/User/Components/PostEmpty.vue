<template>
  <div class="d-flex align-items-center justify-content-center flex-column gap-3">
    <div class="d-flex align-items-center justify-content-center border border-2 rounded-circle p-1 border-dark" style="width: 50px; height: 50px;">
      <i class="bi bi-camera fs-3 p-0 m-0"></i>
    </div>
    <div v-if="isUser" class="text-center">
      <div class="fw-semibold fs-3 ">Share Photos</div>
      <p >When you share photos, they will appear on your profile.</p>
      <div class="text-primary ">Share your first photo</div>
    </div>
    <div v-else class="text-center">
      <div class="fw-semibold fs-3 ">No Posts</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { onMounted, ref, watch, type PropType } from 'vue';
  import type { User } from '@/types/Users';

  const isUser = ref<boolean>(false);
  const auth = useAuthStore();

  const props = defineProps({
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  });

  const checkIsUser = () => {
    isUser.value = auth.user.user_id === props.user?.user_id;
  };

  onMounted(() => checkIsUser());
</script>
