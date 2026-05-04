import { productModel } from "../../model/productModel.js";
import type {
  FetchProductInterface,
  Filters,
} from "../../types/productTypes/productInterface.js";

export class FetchProductRepository implements FetchProductInterface {
  async fetchProductHome() {
    return productModel
      .find({ status: "available" })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
  }

  async fetchProductListing(filter: Filters) {
    const query: Record<string, any> = {
      status: "available",
    };
    const { search, category, minPrice, maxPrice, page, limit }: Filters =
      filter;

    // 🔍 Search
    if (typeof search === "string" && search.trim() !== "") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // 📦 Category
    if (Array.isArray(category) && category.length > 0) {
      query.category = { $in: category };
    }

    // 💰 Price filter (FIXED)
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (!isNaN(min) || !isNaN(max)) {
      query.price = {};

      if (!isNaN(min)) {
        query.price.$gte = min;
      }

      if (!isNaN(max)) {
        query.price.$lte = max;
      }

      // remove empty object
      if (Object.keys(query.price).length === 0) {
        delete query.price;
      }
    }

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 8;

    // console.log(query);

    const products = await productModel
      .find(query)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .lean();

    const total = await productModel.countDocuments(query);

    return {
      products,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      total,
    };
  }

  //FETCH PRODUCTS OF A PARTICULAR USER
  async fetchUserProducts(userId: string) {
    return await productModel.find({ userId });
  }
  
}
