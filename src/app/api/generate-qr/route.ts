import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const amount = searchParams.get("amount");
    const des = searchParams.get("des");

    const qrUrl = `${process.env.NEXT_PUBLIC_PERSONAL}&amount=${amount}&des=${des}`;

    return await fetch(qrUrl);


}
