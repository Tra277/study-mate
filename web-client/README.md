# Study Mate - Web Client

Ứng dụng quản lý học tập thông minh được xây dựng với Vue.js 3, TypeScript và các công nghệ hiện đại.

## 🚀 Công nghệ sử dụng

- **Vue.js 3** - Framework JavaScript tiến bộ
- **TypeScript** - Ngôn ngữ lập trình có kiểu tĩnh
- **Vite** - Build tool nhanh chóng
- **Vue Router** - Routing cho SPA
- **Pinia** - State management
- **Vuetify** - Material Design component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vuelidate** - Form validation
- **Axios** - HTTP client
- **Vitest** - Unit testing framework

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── auth/           # Components liên quan đến authentication
│   └── layout/         # Layout components
├── composables/        # Vue composables
├── plugins/           # Plugin configurations
├── services/          # API services
├── stores/            # Pinia stores
├── views/             # Page components
└── assets/            # Static assets
```

## 🛠️ Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 20.19.0 hoặc >= 22.12.0
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Cấu hình environment
```bash
cp .env.example .env
```
Chỉnh sửa file `.env` theo cấu hình của bạn.

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Chạy tests
```bash
npm run test:unit
```

### Lint code
```bash
npm run lint
```

### Format code
```bash
npm run format
```

## 🎯 Tính năng chính

- ✅ Authentication với JWT
- ✅ Responsive design với Vuetify + Tailwind
- ✅ Form validation với Vuelidate
- ✅ State management với Pinia
- ✅ Dark/Light theme
- ✅ Notification system
- ✅ API service với Axios interceptors
- ✅ TypeScript support
- ✅ Hot reload development

## 📝 Hướng dẫn phát triển

### Thêm component mới
```bash
# Tạo component trong thư mục components
src/components/YourComponent.vue
```

### Thêm store mới
```bash
# Tạo store trong thư mục stores
src/stores/yourStore.ts
```

### Thêm route mới
```typescript
// Trong src/router/index.ts
{
  path: '/your-path',
  name: 'your-name',
  component: () => import('../views/YourView.vue'),
  meta: { requiresAuth: true } // Nếu cần authentication
}
```

### Sử dụng API service
```typescript
import { ApiService } from '@/services/api'

// GET request
const data = await ApiService.get<YourType>('/endpoint')

// POST request
const result = await ApiService.post<YourType>('/endpoint', payload)
```

## 🔧 Cấu hình

### Tailwind CSS
Cấu hình trong `tailwind.config.js`

### Vuetify
Cấu hình trong `src/plugins/vuetify.ts`

### API Base URL
Cấu hình trong file `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 📚 Tài liệu tham khảo

- [Vue.js Documentation](https://vuejs.org/)
- [Vuetify Documentation](https://vuetifyjs.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vuelidate Documentation](https://vuelidate-next.netlify.app/)

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request
