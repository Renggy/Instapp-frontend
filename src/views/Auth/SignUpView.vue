<template>
  <form @submit.prevent="handleSubmit">
    <AuthInput
      v-model="data.user_email"
      label="Email"
      type="email"
      :error="validationErrors.user_email?.[0]"
    />
    <AuthInput
      v-model="data.user_full_name"
      label="Full Name"
      :error="validationErrors.user_full_name?.[0]"
    />
    <AuthInput
      v-model="data.user_name"
      label="Username"
      :error="validationErrors.user_name?.[0]"
    />
    <AuthInput
      v-model="data.password"
      label="Password"
      type="password"
      :error="validationErrors.password?.[0]"
    />
    <AuthInput
      v-model="data.confirmPassword"
      label="Confirm Password"
      type="password"
      :error="validationErrors.confirmPassword?.[0]"
    />

    <div class="d-grid mb-4">
      <button type="submit" class="btn btn-primary btn-lg" :disabled="loadingOnSubmit">
        <div v-if="!loadingOnSubmit">Daftar</div>
        <div v-else>
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden"></span>
          </div>&nbsp;Loading...
        </div>
      </button>
    </div>

    <div class="text-center">
      <p class="text-muted">
        Sudah memiliki akun ? <RouterLink to="/signin" class="text-decoration-none">Login disini</RouterLink>
      </p>
    </div>
  </form>
</template>
<script setup lang="ts">
  import AuthInput from '@/components/Auth/AuthInput.vue';
  import { useRouter } from 'vue-router'
  import axiosInstance from '@/services/axios';
  import { ref } from 'vue';

  const router = useRouter();

  // Data
  const data = ref({
    user_email      : "",
    user_full_name  : "",
    user_name       : "",
    password        : "",
    confirmPassword : "",
  });

  // For Validation Errors
  const validationErrors = ref<{ [key: string]: string[] }>({});

  const loadingOnSubmit = ref<boolean>(false);
  const handleSubmit = async () => {
    if (data.value.password !== data.value.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    loadingOnSubmit.value = true;
    validationErrors.value = {}; // Reset errors

    await axiosInstance.post('/auth/signup', data.value)
      .then(() => {
        // Success
        loadingOnSubmit.value = false;
        router.push('/signin');
      }).catch(err => {
        if (err.response) {
          if (err.response.status === 422) {
            // Handle validation errors
            validationErrors.value = err.response.data.errors;
          } else {
            // Handle other server errors
            alert(err.response.data.message || 'Terjadi kesalahan pada server.');
          }
        } else {
          // Handle network errors or other issues
          alert('Gagal terhubung ke server. Silakan coba lagi.');
        }
      }).finally(() => (loadingOnSubmit.value = false));
  }
</script>

<style scoped></style>
