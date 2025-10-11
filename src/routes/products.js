import { Router } from "express";
import { passportCall } from "../middlewares/passportAuth.js";
import { handlePolicies } from "../middlewares/handlePolicies.js";
import {
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductByIdController
} from "../controllers/products.js";

const router = Router();

router.post("/", passportCall("jwt"), handlePolicies(['ADMIN']), createProductController);

router.put("/:id", passportCall("jwt"), handlePolicies(['ADMIN']), updateProductController);

router.delete("/:id", passportCall("jwt"), handlePolicies(['ADMIN']), deleteProductController);

router.get("/", passportCall("jwt"), handlePolicies(['USER', 'ADMIN']), getAllProductsController);

router.get("/:id", passportCall("jwt"), handlePolicies(['USER', 'ADMIN']), getProductByIdController);

export default router;
