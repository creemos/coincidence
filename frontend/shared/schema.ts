import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  age: integer("age"),
  bio: text("bio"),
  interests: text("interests").array(),
});

export const testResults = pgTable("test_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  answers: text("answers").notNull(), // JSON string of answers
  compatibility: text("compatibility").array(), // Array of compatible user IDs
});

export const matches = pgTable("matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  matchedUserId: varchar("matched_user_id").references(() => users.id).notNull(),
  compatibility: integer("compatibility").notNull(),
  liked: text("liked").default("none"), // "none", "user1", "user2", "both"
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z.object({
  firstname: z.string().min(1, "Имя обязательно"),
  surname: z.string().min(1, "Фамилия обязательна"),
  username: z.string().min(3, "Имя пользователя должно быть не короче 3 символов"),
  email: z.string().email("Неверный email"),
  password: z.string().min(6, "Пароль должен быть не короче 6 символов"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const testAnswersSchema = z.object({
  q1: z.enum(["trust", "communication", "adventure", "stability"]),
  q2: z.enum(["outdoors", "home", "social", "culture"]),
  q3: z.enum(["coffee", "dinner", "activity", "walk"]),
  q4: z.enum(["very", "important", "somewhat", "not"]),
  q5: z.enum(["direct", "thoughtful", "emotional", "analytical"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
export type TestAnswers = z.infer<typeof testAnswersSchema>;
export type User = typeof users.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;
export type Match = typeof matches.$inferSelect;
