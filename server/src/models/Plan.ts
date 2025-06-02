import { Schema, model, Document } from 'mongoose';

// Define an interface for the Profile document
interface IPlan extends Document {
    _id: string;
    userId: string;
    dates: string;
    sunday?: Schema.Types.ObjectId[];
    monday?: Schema.Types.ObjectId[];
    tuesday?: Schema.Types.ObjectId[];
    wednesday?: Schema.Types.ObjectId[];
    thursday?: Schema.Types.ObjectId[];
    friday?: Schema.Types.ObjectId[];
    saturday?: Schema.Types.ObjectId[];
}

// Define the schema for the Profile document
const planSchema = new Schema<IPlan>(
    {
        userId: {
            type: String,
            required: true
        },
        dates: {
            type: String,
            required: true,
            unique: true
        },
        sunday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        monday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        tuesday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        wednesday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        thursday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        friday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
        saturday: [{
            type: Schema.Types.ObjectId,
            ref: 'Recipe',
            required: false
        }],
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Plan = model<IPlan>('Plan', planSchema);

export default Plan;