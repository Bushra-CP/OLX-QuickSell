import cartModel from "../../model/cartModel.js";
import { productModel } from "../../model/productModel.js";
import type {
  CartInterface,
  CartProcesses,
} from "../../types/cartTypes/cartInterface.js";

export class CartRepository implements CartProcesses {
  //GET PRODUCT DETAILS
  async getProductDetails(id: string) {
    const product = await productModel.findById(id).lean();

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  //ADD TO CART
  async addToCart(userId: string, data: CartInterface) {
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      cart = await cartModel.create({ userId, items: [] });
    }

    const existing = cart.items.find(
      (item) => item.productId.toString() === data.productId,
    );

    if (existing) {
      existing.quantity += data.quantity;
    } else {
      cart.items.push(data);
    }

    await cart.save();
  }

  //REDUCE QUANTITY OF PRODUCT
  async updateProductQuantity(productId: string, quantity: number) {
    await productModel.findByIdAndUpdate(productId, {
      $inc: { quantity: -quantity },
    });
  }
}
