# Deployment Guide for MediCare

This guide provides detailed instructions for deploying the MediCare application to Cloudflare.

## Prerequisites

- Cloudflare account
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

## Frontend Deployment (Cloudflare Pages)

1. **Build the React application**

```bash
cd client
npm run build
```

2. **Create a Cloudflare Pages project**

```bash
wrangler pages project create medicare-frontend
```

3. **Deploy the build folder to Cloudflare Pages**

```bash
wrangler pages deploy build
```

4. **Configure environment variables (if needed)**

You can set environment variables in the Cloudflare Pages dashboard:
- Go to your Pages project
- Navigate to Settings > Environment variables
- Add variables like `REACT_APP_API_URL` if needed

## Backend Deployment (Cloudflare Workers)

1. **Create a KV namespace for data storage**

```bash
wrangler kv namespace create "MEDICARE_KV"
```

2. **Update wrangler.toml with your account ID and KV namespace**

```toml
name = "medicare-api"
account_id = "your_account_id"

kv_namespaces = [
  { binding = "MEDICARE_KV", id = "your_kv_namespace_id" }
]

[vars]
NODE_MODE = "production"
JWT_SECRET = "your_jwt_secret"
```

3. **Deploy the Worker**

```bash
wrangler deploy worker.js
```

## Troubleshooting

### Common Issues

1. **CORS errors**
   - Ensure the CORS headers are properly set in the worker.js file
   - Check that the frontend is using the correct API URL

2. **Authentication issues**
   - Verify that the JWT_SECRET is correctly set in the worker environment
   - Check that the token is being properly sent from the frontend

3. **Database connection issues**
   - If using MongoDB, ensure the connection string is correct
   - For KV storage, verify the namespace binding is correct

### Logs and Debugging

To view logs from your Worker:

```bash
wrangler tail
```

## Updating the Deployment

### Frontend Updates

1. Make changes to the frontend code
2. Rebuild the application: `npm run build`
3. Redeploy: `wrangler pages deploy build`

### Backend Updates

1. Make changes to the worker.js file
2. Redeploy: `wrangler deploy worker.js`

## Custom Domains

To set up a custom domain for your application:

1. **For Pages (Frontend)**
   - Go to your Pages project in the Cloudflare dashboard
   - Navigate to Custom domains
   - Add your domain and follow the verification steps

2. **For Workers (Backend)**
   - Go to your Workers project in the Cloudflare dashboard
   - Navigate to Triggers > Custom Domains
   - Add your domain and configure the DNS settings

## Monitoring and Analytics

Cloudflare provides built-in analytics for both Pages and Workers:

- **Pages Analytics**: View in the Pages project dashboard
- **Workers Analytics**: View in the Workers project dashboard

These analytics include metrics like requests, bandwidth usage, and error rates. 