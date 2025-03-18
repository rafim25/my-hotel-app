import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Here you would typically:
    // 1. Validate credentials
    // 2. Create session/token
    
    // For now, we'll just mock a successful login
    return NextResponse.json({
      user: {
        id: '123',
        email: body.email,
      },
      message: 'Login successful'
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message },
      { status: 400 }
    );
  }
} 