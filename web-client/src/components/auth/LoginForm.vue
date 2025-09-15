<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title class="text-center py-6">
      <h2>Đăng nhập</h2>
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formData.email"
          label="Email"
          type="email"
          prepend-inner-icon="mdi-email"
          :error-messages="getFieldError('email')"
          @blur="validateField('email')"
          required
        />

        <v-text-field
          v-model="formData.password"
          label="Mật khẩu"
          :type="showPassword ? 'text' : 'password'"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="getFieldError('password')"
          @blur="validateField('password')"
          @click:append-inner="showPassword = !showPassword"
          required
        />

        <v-checkbox v-model="rememberMe" label="Ghi nhớ đăng nhập" class="mb-4" />

        <v-alert v-if="authStore.error" type="error" class="mb-4">
          {{ authStore.error }}
        </v-alert>

        <v-btn
          type="submit"
          color="primary"
          block
          size="large"
          :loading="authStore.isLoading"
          :disabled="!isFormValid"
        >
          Đăng nhập
        </v-btn>
      </v-form>
    </v-card-text>

    <v-card-actions class="justify-center pb-6">
      <v-btn variant="text" to="/register"> Chưa có tài khoản? Đăng ký ngay </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAppStore } from '@/stores/app'
import { useFormValidation, validationRules } from '@/composables/useValidation'

const router = useRouter()
const authStore = useAuthStore()
const appStore = useAppStore()

const showPassword = ref(false)
const rememberMe = ref(false)

const formData = reactive({
  email: '',
  password: '',
})

const rules = {
  email: {
    required: validationRules.required,
    email: validationRules.email,
  },
  password: {
    required: validationRules.required,
    minLength: validationRules.minLength(6),
  },
}

const { isFormValid, getFieldError, validateField, validateForm } = useFormValidation(
  ref(formData),
  rules,
)

const handleSubmit = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  const result = await authStore.login(formData)

  if (result.success) {
    appStore.showSuccess('Thành công', 'Đăng nhập thành công!')
    router.push('/')
  }
}
</script>
