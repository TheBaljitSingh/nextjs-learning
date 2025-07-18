'use client'

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function SignupComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

 

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        password,
      });
      if(res.data.statusCode===200){
          console.log(res);
          router.push("/");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#512E7A] mb-6">Sign Up</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#512E7A]"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#512E7A]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#512E7A]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleSignup}
            className="w-full bg-[#512E7A] text-white py-2 rounded-md hover:bg-[#3d2161] transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
