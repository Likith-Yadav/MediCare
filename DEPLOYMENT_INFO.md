# MediCare Application Deployment Information

## Deployed URLs

### Frontend
- Production URL: https://medicare-frontend.pages.dev/
- Latest deployment: https://c64609e7.medicare-frontend.pages.dev

### Backend API
- API URL: https://medicare-api.likithmvjce.workers.dev
- Version ID: 15f9dae4-fc43-431e-9527-00e8028676db

## API Endpoints

The backend API is currently configured with mock data for demonstration purposes. The following endpoints are available:

### User Routes
- `GET /api/v1/user/doctors` - Returns a list of mock doctors

### Appointment Routes
- `GET /api/v1/appointment/get-appointments` - Returns a list of mock appointments

## Deployment Details

### Frontend (Cloudflare Pages)
The frontend application has been successfully deployed to Cloudflare Pages. The application is built using React and is configured to communicate with the backend API deployed on Cloudflare Workers.

### Backend (Cloudflare Workers)
The backend API has been deployed to Cloudflare Workers. It uses a KV namespace (MEDICARE_KV) for data storage. Currently, the API is using mock data for demonstration purposes.

## Environment Variables Configuration

### Setting Up MongoDB Connection

To connect the application to a MongoDB database:

1. Create a MongoDB Atlas account and set up a cluster
2. Obtain your MongoDB connection string
3. Update the `MONGO_URL` variable in the `wrangler.toml` file:
   ```
   [vars]
   MONGO_URL = "mongodb+srv://username:password@cluster.mongodb.net/medicare?retryWrites=true&w=majority"
   JWT_SECRET = "your_jwt_secret_key"
   NODE_MODE = "production"
   ```

4. Redeploy the Worker with the updated configuration:
   ```
   wrangler deploy worker.js
   ```

### Securing Your Application

For security, set a strong JWT secret key:
```
JWT_SECRET = "a_strong_random_string_for_jwt_token_generation"
```

### Environment-Specific Variables

Different environments can have different configurations:
```
[env.production]
name = "medicare-api-production"
vars = { NODE_MODE = "production" }

[env.staging]
name = "medicare-api-staging"
vars = { NODE_MODE = "staging" }
```

## Accessing the Application

1. Open the frontend URL in your browser: https://medicare-frontend.pages.dev/
2. You can register as either a patient or a doctor
3. After registration, you can log in and access the dashboard

## Managing Deployments

### Frontend Deployments
To view or manage frontend deployments:
```
wrangler pages deployment list --project-name medicare-frontend
```

### Backend Deployments
To view or manage backend deployments:
```
wrangler deployments list
```

## Redeploying

### Frontend
To redeploy the frontend after making changes:
```
cd client
npm run build
wrangler pages deploy build
```

### Backend
To redeploy the backend after making changes:
```
wrangler deploy worker.js
```

## Environment Configuration
The application is configured to use the production API URL when deployed. This is set in the `client/src/api/axios.js` file.

## Next Steps for Production

To make this application fully functional in production, consider the following steps:

1. Replace mock data with actual database connections
2. Implement proper authentication and authorization
3. Set up a MongoDB database or use Cloudflare D1 for data storage
4. Configure proper error handling and logging

## Troubleshooting
If you encounter any issues with the deployment:

1. Check that the API URL is correctly set in the frontend code
2. Verify that the backend API is running by visiting the API URL directly
3. Check the Cloudflare dashboard for any errors or issues with the deployments
4. Review the logs for both the frontend and backend deployments 