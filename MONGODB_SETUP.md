# MongoDB Atlas Setup for Cloudflare Workers

## Problem

Cloudflare Workers cannot connect to MongoDB Atlas by default because:

1. Cloudflare Workers run on Cloudflare's edge network, which means they can connect from any of Cloudflare's global IP addresses.
2. MongoDB Atlas has IP whitelisting enabled by default, which blocks connections from unknown IP addresses.

## Solution

To allow your Cloudflare Worker to connect to MongoDB Atlas, you need to update your MongoDB Atlas IP Access List to allow connections from anywhere (or at least from Cloudflare's IP ranges).

## Steps to Configure MongoDB Atlas

1. Log in to your MongoDB Atlas account at [https://cloud.mongodb.com/](https://cloud.mongodb.com/)

2. Select your project that contains the cluster you want to connect to.

3. In the left sidebar, click on "Network Access" under the Security section.

4. Click the "+ ADD IP ADDRESS" button.

5. To allow connections from anywhere (including Cloudflare Workers):
   - Enter `0.0.0.0/0` in the "IP Address" field
   - Add a comment like "Allow Cloudflare Workers" in the "Comment" field
   - Click "Confirm"

   > **Note**: While allowing access from `0.0.0.0/0` (all IP addresses) is the simplest solution, it's less secure. For production environments, consider using a more secure approach like MongoDB Atlas Private Endpoint or Network Peering.

6. Wait for the changes to be applied (this may take a few minutes).

## Verify Your Connection String

Make sure your MongoDB connection string in the `wrangler.toml` file is correct:

```toml
[vars]
MONGO_URL = "mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
```

Replace:
- `username` with your MongoDB Atlas username
- `password` with your MongoDB Atlas password
- `cluster.mongodb.net` with your cluster's hostname
- `database` with your database name

## Additional Security Recommendations

1. **Create a dedicated database user** with only the necessary permissions for your application.

2. **Use environment variables** to store sensitive information like connection strings and passwords.

3. **Consider using MongoDB Atlas Private Endpoint** for production environments to establish a secure connection between your Cloudflare Workers and MongoDB Atlas.

## Troubleshooting

If you're still experiencing connection issues after following these steps:

1. Verify that your MongoDB Atlas cluster is running (not paused).

2. Check that your database username and password are correct.

3. Ensure that your MongoDB Atlas cluster is deployed in a region close to where your Cloudflare Workers are running to minimize latency.

4. Check the MongoDB Atlas logs for any connection errors.

5. Try connecting to your MongoDB Atlas cluster from a local application to verify that the cluster is accessible.

## Need More Help?

If you're still having issues connecting to MongoDB Atlas from your Cloudflare Worker, please refer to:

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/) 