
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "EventGo API Documentation",
    version: "1.0.0",
    description: "This is the API documentation for the EventGo",
  },
  components: {
    schemas: {
      Event: {
        type: "object",
        required: [
          "name", "location", "latitude", "longitude", "description",
          "link", "userImage", "userName", "eventDate", "category", "userId"
        ],
        properties: {
          id: { type: "string", format: "uuid" },
          name: { type: "string" },
          location: { type: "string" },
          latitude: { type: "number", format: "float" },
          longitude: { type: "number", format: "float" },
          description: { type: "string" },
          link: { type: "string" },
          userImage: { type: "string" },
          userName: { type: "string" },
          eventDate: { type: "string", format: "date-time" },
          category: { $ref: "#/components/schemas/EventCategory" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          userId: { type: "string", format: "uuid" },
          user: { $ref: "#/components/schemas/User" },
        },
      },
      User: {
        type: "object",
        required: ["email", "password", "username"],
        properties: {
          id: { type: "string", format: "uuid" },
          email: { type: "string" },
          photoURL: { type: "string", nullable: true },
          following: {
            type: "array",
            items: { type: "string" },
            default: [],
          },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          password: { type: "string" },
          username: { type: "string" },
          role: { type: "string", default: "user" },
          events: {
            type: "array",
            items: { $ref: "#/components/schemas/Event" },
          },
        },
      },
      EventCategory: {
        type: "string",
        enum: ["Music", "Sports", "Tech", "Art", "Education", "Health", "Business"],
      },
    },
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwaggerDocs = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger docs available at http://localhost:3000/api-docs`);
};