<template>
  <form @submit.prevent="handleSubmit">
    <!-- Input Email -->
    <div class="form-floating mb-3">
      <input
        type="email"
        class="form-control form-control-sm"
        id="floatingEmail"
        placeholder="name@example.com"
        v-model="data.email"
        autocomplete="off" />
      <label for="floatingEmail">Email</label>
    </div>

    <!-- Input Password -->
    <div class="form-floating mb-3">
      <input
        :type="visible.password ? `text` : `password`"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="data.password"
        autocomplete="off" />
      <label for="floatingPassword">Password</label>
      <i class="bi icon-end" :class="visible.password ? 'bi-eye' : 'bi-eye-slash'"
        @click="visible.password = !visible.password"></i>
    </div>

    <!-- Input Confirm Password -->
    <div class="form-floating mb-3">
      <input
        :type="visible.confirmPassword ? `text` : `password`"
        class="form-control"
        id="floatingConfirmPassword"
        placeholder="Confirm Password"
        v-model="data.confirmPassword"
        autocomplete="off" />
      <label for="floatingConfirmPassword">Confirm Password</label>
      <i class="bi icon-end" :class="visible.confirmPassword ? 'bi-eye' : 'bi-eye-slash'"
        @click="visible.confirmPassword = !visible.confirmPassword"></i>
    </div>

    <div class="d-grid mb-4">
      <button type="submit" class="btn btn-primary btn-lg"></button>
    </div>

    <div class="text-center">
      <p class="text-muted">
        Sudah memiliki akun ? <RouterLink to="/signin" class="text-decoration-none">Login disini</RouterLink>
      </p>
    </div>
  </form>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import type { Sign } from './Auth';

  // Data
  const data = ref<Sign>({
    email           : "",
    password        : "",
    confirmPassword : ""
  });

  // For Visible
  const visible = ref<{password: boolean, confirmPassword: boolean}>({
    password        : false,
    confirmPassword : false
  });

  const handleSubmit = async () => {
    // await
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
