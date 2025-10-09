import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SafePathAI API',
      version: '1.0.0',
      description:
        'API documentation for the SafePathAI backend, providing services for user authentication, location services, and AI-powered safety assistance.',
      contact: {
        name: 'Project Repository',
        url: 'https://github.com/SrinjoyeeDey/SafePathAI-AI-Powered-Safety-Assistance-App',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token in the format: Bearer {token}',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'A message describing the error.',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJsdoc(options);