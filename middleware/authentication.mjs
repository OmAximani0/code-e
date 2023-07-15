import { verifyJWT } from "../utils/jwt.mjs";

export function isAuthneticated(req, res, next) {
    var token = req.get("Authorization");
    token = token.split(" ");
    if (token[0] !== "Bearer") {
        return res
            .status(401)
            .json({ message: "Invalid Authorization Header!" });
    }

    try {
        const decodedData = verifyJWT(token[1]);
        req.user = decodedData;
        next();
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
