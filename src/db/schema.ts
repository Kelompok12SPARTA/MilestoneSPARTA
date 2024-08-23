import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const restaurantTable = sqliteTable('restaurant', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  rating: integer('rating').notNull(),  
});
export const productsTable = sqliteTable('product', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  restaurant: text('restaurant').unique().notNull(),
  price: integer('price').notNull(),
  rating: integer('rating').notNull(),
});

export type InsertRestaurant = typeof restaurantTable.$inferInsert;
export type SelectRestaurant = typeof restaurantTable.$inferSelect;

export type InsertProducts = typeof productsTable.$inferInsert;
export type SelectProducts = typeof productsTable.$inferSelect;