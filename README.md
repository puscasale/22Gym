# 🏋️ 22Gym – Modern Fitness Class & Membership Management Platform

**22Gym** is a full-stack, role-based web application designed to streamline the management of fitness classes and gym memberships. It provides a modern and intuitive interface for both **members** and **trainers**, with real-time updates, email reminders, and seamless user experiences.

Built using **Spring Boot**, **React**, **PostgreSQL**, and **WebSockets**, the platform enables scalable class management, live seat availability, and instant communication between the server and users — all while ensuring code modularity, data integrity, and responsiveness.

---

## 📌 Overview

Whether you’re a **gym trainer** scheduling and managing classes, or a **member** looking to book a spot in your next favorite workout, **22Gym** makes the process easy and engaging. It includes powerful features like:

- Class creation and booking
- Membership plan activation and cancellation
- Secure authentication for different user roles
- Instant updates through WebSocket-based communication
- **Email reminders** 
- Responsive design tailored to enhance user experience

---

## ✨ Key Features

### 🔐 Authentication & Roles
- Member and Trainer registration and login
- Role-based interface and functionality
- Form validation, password confirmation, and agreement checkbox on signup

### 🧾 Membership System
- Members can view active memberships and cancel anytime
- Each member has custom membership validity (`startDate` / `endDate`)

### 🏋️ Class Management
- **Trainers** can:
  - Add new classes (title, time, max participants, etc.)
  - Edit or delete their existing classes
  - View participants for upcoming classes
  - Mark participants as attended or unattended for each class
- **Members** can:
  - View available classes
  - Book a spot if seats are available
  - View history of bookings
  - View upcoming bookings
  - Cancel a booking

### 📬 Email Reminder (via Mail Service)
- Members receive an **automated email reminder** when they have an upcoming class
- The email includes the **class title**, **scheduled date and time**, and a friendly message to help them prepare
- This helps reduce no-shows and keeps users engaged with their fitness goals


### 🔄 Real-Time WebSocket Updates
- Built using **native WebSockets + STOMP**
- Classes and bookings are updated live on all connected clients
- Members instantly see when a new class is added
- Trainers instantly see when member cancels a booking 
- WebSocket broker and endpoint fully configured in Spring Boot (`/ws`, `/topic/classes`)

---

## 🧰 Tech Stack

| Layer        | Technologies Used                             |
|--------------|-----------------------------------------------|
| Frontend     | React, Vite, TypeScript, CSS Modules          |
| Backend      | Java 17, Spring Boot 3.4.x, Spring WebSocket  |
| Realtime     | WebSocket + STOMP (no SockJS)                 |
| Database     | PostgreSQL                                    |
| Email        | Spring Mail (JavaMailSender)                  |
| Dev Tools    | Gradle, Postman, IntelliJ                     |

---

## 🖼️ Screenshots 

<img width="1708" alt="Screenshot 2025-05-31 at 19 22 25" src="https://github.com/user-attachments/assets/b27126a5-364f-49de-b5cb-d6d97bc8981d" />

<img width="1710" alt="Screenshot 2025-05-31 at 19 22 45" src="https://github.com/user-attachments/assets/aba3c8cb-1bde-4fac-ab7e-13d1cf540a2e" />

<img width="1710" alt="Screenshot 2025-05-31 at 19 23 23" src="https://github.com/user-attachments/assets/57c5c448-91ec-4bf5-aecb-0d6af64a4ff8" />

<img width="1710" alt="Screenshot 2025-05-31 at 19 23 47" src="https://github.com/user-attachments/assets/21e3b5f3-5bd6-4b69-b60d-363fcfcc073c" />


