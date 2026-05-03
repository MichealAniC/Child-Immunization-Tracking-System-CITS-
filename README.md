# Child Immunization Tracking System (CITS)

A digital platform for tracking and managing child vaccination records, designed for healthcare providers, parents, and health administrators.

---

# 1. Project Overview

The **Child Immunization Tracking System (CITS)** helps healthcare institutions and parents monitor children's immunization schedules, maintain digital vaccination records, and receive automated reminders for upcoming vaccines.

The system aims to improve vaccination coverage, reduce missed immunizations, and support efficient healthcare management.

###  Objectives

- Digitize child immunization records
- Track vaccination schedules
- Send reminders for upcoming vaccines
- Improve healthcare reporting and monitoring
- Reduce missed or delayed vaccinations
- Provide centralized access to vaccination data

### Target Users

| User Role | Description |
|---|---|
| Admin | Manages the system and users |
| Healthcare Worker | Records vaccinations and manages child data |
| Parent/Guardian | Views child vaccination records and reminders |

---

# 2. Core Features

### User Authentication & Authorization
Supports secure login and access control for:
- Admin (Doctors/Healthcare Workers)
- Parents/Guardians

#### Features
- User registration and login
- JWT authentication
- Password encryption
- Role-based access control

#### Admin Functions
- Manage child records
- Update vaccination records
- View reports

#### Parent Functions
- Register children
- View vaccination history
- Receive reminders

### Child Registration & Profile Management
Allows creation and management of child profiles.

#### Features
- Add and edit child profiles
- Generate unique child ID
- Store parent information

#### Child Information
- Full Name
- Date of Birth
- Gender
- Parent/Guardian Details
- Contact Information

### Immunization Tracking System
Tracks vaccination schedules and immunization history.

#### Features
- Record administered vaccines
- Track pending and completed vaccines
- Monitor missed vaccines
- Automatic schedule calculation

#### Vaccine Status
- Pending
- Completed
- Missed
- Upcoming

### Notifications & Reminder System
Sends reminders to parents about upcoming vaccines.

#### Features
- SMS notifications
- Email reminders
- Due date alerts
- Missed vaccine alerts

### Reports & Analytics
Provides basic immunization reports for admins.

#### Features
- Vaccination reports
- Defaulter tracking
- Monthly summaries
- PDF/CSV export

---

# 3. Technology Stack
The Child Immunization Tracking System is built using modern web technologies to ensure scalability, security, performance, and ease of maintenance. The system follows a client-server architecture with separate frontend and backend services connected through RESTful APIs.

The selected technologies are lightweight, developer-friendly, and suitable for handling authentication, immunization records, notifications, and reporting functionalities efficiently.

## Frontend Technologies
The frontend provides the user interface for parents and healthcare workers.

### Technologies
- React.js
- Tailwind CSS
- Axios
- React Router

### Purpose
- Build responsive user interfaces
- Manage application routing
- Connect frontend to backend APIs
- Improve user experience across devices

## Backend Technologies
The backend handles business logic, authentication, APIs, and data processing.

### Technologies
- Node.js
- Express.js
- JSON Web Token (JWT)
- bcrypt

### Purpose
- Build RESTful APIs
- Handle authentication and authorization
- Manage server-side operations
- Secure user data

## Database & Deployment Technologies
These technologies manage data storage, hosting, and deployment.

### Technologies
- PostgreSQL
- Docker
- GitHub Actions
- Render / Railway

### Purpose
- Store application data securely
- Support database management
- Enable containerization
- Automate deployment workflows

---

# 4. Immunization Schedule Tracking Logic
The system tracks immunization schedules using the child’s **Date of Birth (DOB)** and a predefined vaccination timetable.
Each vaccine in the database contains:
- Vaccine name
- Recommended age
- Dose number
- Schedule interval

When a child is registered, the system automatically calculates all vaccine due dates based on the child’s DOB.

## How the Tracking Works

### Child Registration
When a child profile is created:
- The system saves the child’s DOB
- The system generates a vaccination schedule automatically

Example:
| Vaccine | Recommended Age | Due Date |
|---|---|---|
| BCG | At birth | DOB |
| OPV 1 | 6 weeks | DOB + 6 weeks |
| Pentavalent 1 | 6 weeks | DOB + 6 weeks |

### Vaccine Status Monitoring
The system compares:
- Current date
- Vaccine due date
- Vaccination completion status

Based on this comparison, the vaccine status becomes:
| Status | Condition |
|---|---|
| Upcoming | Due date is approaching |
| Pending | Due date reached but not taken |
| Completed | Vaccine has been administered |
| Missed | Due date passed without vaccination |

### Recording Immunization
When a healthcare worker administers a vaccine:
- The vaccine is marked as **Completed**
- Date administered is stored
- Next vaccine schedule is updated automatically

### Reminder System
The system sends reminders to parents:
- Before vaccine due date
- On due date
- After missed vaccination date

Notifications can be sent through:
- SMS
- Email

### Schedule Calculation Logic
The system uses age intervals such as:
- Birth
- 6 weeks
- 10 weeks
- 14 weeks
- 6 months
- 9 months
These intervals are added to the child’s DOB to determine vaccine due dates automatically.

---

# 5. System Architecture Overview
The Child Immunization Tracking System follows a three-tier architecture consisting of the Client Layer, Application Layer, and Data Layer. These components work together to manage child immunization records, vaccination schedules, and notifications efficiently.

### **Client Layer (Frontend)**
The client layer is the part of the system used by parents and healthcare workers through a web browser or mobile device.

It allows users to register, log in, register children, view immunization records, and receive vaccination reminders. The frontend communicates with the backend through RESTful APIs.

The frontend is developed using React.js and Tailwind CSS.

### **Application Layer (Backend)**
The application layer handles the core business logic of the system. It processes requests from the frontend, validates data, manages authentication, and communicates with the database.

The backend is also responsible for generating vaccine schedules based on a child’s date of birth, tracking vaccine status, and sending reminders for upcoming or missed vaccinations.

The backend is built using Node.js and Express.js.

### **Data Layer (Database)**
The data layer stores all system information, including user accounts, child profiles, vaccine schedules, immunization records, and notifications.

PostgreSQL is used as the database management system because it provides reliable and secure storage for structured data.

### **System Data Flow**
When a user performs an action on the frontend, such as registering a child, the request is sent to the backend. The backend processes the request and stores or retrieves data from the database.

After a child is registered, the system automatically generates vaccine schedules using the child’s date of birth. The system continuously checks vaccine due dates and updates vaccine statuses as completed, pending, upcoming, or missed.

The notification service sends reminders to parents when vaccines are due or missed.

### **Security**
The system secures user data using password hashing, JWT authentication, and role-based access control.

Parents can only access their own child’s records, while healthcare workers have permission to manage immunization data.

All communication between the frontend and backend is secured using HTTPS.

---



---

#  Project Structure

```bash
child-immunization-system/
│
├── client/                 # Frontend application
├── server/                 # Backend API
├── database/               # Database schema and migrations
├── docs/                   # Documentation
├── tests/                  # Test files
├── .env                    # Environment variables
├── package.json
└── README.md
```

---

#  Installation Guide

## Clone Repository

```bash
git clone https://github.com/your-username/child-immunization-system.git
```

## Navigate into Project Folder

```bash
cd child-immunization-system
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

## Run Database Migrations

```bash
npm run migrate
```

## Start Development Server

```bash
npm run dev
```

---

#  Testing

## Run Unit Tests

```bash
npm test
```

## API Testing Tools

- Postman
- Insomnia

---

#  Deployment

## Recommended Platforms

- AWS
- Render
- Railway
- Heroku
- Firebase

## CI/CD

GitHub Actions can be used for:

- Automated testing
- Deployment pipelines
- Code quality checks

---

#  Future Enhancements

- Mobile application support
- Offline synchronization
- AI-powered vaccine predictions
- Integration with national health databases
- Multi-language support

---

#  Contribution Guidelines

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Open a Pull Request

---



