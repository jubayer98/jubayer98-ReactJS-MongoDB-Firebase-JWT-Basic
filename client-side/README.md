# Library Management System

Welcome to the B10A11 Library Management System! This project comprises both client and server sides designed to facilitate the management of library operations, including book categorization, borrowing, and return tracking. Built using modern web technologies like React.js and MongoDB, this system ensures a user-friendly experience and efficient library management.

## Live Demo

Check out the live application here: [Library Management System](https://b10a11-b0162.web.app/)

## Features

- **User Authentication**: Secure login and registration system with JWT for session management.
- **Book Management**: Add, update, and categorize books within the library.
- **Borrowing System**: Track borrowed books and manage returns efficiently.
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop devices.
- **Security**: Firebase and MongoDB credentials secured using environment variables.

## Technologies Used

- **Frontend**: React.js, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT
- **Styling**: TailwindCSS with DaisyUI components
- **Environment Variables**: Dotenv for managing environment secrets

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- npm

### Installation

1. Clone the repo
2. Install NPM packages
3. Enter your environment variables in `.env`
4. Repeat steps for server-side setup from the server repository:

## Usage

For development, run the following command in both client and server directories:
```sh
npm run dev
```
This will start the local server for development and the React application in development mode.

## Roadmap

- [x] Implement JWT authentication
- [x] Responsive design
- [ ] Add book review and rating system
- [ ] Improve the borrowing mechanism to prevent multiple borrowing of the same book

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
