import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import type { ProductInterface } from "@/types/productInterface";
import {
  getSingleProductAPI,
  updateProductAPI,
} from "@/redux/feactures/productsSlice";

function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductInterface>();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // 🧠 Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) {
          throw new Error("Product ID is missing");
        }

        const product = await getSingleProductAPI(productId);

        // set form values
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("category", product.category);
        setValue("quantity", product.quantity);

        setPreview(product.image);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  // 🧾 Submit updated product
  const onSubmit = async (data: ProductInterface) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category", data.category);
      formData.append("quantity", String(data.quantity));

      if (image) {
        formData.append("image", image);
      }

      await updateProductAPI(productId!, formData);

      toast.success("Product updated successfully");
      navigate("/myProducts");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Product</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                {...register("title", { required: "Title is required" })}
              />
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
              />
              <p className="text-red-500 text-sm">
                {errors.description?.message}
              </p>
            </div>

            {/* Price */}
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                {...register("price", { required: "Price is required" })}
              />
              <p className="text-red-500 text-sm">{errors.price?.message}</p>
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Input
                {...register("category", {
                  required: "Category is required",
                })}
              />
              <p className="text-red-500 text-sm">{errors.category?.message}</p>
            </div>

            {/* Quantity */}
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                })}
              />
              <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
            </div>

            {/* Image */}
            <div>
              <Label>Change Image (Optional)</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />

              {/* Preview */}
              {preview && (
                <img
                  src={preview}
                  className="mt-3 w-full h-40 object-cover rounded"
                />
              )}
            </div>

            {/* Submit */}
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Update Product
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}

export default EditProduct;
