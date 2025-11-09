import { relations } from "drizzle-orm";
import { integer, serial, pgEnum, pgTable, varchar, date, text, timestamp, } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("role", ["admin", "applicant", "employer"]);

export const users = pgTable("user", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    userName: varchar("username", { length: 255 }).unique().notNull(),
    password: text("password").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: rolesEnum().default("applicant"),
    phoneNumber: varchar("phone_number", { length: 255 }),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    userAgent: text("user_agent").notNull(),
    ip: varchar("ip", { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const employers = pgTable("employers", {
    id: integer("id")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),

    name: varchar("name", { length: 255 }),
    description: text("description"),
    avatarUrl: text("avatar_url"),
    bannerImageUrl: text("banner_image_url"),
    organizationType: varchar("organization_type", { length: 100 }),
    teamSize: varchar("team_size", { length: 50 }),
    yearOfEstablishment: integer("year_of_establishment"), // MySQL YEAR type
    websiteUrl: varchar("website_url", { length: 255 }),
    location: varchar("location", { length: 255 }),

    deletedAt: timestamp("deleted_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

// export const applicants = pgTable("applicants", {
//     id: integer("id")
//         .primaryKey()
//         .references(() => users.id, { onDelete: "cascade" }),

//     biography: text("biography"),
//     dateOfBirth: date("date_of_birth"),
//     nationality: varchar("nationality", { length: 100 }),

//     maritalStatus: pgEnum("marital_status", ["single", "married", "divorced"]),

//     gender: pgEnum("gender", ["male", "female", "other"]),

//     education: pgEnum("education", [
//         "none",
//         "high school",
//         "undergraduate",
//         "masters",
//         "phd",
//     ]),

//     experience: text("experience"),
//     websiteUrl: varchar("website_url", { length: 255 }),
//     location: varchar("location", { length: 255 }),

//     deletedAt: timestamp("deleted_at", { mode: "string" }),
//     createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
//     updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
// });

// // export const tableNameRelations = relations(
// //   // 1. The main table being defined (e.g., users)
// //   table,

// //   // 2. A callback function to define the relationships
// //   ({ one, many }) => ({
// //     // ... relationship definitions
// //   })
// // );

// //! Both the one() and many() helper functions take arguments to define the relationship details.

// // Relations definitions
// export const usersRelations = relations(users, ({ one, many }) => ({
//     // One user can have one employer profile (if role is employer)
//     employer: one(employers, {
//         fields: [users.id],
//         references: [employers.id],
//     }),
//     // One user can have one applicant profile (if role is applicant)
//     applicant: one(applicants, {
//         fields: [users.id],
//         references: [applicants.id],
//     }),
//     // One user can have many sessions
//     sessions: many(sessions),
// }));

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//     // Each session belongs to one user
//     user: one(users, {
//         fields: [sessions.userId],
//         references: [users.id],
//     }),
// }));

// export const users = pgTable('users', {
//   id: serial('id').primaryKey(),
//   fullName: text('full_name'),
//   phone: varchar('phone', { length: 256 }),
// });