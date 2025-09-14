import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { user } from './auth';
import { randomUUID } from 'crypto';

export const userProfile = sqliteTable('user_profiles', {
	id: text('id').primaryKey(),
	department: text('department').notNull(),
	studentId: text('student_id').notNull(),
	block: text('block').notNull(),
	dorm: text('dorm').notNull(),
	studentEmail: text('student_email').notNull().unique()
});
