import { Router } from "express";
import { passportCall } from "../middlewares/passportAuth.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";
import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
  purchaseCartController
} from "../controllers/cart.js";

const router = Router();

router.post("/:productId", passportCall("jwt"), handlePolicies(['USER']), addToCartController);

router.get("/", passportCall("jwt"), handlePolicies(['USER']), getCartController);

router.put("/:productId", passportCall("jwt"), handlePolicies(['USER']), updateCartItemController);

router.delete("/:productId", passportCall("jwt"), handlePolicies(['USER']), removeFromCartController);

router.delete("/", passportCall("jwt"), handlePolicies(['USER']), clearCartController);

router.post("/:cid/purchase", passportCall("jwt"), handlePolicies(['USER']), purchaseCartController);

export default router;
