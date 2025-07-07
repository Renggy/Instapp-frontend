<template>
  <div class="not-found-container text-center">
    <h2 class="fw-light mb-3">Sorry, this page isn't available.</h2>
    <p class="text-muted">
      The link you followed may be broken, or the page may have been removed.
      <RouterLink to="/" class="text-decoration-none">Go back to Instapp.</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
</script>

<style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* Sesuaikan tinggi agar komponen berada di tengah secara vertikal */
    /* Anda bisa menyesuaikan nilai ini sesuai kebutuhan layout */
    min-height: 100vh;
    width: 100%;
  }
</style>
