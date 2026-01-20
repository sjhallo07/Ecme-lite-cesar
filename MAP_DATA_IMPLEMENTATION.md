# Real Map Data Connections Implementation

## Overview
Comprehensive worker location mapping system with real-time tracking, photo uploads, and role-based access control.

## Architecture

### Backend
- **Port:** 3001
- **Framework:** Express.js
- **Routes:** `/api/workers/*`

### Frontend
- **Service:** WorkerService (Axios)
- **Components:** WorkersMapEnhanced, WorkerManagement
- **RBAC:** Role-based utilities in `utils/rbac.ts`

---

## Backend API

### Worker Routes

#### GET `/api/workers`
Get all workers (filtered by role)

**Query Parameters:**
- `role` - User role: `admin` | `staff` | `client`
- `userId` - Current user ID

**Response:**
```json
{
  "success": true,
  "data": [...workers],
  "count": 5
}
```

**Role-Based Filtering:**
- **Admin:** See all worker data (location, phone, email, status, certifications)
- **Staff:** See worker list with limited contact info
- **Client:** See only available/busy workers (basic info)

---

#### GET `/api/workers/:id`
Get specific worker details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wrk-001",
    "name": "Carlos Rodriguez",
    "photo": "/uploads/workers/worker-photo.jpg",
    "specialties": ["electrical-fencing", "surveillance-cameras"],
    "rating": 4.8,
    "reviewCount": 127,
    "availability": "available",
    "currentLocation": {
      "lat": 40.7128,
      "lng": -74.006,
      "timestamp": 1234567890
    },
    "zone": "North Zone",
    "phone": "+1-555-0101",
    "email": "carlos.r@repairpro.com",
    "role": "staff",
    "status": "active",
    "skills": ["Electrical", "Surveillance", "Installation"],
    "experience": 8,
    "certifications": ["Electrical License", "Security Cert"]
  }
}
```

---

#### POST `/api/workers`
Create new worker (admin only)

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "+1-555-0105",
  "email": "john.d@repairpro.com",
  "zone": "Central Zone",
  "specialties": ["electrical-fencing"],
  "skills": ["Electrical", "Installation"],
  "experience": 5,
  "certifications": ["Electrical License"]
}
```

---

#### PUT `/api/workers/:id`
Update worker details (admin or worker's own profile)

**Request Body:** Any worker fields to update

---

#### POST `/api/workers/:id/location`
Update worker real-time location (staff/admin)

**Request Body:**
```json
{
  "lat": 40.7128,
  "lng": -74.0060
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wrk-001",
    "currentLocation": {
      "lat": 40.7128,
      "lng": -74.0060,
      "timestamp": 1234567890
    }
  },
  "message": "Location updated successfully"
}
```

---

#### POST `/api/workers/:id/availability`
Update worker availability status (staff/admin)

**Request Body:**
```json
{
  "availability": "available" | "busy" | "offline"
}
```

---

#### POST `/api/workers/:id/photo`
Upload worker photo (admin only)

**Content-Type:** `multipart/form-data`

**Form Data:**
- `photo` - Image file (JPEG, PNG, WEBP, max 5MB)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "wrk-001",
    "photo": "/uploads/workers/worker-1234567890.jpg"
  },
  "message": "Photo uploaded successfully"
}
```

---

#### DELETE `/api/workers/:id`
Delete worker (admin only)

---

#### GET `/api/workers/zones/list`
Get all available zones

**Response:**
```json
{
  "success": true,
  "data": ["North Zone", "East Zone", "South Zone", "West Zone"]
}
```

---

## Frontend Services

### WorkerService

Located in `src/services/WorkerService.ts`

**Methods:**

```typescript
// Get all workers
await WorkerService.getWorkers()

// Get single worker
await WorkerService.getWorkerById(workerId)

// Create worker (admin)
await WorkerService.createWorker(workerData)

// Update worker
await WorkerService.updateWorker(workerId, updateData)

// Update location (real-time)
await WorkerService.updateWorkerLocation(workerId, lat, lng)

// Update availability
await WorkerService.updateWorkerAvailability(workerId, availability)

// Upload photo (admin)
await WorkerService.uploadWorkerPhoto(workerId, file)

// Delete worker (admin)
await WorkerService.deleteWorker(workerId)

// Get zones
await WorkerService.getZones()
```

**Auto-Auth Headers:**
All requests automatically include:
- `role` - Current user's role from localStorage
- `userId` - Current user's ID from localStorage

---

## Role-Based Access Control

Located in `src/utils/rbac.ts`

### Permission Matrix

| Action | Admin | Staff | Client |
|--------|-------|-------|--------|
| View Workers | ✓ | ✓ | ✓ (available only) |
| View Details | ✓ | ✓ | ✗ |
| Create Worker | ✓ | ✗ | ✗ |
| Update Worker | ✓ | ✓ (own only) | ✗ |
| Delete Worker | ✓ | ✗ | ✗ |
| Update Location | ✓ | ✓ (own only) | ✗ |
| Update Availability | ✓ | ✓ (own only) | ✗ |
| Upload Photo | ✓ | ✗ | ✗ |
| Manage Zones | ✓ | ✗ | ✗ |

### RBAC Utilities

```typescript
import { useRBAC, getPermissions, canPerform } from '@/utils/rbac'

// In React component
const { role, permissions, isAdmin, isStaff, can } = useRBAC()

if (can('canUploadPhoto')) {
  // Show photo upload button
}

// Check specific permission
if (canPerform('admin', 'canDeleteWorker')) {
  // Allow deletion
}
```

---

## Components

### WorkersMapEnhanced
Location: `src/views/workers/WorkersMapEnhanced.tsx`

**Features:**
- Real-time Leaflet map with worker markers
- Zone filtering
- Worker cards with photos
- Photo upload (admin)
- Role-based visibility
- Worker details modal
- Loading and error states

**Props:** None (uses RBAC and WorkerService)

**Permissions:**
- Clients: See available workers only
- Staff: See all workers, update own location
- Admin: Full access + photo upload

---

### WorkerManagement
Location: `src/views/admin/WorkerManagement.tsx`

**Features:**
- Admin-only worker management
- Create, read, update, delete workers
- Status toggle (available/busy/offline)
- Worker table with photos
- Edit form modal
- Authorization checks

**Access:** Admin only

---

## Data Storage

### Mock Database (Development)
- In-memory workers array
- Persists during API session
- Resets on server restart

### Production Ready (MongoDB)
Replace the in-memory array with MongoDB models:

```javascript
// Example schema
const workerSchema = {
  id: String,
  name: String,
  photo: String,
  specialties: [String],
  rating: Number,
  availability: String,
  currentLocation: {
    lat: Number,
    lng: Number,
    timestamp: Date
  },
  zone: String,
  phone: String,
  email: String,
  role: String,
  status: String,
  skills: [String],
  experience: Number,
  certifications: [String]
}
```

---

## Real-Time Updates

### Option 1: Polling (Current)
- Frontend calls API every 5-10 seconds
- Simple to implement
- Higher latency

### Option 2: WebSocket (Recommended)
Install dependency:
```bash
npm install socket.io socket.io-client
```

Backend:
```javascript
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  socket.on('update-location', (data) => {
    // Update worker location
    io.emit('worker-updated', data)
  })
})
```

Frontend:
```typescript
import io from 'socket.io-client'

const socket = io('http://localhost:3001')
socket.on('worker-updated', (data) => {
  updateWorkerInMap(data)
})
```

### Option 3: Server-Sent Events (SSE)
Simpler than WebSocket, good for one-way updates

---

## File Structure

```
backend/
├── src/
│   └── routes/
│       └── workers.js (NEW)
└── uploads/
    └── workers/ (photo storage)

src/
├── services/
│   └── WorkerService.ts (NEW)
├── utils/
│   └── rbac.ts (NEW)
└── views/
    ├── workers/
    │   └── WorkersMapEnhanced.tsx (NEW)
    └── admin/
        └── WorkerManagement.tsx (NEW)
```

---

## Authentication Integration

Store user auth in localStorage:
```json
{
  "userId": "user-123",
  "role": "admin|staff|client",
  "name": "User Name",
  "email": "user@example.com",
  "token": "jwt-token"
}
```

Example in AuthContext:
```typescript
localStorage.setItem('auth', JSON.stringify({
  userId: user.id,
  role: user.role,
  token: jwtToken
}))
```

---

## Testing Endpoints

### Using cURL

```bash
# Get all workers as admin
curl -X GET "http://localhost:3001/api/workers?role=admin&userId=user-123"

# Get specific worker
curl -X GET "http://localhost:3001/api/workers/wrk-001?role=admin"

# Update worker location
curl -X POST "http://localhost:3001/api/workers/wrk-001/location" \
  -H "Content-Type: application/json" \
  -d '{"lat": 40.7128, "lng": -74.0060}' \
  -G -d "role=staff&userId=wrk-001"

# Upload photo
curl -X POST "http://localhost:3001/api/workers/wrk-001/photo" \
  -F "photo=@/path/to/photo.jpg" \
  -G -d "role=admin&userId=user-123"

# Update availability
curl -X POST "http://localhost:3001/api/workers/wrk-001/availability" \
  -H "Content-Type: application/json" \
  -d '{"availability": "available"}' \
  -G -d "role=staff&userId=wrk-001"
```

---

## Environment Variables

`.env` (backend):
```
PORT=3001
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

---

## Next Steps

1. **Database Integration:** Replace mock DB with MongoDB
2. **Real-Time Updates:** Implement WebSocket with Socket.io
3. **Geolocation:** Add GPS tracking for staff
4. **Notifications:** Send alerts when workers update availability
5. **Analytics:** Track worker activity and performance
6. **Payment:** Integrate with PayPal for payments

---

## Troubleshooting

### Photos Not Showing
- Check `uploads/workers/` directory exists
- Verify backend serves static files: `app.use(express.static(...))`
- Check browser console for 404 errors

### Location Not Updating
- Verify `role` and `userId` params in request
- Check worker availability (offline workers blocked from some ops)
- Verify timestamp format in response

### Permission Denied
- Check localStorage auth data
- Verify `role` is `admin|staff|client`
- Check API role validation logic

---

