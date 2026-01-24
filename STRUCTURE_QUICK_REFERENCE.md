# RepairPro - Quick Reference Structure

## Project at a Glance

```
RepairPro Application
├── Frontend (React 19 + TypeScript + Vite)
│   ├── User Interface & Components
│   ├── State Management (Zustand)
│   ├── Routing (React Router)
│   ├── Authentication (Firebase)
│   ├── Internationalization (i18next)
│   └── Maps (Leaflet)
│
└── Backend (Node.js + Express)
    ├── REST API
    ├── Agent Proxy
    ├── Worker Management
    ├── Inventory System
    └── SSE Events
```

## Directory Tree

```
Ecme-lite-cesar/
│
├── 📁 backend/                    # Backend Server (Node.js/Express)
│   ├── 📁 src/
│   │   ├── 📄 index.js           # Server entry point
│   │   ├── 📁 routes/            # API endpoints
│   │   │   ├── agent.js          # Secure proxy
│   │   │   ├── workers.js        # Worker CRUD
│   │   │   ├── inventory.js      # Inventory CRUD
│   │   │   ├── events.js         # SSE events
│   │   │   └── uploads.js        # File uploads
│   │   ├── 📁 middleware/        # Express middleware
│   │   │   └── validateAgentRequest.js
│   │   └── 📁 utils/             # Utility functions
│   │       ├── agentPolicy.js
│   │       ├── safeFetch.js
│   │       ├── sse.js
│   │       ├── db.js
│   │       └── inventoryService.js
│   ├── 📁 data/
│   │   └── inventory.json        # Inventory data
│   └── 📁 test/
│       └── agent.e2e.test.js
│
├── 📁 src/                        # Frontend Application (React)
│   │
│   ├── 📁 @types/                # TypeScript definitions
│   │   ├── auth.ts
│   │   ├── common.tsx
│   │   ├── navigation.ts
│   │   ├── routes.tsx
│   │   ├── services.ts
│   │   └── theme.ts
│   │
│   ├── 📁 assets/                # Static assets
│   │   └── 📁 styles/
│   │       ├── components/
│   │       ├── tailwind/
│   │       ├── template/
│   │       └── app.css
│   │
│   ├── 📁 auth/                  # Authentication system
│   │   ├── AuthContext.ts
│   │   ├── AuthProvider.tsx
│   │   ├── useAuth.ts
│   │   └── index.ts
│   │
│   ├── 📁 components/            # React components
│   │   │
│   │   ├── 📁 layouts/          # Layout components
│   │   │   ├── AuthLayout/
│   │   │   ├── PostLoginLayout/
│   │   │   └── PreLoginLayout.tsx
│   │   │
│   │   ├── 📁 route/            # Routing components
│   │   │   ├── AllRoutes.tsx
│   │   │   ├── AppRoute.tsx
│   │   │   ├── AuthorityGuard.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── PublicRoute.tsx
│   │   │
│   │   ├── 📁 shared/           # Shared components
│   │   │   ├── 📁 Chatbot/
│   │   │   ├── 📁 HeaderExtras/
│   │   │   ├── ActionLink.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── HealthStatus.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── PasswordInput.tsx
│   │   │
│   │   ├── 📁 template/         # Template components
│   │   │   ├── 📁 VerticalMenuContent/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SideNav.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── UserProfileDropdown.tsx
│   │   │   └── Theme.tsx
│   │   │
│   │   └── 📁 ui/               # UI primitives
│   │       ├── Alert/
│   │       ├── Avatar/
│   │       ├── Button/
│   │       ├── Drawer/
│   │       ├── Dropdown/
│   │       ├── Form/
│   │       ├── Input/
│   │       ├── Menu/
│   │       ├── Spinner/
│   │       └── Tooltip/
│   │
│   ├── 📁 configs/              # Configuration files
│   │   ├── navigation.config/
│   │   ├── routes.config/
│   │   ├── app.config.ts
│   │   ├── endpoint.config.ts
│   │   ├── navigation-icon.config.tsx
│   │   └── theme.config.ts
│   │
│   ├── 📁 constants/            # Constants
│   │   ├── api.constant.ts
│   │   ├── app.constant.ts
│   │   ├── navigation.constant.ts
│   │   ├── roles.constant.ts
│   │   ├── route.constant.ts
│   │   └── theme.constant.ts
│   │
│   ├── 📁 data/                 # Static data
│   │   └── services.data.ts
│   │
│   ├── 📁 locales/              # Internationalization
│   │   ├── 📁 lang/
│   │   │   ├── en.json          # English translations
│   │   │   └── es.json          # Spanish translations
│   │   ├── index.ts
│   │   └── locales.ts
│   │
│   ├── 📁 mock/                 # Mock data
│   │   ├── 📁 data/
│   │   │   ├── authData.ts
│   │   │   └── commonData.ts
│   │   ├── 📁 fakeApi/
│   │   │   └── authFakeApi.ts
│   │   └── MockAdapter.ts
│   │
│   ├── 📁 services/             # API service layer
│   │   ├── 📁 axios/
│   │   │   ├── AxiosBase.ts
│   │   │   ├── AxiosRequestIntrceptorConfigCallback.ts
│   │   │   └── AxiosResponseIntrceptorErrorCallback.ts
│   │   ├── AgentService.ts      # Agent proxy client
│   │   ├── ApiService.ts        # Generic API service
│   │   ├── AuthService.ts       # Authentication service
│   │   ├── HealthService.ts     # Health check service
│   │   ├── WorkerService.ts     # Worker API client
│   │   └── stream.ts            # Streaming utilities
│   │
│   ├── 📁 store/                # Zustand stores
│   │   ├── authStore.ts         # User authentication state
│   │   ├── cartStore.ts         # Shopping cart state
│   │   ├── currencyStore.ts     # Currency selection
│   │   ├── localeStore.ts       # Language selection
│   │   ├── routeKeyStore.ts     # Route keys
│   │   └── themeStore.ts        # Theme configuration
│   │
│   ├── 📁 utils/                # Utilities
│   │   ├── 📁 hoc/
│   │   │   └── withHeaderItem.tsx
│   │   ├── 📁 hooks/            # Custom React hooks
│   │   │   ├── useAuthority.ts
│   │   │   ├── useDarkMode.ts
│   │   │   ├── useHealthCheck.ts
│   │   │   ├── useLocale.ts
│   │   │   ├── useResponsive.ts
│   │   │   └── useTranslation.ts
│   │   ├── classNames.ts
│   │   ├── cookiesStorage.ts
│   │   └── rbac.ts              # Role-based access control
│   │
│   ├── 📁 views/                # Page components
│   │   ├── 📁 about/           # About page
│   │   │   ├── AboutUs.tsx
│   │   │   └── index.ts
│   │   ├── 📁 admin/           # Admin dashboard
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── WorkerManagement.tsx
│   │   │   └── index.ts
│   │   ├── 📁 auth/            # Auth pages
│   │   │   ├── SignIn/
│   │   │   ├── SignUp/
│   │   │   ├── ForgotPassword/
│   │   │   └── ResetPassword/
│   │   ├── 📁 cart/            # Shopping cart
│   │   │   ├── Cart.tsx
│   │   │   └── index.ts
│   │   ├── 📁 contact/         # Contact page
│   │   │   ├── Contact.tsx
│   │   │   └── index.ts
│   │   ├── 📁 enterprise/      # Enterprise features
│   │   │   ├── Enterprise.tsx
│   │   │   └── index.ts
│   │   ├── 📁 feedback/        # Feedback & loyalty
│   │   │   ├── Feedback.tsx
│   │   │   └── index.ts
│   │   ├── 📁 inventory/       # Inventory management
│   │   │   ├── Inventory.tsx
│   │   │   └── index.ts
│   │   ├── 📁 quote/           # Quote requests
│   │   │   ├── Quote.tsx
│   │   │   └── index.ts
│   │   ├── 📁 services/        # Services catalog
│   │   │   ├── Services.tsx
│   │   │   └── index.ts
│   │   ├── 📁 workers/         # Worker map
│   │   │   ├── Workers.tsx
│   │   │   └── index.ts
│   │   ├── Home.tsx            # Home page
│   │   ├── Views.tsx           # Views wrapper
│   │   └── index.tsx
│   │
│   ├── 📄 App.tsx               # Main App component
│   ├── 📄 main.tsx              # Entry point
│   ├── 📄 index.css             # Global styles
│   └── 📄 vite-env.d.ts         # Vite types
│
├── 📁 public/                   # Public assets
│   ├── 📁 img/
│   │   ├── diagrams/
│   │   ├── logo/
│   │   └── others/
│   └── favicon.ico
│
├── 📄 package.json              # Frontend dependencies
├── 📄 vite.config.ts            # Vite configuration
├── 📄 tailwind.config.cjs       # Tailwind config
├── 📄 tsconfig.json             # TypeScript config
├── 📄 eslint.config.mjs         # ESLint config
├── 📄 index.html                # HTML entry point
│
└── 📄 README.md                 # Project documentation
```

## Key Components Map

### Frontend Components
- **🏠 Home** - Landing page with service overview
- **🔧 Services** - Service catalog and selection
- **🛒 Cart** - Shopping cart management
- **📋 Quote** - Quote request form
- **🗺️ Workers** - Worker location map (Leaflet)
- **📦 Inventory** - Parts and supplies management
- **⭐ Feedback** - Service ratings and loyalty
- **👨‍💼 Admin** - Admin dashboard
- **👷 Worker Management** - Worker CRUD operations
- **💬 Chatbot** - AI-powered support
- **🌐 i18n** - Multi-language (EN/ES)
- **💱 Currency** - Multi-currency (USD/EUR)

### Backend Routes
- **`/api/agent`** - Secure HTTP proxy with guardrails
- **`/api/workers`** - Worker CRUD and location tracking
- **`/api/inventory`** - Inventory CRUD operations
- **`/api/events`** - Server-Sent Events (SSE)
- **`/api/uploads`** - File upload handling

## Technology Overview

### Frontend
| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Language** | TypeScript |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **State** | Zustand |
| **Routing** | React Router 6 |
| **Forms** | React Hook Form + Zod |
| **Animation** | Framer Motion |
| **Maps** | Leaflet + React Leaflet |
| **i18n** | i18next + react-i18next |
| **HTTP** | Axios + SWR |
| **Auth** | Firebase Auth |

### Backend
| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express |
| **Features** | SSE, Agent Proxy, File Uploads |
| **Storage** | JSON Files, File System |

## State Management (Zustand)

| Store | Purpose |
|-------|---------|
| **authStore** | User authentication, token, profile |
| **cartStore** | Shopping cart items, quantities |
| **themeStore** | Theme config, dark mode, colors |
| **localeStore** | Current language (en/es) |
| **currencyStore** | Current currency (USD/EUR) |
| **routeKeyStore** | Navigation route keys |

## Main Workflows

### 1. User Service Request
```
Browse Services → Add to Cart → Request Quote → 
Submit Form → Backend Processing → Worker Assignment → 
Worker Confirmation → Send Quote → User Accept → Schedule Service
```

### 2. Worker Management
```
Admin Dashboard → Worker Management → 
View Workers on Map → Add/Edit/Delete Worker → 
Update Location → Assign Jobs
```

### 3. Inventory Management
```
Admin Dashboard → Inventory → 
View Items → Add/Edit/Delete Item → 
Update Stock → Generate Reports
```

### 4. Authentication
```
Sign In Page → Enter Credentials → Firebase Auth → 
Validate Token → Update Auth Store → 
Redirect to Dashboard
```

## API Endpoints Quick Reference

### Worker Management
- `GET /api/workers` - List all workers
- `GET /api/workers/:id` - Get worker details
- `POST /api/workers` - Create new worker
- `PUT /api/workers/:id` - Update worker
- `DELETE /api/workers/:id` - Delete worker

### Inventory Management
- `GET /api/inventory` - List all items
- `GET /api/inventory/:id` - Get item details
- `POST /api/inventory` - Add new item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

### Agent Proxy
- `POST /api/agent` - Secure HTTP proxy (JSON or SSE)

### Events
- `GET /api/events` - Server-Sent Events connection

### Uploads
- `POST /api/uploads` - Upload files

## Security Features

### Agent Proxy Security
- ✅ Host allowlist enforcement
- ✅ Request size limits (256KB)
- ✅ Response size limits (2MB)
- ✅ Header sanitization
- ✅ Authorization redaction in logs
- ✅ Timeout protection (60s)
- ✅ Method restriction (GET, POST only)

### Authentication Security
- ✅ Firebase authentication
- ✅ JWT token validation
- ✅ Protected route guards
- ✅ Role-based access control (RBAC)
- ✅ Secure session management

## Development Scripts

```bash
# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format and fix code

# Backend
cd backend
npm start            # Start Express server
npm test             # Run tests
```

## Future Integrations (Planned)
- 💳 PayPal SDK
- 🛍️ Mercado Libre API
- 📧 Email notifications
- 📱 SMS notifications
- 🔄 Socket.io for real-time updates
- 🤖 AI service routing
- 🧠 ML models for predictions
- 🧭 Agentic automation
