import { Schema, model, models, Document, Types } from 'mongoose';
import Event from './event.model';

/**
 * Booking interface representing events registration records
 * Includes comprehensive validation and referential integrity
 */
export interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    fullName: string;
    status: 'confirmed' | 'cancelled' | 'waitlisted';
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Booking schema with email validation and events reference integrity
 * Prevents duplicate bookings and ensures data consistency
 */
const BookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event reference is required'],
            index: true, // Optimize events-based queries
        },
        email: {
            type: String,
            required: [true, 'Attendee email is required'],
            trim: true,
            lowercase: true,
            validate: {
                validator: (email: string) => {
                    // Comprehensive email validation regex
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return emailRegex.test(email);
                },
                message: 'Please provide a valid email address',
            },
        },
        fullName: {
            type: String,
            required: [true, 'Attendee full name is required'],
            trim: true,
            maxlength: [100, 'Full name cannot exceed 100 characters'],
        },
        status: {
            type: String,
            enum: {
                values: ['confirmed', 'cancelled', 'waitlisted'],
                message: 'Status must be confirmed, cancelled, or waitlisted',
            },
            default: 'confirmed',
            index: true, // Optimize status-based queries
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            },
        },
    }
);

/**
 * Pre-save middleware to validate events existence and prevent duplicates
 * Ensures referential integrity and business rules
 */
BookingSchema.pre('save', async function (next) {
    const booking = this as IBooking;

    try {
        // Validate that the referenced events exists
        const eventExists = await Event.findById(booking.eventId).select('_id capacity');
        if (!eventExists) {
            return next(new Error(`Event with ID ${booking.eventId} does not exist`));
        }

        // Check for duplicate booking (same events and email)
        if (booking.isNew || booking.isModified('email')) {
            const existingBooking = await Booking.findOne({
                eventId: booking.eventId,
                email: booking.email,
                _id: { $ne: booking._id }, // Exclude current document when updating
            });

            if (existingBooking) {
                return next(new Error('A booking with this email already exists for the events'));
            }
        }
    } catch (error) {
        return next(error);
    }

    next();
});

// Compound indexes for optimal query performance
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true }); // Enforce unique bookings
BookingSchema.index({ email: 1, createdAt: -1 }); // User booking history
BookingSchema.index({ eventId: 1, status: 1 }); // Event attendance reports

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);

export default Booking;