# Event Go

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)



Event Go is a web application that helps users discover and explore events happening around them. Users can filter events by different criteria, including location, date and more.

## Live Demo

Check out the live version of the app [here](https://event-go-frontend.onrender.com).

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


### Run with Docker

You can run **Event Go** locally using Docker. Follow the steps below:

#### Prerequisites
1. Install [Docker](https://docs.docker.com/get-started/get-docker/) on your machine.  
   - Follow the instructions on the Docker website to download and install Docker for your operating system.

#### Pull the Docker Image
Download the Docker image from Docker Hub by running the following command:

```bash
docker pull davelombdev/event-go:latest
```

#### Run the Application
Run the application using the following command:

```bash
docker run -p 5000:5000 davelombdev/event-go:latest
```

This will start the application, making it accessible at `http://localhost:5000` in your browser.

## Setup and Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/davide-lombardo/event-go.git
cd event-go/client
npm install
cd event-go/server
npm install
```

### Running the Application

Once the dependencies are installed, you can start the development server using the following command:

```bash
npm run dev
```

This will start the application in development mode and you can access it by navigating to `http://localhost:3000/` in your browser.

### Building the Application

To build the application for production, use the following command:

```bash
npm run build
```

This will compile and bundle your application into optimized static files in the `dist/` directory.

### Preview the Build

To preview the production build locally, use the following command:


```bash
npm run preview
```

This will run a preview server, which you can access in your browser to test the production version of the app.

### Linting

To run the ESLint linter and check for issues in the code, use the following command:

```bash
npm run lint
```

If there are any linting issues, you can fix them automatically using:

```bash
npm run lint:fix
```

This will fix any auto-fixable linting problems in the codebase.

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