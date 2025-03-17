# MediCare - Healthcare Appointment System

MediCare is a comprehensive healthcare appointment booking system built with the MERN stack (MongoDB, Express, React, Node.js). The platform connects patients with healthcare professionals, making it easy to find doctors, book appointments, and manage healthcare needs.

## Features

- **User Authentication**: Separate login and registration for patients and doctors
- **Doctor Listings**: Browse and search for doctors by specialty
- **Appointment Booking**: Schedule appointments with preferred doctors
- **Doctor Dashboard**: Doctors can manage appointments and patient information
- **Patient Dashboard**: Patients can view their appointments and medical history
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- **Frontend**: React, Ant Design, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Cloudflare Pages and Workers

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Steps to Run Locally

1. Clone the repository
   ```
   git clone https://github.com/yourusername/medicare.git
   cd medicare
   ```

2. Install server dependencies
   ```
   npm install
   ```

3. Install client dependencies
   ```
   cd client
   npm install
   cd ..
   ```

4. Create a .env file in the root directory with the following variables
   ```
   PORT=8080
   NODE_MODE=development
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Run the application (development mode)
   ```
   npm run dev
   ```

## Deployment

This project is configured for deployment to Cloudflare Pages and Workers. For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

### Quick Deployment Steps

1. Install Wrangler CLI
   ```
   npm install -g wrangler
   ```

2. Login to Cloudflare
   ```
   wrangler login
   ```

3. Deploy the frontend
   ```
   cd client
   npm run deploy
   ```

4. Deploy the backend
   ```
   cd ..
   npm run deploy:api
   ```

## Project Structure

- `/client` - React frontend
- `/controllers` - Express route controllers
- `/models` - MongoDB models
- `/routes` - Express routes
- `/middlewares` - Custom middleware functions
- `/.github/workflows` - GitHub Actions for CI/CD

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries, please reach out to info@medicare.com
