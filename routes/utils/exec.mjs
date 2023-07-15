import path from "node:path";
import fs from "node:fs";
import { exec } from "node:child_process";
import process from "node:process";

export default async function runProgram(
    subId,
    srcCode,
    language,
    submissionDoc
) {
    let codesDir = path.join(process.cwd(), "codes");
    const filePath = path.join(codesDir, subId + "." + language);
    try {
        _createDir(codesDir);
        _createFile(srcCode, filePath);

        // run the program according to the language & return the output or error
        switch (language) {
            case "py":
                try {
                    const pyOut = await _runCode(
                        process.env.PYTHON_PATH,
                        filePath,
                        submissionDoc
                    );
                } catch (error) {
                    throw Error(error);
                }
                break;
            default:
                throw Error("Invalid language");
        }
    } catch (error) {
        throw Error(error);
    }
}

function _createDir(codesDir) {
    try {
        fs.accessSync(codesDir, fs.constants.F_OK);
        return;
    } catch (error) {
        fs.mkdirSync(codesDir);
    }
}

function _createFile(data, filePath) {
    fs.open(filePath, "w", (err, file) => {
        if (err) throw Error(`Can not create file : ${err}`);
    });
    fs.writeFile(filePath, data, (err) => {
        if (err) throw Error(`Can not write in file : ${err}`);
    });
}

async function _runCode(binPath, filePath, submissionDoc) {
    return new Promise((resolve, reject) => {
        try {
            exec(
                `${binPath} ${filePath}`,
                { maxBuffer: 1024 * 1000 },
                async (err, stdOut, stdError) => {
                    if (err) {
                        return reject(Error(err));
                    }
                    if (stdError) {
                        return reject(stdError);
                    }

                    submissionDoc.status = "success";
                    submissionDoc.completedAt = new Date();
                    submissionDoc.stdOut = stdOut;
                    submissionDoc.stdErr = stdError;

                    await submissionDoc.save();

                    resolve({
                        stdOut,
                        stdError,
                    });
                }
            );
        } catch (error) {
            return reject(new Error(error));
        }
    });
}
