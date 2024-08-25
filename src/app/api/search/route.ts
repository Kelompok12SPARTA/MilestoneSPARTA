import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { db } from "@/db/index";
import { sql } from 'drizzle-orm';
import { restaurantTable } from "@/db/schema";

//#region search by name
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q')
    console.log(query)
    // usage q is "hello" for /api/search?q=hello
    const product = await db.select()
    .from(restaurantTable)
    .where(sql`${restaurantTable.name} LIKE ${sql.raw(`'%${query}%'`)}`)
    console.log(product)

    return NextResponse.json(product);
}
//#endregion

export async function SORT(id: any, _type: string) {
    const object = await db.query.restaurantTable.findMany({
        orderBy: (restaurantTable, { asc }) => [asc(restaurantTable.distance)],limit: 5, offset: 1})
    return NextResponse.json(object);
}