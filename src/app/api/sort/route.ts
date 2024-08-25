import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { restaurantTable } from "@/db/schema";
import { eq, like } from "drizzle-orm";

export async function GET(id : string) {
    const object = await db.query.restaurantTable.findMany({where: like(restaurantTable.id, id)});
return object;
}