import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const em = await User.findOne({ email: req.body.email });
        if (em) return res.status(409).json({ error: "Email already exists" });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const error = createError(401, "Wrong password or username");

        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(error);

        const isMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!isMatch) return next(error);

        console.log(process.env.JWT_SECRET);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const { /*password,*/ isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};
