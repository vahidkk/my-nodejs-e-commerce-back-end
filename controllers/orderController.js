const Order = require("../models/Order");
const Product = require("../models/Product");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createOrder = async (req, res) => {
  res.send("ok");
};
const getAllOrders = async (req, res) => {
  res.send("ok");
};
const getSingleOrder = async (req, res) => {
  res.send("ok");
};
const getCurrentUserOrders = async (req, res) => {
  res.send("ok");
};
const updateOrder = async (req, res) => {
  res.send("ok");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
