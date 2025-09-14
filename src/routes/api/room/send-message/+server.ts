import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { chatroom, message } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import * as z from 'zod';
import { redirect } from '@sveltejs/kit';

// validate request body
const messageSchema = z.object({
	block: z.string(),
	dorm: z.string(),
	userId: z.string(),
	content: z.string().min(1)
});

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		let user = locals.user;
		console.log(user, 'cxvxcxcvcxxc');
		if (!user) {
			return new Response(JSON.stringify({ success: false, error: "You aren't logged-in" }), {
				status: 401
			});
		}

		const body = await request.json();
		const parsed = messageSchema.parse(body);

		let room = await db.query.chatroom.findFirst({
			where: and(eq(chatroom.block, parsed.block), eq(chatroom.dorm, parsed.dorm))
		});

		if (!room) {
			const newRoomId = randomUUID();
			await db.insert(chatroom).values({
				id: newRoomId,
				block: parsed.block,
				dorm: parsed.dorm
			});
			room = { id: newRoomId, block: parsed.block, dorm: parsed.dorm };
		}

		const [newMessage] = await db
			.insert(message)
			.values({
				roomId: room.id,
				userId: parsed.userId,
				content: parsed.content
			})
			.returning();

		return new Response(
			JSON.stringify({
				success: true,
				roomId: room.id,
				message: newMessage
			}),
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ success: false, error: (err as Error).message }), {
			status: 400
		});
	}
};
