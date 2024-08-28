import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const restaurantTable = sqliteTable('restaurant', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  rating: integer('rating').notNull(),
  price: text('price').notNull(),
  distance: integer('distance'),
  photo: text('photo').notNull(),
  link: text('link').notNull(),
});

export const reviewsTable = sqliteTable('reviews',{
  id: integer('id').primaryKey(),
  content: text('content').notNull(),
  restaurantId: integer('restaurant_id')
  .notNull()
  .references(() => restaurantTable.id, { onDelete: "cascade"}),
  createdAt: text('created_at')
  .default(sql`(CURRENT_TIMESTAMP)`)
  .notNull()
});

export type InsertRestaurant = typeof restaurantTable.$inferInsert;
export type SelectRestaurant = typeof restaurantTable.$inferSelect;

export type InsertReviews = typeof reviewsTable.$inferInsert;
export type SelectReviews = typeof reviewsTable.$inferSelect;