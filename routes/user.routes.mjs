import { Router } from "express";
import { User } from "../models/index.mjs";
import { compare } from "bcrypt";
import { createJWT } from "../utils/jwt.mjs";

const userRoute = Router();

userRoute.post("/signup", async (req, res) => {
    let response = {};
    const data = req.body;

    // check if body is empty
    if (data) {
        const { email, password } = data;
        // check both fields exist
        if (email && password) {
            // Check email format
            let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            if (!emailRegex.test(email)) {
                response["message"] = "Invalid email format!";
                return res.status(400).json(response);
            }

            // check if email already used
            let userExist = await User.findOne({ email }).exec();
            if (userExist) {
                response["message"] = "Email already used!";
                return res.status(400).json(response);
            }

            let new_user = new User({ email, password });
            try {
                new_user.password = await new_user.hashPassword(password);
                await new_user.save();
                const token = createJWT({ _id: new_user._id, email: email })
                response["message"] = "User Signup Successful!";
                response["token"] = token
                return res.status(201).json(response);
            } catch (error) {
                console.log(error);
                response["error"] = error;
                return res.status(500).json(response);
            }
        } else if (!email && !password) {
            response["message"] = "Email and Password not provided!";
            return res.status(400).json(response);
        } else if (!email) {
            response["message"] = "Email not provided!";
            return res.status(400).json(response);
        }
        response["message"] = "Password not provided!";
        return res.status(400).json(response);
    }
    response["message"] = "request body is empty!";
    return res.status(400).json(response);
});

userRoute.post("/signin", async (req, res) => {
    let response = {};
    const data = req.body;

    // check if body is empty
    if (data) {
        const { email, password } = data;
        // check both fields exist
        if (email && password) {
            // check email format
            let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
            if (!emailRegex.test(email)) {
                response["message"] = "Invalid email format!";
                return res.status(400).json(response);
            }

            // check if user is signup
            let user = await User.findOne({ email }).exec();

            if (!user) {
                response["message"] = "Email not signed up! Signup first";
                return res.status(400).json(response);
            }

            const passwordMatch = await compare(password, user.password);
            if (!passwordMatch) {
                response["message"] = "Password is invalid!";
                return res.status(400).json(response);
            }

            const token = createJWT({ _id: user._id, email: user.email });
            response["message"] = "User sign in successfull!";
            response["token"] = token;
            return res.status(200).json(response);
        } else if (!email && !password) {
            response["message"] = "Email and Password not provided!";
            return res.status(400).json(response);
        } else if (!email) {
            response["message"] = "Email not provided!";
            return res.status(400).json(response);
        }
        response["message"] = "Password not provided!";
        return res.status(400).json(response);
    }
    response["message"] = "request body is empty!";
    return res.status(400).json(response);
});

export default userRoute;
