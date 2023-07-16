import { Schema, SchemaTypes } from "mongoose";
import mongoose from "mongoose";

const submissionSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: true,
    },
    status: {
        type: SchemaTypes.String,
        enum: ["pending", "success", "error"],
        required: true,
    },
    language: {
        type: SchemaTypes.Mixed,
        require: true,
    },
    submitedAt: {
        type: SchemaTypes.Date,
        required: true,
    },
    completedAt: {
        type: SchemaTypes.Date,
        required: false,
    },
    stdOut: {
        type: SchemaTypes.String,
        required: false,
    },
    stdErr: {
        type: SchemaTypes.String,
        required: false,
    },
});

const submissionModel = mongoose.model("Submission", submissionSchema);

export default submissionModel;
