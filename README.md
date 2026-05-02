# Child Immunization Tracking System (CITS)

A digital platform for tracking and managing child vaccination records, designed for healthcare providers, parents, and health administrators.

---

# 1. Project Overview

The **Child Immunization Tracking System (CITS)** helps healthcare institutions and parents monitor children's immunization schedules, maintain digital vaccination records, and receive automated reminders for upcoming vaccines.

The system aims to improve vaccination coverage, reduce missed immunizations, and support efficient healthcare management.

---

###  Objectives

- Digitize child immunization records
- Track vaccination schedules
- Send reminders for upcoming vaccines
- Improve healthcare reporting and monitoring
- Reduce missed or delayed vaccinations
- Provide centralized access to vaccination data

---

### Target Users

| User Role | Description |
|---|---|
| Admin | Manages the system and users |
| Healthcare Worker | Records vaccinations and manages child data |
| Parent/Guardian | Views child vaccination records and reminders |


---

# 2 Core Features

### 1. User Authentication & Authorization

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

---

### 2. Child Registration & Profile Management

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

---

### 3. Immunization Tracking System

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

---

### 4. Notifications & Reminder System

Sends reminders to parents about upcoming vaccines.

#### Features

- SMS notifications
- Email reminders
- Due date alerts
- Missed vaccine alerts

---

### 5. Reports & Analytics

Provides basic immunization reports for admins.

#### Features

- Vaccination reports
- Defaulter tracking
- Monthly summaries
- PDF/CSV export

---
# 3 Technology Stack

The Child Immunization Tracking System is built using modern web technologies to ensure scalability, security, performance, and ease of maintenance. The system follows a client-server architecture with separate frontend and backend services connected through RESTful APIs.

The selected technologies are lightweight, developer-friendly, and suitable for handling authentication, immunization records, notifications, and reporting functionalities efficiently.

---

## 1. Frontend Technologies

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

---

## 2. Backend Technologies

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

---

## 3. Database & Deployment Technologies

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

# 4 Immunization Schedule Tracking Logic

The system tracks immunization schedules using the child’s **Date of Birth (DOB)** and a predefined vaccination timetable.

Each vaccine in the database contains:

- Vaccine name
- Recommended age
- Dose number
- Schedule interval

When a child is registered, the system automatically calculates all vaccine due dates based on the child’s DOB.

---

## How the Tracking Works

### 1. Child Registration

When a child profile is created:

- The system saves the child’s DOB
- The system generates a vaccination schedule automatically

Example:

| Vaccine | Recommended Age | Due Date |
|---|---|---|
| BCG | At birth | DOB |
| OPV 1 | 6 weeks | DOB + 6 weeks |
| Pentavalent 1 | 6 weeks | DOB + 6 weeks |

---

### 2. Vaccine Status Monitoring

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

---

### 3. Recording Immunization

When a healthcare worker administers a vaccine:

- The vaccine is marked as **Completed**
- Date administered is stored
- Next vaccine schedule is updated automatically

---

### 4. Reminder System

The system sends reminders to parents:

- Before vaccine due date
- On due date
- After missed vaccination date

Notifications can be sent through:

- SMS
- Email

---

## Schedule Calculation Logic

The system uses age intervals such as:

- Birth
- 6 weeks
- 10 weeks
- 14 weeks
- 6 months
- 9 months

These intervals are added to the child’s DOB to determine vaccine due dates automatically.

---


#  System Architecture

## Frontend

- React.js / Next.js
- Bootstrap or Tailwind CSS

## Backend

- Node.js + Express.js
- RESTful APIs

## Database

- PostgreSQL (Recommended)
- MongoDB (Alternative)

## Deployment

- Docker
- GitHub Actions CI/CD
- AWS / Azure / Firebase

---

#  Database Schema

## Users Table

| Column | Type |
|---|---|
| id | UUID |
| name | VARCHAR |
| email | VARCHAR |
| password_hash | TEXT |
| role | VARCHAR |
| created_at | TIMESTAMP |

---

## Children Table

| Column | Type |
|---|---|
| id | UUID |
| full_name | VARCHAR |
| date_of_birth | DATE |
| gender | VARCHAR |
| parent_id | UUID |

---

## Vaccines Table

| Column | Type |
|---|---|
| id | UUID |
| vaccine_name | VARCHAR |
| description | TEXT |
| recommended_age | VARCHAR |

---

## Immunization Records Table

| Column | Type |
|---|---|
| id | UUID |
| child_id | UUID |
| vaccine_id | UUID |
| date_administered | DATE |
| status | VARCHAR |

---

## Health Facilities Table

| Column | Type |
|---|---|
| id | UUID |
| facility_name | VARCHAR |
| location | TEXT |
| contact_info | TEXT |

---

#  Security Features

- Password hashing with bcrypt
- JWT authentication
- HTTPS encryption
- Role-based authorization
- Secure API access

---

#  API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Child Management

### Get All Children

```http
GET /api/children
```

### Register Child

```http
POST /api/children
```

### Get Child by ID

```http
GET /api/children/:id
```

---

## Immunization

### Get Vaccines

```http
GET /api/vaccines
```

### Add Immunization Record

```http
POST /api/immunizations
```

### Get Child Immunization Records

```http
GET /api/immunizations/:child_id
```

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



