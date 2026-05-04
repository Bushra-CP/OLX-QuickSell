import type {
  CartInterface,
  CartProcesses,
} from "../../types/cartTypes/cartInterface.js";

export class AddToCartService {
  constructor(private cart: CartProcesses) {}

  async addToCart(userId: string, productId: string, quantity: number) {
    //get product using productId
    const product = await this.cart.getProductDetails(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Quantity validation
    if (product.quantity < quantity) {
      throw new Error(`Only ${product.quantity} items available in stock`);
    }

    const data: CartInterface = {
      productId,
      title: product.title,
      price: product.price,
      category: product.category,
      quantity,
      image: product.image,
    };

    // Add to cart
    const result = await this.cart.addToCart(userId, data);

    // Reduce quantity of product
    await this.cart.updateProductQuantity(productId, -quantity);

    return result;
  }
}
