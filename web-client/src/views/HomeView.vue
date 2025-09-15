<template>
  <div>
    <!-- Hero Section -->
    <v-card class="mb-6" color="primary" variant="flat">
      <v-card-text class="text-center py-12">
        <h1 class="text-h3 text-white mb-4">Chào mừng đến với Study Mate</h1>
        <p class="text-h6 text-white opacity-90 mb-6">Hệ thống quản lý học tập thông minh</p>
        <v-btn
          v-if="!authStore.isAuthenticated"
          size="large"
          variant="outlined"
          color="white"
          to="/register"
        >
          Bắt đầu ngay
        </v-btn>
      </v-card-text>
    </v-card>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col v-for="stat in stats" :key="stat.title" cols="12" sm="6" md="3">
        <v-card>
          <v-card-text class="text-center">
            <v-icon :icon="stat.icon" size="48" :color="stat.color" class="mb-2" />
            <div class="text-h4 font-weight-bold">{{ stat.value }}</div>
            <div class="text-subtitle-1 text-medium-emphasis">{{ stat.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features Section -->
    <v-row>
      <v-col v-for="feature in features" :key="feature.title" cols="12" md="4">
        <v-card height="100%">
          <v-card-text class="text-center pa-6">
            <v-icon :icon="feature.icon" size="64" :color="feature.color" class="mb-4" />
            <h3 class="text-h5 mb-3">{{ feature.title }}</h3>
            <p class="text-body-1">{{ feature.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'

const authStore = useAuthStore()
const appStore = useAppStore()

onMounted(() => {
  appStore.setPageTitle('Trang chủ')
})

const stats = computed(() => [
  {
    title: 'Bài học',
    value: '24',
    icon: 'mdi-book-open-page-variant',
    color: 'primary',
  },
  {
    title: 'Bài tập',
    value: '12',
    icon: 'mdi-clipboard-text',
    color: 'success',
  },
  {
    title: 'Điểm số',
    value: '8.5',
    icon: 'mdi-star',
    color: 'warning',
  },
  {
    title: 'Hoàn thành',
    value: '85%',
    icon: 'mdi-chart-line',
    color: 'info',
  },
])

const features = [
  {
    title: 'Quản lý bài học',
    description: 'Tổ chức và theo dõi tiến độ học tập một cách hiệu quả',
    icon: 'mdi-book-open-page-variant',
    color: 'primary',
  },
  {
    title: 'Bài tập thông minh',
    description: 'Hệ thống bài tập tự động với phản hồi chi tiết',
    icon: 'mdi-brain',
    color: 'success',
  },
  {
    title: 'Theo dõi tiến độ',
    description: 'Báo cáo chi tiết về quá trình học tập và thành tích',
    icon: 'mdi-chart-timeline-variant',
    color: 'info',
  },
]
</script>
