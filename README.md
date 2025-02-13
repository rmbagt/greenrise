# GreenRise 🌱

![GreenRise Logo](/public/assets/GreenRise.png)

GreenRise is a web application dedicated to facilitating donations for environmental causes. We connect users with impactful events and provide a secure platform for contributing to a greener future.

### Live Website

[GreenRise Live](https://greenrise.rey.mba/)

---

## Tech Stack

![Laravel](https://img.shields.io/badge/laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![Inertia JS](https://img.shields.io/badge/Inertia-black?style=for-the-badge&logo=inertiajs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Midtrans](https://img.shields.io/badge/Midtrans-0081C9?style=for-the-badge&logo=midtrans&logoColor=white)

1.  **Laravel** as the backend framework.
2.  **Inertia.js** for a seamless server-side rendered single-page application experience.
3.  **React** for building user interfaces.
4.  **Tailwind CSS** for styling.
5.  **MySQL** as the database.
6.  **Midtrans** for payment processing.

---

## Table of Contents

1.  [Installation](#installation)
2.  [Environment Setup](#environment-setup)
3.  [Usage](#usage)
4.  [Features](#features)
5.  [Contributors](#contributors)

---

## Installation

### Prerequisites

-   PHP and Composer installed on your machine.
-   Node.js and npm (or bun, yarn, pnpm, etc.) installed.

### Steps

1.  **Clone Repository:**

```bash
git clone https://github.com/rmbagt/greenrise.git
```

2.  **Install PHP Dependencies:**

```shellscript
composer install
```

3. **Install JavaScript Dependencies:**

```shellscript
npm install
```

4. **Setup Database:**

Create a MySQL database and configure the connection in your `.env` file. Then run migrations + seeder:

```shellscript
php artisan migrate --seed
```

5. **Generate Key:**

```shellscript
php artisan key:generate
```

6. **Link Storage:**

```shellscript
php artisan storage:link
```

7. **Start Development Server:**

Start both the Laravel and frontend development servers:

```shellscript
php artisan serve
npm run dev
```

8. **Access Application:**

Open [http://localhost:8000/](http://localhost:8000/) or your configured development URL in your browser. You can use the following default account or create your own account.

```
#Admin
Email: admin@example.com
Password: admin

#User
Email: user@example.com
Password: user
```

---

## Environment Setup

Ensure you have a valid `.env` file with the following variables (replace placeholders with your actual values):

```plaintext
APP_NAME=GreenRise
APP_ENV=local
APP_KEY=YOUR_APP_KEY
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

MIDTRANS_SERVER_KEY=YOUR_MIDTRANS_SERVER_KEY
MIDTRANS_CLIENT_KEY=YOUR_MIDTRANS_CLIENT_KEY
MIDTRANS_IS_PRODUCTION=false

MAIL_MAILER=smtp
MAIL_HOST=YOUR_MAIL_HOST
MAIL_PORT=YOUR_MAIL_PORT
MAIL_USERNAME=YOUR_MAIL_USERNAME
MAIL_PASSWORD=YOUR_MAIL_PASSWORD
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=YOUR_FROM_EMAIL
MAIL_FROM_NAME="${APP_NAME}"
```

---

## Usage

1. **Landing Page (/):** Browse featured and upcoming events.
2. **Login/Register:** Create an account or log in to donate.
3. **Events (/events):** View all events and filter by participation.
4. **Event Details (/events/id):** View event details and make a donation.
5. **Dashboard (/dashboard):** View donation history and statistics.
6. **Admin Dashboard (/admin):** _(For administrators)_ Manage events.

---

## Features

-   **Browse Events:** Discover various environmental initiatives.
-   **Secure Donations:** Make secure donations via Midtrans.
-   **Donation History:** Track your contributions.
-   **Event Management:** _(For administrators)_ Create, edit, and delete events.
-   **User Authentication:** Secure user accounts and login.

---

## Contributors

<a href="https://github.com/rmbagt/greenrise/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=rmbagt/greenrise"/>
</a>
