# Event Go

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)



Event Go is a web application that helps users discover and explore events happening around them. Users can filter events by different criteria, including location, date and more.

## Live Demo

Check out the live version of the app [here](https://event-go-frontend.onrender.com).

## Swagger docs

Check out api docs [here](https://event-go-backend.onrender.com/api-docs/).

## Technologies Used

- **React**: A JavaScript library for building user interfaces. [Link](https://reactjs.org)
- **Styled-components**: A library for writing CSS in JavaScript. [Link](https://styled-components.com)
- **React Router**: For routing and navigation. [Link](https://reactrouter.com)
- **React Hot Toast**: For displaying toast notifications. [Link](https://react-hot-toast.com)
- **Lodash**: A utility library for JavaScript. [Link](https://lodash.com)
- **Vite**: A next-generation, fast build tool for modern web development. [Link](https://vitejs.dev)
- **Node.js**: A JavaScript runtime environment for building server-side applications.[Link](https://nodejs.org/en)
- **Express**: A popular Node.js web framework for building RESTful APIs.[Link](https://expressjs.com/)
- **TypeScript**: A statically typed superset of JavaScript.[Link](https://www.typescriptlang.org)
- **PostgreSQL**: A powerful, open-source relational database.[Link](https://www.postgresql.org/)
- **Prisma**: A modern ORM for Node.js and TypeScript.[Link](https://www.prisma.io/)
- **Render**: A cloud platform for building and deploying modern web applications.[Link](https://render.com/)

## Features

- **Event Discovery**: Users can explore a variety of events near them based on different filters.
- **Filters**: Filter events by criteria such as locationand date.
- **Loading Skeleton**: A loading skeleton is displayed while events are being fetched.
- **Responsive Design**: The application is responsive, optimized for both mobile and desktop devices.
- **Event Cards**: Events are displayed as cards with essential details such as title, description, location, and more.
- **Dynamic Content**: The event list is dynamically updated based on filter selection.

### Folder Structure

The project is organized into two main directories:

client: Contains the React frontend application.
server: Contains the Node.js and Express backend application.


### Manual Development

You can run the application locally using the following steps:

1. Clone the repository and install dependencies:
```bash
   git clone https://github.com/davide-lombardo/event-go.git
   cd event-go/client
   npm install
   cd event-go/server
   npm install
```

2. Run the application:
- In one terminal, start the frontend:
```bash
   cd client
   npm run dev
```
The frontend will be available at http://localhost:5173/

   - In another terminal, start the backend:
```bash
   cd server
   npm run dev
```
The backend will be available at http://localhost:4000/

3. To build for production:
```bash
   # In /client
   npm run build
   # In /server
   npm run build
```

### Run with Docker

If you prefer using Docker for local development, follow the steps below. This allows you to run the entire application in containers, ensuring consistency across environments.

#### Prerequisites
1. Install [Docker](https://docs.docker.com/get-started/get-docker/) on your machine.  
   - Follow the instructions on the Docker website to download and install Docker for your operating system.

#### Run Docker Compose
2. Start both the frontend and backend containers with:

```bash
docker-compose up --build
```

- The frontend will be accessible at http://localhost:5173/.
- The backend will be accessible at http://localhost:4000/.

3. Stopping the Docker Containers:

To stop the containers, use:

```bash
docker-compose down
```

## Testing

To run the tests use your preferred testing library (e.g., Jest, React Testing Library). Ensure that the tests are set up and configured properly to run them. No specific tests are included in this project yet, but consider adding them to improve quality and coverage.

## Contributing

Feel free to fork this project, submit issues, or create pull requests for any improvements or bug fixes. Contributions are always welcome!

## Acknowledgments

- **React Community**: For the amazing ecosystem and resources.
- **Firebase**: For providing an easy-to-use backend solution.
- **Styled Components**: For making styling in React components a breeze.
- **Vite**: For its fast development server and build tool.
- **Open Source Contributors**: Special thanks to all the open-source libraries and contributors used in this project.

---

Enjoy using **Event Go** and discover events near you! 🚀
