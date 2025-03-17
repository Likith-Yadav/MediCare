# Deployment Guide for MediCare

This guide will help you deploy the MediCare application to Cloudflare Pages and Workers.

## Prerequisites

1. A Cloudflare account
2. Node.js installed on your local machine
3. Wrangler CLI installed (`npm install -g wrangler`)

## Deploying the Frontend to Cloudflare Pages

1. **Login to Cloudflare using Wrangler**

   ```bash
   wrangler login
   ```

   This will open a browser window to authenticate with your Cloudflare account.

2. **Create a Cloudflare Pages project**

   ```bash
   cd client
   wrangler pages project create medicare-frontend
   ```

3. **Build and deploy the frontend**

   ```bash
   npm run deploy
   ```

   This will build the React application and deploy it to Cloudflare Pages.

## Deploying the Backend API to Cloudflare Workers

1. **Update the `wrangler.toml` file**

   Open the `wrangler.toml` file in the root directory and update the following fields:
   
   - `account_id`: Your Cloudflare account ID
   - `zone_id`: (Optional) Your Cloudflare zone ID if you're using a custom domain
   - `kv_namespaces.id`: Create a KV namespace in the Cloudflare dashboard and add the ID here

2. **Deploy the API**

   ```bash
   npm run deploy:api
   ```

   This will deploy the Worker script to Cloudflare Workers.

## Connecting the Frontend to the Backend

1. **Update the API URL in the frontend**

   Open `client/src/api/axios.js` and update the `CLOUDFLARE_API_URL` variable with your Worker URL:

   ```javascript
   const CLOUDFLARE_API_URL = 'https://medicare-api.yourusername.workers.dev';
   ```

2. **Redeploy the frontend**

   ```bash
   cd client
   npm run deploy
   ```

## Setting Up a Custom Domain (Optional)

1. **Add your domain to Cloudflare**

   Follow the Cloudflare documentation to add your domain to your Cloudflare account.

2. **Configure custom domains in Cloudflare Pages and Workers**

   - For Pages: Go to the Pages project settings and add your custom domain (e.g., `medicare.yourdomain.com`)
   - For Workers: Go to the Workers settings and add a route for your API (e.g., `api.medicare.yourdomain.com/*`)

## Environment Variables

For production deployments, you should set up environment variables in the Cloudflare dashboard:

1. **For the frontend (Pages)**:
   - Go to your Pages project settings
   - Navigate to the "Environment variables" tab
   - Add variables like `REACT_APP_API_URL`

2. **For the backend (Workers)**:
   - Go to your Worker settings
   - Navigate to the "Environment variables" tab
   - Add variables like `JWT_SECRET`, `MONGO_URL`, etc.

## Continuous Deployment

You can set up continuous deployment by connecting your GitHub repository to Cloudflare Pages and Workers:

1. **For Pages**:
   - Go to the Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure the build settings (Build command: `npm run build`, Build output directory: `build`)

2. **For Workers**:
   - Use GitHub Actions to deploy your Worker on push
   - Create a `.github/workflows/deploy.yml` file with the appropriate configuration

## Troubleshooting

- **CORS issues**: Make sure your Worker is configured to handle CORS properly
- **Build failures**: Check the build logs in the Cloudflare dashboard
- **API connection issues**: Verify that the API URL in the frontend is correct

For more help, refer to the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/) and [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/). 