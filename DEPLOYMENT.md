# Deployment Guide

This document provides guidance for deploying the TubeOnAI Timetable application to Vercel.

## Prerequisites

- A Vercel account
- A PostgreSQL database (e.g., Neon, Supabase, etc.)
- Git repository with your project code

## Environment Setup

### Database Configuration

1. Create a PostgreSQL database with a provider of your choice. We recommend [Neon](https://neon.tech/) for serverless PostgreSQL.

2. Update the `.env` file with your database connection details:

```
DATABASE_URL=postgresql://user:password@hostname/database?sslmode=require
POSTGRES_PRISMA_URL=postgresql://user:password@hostname/database?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://user:password@hostname/database?sslmode=require
```

3. The `.env` file is excluded from git via `.gitignore`. Use `.env.example` as a template.

### Local Testing

Before deploying, test your database connection locally:

```bash
npx prisma validate
npx prisma migrate deploy
```

## Vercel Deployment

### Environment Variables

1. Add the following environment variables in your Vercel project settings:

   - `DATABASE_URL`: Your PostgreSQL connection string
   - `POSTGRES_PRISMA_URL`: Same as DATABASE_URL, may include pooling parameters
   - `POSTGRES_URL_NON_POOLING`: Non-pooled connection for migrations
   - `SESSION_SECRET`: A secure random string (at least 32 characters)
   - `ADMIN_USERNAME`: Default admin username
   - `ADMIN_PASSWORD`: Default admin password
   - `ADMIN_EMAIL`: Default admin email
   - `NODE_ENV`: Set to "production"

### Build Configuration

The project is configured to use a custom build command in `vercel.json`:

```json
{
  "buildCommand": "npm run vercel-build"
}
```

The `vercel-build` script in `package.json` runs:

```
"vercel-build": "prisma migrate deploy && next build"
```

This ensures that database migrations are run before the Next.js build.

### Deployment Steps

1. Connect your Git repository to Vercel
2. Configure environment variables as mentioned above
3. Deploy your application
4. Vercel will automatically run the build command, including migrations

### Troubleshooting

If you encounter database-related errors:

1. Verify your connection strings are correctly configured in Vercel's environment variables
2. Check that your database allows connections from Vercel's IP addresses (if using IP restrictions)
3. Review the logs at `https://vercel.com/[your-username]/[your-project]/deployments`

## Database Migrations

When you make schema changes:

1. Create migrations: `npx prisma migrate dev --name your_migration_name`
2. Push migrations to your repository
3. Vercel will automatically apply migrations during deployment

## Seed Data (Optional)

To seed your database with initial data:

1. Create or update the seed script in `scripts/db-seed.ts`
2. Run manually: `npm run db:seed`

Note: By default, seed scripts don't run automatically during deployment. Consider creating an admin user setup script if needed.
