<template>
  <div class="auth-layout bg-body-tertiary">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm rounded-5">
            <div class="card-body p-4 p-lg-5">
              <div class="text-center mb-4">
                <h1 class="h3 fw-bold">Instapp</h1>
                <p class="text-muted">Silakan masuk atau daftar.</p>
              </div>
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
