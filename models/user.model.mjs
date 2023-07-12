import mongoose from "mongoose";
import { SchemaTypes, Schema } from "mongoose";
import { hash } from "bcrypt";

const userSchema = Schema({
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
});

userSchema.method("hashPassword", async function (plainPassword) {
    const passwordHash = await hash(plainPassword, 12);
    return passwordHash;
});

export { userSchema };

const userModel = mongoose.model("User", userSchema);

export default userModel;
