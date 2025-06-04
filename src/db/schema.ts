
import { integer, pgEnum, pgTable, text, time, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/relations";


export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToClinics: many(usersToClinicsTable),
}));


export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicsTable = pgTable("users_to_clinics", {
    userId: uuid("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    clinicId: uuid("clinic_id")
        .notNull()
        .references(() => clinicsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersToClinicsTable.userId],
        references: [usersTable.id],
    }),
    clinic: one(clinicsTable, {
        fields: [usersToClinicsTable.clinicId],
        references: [clinicsTable.id],
    }),
}));

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors: many(doctorsTable),
    patients: many(pacientTable),
    appointment: many(appointmentsTable),
    usersToClinics: many(usersToClinicsTable),
}));

export const doctorsTable = pgTable("doctors", {
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id")
        .notNull()
        .references(() => clinicsTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    avatarImageUrl: text("avatar_image_url"),
    // 1 - Monday, 2 - Tuesday, ..., 0 - Sunday
    availableFromWeekDay: integer("available_from_week_day").notNull(),
    availableToWeekDay: integer("available_to_week_day").notNull(),
    availableFromTime: time("available_from_time").notNull(),
    availableToTime: time("available_to_time").notNull(),
    specialty: text("specialty").notNull(),
    appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});


export const doctorsTableRelations = relations(doctorsTable, ({ many, one }) => ({
    clinic: one(clinicsTable, {
        fields: [doctorsTable.clinicId],
        references: [clinicsTable.id],
    }),
    appointmentsTable: many(appointmentsTable),
}));


export const pacientsSexEnum = pgEnum("pacients_sex", ["male", "female"]);

export const pacientTable = pgTable("pacients", {
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id")
        .notNull()
        .references(() => clinicsTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoeNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    sex: pacientsSexEnum("sex").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date())
});


export const pacientTableRelations = relations(pacientTable, ({ many, one }) => ({
    clinic: one(clinicsTable, {
        fields: [pacientTable.clinicId],
        references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
}));


export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    date: timestamp("date").notNull(),
    clinicId: uuid("clinic_id")
        .notNull()
        .references(() => clinicsTable.id, { onDelete: "cascade" }),
    patientId: uuid("patient_id")
        .notNull()
        .references(() => pacientTable.id, { onDelete: "cascade" }),
    doctorId: uuid("doctor_id")
        .notNull()
        .references(() => doctorsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});


export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id],
    }),
    patient: one(pacientTable, {
        fields: [appointmentsTable.patientId],
        references: [pacientTable.id],
    }),
    doctor: one(doctorsTable, {
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id],
    }),
}));