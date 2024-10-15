# Next.js Authentication Project

This project is a Next.js application that implements user authentication features, including user registration, email verification, password reset, and middleware for protected routes. It utilizes MongoDB for data storage and Nodemailer for sending emails.

---

## Table of Contents

- [Project Details](#project-details)
- [Prerequisites](#prerequisites)
- [Tools Used](#tools-used)
- [Installation](#installation)
- [Usage](#usage)
- [Clone Repository](#clone-repository)
- [Courtesy](#courtesy)
- [Acknowledgments](#acknowledgments)
- [Documentation](#documentation)
- [License](#license)

---

## Project Details

The application consists of the following features:

- **User Registration**: Users can create an account with their email, username, and password.
- **Email Verification**: After registration, users receive an email to verify their account.
- **Password Reset**: Users can request a password reset email if they forget their password.
- **Protected Routes**: Middleware is used to restrict access to certain pages based on user authentication.
- **User Profile**: Authenticated users can access their profile.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (Node package manager)
- **MongoDB** (a MongoDB account or local installation)
- **A valid email service provider** (for sending emails)

---

## Tools Used

- **Next.js**: React framework for server-rendered applications.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **Nodemailer**: Module for sending emails from Node.js applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **bcrypt**: Library for hashing passwords.
- **JSON Web Tokens (JWT)**: For secure user authentication.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BhautikVekariya21/nextjs.git
   cd nextjs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   DATABASE_URI=<your_mongodb_uri>
   EMAIL_HOST=<your_email_host>
   EMAIL_PORT=<your_email_port>
   EMAIL_USER=<your_email_user>
   EMAIL_PASS=<your_email_password>
   DOMAIN=<your_application_domain>
   ```

4. Run the application in development mode:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

- Visit the `/signup` page to create a new account.
- After signing up, check your email for a verification link.
- Once verified, you can log in at the `/login` page.
- You can access your profile at `/profile`.

---

## Clone Repository

To clone this repository, use the following command:

```bash
git clone https://github.com/BhautikVekariya21/nextjs.git
```

Then, navigate into the project directory:

```bash
cd nextjs
```

---

## Courtesy

Special thanks to [Hitesh CodeLab](https://www.youtube.com/@HiteshCodeLab) for the insightful tutorials and guidance that inspired the development of this project.

---

## Acknowledgments

This project also draws from various online resources and communities. Thank you to everyone who contributed knowledge and support.

---

## Documentation

For more information on Next.js, visit the official documentation:

- [Next.js Documentation](https://nextjs.org/docs/getting-started)

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---
