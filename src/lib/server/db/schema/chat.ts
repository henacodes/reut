import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';
import { user } from './auth';

export const chatroom = sqliteTable('chatroom', {
	id: text('id').primaryKey(),
	block: text('block').notNull(),
	dorm: text('dorm').notNull()
});

export const message = sqliteTable('message', {
	id: integer('id').primaryKey(),
	roomId: text('room_id')
		.references(() => chatroom.id)
		.notNull(),
	userId: text('user_id')
		.references(() => user.id)
		.notNull(),
	content: text('content').notNull(),
	createdAt: text().default(sql`(current_timestamp)`)
});

export const messageRelations = relations(message, ({ one }) => ({
	user: one(user, {
		fields: [message.userId],
		references: [user.id]
	}),
	room: one(chatroom, {
		fields: [message.roomId],
		references: [chatroom.id]
	})
}));

// chatroom → messages
export const chatroomRelations = relations(chatroom, ({ many }) => ({
	messages: many(message)
}));
