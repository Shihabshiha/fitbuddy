"use strict";
// import Stripe from "stripe";
// import config from "./config";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const stripe = new Stripe(config.SRIPE_API_SECRET_KEY, {
//   apiVersion: '2023-08-16', 
// });
// export type StripePrice = Stripe.Price;
// export type StripeProduct = Stripe.Product;
// export default stripe;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("./config"));
const stripeInstance = new stripe_1.default(config_1.default.STRIPE_API_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
exports.default = stripeInstance;
