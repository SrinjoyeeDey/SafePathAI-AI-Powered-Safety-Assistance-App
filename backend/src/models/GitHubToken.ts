import { Schema, model, Document, Types } from 'mongoose';

export interface IGitHubToken extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    encryptedToken: string;
    tokenHash: string;        // For validation without decryption
    scopes: string[];
    lastValidated: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const GitHubTokenSchema = new Schema<IGitHubToken>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true,
        index: true 
    },
    encryptedToken: { 
        type: String, 
        required: true 
    },
    tokenHash: { 
        type: String, 
        required: true,
        index: true 
    },
    scopes: { 
        type: [String], 
        default: [] 
    },
    lastValidated: { 
        type: Date, 
        default: Date.now 
    },
    isActive: { 
        type: Boolean, 
        default: true,
        index: true 
    }
}, { timestamps: true });

// Compound index for efficient queries
GitHubTokenSchema.index({ userId: 1, isActive: 1 });

export default model<IGitHubToken>('GitHubToken', GitHubTokenSchema);