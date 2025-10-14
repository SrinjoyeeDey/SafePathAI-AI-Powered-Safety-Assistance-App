import { Schema, model, Document } from 'mongoose';

// TypeScript interface
export interface IPlace extends Document {
  name: string;
  type: string;
  address?: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
const PlaceSchema = new Schema<IPlace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere', // Ensures geospatial queries work
      },
    },
    source: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: if you want to ensure index separately (redundant if already set above)
// PlaceSchema.index({ location: '2dsphere' });

export default model<IPlace>('Place', PlaceSchema);
