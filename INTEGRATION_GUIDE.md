# Integration Guide: Adding Map Components to Your Routes

This guide shows how to integrate the new worker map and management features into your existing routing system.

## Option 1: Add to Existing Routes (Recommended)

### Step 1: Update `src/configs/routes.config/index.tsx`

Add these routes to your route configuration:

```typescript
// Add to your routes array
{
    key: 'workers-map',
    path: '/workers',
    component: () => import('@/views/workers/WorkersMapEnhanced'),
    authority: [],
}

// Admin only route
{
    key: 'worker-management',
    path: '/admin/workers',
    component: () => import('@/views/admin/WorkerManagement'),
    authority: ['admin'],
}
```

### Step 2: Update Navigation

Add to `src/configs/navigation.config/` or your navigation menu:

```typescript
// Navigation item
{
    key: 'menu-workers',
    path: '/workers',
    title: 'Find Workers',
    icon: 'pi pi-map',
    breadcrumb: false,
}

// Admin menu
{
    key: 'menu-worker-mgmt',
    path: '/admin/workers',
    title: 'Worker Management',
    icon: 'pi pi-people',
    breadcrumb: false,
    authority: ['admin'],
}
```

---

## Option 2: Standalone Pages

### Create a new Workers page

**File:** `src/views/workers/WorkersPage.tsx`

```typescript
import WorkersMapEnhanced from './WorkersMapEnhanced'

export default function WorkersPage() {
    return (
        <div className="page-container">
            <WorkersMapEnhanced />
        </div>
    )
}
```

**File:** `src/views/admin/AdminWorkersPage.tsx`

```typescript
import WorkerManagement from './WorkerManagement'

export default function AdminWorkersPage() {
    return (
        <div className="page-container">
            <WorkerManagement />
        </div>
    )
}
```

---

## Option 3: Add to Existing Admin Dashboard

### Update `src/views/admin/AdminDashboard.tsx`

Add a section for worker management:

```typescript
import WorkerManagement from './WorkerManagement'
import { useRBAC } from '@/utils/rbac'

export default function AdminDashboard() {
    const { isAdmin } = useRBAC()

    return (
        <div>
            {/* Existing admin content */}
            
            {isAdmin && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-6">Worker Management</h2>
                    <WorkerManagement />
                </div>
            )}
        </div>
    )
}
```

---

## Update Authentication Context

Make sure your auth system stores the user role:

**File:** `src/auth/AuthContext.ts`

```typescript
export interface AuthUser {
    id: string
    name: string
    email: string
    role: 'admin' | 'staff' | 'client'  // Add this
    token: string
}
```

**File:** `src/auth/AuthProvider.tsx`

```typescript
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    const login = (userData: AuthUser) => {
        setUser(userData)
        // Save to localStorage for WorkerService
        localStorage.setItem('auth', JSON.stringify({
            userId: userData.id,
            role: userData.role,
            name: userData.name,
            email: userData.email,
            token: userData.token,
        }))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('auth')
    }

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>
    )
}
```

---

## Add Menu Icons (Optional)

Update your navigation icon config:

**File:** `src/configs/navigation-icon.config.tsx`

```typescript
import { PiMapDuotone, PiPeopleDuotone } from 'react-icons/pi'

export const navigationIcon: Record<string, JSX.Element> = {
    workers: <PiMapDuotone />,
    'worker-management': <PiPeopleDuotone />,
    // ... other icons
}
```

---

## Link from Home Page (Optional)

Add links to the map from your home page:

**File:** `src/views/Home.tsx`

```typescript
import { Link } from 'react-router-dom'
import { PiMapDuotone } from 'react-icons/pi'

export default function Home() {
    return (
        <div>
            {/* Existing content */}
            
            <section className="mt-12">
                <Link 
                    to="/workers"
                    className="flex items-center gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                    <PiMapDuotone className="w-8 h-8 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-gray-900">Find Workers</h3>
                        <p className="text-gray-600">View available workers on interactive map</p>
                    </div>
                </Link>
            </section>
        </div>
    )
}
```

---

## Permission Guards

### Protect Admin Routes

**File:** `src/components/route/AuthorityGuard.tsx`

```typescript
import { useRBAC } from '@/utils/rbac'
import { Navigate } from 'react-router-dom'

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAdmin } = useRBAC()
    
    if (!isAdmin) {
        return <Navigate to="/" replace />
    }
    
    return <>{children}</>
}
```

Use in routing:

```typescript
{
    key: 'worker-management',
    path: '/admin/workers',
    component: () => import('@/views/admin/WorkerManagement'),
    layout: 'admin',
    authority: ['admin'], // This triggers AuthorityGuard
}
```

---

## API Service Usage

### Auto-Authentication

The `WorkerService` automatically includes user role and ID from localStorage:

```typescript
// No need to pass auth manually
const response = await WorkerService.getWorkers()

// Service internally does:
// fetch('/api/workers?role=admin&userId=user-123', ...)
```

### Manual Override (if needed)

```typescript
// Pass custom role (for testing)
const response = await axios.get(
    '/api/workers?role=admin&userId=admin-user'
)
```

---

## Environment Configuration

Add to `.env.local`:

```
VITE_API_URL=http://localhost:3001
VITE_WORKER_API=/api/workers
VITE_UPLOAD_DIR=/uploads/workers
```

Use in components:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
const WORKER_API = import.meta.env.VITE_WORKER_API || '/api/workers'
```

---

## Testing Different Roles

### Mock Different Users

```typescript
// In browser console during testing
localStorage.setItem('auth', JSON.stringify({
    userId: 'admin-123',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@example.com'
}))
// Refresh page

localStorage.setItem('auth', JSON.stringify({
    userId: 'staff-456',
    role: 'staff',
    name: 'Staff Member',
    email: 'staff@example.com'
}))
// Refresh page

localStorage.setItem('auth', JSON.stringify({
    userId: 'client-789',
    role: 'client',
    name: 'Client User',
    email: 'client@example.com'
}))
// Refresh page
```

---

## Common Integration Patterns

### Pattern 1: Sidebar Navigation

```typescript
<Sidebar>
    <NavItem icon={<PiMapDuotone />} to="/workers">
        Find Workers
    </NavItem>
    {isAdmin && (
        <NavItem icon={<PiPeopleDuotone />} to="/admin/workers">
            Manage Workers
        </NavItem>
    )}
</Sidebar>
```

### Pattern 2: Tabs in Admin Dashboard

```typescript
<Tabs>
    <Tab label="Workers" icon={<PiPeopleDuotone />}>
        <WorkerManagement />
    </Tab>
    <Tab label="Inventory">
        <InventoryManagement />
    </Tab>
</Tabs>
```

### Pattern 3: Modal for Quick Access

```typescript
const [showWorkerMap, setShowWorkerMap] = useState(false)

<Modal open={showWorkerMap} onClose={() => setShowWorkerMap(false)}>
    <WorkersMapEnhanced />
</Modal>
```

---

## Build & Deploy

### Test Locally

```bash
# Terminal 1: Backend
cd backend
npm start

# Terminal 2: Frontend
cd ..
npm run dev

# Visit: http://localhost:5173
```

### Build for Production

```bash
npm run build

# Deploy build/ folder to your hosting
```

---

## Troubleshooting Integration

### Routes not found

- Check route path matches component path
- Verify imports are correct
- Check `AllRoutes.tsx` includes route

### Components not rendering

- Check authority permissions
- Verify user role is set in localStorage
- Check browser console for errors

### API calls failing

- Verify backend running on port 3001
- Check Vite proxy config
- Verify role parameter in localStorage

### Photos not showing

- Check `backend/uploads/workers/` exists
- Verify backend serves static files
- Check photo URL in browser dev tools

---

## Next Steps

1. ✅ Copy code from implementation
2. ✅ Add routes to your configuration
3. ✅ Update auth to include role
4. ✅ Add navigation menu items
5. ✅ Test as different user roles
6. ✅ Deploy to production

---

## Support Files

- `MAP_DATA_IMPLEMENTATION.md` - Full API documentation
- `QUICKSTART_MAP_DATA.md` - Quick reference guide
- Backend: `src/routes/workers.js`
- Frontend: `src/services/WorkerService.ts`
