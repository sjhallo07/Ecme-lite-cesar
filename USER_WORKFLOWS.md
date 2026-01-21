# 👥 User Workflows Guide

Complete workflows for Admin, Staff, and Client roles in the Ecme-lite Service Management System.

---

## 🎯 Role Overview

| Role | Access Level | Primary Functions |
|------|--------------|-------------------|
| **Admin** | Full access | Worker management, quotes, jobs, inventory, analytics |
| **Staff** | Worker operations | Job assignments, worker updates, client support |
| **Client** | Service requests | Find workers, request quotes, track services |

---

## 🔑 Admin Workflows

### 1. Dashboard Overview

**Access:** `http://localhost:5175/admin`

**Landing View:**
- Revenue metrics and KPIs
- Active workers count with availability
- Pending quotes summary
- Completed jobs tracker
- Quick action cards

**Available Tabs:**
- Overview (stats and recent activity)
- Workers (management & map)
- Quotes (review & respond)
- Jobs (active assignments & progress)

---

### 2. Worker Management

**Access:** Admin Dashboard → Workers Tab

#### View All Workers

```
1. Click "Workers" tab
2. See table with:
   - Worker profile (name, email, photo)
   - Zone assignment
   - Specialties
   - Rating & review count
   - Availability status
   - Current location (View link)
```

#### Admin Location Map

**Features:**
- Live GPS tracking of admin location
- All workers plotted by availability:
  - 🟢 Green: Available
  - 🟡 Yellow: Busy
  - ⚪ Gray: Offline
  - 🔵 Blue: Admin (you)
- Click markers for worker details
- "Locate me" button for re-centering

**Workflow:**
```
1. Scroll to map widget
2. Allow location access when prompted
3. Map centers on your position
4. Click worker markers to see:
   - Name
   - Zone
   - Availability status
5. Click "Locate me" to re-center anytime
```

#### Add New Worker

```
1. Workers tab → "Add Worker" button
2. Fill form:
   - Name, email, phone
   - Zone assignment
   - Specialties (select multiple)
   - Upload photo (optional)
3. Set initial availability
4. Save → Worker appears in list
```

#### Edit Worker

```
1. Find worker in table
2. Click edit icon
3. Update:
   - Contact info
   - Zone/specialties
   - Availability status
   - Photo
4. Save changes
```

#### Upload Worker Photo

```
1. Workers tab → Find worker card
2. Click photo upload icon (top-right of avatar)
3. Select image file
4. Photo uploads and updates instantly
```

---

### 3. Quote Management

**Access:** Admin Dashboard → Quotes Tab

#### Review Pending Quotes

```
1. Click "Quotes" tab
2. View table with:
   - Quote ID
   - Customer name
   - Service requested
   - Amount
   - Status (pending/reviewed/quoted/accepted/rejected)
   - Date submitted
3. Click quote row for details
```

#### Respond to Quote Request

```
1. Select pending quote
2. Review service details
3. Calculate cost:
   - Labor
   - Materials
   - Travel/zone fee
4. Enter total amount
5. Add notes (optional)
6. Submit quote
7. Status changes to "quoted"
8. Customer receives notification
```

#### Accept/Reject Quote

```
1. View quoted requests
2. Wait for customer response
3. If accepted:
   - Create job assignment
   - Assign worker
   - Set timeline
4. If rejected:
   - Mark as rejected
   - Archive or follow up
```

---

### 4. Job Management

**Access:** Admin Dashboard → Jobs Tab

#### View Active Jobs

```
1. Click "Jobs" tab
2. See all active jobs with:
   - Job ID
   - Customer name
   - Assigned worker
   - Service type
   - Status (assigned/in-progress/completed)
   - Progress bar (%)
```

#### Assign Worker to Job

```
1. Select job or create from quote
2. Click "Assign Worker"
3. Filter workers by:
   - Zone proximity
   - Availability
   - Specialties match
4. Select worker
5. Set:
   - Start date/time
   - Estimated duration
   - Priority level
6. Confirm assignment
7. Worker receives notification
```

#### Monitor Job Progress

```
1. Jobs tab → In-progress jobs
2. View progress updates:
   - Worker check-ins
   - Time tracking
   - Photo updates
   - Customer feedback
3. Track on map (if location enabled)
4. Contact worker or customer as needed
```

#### Complete Job

```
1. Worker marks job complete
2. Admin reviews:
   - Time spent
   - Materials used
   - Customer satisfaction
3. Approve completion
4. Generate invoice
5. Process payment
6. Archive job
```

---

### 5. Inventory Management

**Access:** `http://localhost:5175/admin/inventory`

#### View Inventory

```
1. Navigate to Inventory page
2. See all items:
   - Name & SKU
   - Category
   - Quantity in stock
   - Reorder level
   - Status (in-stock/low-stock/out-of-stock)
   - Supplier
   - Last restocked date
```

#### Add New Item

```
1. Click "Add Item"
2. Fill details:
   - Name, SKU, category
   - Initial quantity
   - Reorder level
   - Unit price
   - Supplier info
3. Save → Item added to inventory
```

#### Update Stock Levels

```
1. Find item in list
2. Click edit or quick-update
3. Adjust quantity:
   - Add stock (restock)
   - Subtract (usage/sale)
4. Status auto-updates based on reorder level
5. Save changes
```

#### Low Stock Alerts

```
- Automatic notifications when quantity ≤ reorder level
- "Low Stock" badge on items
- Reorder suggestions
- Generate purchase orders
```

---

## 👷 Staff Workflows

### 1. Worker Dashboard

**Access:** `http://localhost:5175/staff/workers`

**Landing View:**
- Assigned jobs list
- Today's schedule
- Worker map (if enabled)
- Quick actions

---

### 2. View Workers Map

**Workflow:**
```
1. Navigate to Workers page
2. See all workers in your zone
3. Filter by:
   - Availability
   - Zone
   - Specialty
4. Map shows locations
5. Click worker for contact info
```

---

### 3. Manage Assignments

#### Accept Job Assignment

```
1. Receive notification
2. Review job details:
   - Customer name/location
   - Service type
   - Scheduled time
   - Special instructions
3. Accept or request changes
4. Job added to schedule
```

#### Update Job Status

```
1. Jobs list → Select active job
2. Update status:
   - On the way
   - Arrived
   - In progress
   - Completed
3. Add notes or photos
4. Update progress percentage
5. Save → Admin sees update
```

#### Report Issues

```
1. During job → "Report Issue"
2. Select type:
   - Customer not available
   - Wrong/missing parts
   - Safety concern
   - Additional work needed
3. Add description + photos
4. Submit → Admin notified
5. Wait for guidance
```

---

### 4. Time Tracking

```
1. Job details → "Start Timer"
2. Clock automatically tracks time
3. Pause for breaks
4. Stop when job complete
5. Review total time
6. Submit timesheet
```

---

### 5. Update Availability

```
1. Profile settings
2. Set availability:
   - Available
   - Busy (on job)
   - Offline (end of day)
3. Status syncs to admin map
4. Prevents new assignments when busy/offline
```

---

## 👤 Client Workflows

### 1. Find Workers

**Access:** `http://localhost:5175/find-workers`

**Landing View:**
- Interactive map with worker locations
- Zone filter buttons
- Worker cards with details
- Search/filter options

---

### 2. Browse Available Workers

#### View Map

```
1. Page loads with map centered on your location
   (Allow location access when prompted)
2. See workers marked by availability:
   - 🟢 Green: Available now
   - 🟡 Yellow: Currently busy
   - ⚪ Gray: Offline
   - 🔵 Blue: Your location
3. Click markers for worker info
4. Use "Use my current location" to re-center
```

#### Filter by Zone

```
1. Zone buttons above map:
   - All Zones
   - North Zone
   - East Zone
   - South Zone
   - West Zone
2. Click zone to filter
3. Map and list update
4. Worker count updates in buttons
```

#### View Worker Details

```
Worker cards show:
- Photo (or initials)
- Name
- Zone
- Specialties (badges)
- Rating & review count
- Availability status
- Contact buttons (phone/email)
```

---

### 3. Contact Worker

#### Call Worker

```
1. Find available worker
2. Click phone icon
3. Device opens phone dialer
4. Call worker directly
```

#### Email Worker

```
1. Click email icon on card
2. Device opens email app
3. Worker email pre-filled
4. Write message and send
```

---

### 4. Request Quote

**Access:** `http://localhost:5175/quote`

#### Submit Quote Request

```
1. Navigate to Quote page
2. Fill form:
   - Your name, email, phone
   - Service needed (select from list)
   - Preferred zone
   - Property type (home/commercial/industrial)
   - Description of work
   - Preferred date/time
   - Upload photos (optional)
3. Submit request
4. Receive confirmation
5. Wait for admin response
```

#### Track Quote Status

```
1. Check email for updates
2. Or visit Quote History page
3. See status:
   - Pending (under review)
   - Quoted (price provided)
   - Accepted (confirmed)
   - In Progress (job started)
   - Completed
```

---

### 5. Accept/Reject Quote

```
1. Receive quote email notification
2. Review:
   - Service details
   - Quoted price
   - Estimated timeline
   - Terms
3. Choose action:
   - Accept → Job scheduled
   - Reject → Provide reason
   - Request changes → Admin reviews
```

---

### 6. Track Service

#### View Job Progress

```
1. Active jobs visible in dashboard
2. Real-time updates:
   - Worker assigned
   - Worker en route
   - Work in progress
   - Estimated completion
3. See worker location on map (if shared)
4. Contact worker directly if needed
```

#### Provide Feedback

```
1. Job complete → Feedback request
2. Rate service (1-5 stars)
3. Write review (optional)
4. Upload photos of work (optional)
5. Submit feedback
6. Affects worker rating
```

---

## 🔄 Common Workflows

### Multi-Role Scenarios

#### New Service Request Flow

```
CLIENT:
1. Find worker or request quote
2. Submit details
3. Wait for response

ADMIN:
4. Receive quote request
5. Review and calculate
6. Send quote to client

CLIENT:
7. Receive quote
8. Accept or negotiate

ADMIN:
9. If accepted → Create job
10. Assign worker

STAFF:
11. Receive assignment
12. Accept and schedule
13. Complete service

CLIENT:
14. Receive service
15. Provide feedback

ADMIN:
16. Review completion
17. Process payment
18. Close job
```

---

### Emergency Service Request

```
CLIENT:
1. Need urgent service
2. Call worker directly (if available)
3. Or submit emergency quote

ADMIN:
4. Flag as priority
5. Assign available worker immediately
6. Monitor progress

STAFF:
7. Respond within SLA
8. Update status frequently
9. Complete quickly

CLIENT:
10. Confirm resolution
11. Expedited feedback
```

---

## 🗺️ Map Feature Details

### For All Roles

**Geolocation Features:**
- Real-time GPS tracking
- Auto-center on load
- Manual re-center button
- Accuracy indicators
- Fallback to default location if denied

**Map Markers:**
- Color-coded by availability
- Initials or photo display
- Click for popup info
- Cluster view when zoomed out

**Privacy Controls:**
- Location permission required
- Can deny and use default view
- Staff can disable location sharing
- Admin always sees available workers

---

## 📱 Mobile Workflows

### Responsive Features

**All roles optimized for mobile:**
- Touch-friendly buttons
- Swipeable cards
- Mobile-optimized maps
- Phone/SMS quick actions
- Offline capability (future)

**Staff Mobile Workflow:**
```
1. Check schedule on phone
2. Navigate to job via map
3. Update status on-site
4. Upload photos immediately
5. Complete job from device
```

---

## 🔔 Notifications

### Admin Notifications

- New quote requests
- Low inventory alerts
- Job completion confirmations
- Worker availability changes
- Customer feedback

### Staff Notifications

- New job assignments
- Schedule changes
- Customer messages
- Admin updates
- Payment confirmations

### Client Notifications

- Quote responses
- Job assignments
- Worker en route
- Job completion
- Invoice ready

---

## 🎯 Best Practices

### For Admins

1. Check dashboard daily for metrics
2. Respond to quotes within 24 hours
3. Monitor worker locations during peak hours
4. Review job progress regularly
5. Keep inventory stocked
6. Analyze feedback trends

### For Staff

1. Update availability in real-time
2. Accept assignments promptly
3. Communicate delays immediately
4. Document work with photos
5. Complete timesheets daily
6. Maintain professional ratings

### For Clients

1. Provide accurate job details
2. Be available for contact
3. Allow location access for better service
4. Review workers before requesting
5. Provide honest feedback
6. Pay invoices promptly

---

## 🚀 Quick Reference

### Admin Quick Actions

```bash
# View all workers with locations
/admin → Workers tab → Scroll to map

# Respond to pending quotes
/admin → Quotes tab → Select pending

# Assign worker to job
/admin → Jobs tab → Click job → Assign

# Check low stock items
/admin/inventory → Filter by "Low Stock"
```

### Staff Quick Actions

```bash
# Update current availability
Profile → Set status → Save

# Start job timer
Jobs → Select job → Start Timer

# Report issue
Active Job → Report Issue → Submit

# Update job progress
Jobs → Update Status → Add %
```

### Client Quick Actions

```bash
# Find nearby workers
/find-workers → Allow location → View map

# Request urgent quote
/quote → Fill form → Mark "Urgent"

# Contact worker
Workers map → Click card → Phone/Email icon

# Track active service
Dashboard → Active Jobs → View Progress
```

---

## 📞 Support

### Getting Help

**Admin:** Access full documentation in Settings → Help Center

**Staff:** Contact admin or use in-app support

**Client:** Email support@ecme-lite.com or call hotline

---

**Last Updated:** January 21, 2026  
**Version:** 1.0  
**Status:** ✅ Production Ready
