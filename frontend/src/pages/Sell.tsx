import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { ProductInterface } from "@/types/productInterface";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import { addProduct } from "@/redux/feactures/addProductSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Sell() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductInterface>();

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (data: ProductInterface) => {
    try {
      const formData = new FormData();

      // text fields
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("category", data.category);
      formData.append("quantity", String(data.quantity));

      // image
      if (image) {
        formData.append("image", image);
      }

      // axios request
      await dispatch(addProduct(formData));

      toast.success("Product uploaded successfully!");
      reset();
      setImage(null);

      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload product.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Post Your Ad</CardTitle>
        </CardHeader>

        {/* ✅ FORM START */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <Label>Title</Label>
              <Input
                placeholder="Enter product title"
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              <p className="text-red-500 text-sm">{errors.title?.message}</p>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Describe your product"
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
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                })}
              />
              <p className="text-red-500 text-sm">{errors.price?.message}</p>
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Input
                placeholder="Enter product category"
                {...register("category", {
                  required: "Category is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
              />
              <p className="text-red-500 text-sm">{errors.category?.message}</p>
            </div>

            {/* Quantity */}
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                placeholder="Enter quantity"
                {...register("quantity", {
                  required: "quantity is required",
                })}
              />
              <p className="text-red-500 text-sm">{errors.quantity?.message}</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                })}
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />

              {/* Preview */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="mt-3 w-full h-40 object-cover rounded"
                />
              )}

              <p className="text-red-500 text-sm">{errors.image?.message}</p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Post Ad
            </Button>
          </CardContent>
        </form>
        {/* ✅ FORM END */}
      </Card>
    </div>
  );
}

export default Sell;
