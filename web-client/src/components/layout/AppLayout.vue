<template>
  <v-app :theme="appStore.theme">
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="appStore.sidebarOpen"
      :rail="$vuetify.display.mdAndDown"
      permanent
      class="border-r"
    >
      <v-list>
        <v-list-item
          prepend-avatar="/favicon.ico"
          :title="appStore.pageTitle"
          subtitle="Study Management"
        />
      </v-list>

      <v-divider />

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          :to="item.to"
          :value="item.value"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar elevation="1" class="border-b">
      <v-app-bar-nav-icon @click="appStore.toggleSidebar" />

      <v-app-bar-title>{{ appStore.pageTitle }}</v-app-bar-title>

      <v-spacer />

      <!-- Theme Toggle -->
      <v-btn
        :icon="appStore.isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        @click="appStore.toggleDarkMode"
      />

      <!-- User Menu -->
      <v-menu v-if="authStore.isAuthenticated">
        <template #activator="{ props }">
          <v-btn :prepend-avatar="authStore.user?.avatar" v-bind="props" variant="text">
            {{ authStore.user?.name }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item prepend-icon="mdi-account" title="Hồ sơ" to="/profile" />
          <v-list-item prepend-icon="mdi-cog" title="Cài đặt" to="/settings" />
          <v-divider />
          <v-list-item prepend-icon="mdi-logout" title="Đăng xuất" @click="handleLogout" />
        </v-list>
      </v-menu>

      <!-- Login Button -->
      <v-btn v-else prepend-icon="mdi-login" to="/login" variant="outlined"> Đăng nhập </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>

    <!-- Loading Overlay -->
    <v-overlay v-model="appStore.isLoading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-overlay>

    <!-- Notifications -->
    <div class="notification-container">
      <v-alert
        v-for="notification in appStore.notifications"
        :key="notification.id"
        :type="notification.type"
        :title="notification.title"
        :text="notification.message"
        closable
        class="mb-2"
        @click:close="appStore.removeNotification(notification.id)"
      />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()

const navigationItems = computed(() => [
  {
    title: 'Trang chủ',
    icon: 'mdi-home',
    to: '/',
    value: 'home',
  },
  {
    title: 'Học tập',
    icon: 'mdi-book-open-page-variant',
    to: '/study',
    value: 'study',
  },
  {
    title: 'Bài tập',
    icon: 'mdi-clipboard-text',
    to: '/assignments',
    value: 'assignments',
  },
  {
    title: 'Lịch học',
    icon: 'mdi-calendar',
    to: '/schedule',
    value: 'schedule',
  },
  ...(authStore.isAdmin
    ? [
        {
          title: 'Quản lý',
          icon: 'mdi-cog',
          to: '/admin',
          value: 'admin',
        },
      ]
    : []),
])

const handleLogout = async () => {
  authStore.logout()
  appStore.showSuccess('Thành công', 'Đã đăng xuất')
  router.push('/login')
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 80px;
  right: 16px;
  z-index: 9999;
  max-width: 400px;
}
</style>
