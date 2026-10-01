import { pgTable, uuid, index, varchar, text, timestamp, pgEnum, boolean } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  role: roleEnum("role").notNull().default("user"),
  oauthProvider: text("oauth_provider"),
  oauthId: text("oauth_id"),

  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  emailVerificationCode: text("email_verification_code"),
  emailVerificationExpires: timestamp("email_verification_expires"),

  passwordResetToken: text("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deleteAt: timestamp("delete_at"),
});

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    title: varchar("title", {
      length: 255,
    }).notNull(),

    slug: varchar("slug", {
      length: 255,
    })
      .notNull()
      .unique(),

    summary: text("summary").notNull(),

    body: text("body").notNull(),

    coverPhoto: text("cover_photo"),

    category: varchar("category", {
      length: 100,
    }).notNull(),

    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    published: timestamp("published", {
      withTimezone: true,
    }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    authorIdx: index("posts_author_idx").on(table.authorId),
    categoryIdx: index("posts_category_idx").on(table.category),
    createdAtIdx: index("posts_created_at_idx").on(table.createdAt),
  }),
);

export const comments = pgTable(
  "comments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    body: text("body").notNull(),

    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id, {
        onDelete: "cascade",
      }),

    authorId: uuid("author_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    postIdx: index("comments_post_idx").on(table.postId),
    authorIdx: index("comments_author_idx").on(table.authorId),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;