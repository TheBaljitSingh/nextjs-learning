import Link from "next/link";
import { ButtonComponent } from "./Button";

export const SigninComponent=()=>{


    return  <div className="mt-10 flex justify-center flex-col">
    <div className="flex justify-center">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              Sign in
            </div>
          </div>
          <div className="pt-2">
            <input  placeholder="baljit@gmail.com" />
            <input  type={"password"} placeholder="123456" />
            <ButtonComponent/>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>
        </div>
    </div>
  </div>

}
