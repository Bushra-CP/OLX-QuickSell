import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { UserInterface } from "@/types/userInterface";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import { signup } from "@/redux/feactures/authSlice";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserInterface>();

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async () => {
    try {
      const userData = {
        email: getValues("email"),
        password: getValues("password"),
      };

      //signup thunk
      await dispatch(signup(userData));

      toast.success("Signup Successful");
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Failed to signup");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Signup</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <p className="text-red-500 text-sm">
                {errors.email?.message?.toString()}
              </p>
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Enter password",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                    message:
                      "Must include uppercase, lowercase, number & special character",
                  },
                })}
              />
              <p className="text-red-500 text-sm">
                {errors.password?.message?.toString()}
              </p>
            </div>

            {/* Button */}
            <Button className="w-full">Signup</Button>

            {/* signup Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-blue-600 cursor-pointer">Login</span>
              </Link>
            </p>
            <div className="text-center text-gray-600">
              <Link to="/">
                <p className="text-l font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
                  QuickSell
                </p>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
