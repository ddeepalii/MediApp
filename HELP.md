---
# Build a Medical Application Using Java & Angular

## Overview
Build an integrated platform designed to optimize the management of medical equipment within healthcare facilities. This system facilitates tracking, maintenance, and allocation of medical equipment, connecting hospitals, maintenance staff, and suppliers to ensure efficient healthcare delivery.

## Users of the System
- Hospitals: Manage equipment inventory, schedule maintenance, and create equipment requests.
- Maintenance Technicians: Receive maintenance tasks, update service records, and manage parts inventory.
- Suppliers: View equipment demands, process orders, and manage shipments.

## Functional Requirements
- User Registration & Profile Management: Users create accounts, log in, and edit profiles. This includes data validation and secure handling of user information.
- Equipment Inventory Management: Hospitals add, view, update, or delete equipment details. The system ensures only authorized modifications.
- Maintenance Scheduling & Management: Hospitals schedule maintenance, and technicians update task statuses and parts used.
- Order & Supply Management: Suppliers receive orders from hospitals and manage the logistics of equipment delivery.
- User Role-Based Authentication: Role-specific access to functionalities based on whether the user is a hospital employee, a technician, or a supplier.
- JWT Authorization: Manages user sessions and secures API calls.
- RESTful API & Angular Service Layer: Facilitates communication between the frontend and backend RESTful services.
- Angular: Create Http Service with name HttpService and create these functions UpdateOrderStatus,addEquipment,getorders,getMaintenance,getHospital,
getEquipmentById,updateMaintenance,orderEquipment,scheduleMaintenance,createHospital,Login and registerUser.
- Angular: Use Reactive form and declare form with name itemForm in Create Hospital Component
- Angular: Use Reactive form and declare form with name itemForm in Create Login,maintenance, requestequitment, schedule and registration Components

## Technology Stack
- Backend: Spring Boot, JPA, MySQL
- Frontend: Angular
- Security: Spring Security, JWT

## Key Points to Note
- Security: Implement robust security measures for data and API access.
- Scalability: Design for growing data and user base.
- User Interface Consistency: Uniform look and feel across modules.
- Best Practices: Follow DRY, modular design, and maintain documentation.

## Backend Functionalities to be Built
- User Management: Develop endpoints for user registration, login, and profile management.
- Equipment Management: CRUD operations for equipment inventory.
- Maintenance Management: Functionalities for scheduling and recording maintenance.
- Supply Management: Manage orders and track shipments.
- Role-Based Access Control: Define different access levels for hospitals, technicians, and suppliers.
- JWT Token Management: Token generation and management.

## Backend Test Cases
- User Registration: Validate user data storage and duplicate email handling.
- Equipment Addition: Check correct database entry for new equipment.
- Maintenance Scheduling: Ensure correct logging and updating of maintenance tasks.
- Order Processing: Authenticate and validate equipment orders and updates.

## Backend Files to be Completed
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/config/SecurityConfig.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/controller/HospitalController.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/controller/RegisterAndLoginController.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/controller/SupplierController.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/controller/TechnicianController.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/entitiy/Equipment.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/entitiy/Hospital.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/entitiy/Maintenance.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/entitiy/Order.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/entitiy/User.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/jwt/JwtRequestFilter.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/jwt/JwtUtil.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/repository/EquipmentRepository.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/repository/HospitalRepository.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/repository/MaintenanceRepository.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/repository/OrderRepository.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/repository/UserRepository.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/service/EquipmentService.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/service/HospitalService.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/service/MaintenanceService.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/service/OrderService.java`
- `./src/main/java/com/wecp/medicalequipmentandtrackingsystem/service/UserService.java`

## Entity classes and their properties 
1. User
    - Long id
    - String username
    - String password
    - String email
    - String role; // role should be from ( HOSPITAL, TECHNICIAN, SUPPLIER )
   
2. Hospital
    - Long id
    - String name
    - String location
    - List<Equipment> equipmentList

3. Equipment
    - Long id
    - String name
    - String description
    - Hospital hospital

4. Maintenance
    - Long id
    - Date scheduledDate
    - Date completedDate;
    - String description
    - String status; 
    - Equipment equipment

5. Order
    - Long id
    - Date orderDate
    - String status; // Pending, Shipped, Delivered, etc.
    - int quantity
    - Equipment equipment

-> Manage the relationships between entities using appropriate annotations.
-> generate constructors, getters, and setters for the Property class as per standard Java conventions.
-> For example: getId(), setId(Long id) etc.

## API Endpoints
### For Hospitals (Admin Side):
- Register User:
    - Method: POST
    - Endpoint: /api/user/register
- Login User:
    - Method: POST
    - Endpoint: /api/user/login
- Create a Hospital:
    - Method: POST
    - Endpoint: /api/hospital/create
- Add Equipment:
    - Method: POST
    - Endpoint: /api/hospital/equipment?hospitalId=1
- Schedule Maintenance:
    - Method: POST
    - Endpoint: /api/hospital/maintenance/schedule?equipmentId=1
- Order Equipment:
    - Method: POST
    - Endpoint: /api/hospital/order?equipmentId=1

### For Technicians and Suppliers (User Side):
- Register User:
    - Method: POST
    - Endpoint: /api/user/register
- Login User:
    - Method: POST
    - Endpoint: /api/user/login
- Get all Maintenance:
    - Method: GET
    - Endpoint: /api/technician/maintenance
- Update Maintenance Record:
    - Method: PUT
    - Endpoint: /api/technician/maintenance/update/{maintenanceId}
- Get all Orders:
    - Method: GET
    - Endpoint: /api/supplier/orders
- Update Order Status:
    - Method: PUT
    - Endpoint: api/supplier/order/update/{orderId}?newStatus=Delivered
- Get All Hospitals:
    - Method: GET
    - Endpoint: /api/hospitals
- Get Equipment by Hospital:
    - Method: GET
    - Endpoint: /api/hospital/equipment/{hospitalId}


## Security Configurations to be Implemented
Set the following security configurations in the `SecurityConfig.java` file:
- /api/user/register: accessible to everyone
- /api/user/login: accessible to everyone
- /api/hospital/create: accessible to HOSPITAL authority 
- /api/hospitals: accessible to HOSPITAL authority
- /api/hospital/equipment: accessible to HOSPITAL authority
- /api/hospital/equipment/{hospitalId}: accessible to HOSPITAL authority
- /api/hospital/maintenance/schedule: accessible to HOSPITAL authority
- /api/hospital/order: accessible to HOSPITAL authority
- /api/technician/maintenance: accessible to TECHNICIAN authority
- /api/technician/maintenance/update/{maintenanceId}: accessible to TECHNICIAN authority
- /api/supplier/orders: accessible to SUPPLIER authority
- /api/supplier/order/update/{orderId}: accessible to SUPPLIER authority
- any other route: accessible to authenticated users

Check the permissions with respect to authority such as hasAuthority("HOSPITAL") or hasAuthority("TECHNICIAN") or hasAuthority("SUPPLIER").
If a user tries to access a route without the required authority, return a 403 Forbidden status.

## Frontend Functionalities to be Built
- Registration and Profile Management Interface: Intuitive forms and dashboards for user management.
- Equipment Management Dashboard: Interfaces for equipment tracking and requests.
- Maintenance Scheduling Interface: Tools for hospitals to schedule and technicians to view maintenance tasks.
- Order Management Interface: Interface for suppliers to manage orders and deliveries.
- Role-Specific UI Elements: Custom UI for different user roles.
- Session Management with JWT: Client-side JWT handling.

## Frontend Files to be Completed
- `./src/app/schedule-maintenance/schedule-maintenance.component.ts`
- `./src/app/schedule-maintenance/schedule-maintenance.component.html`
- `./src/app/requestequipment/requestequipment.component.ts`
- `./src/app/requestequipment/requestequipment.component.html`
- `./src/app/orders/orders.component.ts`
- `./src/app/orders/orders.component.html`
- `./src/app/maintenance/maintenance.component.ts`
- `./src/app/maintenance/maintenance.component.html`
- `./src/app/createhospital/createhospital.component.ts`
- `./src/app/createhospital/createhospital.component.html`
- `./src/app/login/login.component.ts`
- `./src/app/login/login.component.html`
- `./src/services/http.service.ts`
- `./src/services/auth.service.ts`
- `./src/app/registration/registration.component.ts`
- `./src/app/registration/registration.component.html`
