import { pgTable, uuid, text, timestamp, boolean, index } from "drizzle-orm/pg-core";


export const userSchema = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    email: text().notNull(),
    commentingName: text("commenting_name"),
    passwordHash: text("password_hash"),
    isDeleted: boolean("is_deleted").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at")
},
    (table) => [
        index("users_email_idx").on(table.email),
    ]
);