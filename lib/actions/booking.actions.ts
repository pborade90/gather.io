"use server"

import connectDB from "@/lib/mongodb";
import Booking from "@/database/booking.model";

export const createBooking = async ({ eventId, slug, email }: {eventId: string, slug: string, email: string}) => {
    try {
        await connectDB()
        await Booking.create({ eventId, slug, email })

        return { success: true }

    } catch (e) {
        console.error('Create booking failed', e)
        return { success: false }
    }
}