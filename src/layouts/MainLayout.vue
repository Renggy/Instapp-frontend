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
            <nav class="nav nav-pills flex-column gap-2">
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
              <a href="#" class="nav-link d-flex align-items-center gap-3">
                <i class="bi bi-compass fs-4"></i>
                <span class="d-none d-lg-block">Explore</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3">
                <i class="bi bi-film fs-4"></i>
                <span class="d-none d-lg-block">Reels</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3">
                <i class="bi bi-send fs-4"></i>
                <span class="d-none d-lg-block">Messages</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3">
                <i class="bi bi-heart fs-4"></i>
                <span class="d-none d-lg-block">Notifications</span>
              </a>
              <a href="#" class="nav-link d-flex align-items-center gap-3">
                <i class="bi bi-plus-square fs-4"></i>
                <span class="d-none d-lg-block">Create</span>
              </a>
              <RouterLink to="/profile" class="nav-link d-flex align-items-center gap-3">
                <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="Profil" class="rounded-circle" width="28" height="28">
                <span class="d-none d-lg-block">Profile</span>
              </RouterLink>
            </nav>
          </div>
        </div>

        <!-- Kolom Tengah: Konten Utama (Postingan) -->
        <main class="col-lg-6 col-md-8 col-12 mx-auto py-4">
          <div class="main-content-wrapper">
            <RouterView />
          </div>
        </main>

        <!-- Kolom Kanan: Sugesti -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="sidebar-right sticky-top vh-100 py-4">
            <!-- Profil Pengguna -->
            <div class="d-flex align-items-center mb-4">
              <img src="https://i.pravatar.cc/56?u=a042581f4e29026704d" alt="Profil" class="rounded-circle me-3">
              <div>
                <div class="fw-bold">nama_pengguna</div>
                <div class="text-muted">Nama Lengkap</div>
              </div>
              <a href="#" class="ms-auto text-decoration-none small">Switch</a>
            </div>

            <!-- Header Sugesti -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <span class="fw-bold text-muted small">Suggested for you</span>
              <a href="#" class="text-decoration-none small fw-bold">See All</a>
            </div>

            <!-- Daftar Sugesti -->
            <div class="d-flex flex-column gap-3">
              <!-- Contoh Sugesti 1 -->
              <div class="d-flex align-items-center">
                <img src="https://i.pravatar.cc/32?u=a042581f4e29026704e" alt="Profil Sugesti" class="rounded-circle me-3">
                <div>
                  <div class="fw-bold small">sugesti_1</div>
                  <div class="text-muted small">Suggested for you</div>
                </div>
                <a href="#" class="ms-auto text-decoration-none small">Follow</a>
              </div>
              <!-- Contoh Sugesti 2 -->
              <div class="d-flex align-items-center">
                <img src="https://i.pravatar.cc/32?u=a042581f4e29026704f" alt="Profil Sugesti" class="rounded-circle me-3">
                <div>
                  <div class="fw-bold small">sugesti_2</div>
                  <div class="text-muted small">Followed by user_x</div>
                </div>
                <a href="#" class="ms-auto text-decoration-none small">Follow</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink, RouterView, useRoute } from 'vue-router';
  const route = useRoute()
</script>

<style scoped>
.nav-link {
  color: var(--bs-body-color);
  padding: 0.5rem 0.75rem;
  transition: background-color 0.2s ease-in-out;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  background-color: var(--bs-tertiary-bg);
  color: var(--bs-body-color);
}

.nav-link.router-link-exact-active {
  font-weight: bold;
}

.main-content-wrapper {
  max-width: 630px;
  margin: 0 auto;
}
</style>
