import { Router } from "express";
import { Language } from "../models/index.mjs";

const languageRouter = Router();

languageRouter.get("/", async (req, res) => {
    let response = {};
    try {
        const allLanguages = await Language.find({}).select("-_id").exec();
        response["languages"] = allLanguages;
        return res.status(200).json(response);
    } catch (error) {
        response["error"] = error;
        return res.status(500).json(response);
    }
});

export default languageRouter;
