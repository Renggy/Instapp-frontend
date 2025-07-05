<template>
  <form @submit.prevent="handleSubmit">
    <!-- Email -->
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control"
        :class="{ 'is-invalid': validationErrors.user_email }"
        v-model="data.user_email"
        placeholder="Email"
        autocomplete="off" />
      <label>Email</label>
      <div v-if="validationErrors.user_email" class="invalid-feedback">
        {{ validationErrors.user_email[0] }}
      </div>
    </div>

    <!-- Name -->
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        :class="{ 'is-invalid': validationErrors.user_name }"
        placeholder="Name"
        v-model="data.user_name"
        autocomplete="off" />
      <label>Username</label>
      <div v-if="validationErrors.user_name" class="invalid-feedback">
        {{ validationErrors.user_name[0] }}
      </div>
    </div>

    <!-- Input Password -->
    <div class="form-floating mb-3">
      <input
        :type="visible.password ? `text` : `password`"
        class="form-control"
        :class="{ 'is-invalid': validationErrors.password }"
        placeholder="Password"
        v-model="data.password"
        autocomplete="off" />
      <label>Password</label>
      <i class="bi icon-end" :class="visible.password ? 'bi-eye' : 'bi-eye-slash'"
        @click="visible.password = !visible.password"></i>
      <div v-if="validationErrors.password" class="invalid-feedback">
        {{ validationErrors.password[0] }}
      </div>
    </div>

    <!-- Input Confirm Password -->
    <div class="form-floating mb-3">
      <input
        :type="visible.confirmPassword ? `text` : `password`"
        class="form-control"
        placeholder="Confirm Password"
        v-model="data.confirmPassword"
        autocomplete="off" />
      <label>Confirm Password</label>
      <i class="bi icon-end" :class="visible.confirmPassword ? 'bi-eye' : 'bi-eye-slash'"
        @click="visible.confirmPassword = !visible.confirmPassword"></i>
    </div>

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
  import { useRouter } from 'vue-router'
  import axiosInstance from '@/services/axios';
  import { ref } from 'vue';

  const router = useRouter();

  // Data
  const data = ref({
    user_email      : "",
    user_name       : "",
    password        : "",
    confirmPassword : ""
  });

  // For Visible
  const visible = ref<{password: boolean, confirmPassword: boolean}>({
    password        : false,
    confirmPassword : false
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

<style scoped>
  .icon-end {
    top: 50%;
    right: 15px;
    cursor: pointer;
    position: absolute;
    transform: translateY(-50%);
  }
</style>
