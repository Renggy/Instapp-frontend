<template>
  <form @submit.prevent="handleSubmit">
    <!-- Input Email -->
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control form-control-sm"
        id="floatingEmail"
        placeholder="name@example.com"
        v-model="data.user_email"
        autocomplete="off"
        :disabled="loadingOnSubmit" />
      <label>Email</label>
    </div>

    <!-- Input Password -->
    <div class="form-floating mb-3">
      <input
        :type="visiblePassword ? `text` : `password`"
        class="form-control"
        placeholder="Password"
        v-model="data.password"
        autocomplete="off"
        :disabled="loadingOnSubmit" />
      <label>Password</label>
      <i class="bi icon-end" :class="visiblePassword ? 'bi-eye' : 'bi-eye-slash'"
        @click="visiblePassword = !visiblePassword"></i>    </div>

    <div class="d-grid mb-4">
      <button type="submit" class="btn btn-primary btn-lg" :disabled="loadingOnSubmit">
        <div v-if="!loadingOnSubmit">Masuk</div>
        <div v-else>
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden"></span>
          </div>&nbsp;Loading...
        </div>
      </button>
    </div>

    <div class="text-center">
      <p class="text-muted">
        Belum punya akun? <RouterLink to="/signup" class="text-decoration-none">Daftar di sini</RouterLink>
      </p>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  import axiosInstance from '@/services/axios';
  const router    = useRouter();
  const authStore = useAuthStore();

  const visiblePassword = ref<boolean>(false);
  const loadingOnSubmit = ref<boolean>(false);
  const data = ref<{ user_email : string, password : string }>({
    user_email : '',
    password   : ''
  });

  const handleSubmit = async () => {
    loadingOnSubmit.value = true;
    await axiosInstance.post('/auth/signin', data.value)
      .then(resp => {
        const { user, token } = resp.data.data;
        authStore.setAuthData(token, user);
        router.push("/");
        // }
      }).catch(error => {
        if (error.response.status == 401) alert("Email atau password salah");
        else alert("Terjadi kesalahan. Silakan coba lagi.");
      }).finally(() => loadingOnSubmit.value = false);
  }
</script>

<style scoped>
  .icon-end {
    top: 50%;
    right: 15px;
    cursor: pointer;
    position: absolute;
    transform: translateY(-50%);
  }
</style>
