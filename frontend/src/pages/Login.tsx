import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login to QuickSell
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">

            {/* Email */}
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Enter your email" />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="Enter your password" />
            </div>

            {/* Button */}
            <Button className="w-full">
              Login
            </Button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer">
                Register
              </span>
            </p>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Login