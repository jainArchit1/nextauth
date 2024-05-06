import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
const Login = () => {
  return (
    <div className="flex  justify-center items-center h-dvh ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form action="">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="Enter your Email" type="email" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  id="name"
                  placeholder="Enter your Password"
                  type="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full" type="submit">
            Login
          </Button>
        </CardFooter>

        <span className=" flex justify-center font-bold mb-3">or</span>
        <form className="flex justify-center mb-4">
          <Button type="submit" className="flex justify-center w-[300px]">
            Login with google
          </Button>
        </form>

        <Link href={"/signup"} className="flex justify-center">
          Dont have an account ? click here
        </Link>
      </Card>
    </div>
  );
};

export default Login;
