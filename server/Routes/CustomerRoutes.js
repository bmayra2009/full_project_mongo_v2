import express from "express";
import asyncHandler from "express-async-handler";
import Customer from "./../Models/CustomerModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const customerRoute = express.Router();

// GET ALL CUSTOMER
customerRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Customer.countDocuments({ ...keyword });
    const customers = await Customer.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ customers, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL CUSTOMER WITHOUT SEARCH AND PEGINATION
customerRoute.get(
  "/all",
  protect,
  asyncHandler(async (req, res) => {
    const customers = await Customer.find({}).sort({ _id: -1 });
    res.json(customers);
  })
);

// GET SINGLE CUSTOMER
customerRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404);
      throw new Error("Customer not Found");
    }
  })
);

// DELETE CUSTOMER
customerRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      await customer.remove();
      res.json({ message: "Customer deleted" });
    } else {
      res.status(404);
      throw new Error("Customer not Found");
    }
  })
);

// CREATE CUSTOMER
customerRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const customerExist = await Customer.findOne({ name });
    if (customerExist) {
      res.status(400);
      throw new Error("Customer name already exist");
    } else {
      const customer = new Customer({
        name,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (customer) {
        const createdcustomer = await customer.save();
        res.status(201).json(createdcustomer);
      } else {
        res.status(400);
        throw new Error("Invalid customer data");
      }
    }
  })
);

// UPDATE CUSTOMER
customerRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, description, image, countInStock } = req.body;
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      customer.name = name || customer.name;
      customer.price = price || customer.price;
      customer.description = description || customer.description;
      customer.image = image || customer.image;
      customer.countInStock = countInStock || customer.countInStock;

      const updatedCustomer = await customer.save();
      res.json(updatedCustomer);
    } else {
      res.status(404);
      throw new Error("Customer not found");
    }
  })
);
export default customerRoute;
