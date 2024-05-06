import * as React from "react";
import bcrypt, { hash } from "bcrypt";
import { User } from "@/models/UserModels";
import { dbConnect } from "@/lib/utils";
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
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/dist/server/api-utils";
const Signup = () => {
  const signup = async (FormData: FormData) => {
    "use server";
    const name = FormData.get("name") as string | undefined;
    const email = FormData.get("email") as string | undefined;
    const password = FormData.get("password") as string | undefined;
    if (!name || !email || !password) {
      throw new CredentialsSignin("All feilds are required");
    }
    //db connection
    await dbConnect();
    const user = await User.findOne({ email: email });
    if (user) {
      throw new CredentialsSignin("User is Alredy exist");
    }
    //hash password
    const hased = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hased,
    });
    redirect("/login");
    //   throw new CredentialsSignin("Successfully Signup");
  };
  return (
    <div className="flex  justify-center items-center h-dvh ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center">Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={signup}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your Name"
                  type="text"
                  name="name"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="Enter your Email"
                  type="email"
                  name="email"
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Password</Label>
                <Input
                  id="name"
                  placeholder="Enter your Password"
                  type="password"
                  name="password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="w-full" type="submit">
            Create account
          </Button>
        </CardFooter>

        {/* <span className=" flex justify-center font-bold mb-3">or</span>
        <form className="flex justify-center mb-4">
          <Button type="submit" className="flex justify-center w-[300px]">
            Login with google
          </Button>
        </form> */}

        <Link href={"/login"} className="flex justify-center">
          Already have an account ? click here
        </Link>
      </Card>
    </div>
  );
};

export default Signup;
