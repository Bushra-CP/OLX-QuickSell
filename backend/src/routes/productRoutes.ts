import express from "express";
const router = express.Router();

import { addProductController } from "../container/productDependency/addProductDependency.js";
import { upload } from "../middlewares/upload.js";
import { fetchProductController } from "../container/productDependency/fetchProductDependency.js";
import { getCategoryController } from "../container/productDependency/getCategoriesDependency.js";
import { productDetailsController } from "../container/productDependency/productDetailsDependency.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

router.post(
  "/addProduct",
  verifyToken,
  upload.single("image"),
  addProductController.addProduct,
);

router.get("/", fetchProductController.fetchProductHomeScreen);

router.get("/products", fetchProductController.fetchProductListing);

router.get("/categories", getCategoryController.getCategories);

router.get("/product/:id", productDetailsController.getProductDetails);

router.get(
  "/myProducts",
  verifyToken,
  fetchProductController.fetchUserProducts,
);

router.put(
  "/editProduct/:productId",
  verifyToken,
  upload.single("image"),
  addProductController.updateProduct,
);

router.delete(
  "/deleteProduct/:productId",
  verifyToken,
  addProductController.deleteProduct,
);

export default router;
