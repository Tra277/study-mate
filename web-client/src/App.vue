<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// Các route không cần layout
const noLayoutRoutes = ['/login', '/register']
const shouldShowLayout = computed(() => !noLayoutRoutes.includes(route.path))

onMounted(async () => {
  // Khởi tạo user nếu có token
  if (authStore.token) {
    await authStore.fetchUser()
  }
})
</script>

<template>
  <div id="app">
    <AppLayout v-if="shouldShowLayout">
      <RouterView />
    </AppLayout>
    <RouterView v-else />
  </div>
</template>

<style>
#app {
  height: 100vh;
}
</style>
