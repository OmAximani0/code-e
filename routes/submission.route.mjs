import { Router } from "express";
import { isAuthneticated } from "../middleware/authentication.mjs";
import { Submission } from "../models/index.mjs";
import runProgram from "./utils/exec.mjs";
import { Types } from "mongoose";

const submissionRoute = Router();

submissionRoute.post("/", isAuthneticated, async (req, res) => {
    let response = {};
    const data = req.body;

    if (data) {
        const { language, srcCode } = data;
        // check both fields exist
        if (language && srcCode) {
            // create a new submission in db
            const newSub = new Submission({
                user: req.user._id,
                status: "pending",
                language: req.body.language,
                submitedAt: new Date(),
            });

            try {
                await newSub.save();
                response["message"] = "Submission created successfully!";
                response["id"] = newSub._id;

                // response with the submission id
                res.status(201).json(response);
            } catch (error) {
                response["error"] = error.message;
                return res.status(500).json(response);
            }

            try {
                // run the program
                await runProgram(newSub._id, srcCode, language, newSub);
                return;
            } catch (error) {
                console.log("ERRORRR :- ", error);
                newSub.status = "error";
                newSub.completedAt = new Date();
                newSub.stdErr = error;

                await newSub.save();
                return;
            }
        } else if (!language && !srcCode) {
            response["message"] = "Lagunage and Source code not provided!";
            return res.status(400).json(response);
        } else if (!language) {
            response["message"] = "Lagunage not provided!";
            return res.status(400).json(response);
        }
        response["message"] = "Source code not provided!";
        return res.status(400).json(response);
    }
    response["message"] = "request body is empty!";
    return res.status(400).json(response);
});

submissionRoute.get("/:id", isAuthneticated, async (req, res) => {
    let response = {};
    const subId = req.params.id;

    // check for valid object id
    try {
        String(new Types.ObjectId(subId)) !== subId;
    } catch (error) {
        response["message"] = "Invalid submission id";
        return res.status(400).json(response);
    }

    // check if submission exists
    const submissionExist = await Submission.findOne({ _id: subId }).exec();

    if (!submissionExist) {
        response["message"] = "Submission not found!";
        return res.status(404).json(response);
    }

    return res.status(200).json(submissionExist);
});

export default submissionRoute;
