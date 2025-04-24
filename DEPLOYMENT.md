# Deploying to Vercel with Neon DB PostgreSQL

This guide provides step-by-step instructions for deploying the Time Tracking System to Vercel with Neon DB PostgreSQL integration.

## Prerequisites

- A [Vercel](https://vercel.com) account
- A [Neon DB](https://neon.tech) account
- A GitHub repository with your project code

## Step 1: Set Up Neon DB

1. **Create a Neon DB Account**
   - Sign up at [neon.tech](https://neon.tech)
   - Verify your email and complete account setup

2. **Create a PostgreSQL Database**
   - From the Neon dashboard, create a new project
   - Name it "timetable" (to match the current database name)
   - Select the region closest to your target users
   - Choose the appropriate plan (they offer a free tier for development)

3. **Get Connection Details**
   - Once created, navigate to the "Connection Details" section
   - Save the connection string which will look like:
     ```
     postgres://[user]:[password]@[endpoint]/timetable
     ```
   - You'll need this for the Vercel environment variables

## Step 2: Deploy to Vercel

1. **Connect GitHub Repository**
   - Push your code to GitHub if not already done
   - Log in to [Vercel](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project Settings**
   - Framework Preset: Next.js
   - Build Command: Use the default (it will use the vercel-build script from package.json)
   - Output Directory: Leave as default
   - Install Command: `npm install`

3. **Set Environment Variables**
   - Add the following environment variables in Vercel project settings:
     ```
     DATABASE_URL=postgres://[user]:[password]@[endpoint]/timetable
     POSTGRES_PRISMA_URL=postgres://[user]:[password]@[endpoint]/timetable?pgbouncer=true&connect_timeout=15
     POSTGRES_URL_NON_POOLING=postgres://[user]:[password]@[endpoint]/timetable?connect_timeout=15
     SESSION_SECRET=[generate-a-secure-random-string]
     ADMIN_USERNAME=admin
     ADMIN_PASSWORD=[secure-password]
     ADMIN_EMAIL=admin@example.com
     NODE_ENV=production
     ```
   - For `SESSION_SECRET`, generate a secure random string (at least 32 characters) to encrypt session cookies
   - Replace all placeholders with your actual values

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - The build process will automatically run database migrations

## Step 3: Verify Deployment

1. **Check Deployment Status**
   - Monitor the deployment logs in Vercel
   - Verify that migrations ran successfully

2. **Test the Application**
   - Visit your deployed application URL
   - Log in with the admin credentials you set in the environment variables
   - Test key functionality:
     - Dashboard loading
     - Employee management
     - Time entry viewing
     - Report generation

3. **Monitor Database**
   - Check the Neon DB dashboard for active connections
   - Monitor query performance and adjust as needed

## Troubleshooting

### Database Connection Issues
- Verify the DATABASE_URL environment variable is correct
- Ensure SSL is properly configured in the database connection
- Check Neon DB dashboard for connection limits or issues

### Migration Failures
- Review migration logs in Vercel deployment
- If automatic migration fails, you can run migrations manually:
  ```
  npx tsx scripts/db-setup.ts
  ```

### Authentication Issues
- Verify SESSION_SECRET is set correctly
- Check cookie settings in session configuration
- Ensure middleware is properly configured

## Additional Configuration

### Custom Domain
1. Go to your Vercel project settings
2. Navigate to the "Domains" section
3. Add your custom domain and follow the verification steps

### Continuous Deployment
- Vercel automatically deploys when you push to the main branch
- You can configure branch deployments in the Vercel project settings

### Environment Variables
- You can update environment variables in the Vercel project settings
- After updating environment variables, redeploy your application

## Maintenance

### Database Backups
- Set up regular database backups in Neon DB
- Implement a disaster recovery plan

### Monitoring
- Set up logging and monitoring for both Vercel and Neon DB
- Consider implementing error tracking with a service like Sentry

### Performance Optimization
- Neon DB offers auto-scaling capabilities; monitor usage and adjust as needed
- Use Vercel's Edge Network for optimal global performance
