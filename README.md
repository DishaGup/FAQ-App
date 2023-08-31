

# FAQ App

This is an FAQ (Frequently Asked Questions) application that allows users to ask questions, receive answers, and interact with the community. The application includes both a frontend and a backend component.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Frontend](#frontend)
- [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)


## Features

- Users can ask questions and receive answers from the community.
- Users can upvote answers.
- Admins can approve, delete, questions/answers.
- Admins can ban users.

## Technologies Used

### Frontend

- React
- Redux for state management
- React Router for routing
- Styled Components for styling

### Backend

- Node.js with Express.js
- MongoDB for database
- Mongoose for ODM
- JWT for authentication

## Installation

1. Clone the repository:

```
git clone https://github.com/DishaGup/FAQ-App.git
cd FAQ-App
```

2. Install frontend dependencies:

```
cd client
npm install
```

3. Install backend dependencies:

```
cd server
npm install
```

## Usage

1. Start the backend server:

```
npm server
```

2. Start the frontend development server:

```
npm start
```

## Frontend

The frontend of the application is built using React and Redux for state management. It allows users to view and ask questions, as well as interact with answers and the community.

## Backend

The backend of the application is built using Node.js with Express.js. It provides API endpoints for user registration, login, asking questions, answering questions, and admin actions such as approving, deleting, and banning users.

## API Endpoints

- `POST /api/user/register`: Register a new user.
- `POST /api/user/login`: User login.
- `POST /api/faq/question/ask`: Ask a new question.
- `POST /api/faq/answer/answer/:questionId`: Answer a question.
- `PUT /api/faq/answer/:answerId/rate`: Rate an answer.
- `PUT /api/admin/approve/:questionId`: Approve a question.
- `DELETE /api/admin/delete/:questionId`: Delete a question.
- `PUT /api/admin/ban/:userId`: Ban a user.
- `GET /api/admin/pending-answers`: Get all pending answers.
- `PUT /api/admin/approve-answer/:answerId`: Approve an answer.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request.


## SnapShots

![Screenshot (317)](https://github.com/DishaGup/FAQ-App/assets/115460391/faa9d5d1-4d14-4f44-8f8e-14a4e7010a3f)


![Screenshot (318)](https://github.com/DishaGup/FAQ-App/assets/115460391/bee9001e-e1b7-4fd1-b10c-7bd8df45ace6)
