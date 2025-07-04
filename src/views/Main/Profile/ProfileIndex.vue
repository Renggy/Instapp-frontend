<template>
  <div class="profile-page">
    <!-- Profile Header -->
    <header class="profile-header mb-4">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-4 text-center mb-3 mb-md-0">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="Profile Picture"
              class="profile-picture rounded-circle"
            />
          </div>
          <div class="col-md-8">
            <div class="d-flex align-items-center mb-3">
              <h2 class="username me-4 mb-0">nama_pengguna</h2>
              <button class="btn btn-light me-2">Edit Profile</button>
              <button class="btn btn-light"><i class="bi bi-gear"></i></button>
            </div>
            <div class="d-flex gap-4 mb-3">
              <div><strong>10</strong> posts</div>
              <div><strong>1.2k</strong> followers</div>
              <div><strong>500</strong> following</div>
            </div>
            <div class="profile-bio">
              <div class="fw-bold">Nama Lengkap</div>
              <p class="mb-1">
                Ini adalah deskripsi bio. Bisa berisi beberapa baris teks yang menjelaskan tentang
                pengguna.
              </p>
              <a href="#" class="text-decoration-none fw-semibold">link.website.com</a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Divider -->
    <hr />

    <!-- Content Tabs -->
    <nav class="nav nav-tabs justify-content-center border-0 mb-4">
      <a class="nav-link active" href="#" aria-current="page">
        <i class="bi bi-grid-3x3"></i> POSTS
      </a>
      <a class="nav-link" href="#"> <i class="bi bi-bookmark"></i> SAVED </a>
      <a class="nav-link" href="#"> <i class="bi bi-person-bounding-box"></i> TAGGED </a>
    </nav>

    <!-- Posts Grid -->
    <div class="posts-grid">
      <div class="row g-1">
        <!-- Ganti dengan v-for untuk data dinamis -->
        <div class="col-4" v-for="i in 9" :key="i">
          <div class="post-item">
            <img
              :src="`https://picsum.photos/300/300?random=${i}`"
              class="img-fluid"
              :alt="`Post ${i}`"
            />
            <div class="post-overlay">
              <span class="me-3"><i class="bi bi-heart-fill"></i> {{ Math.floor(Math.random() * 500) }}</span>
              <span><i class="bi bi-chat-fill"></i> {{ Math.floor(Math.random() * 50) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.profile-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.username {
  font-size: 1.75rem;
  font-weight: 300;
}

.nav-tabs .nav-link {
  border: none;
  border-top: 1px solid transparent;
  color: #8e8e8e;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-tabs .nav-link.active {
  border-top-color: #262626;
  color: #262626;
}

.post-item {
  position: relative;
  cursor: pointer;
}

.post-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  font-size: 1rem;
  font-weight: 600;
}

.post-item:hover .post-overlay {
  opacity: 1;
}
</style>
