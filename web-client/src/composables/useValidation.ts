import { computed, type Ref } from 'vue'
import { useVuelidate, type ValidationArgs } from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
  alpha,
  alphaNum,
  url,
} from '@vuelidate/validators'

// Custom validators
export const customValidators = {
  strongPassword: (value: string) => {
    if (!value) return true
    const hasUpperCase = /[A-Z]/.test(value)
    const hasLowerCase = /[a-z]/.test(value)
    const hasNumbers = /\d/.test(value)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  },
  phoneNumber: (value: string) => {
    if (!value) return true
    const phoneRegex = /^(\+84|0)[3|5|7|8|9][0-9]{8}$/
    return phoneRegex.test(value)
  },
}

// Common validation rules
export const validationRules = {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
  numeric,
  alpha,
  alphaNum,
  url,
  ...customValidators,
}

// Validation messages in Vietnamese
export const validationMessages = {
  required: 'Trường này là bắt buộc',
  email: 'Email không hợp lệ',
  minLength: (min: number) => `Tối thiểu ${min} ký tự`,
  maxLength: (max: number) => `Tối đa ${max} ký tự`,
  sameAs: 'Không khớp với trường trên',
  numeric: 'Chỉ được nhập số',
  alpha: 'Chỉ được nhập chữ cái',
  alphaNum: 'Chỉ được nhập chữ cái và số',
  url: 'URL không hợp lệ',
  strongPassword: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  phoneNumber: 'Số điện thoại không hợp lệ',
}

// Composable for form validation
export function useFormValidation<T extends Record<string, any>>(
  formData: Ref<T>,
  rules: ValidationArgs<T>,
) {
  const v$ = useVuelidate(rules, formData)

  const isFormValid = computed(() => !v$.value.$invalid)

  const getFieldError = (fieldName: keyof T) => {
    const field = v$.value[fieldName]
    if (!field || !field.$error) return ''

    const firstError = field.$errors[0]
    if (!firstError) return ''

    return firstError.$message as string
  }

  const validateField = async (fieldName: keyof T) => {
    const field = v$.value[fieldName]
    if (field) {
      await field.$touch()
    }
  }

  const validateForm = async () => {
    await v$.value.$validate()
    return !v$.value.$invalid
  }

  const resetValidation = () => {
    v$.value.$reset()
  }

  return {
    v$,
    isFormValid,
    getFieldError,
    validateField,
    validateForm,
    resetValidation,
  }
}
