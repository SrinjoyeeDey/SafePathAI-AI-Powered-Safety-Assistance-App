import { Schema, model, Document, Types } from 'mongoose';

export interface IRateLimitCache extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    limit: number;
    remaining: number;
    reset: Date;
    lastUpdated: Date;
}

const RateLimitCacheSchema = new Schema<IRateLimitCache>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true,
        index: true 
    },
    limit: { 
        type: Number, 
        required: true,
        default: 60 
    },
    remaining: { 
        type: Number, 
        required: true,
        default: 60 
    },
    reset: { 
        type: Date, 
        required: true 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now,
        expires: 3600  // TTL index - expires after 1 hour
    }
}, { timestamps: true });

// TTL index for automatic cleanup
RateLimitCacheSchema.index({ lastUpdated: 1 }, { expireAfterSeconds: 3600 });

export default model<IRateLimitCache>('RateLimitCache', RateLimitCacheSchema);