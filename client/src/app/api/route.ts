import { terra } from "@/terra";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { providers} = await terra.getProviders();
    console.log(providers)
    return NextResponse.json({ message: "Hello, world!" });
}