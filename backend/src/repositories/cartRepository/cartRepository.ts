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

  //REDUCE QUANTITY OF PRODUCT IN PRODUCT COLLECTION
  async updateProductQuantity(productId: string, quantity: number) {
    await productModel.findByIdAndUpdate(productId, {
      $inc: { quantity: quantity },
    });
  }

  //FETCH CART PRODUCTS OF A USER
  async fetchCart(userId: string) {
    const cart = await cartModel
      .findOne({ userId })
      .select(
        "items.productId items.title items.price items.category items.quantity items.image",
      )
      .lean();

    return cart?.items || [];
  }

  //UPDATE QUANTITY OF PRODUCT IN CART
  async updateQuantityInCart(
    userId: string,
    productId: string,
    quantity: number,
  ) {
    await cartModel.findOneAndUpdate(
      { userId, "items.productId": productId },
      {
        $inc: { "items.$.quantity": -quantity },
      },
    );

    //remove item if quantiy becomes 0
    await cartModel.updateOne(
      {
        userId,
        "items.productId": productId,
        "items.quantity": { $lte: 0 },
      },
      {
        $pull: { items: { productId } },
      },
    );
  }
}
