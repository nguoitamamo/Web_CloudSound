import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const qrUrl = `${process.env.NEXT_PUBLIC_BANK}?limit=20`;

        const res = await fetch(qrUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN_SEPAY}`,
                'Content-Type': 'application/json',
            },
        });

        if (res.status !== 200) {
            return NextResponse.json({ error: 'Không thể lấy dữ liệu giao dịch' }, { status: 500 });
        }

        const data = await res.json();
        console.log(">> chekc ở server", data);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Lỗi server:', error);
        return NextResponse.json({ error: 'Lỗi server nội bộ' }, { status: 500 });
    }
}
