// src/routes/api/user-profile/+server.ts
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { userProfile } from '$lib/server/db/schema';
import * as z from 'zod';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';
import { validateStudentProfile } from '$lib/server/validations';
import type { DepartmentIdType } from '@/types';

const userProfileSchema = z.object({
	department: z.string(),
	studentId: z.string(),
	block: z.string(),
	dorm: z.string(),
	studentEmail: z.string().email()
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const parsed = userProfileSchema.parse(data);

		let legit = validateStudentProfile({
			...parsed,
			department: parsed.department as DepartmentIdType
		});

		console.log('LEGITIMACY', legit);

		if (!legit) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'You are trying to join a wrong chatroom or your email isnt right '
				}),
				{
					status: 400
				}
			);
		}

		// Check if user with same email already exists
		const existing = await db
			.select()
			.from(userProfile)
			.where(eq(userProfile.studentEmail, parsed.studentEmail));

		if (existing.length > 0) {
			return new Response(
				JSON.stringify({ success: false, error: 'User with this email already exists' }),
				{ status: 409 }
			);
		}

		// Insert profile
		await db.insert(userProfile).values({
			id: randomUUID(),
			department: parsed.department,
			studentId: parsed.studentId,
			block: parsed.block,
			dorm: parsed.dorm,
			studentEmail: parsed.studentEmail
		});

		return new Response(JSON.stringify({ success: true }), { status: 201 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
			status: 400
		});
	}
};
