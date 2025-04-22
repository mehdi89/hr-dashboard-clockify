import { NextResponse } from 'next/server';
import { checkConnection } from '@/db';

export async function GET() {
  try {
    // Get application version from package.json
    const appVersion = process.env.npm_package_version || '0.1.0';
    
    // Check database connection
    const dbStatus = await checkConnection();
    
    // Return status information
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: appVersion,
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}