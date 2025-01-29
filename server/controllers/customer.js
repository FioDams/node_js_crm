import { now } from "mongoose";
import Customer from "../models/Customer.js";

export const createCustomer = async (req, res, next) => {
    try {
        const newCustomer = new Customer(req.body);
        const saveCustomer = await newCustomer.save();

        res.status(201).json(saveCustomer);
    } catch (err) {
        next(err);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { isActive: false, updatedAt: now(), deletedAt: now() },
            { new: true }
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json("Customer deleted successfully");
    } catch (err) {
        next(err);
    }
};

export const getCustomers = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const customers = await Customer.find({ company: userId, isActive: true, deletedAt: null });
        res.status(200).json({ customers });
    } catch (err) {
        next(err);
    }
};

export const updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
};