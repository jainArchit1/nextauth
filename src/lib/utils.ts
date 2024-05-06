import { type ClassValue, clsx } from "clsx";
import mongoose, { Connection, connections } from "mongoose";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const dbConnect = async () => {
  try {
    if (mongoose.connections && mongoose.connections[0].readyState) return;
    const { Connection } = await mongoose.connect(
      process.env.DATABASE_URL as string,
      {
        dbName: "nextAuthjs",
      }
    );
    console.log(`connect :${connection.host}`);
  } catch (error: any) {
    throw new Error("Error while connection to DB");
  }
};
