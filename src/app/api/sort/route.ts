import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { restaurantTable } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: "Please provide an id" }, { status: 400 });
    }

    const object = await db.query.restaurantTable.findMany({ where: like(restaurantTable.id, id) });
    return NextResponse.json(object);
}