import { NextRequest, NextResponse } from 'next/server';

/**
 * Dynamic Event API Route Handler
 * Handles operations for specific events identified by slug
 * GET: Fetch single events by slug with comprehensive error handling
 */

import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

// Define route parameters type for TypeScript
type RouteParams = {
    params: Promise<{
        slug: string;
    }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug with comprehensive error handling
 * @param req - NextRequest object
 * @param params - Route parameters containing the events slug
 * @returns NextResponse with events data or error message
 */
export async function GET(
    req: NextRequest,
    { params }: RouteParams
): Promise<NextResponse> {
    try {
        // Connect to database
        await connectDB();

        // Extract and validate slug from parameters
        const { slug } = await params;

        if (!slug || typeof slug !== 'string' || slug.trim() === '') {
            return NextResponse.json(
                { message: 'Valid events slug is required' },
                { status: 400 }
            );
        }

        // Sanitize and normalize slug
        const sanitizedSlug = slug.trim().toLowerCase();

        // Query events by slug with lean for better performance
        const event = await Event.findOne({ slug: sanitizedSlug }).lean();

        // Handle events not found
        if (!event) {
            return NextResponse.json(
                { message: `Event '${sanitizedSlug}' not found` },
                { status: 404 }
            );
        }

        // Return successful response
        return NextResponse.json(
            {
                message: 'Event fetched successfully',
                event
            },
            { status: 200 }
        );
    } catch (error) {
        // Comprehensive error handling with appropriate logging
        console.error(`Error fetching event by slug:`, error);

        // Handle specific error types
        if (error instanceof Error) {
            // Database connection errors
            if (error.message.includes('MONGODB_URI') || error.message.includes('connection')) {
                return NextResponse.json(
                    { message: 'Database connection error' },
                    { status: 503 }
                );
            }

            // Return specific error message for known errors
            return NextResponse.json(
                {
                    message: 'Failed to fetch events',
                    error: process.env.NODE_ENV === 'development' ? error.message : undefined
                },
                { status: 500 }
            );
        }

        // Handle unknown errors
        return NextResponse.json(
            { message: 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}