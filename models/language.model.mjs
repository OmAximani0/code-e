import mongoose from "mongoose";
import { SchemaTypes, Schema } from "mongoose";

const languageSchema = Schema({
    id: {
        type: SchemaTypes.Number,
        required: true,
        unique: true,
    },
    name: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    ext: {
        type: SchemaTypes.String,
        required: true,
    },
});

const languageModel = mongoose.model("Language", languageSchema);

export default languageModel;
