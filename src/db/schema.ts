import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const restaurantTable = sqliteTable('Restaurant', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  address: text('address').notNull(),
  rating: integer('rating').notNull(),
  price: integer('price').notNull(),
  distance: integer('distance').notNull(),
  photo: text('photo').notNull(),
  link: text('link').notNull(),
});

export type InsertRestaurant = typeof restaurantTable.$inferInsert;
export type SelectRestaurant = typeof restaurantTable.$inferSelect;