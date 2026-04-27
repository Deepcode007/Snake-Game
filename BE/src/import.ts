import express from "express";
import bcrpt from "bcrypt";
export const app = express();

export const bcrypt = bcrpt;
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening @ ", PORT);
})