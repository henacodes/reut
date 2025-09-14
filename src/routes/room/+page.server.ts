import { db } from '@/server/db/index.js';
import { chatroom, message, userProfile } from '@/server/db/schema/';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function load(event) {
	let user = event.locals.user;
	console.log(user, 'cxvxcxcvcxxc');
	if (!user) {
		throw redirect(302, '/auth');
	}

	try {
		let profile = await db
			.select()
			.from(userProfile)
			.where(eq(userProfile.studentEmail, user.email));

		if (!profile) {
			throw redirect(302, '/auth');
		}

		const room = await db
			.select()
			.from(chatroom)
			.where(and(eq(chatroom.dorm, profile[0].dorm), eq(chatroom.block, profile[0].block)));
		let prevChats;
		if (room) {
			prevChats = await db.query.message.findMany({
				where: eq(message.roomId, room[0].id),
				with: {
					user: true // includes the joined user info
				}
			});
		}
		return {
			user,
			profile: profile[0],
			prevChats,
			room: room[0]
		};
	} catch (error) {
		throw redirect(302, '/auth');
	}
}
