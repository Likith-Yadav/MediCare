# MediCare - Doctor Appointment System

A MERN stack application for booking doctor appointments, deployed on Cloudflare.

## Deployed Application

- **Frontend**: [https://medicare-frontend.pages.dev](https://medicare-frontend.pages.dev)
- **Backend API**: [https://medicare-api.likithmvjce.workers.dev](https://medicare-api.likithmvjce.workers.dev)

## Demo Credentials

You can use the following credentials to test the application:

### Doctor Account
- **Email**: doctor@example.com
- **Password**: password123
- **User Type**: Doctor

### Patient Account
- **Email**: patient@example.com
- **Password**: password123
- **User Type**: Patient

## Features

- User authentication (Patient and Doctor)
- Doctor listing and filtering
- Appointment booking and management
- User profiles and dashboards
- Responsive design for all devices

## Technology Stack

- **Frontend**: React.js, Ant Design
- **Backend**: Node.js, Express.js
- **Database**: Cloudflare KV (for production), MongoDB (for development)
- **Deployment**: Cloudflare Pages (Frontend), Cloudflare Workers (Backend)

## Cloudflare Workers and MongoDB

Due to Cloudflare Workers' security restrictions, direct connections to MongoDB Atlas are not supported in the production environment. This is because:

1. Cloudflare Workers run in a V8 isolate environment with limited networking capabilities
2. MongoDB Atlas requires specific IP allowlisting or VPC peering
3. Workers cannot establish the necessary TCP connections to MongoDB Atlas

For the production deployment, we use Cloudflare KV storage as our database solution. KV storage provides:
- Key-value data storage that's globally distributed
- Low-latency access from Cloudflare's edge network
- Seamless integration with Workers

For local development, you can still use MongoDB as described in the setup instructions below.

## Troubleshooting

### Login Issues
If you encounter a 401 Unauthorized error when trying to log in, make sure:
1. You're using the correct credentials (email, password, and user type)
2. The API endpoint is correctly configured in the frontend
3. The backend worker is properly deployed with the latest changes

The application uses a special bypass for the demo accounts to ensure they always work, even if there are bcrypt comparison issues in the Cloudflare Worker environment.

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for local development)

### Setup

1. Clone the repository
```
git clone https://github.com/yourusername/medicare.git
cd medicare
```

2. Install dependencies
```
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_MODE=development
```

4. Run the application
```
# Run backend (from root directory)
npm run server

# Run frontend (from client directory)
cd client
npm start
```

5. Access the application
Open your browser and navigate to `http://localhost:3000`

## Deployment

The application is deployed using Cloudflare Pages for the frontend and Cloudflare Workers for the backend API.

### Frontend Deployment
```
cd client
npm run build
wrangler pages deploy build
```

### Backend Deployment
```
wrangler deploy worker.js
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to info@medicare.com
