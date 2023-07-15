import jwt from "jsonwebtoken";

export function createJWT(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2 days" });
}

export function verifyJWT(token) {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                throw Error("Token expired! Sign in again!");
            case "JsonWebTokenError":
                throw Error("Invaild token! Authnetication Failed!")
            case "NotBeforeError":
                throw Error("Inactive token!")
            default:
                throw Error("Unknown Error!");
        }
    }
}
