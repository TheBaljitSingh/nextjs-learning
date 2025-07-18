import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const client = new PrismaClient();

export async function GET(){

    const user = await client.user.findFirst({});
    console.log(user);
    if(!user){
        return NextResponse.json({
            message:"No User found",
            status: 404
        })
    }

    return NextResponse.json({
        name:user?.name,
        email:user?.email,
    });
}

export async function POST(req:NextRequest, res:NextResponse){
    
  try{
      const body = await req.json();
    console.log(body);
    
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await client.user.create({
        data:{
            email: body.email,
            name:body.name,
            password:hashedPassword
        }
    });
        
    return NextResponse.json({
        statusCode:200,
        message:`successfully registered ${body.name}`
     
    })

  }catch(e){
    console.log(e);
    return NextResponse.json({
      statusCode: 500,
      message: "Something went wrong while registering the user.",
    });

  }
}