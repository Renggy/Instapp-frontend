<template>
  <div class="main-layout bg-body">
    <div class="container-fluid">
      <div class="row">
        <!-- Kolom Kiri: Navigasi -->
        <div class="col-lg-2 col-md-1 border-end d-none d-md-block px-0">
          <div class="sidebar-left sticky-top vh-100 p-3 d-flex flex-column">
            <a href="/" class="d-block h2 mb-4 link-body-emphasis text-decoration-none">
              <i class="bi bi-instagram d-none d-lg-none"></i>
              <span class="d-none d-lg-block">Instapp</span>
            </a>
            <nav class="nav nav-pills flex-column gap-2 flex-grow-1">
              <RouterLink to="/" class="nav-link d-flex align-items-center gap-3">
                <svg v-if="route.path === '/'" aria-label="Home" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path></svg>
                <svg v-else  aria-label="Home" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Home</title><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                <span class="d-none d-lg-block">Home</span>
              </RouterLink>
              <RouterLink to="/search" class="nav-link d-flex align-items-center gap-3">
                <svg v-if="route.path === '/search'" aria-label="Search" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M18.5 10.5a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" x1="16.511" x2="21.643" y1="16.511" y2="21.643"></line></svg>
                <svg v-else aria-label="Search" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Search</title><path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
                <span class="d-none d-lg-block">Search</span>
              </RouterLink>
              <a href="#" class="nav-link d-flex align-items-center gap-3 disabled">
                <i class="bi bi-compass fs-4"></i>
                <span class="d-none d-lg-block">Explore</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3 disabled">
                <i class="bi bi-film fs-4"></i>
                <span class="d-none d-lg-block">Reels</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3 disabled">
                <i class="bi bi-send fs-4"></i>
                <span class="d-none d-lg-block">Messages</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3 disabled">
                <i class="bi bi-heart fs-4"></i>
                <span class="d-none d-lg-block">Notifications</span>
              </a>
              <button @click="handleCreateClick" class="nav-link d-flex align-items-center gap-3 text-start">
                  <i class="bi bi-plus-square fs-4"></i>
                  <span class="d-none d-lg-block">Create</span>
              </button>
              <RouterLink :to="`/${auth.user.user_name}`" class="nav-link d-flex align-items-center gap-3">
                <img :src="`${auth.user.user_avatar}`" alt="Profil" class="rounded-circle" width="28" height="28">
                <span class="d-none d-lg-block">Profile</span>
              </RouterLink>
            </nav>

            <button @click="handleSignOut" class="nav-link d-flex align-items-center gap-3 text-start">
              <i class="bi bi-power fs-4"></i>
              <span class="d-none d-lg-block">Sign Out</span>
            </button>
          </div>
        </div>

        <!-- Kolom Tengah: Konten Utama (Postingan) -->
        <main class="col-lg-10 col-md-11 col-12 py-4">
          <div class="main-content-wrapper">
            <RouterView />
          </div>
        </main>
      </div>
    </div>
    <!-- Menambahkan komponen Posts di sini agar bisa dipanggil -->
    <PostPosting ref="postingModal" />
  </div>
</template>

<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue';
  import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';
  import PostPosting from '@/components/PostPosting.vue'; // ✅


  const route      = useRoute()
  const router     = useRouter();
  const auth       = useAuthStore();
  const postModal  = useTemplateRef<InstanceType<typeof PostPosting> | null>('postingModal');


  const handleCreateClick = () => postModal.value?.modalOpen();

  const handleSignOut = () => {
    useAuthStore().clearAuthData()
    router.push('/signin');
  };
</script>

<style scoped>
.nav-link {
  color: var(--bs-body-color);
  padding: 0.5rem 0.75rem;
  transition: background-color 0.2s ease-in-out;
}
.nav-link.text-start {
  border: none;
  background: none;
  width: 100%;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
}

.main-content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
