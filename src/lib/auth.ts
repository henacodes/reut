import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { magicLink } from 'better-auth/plugins';
import { sendEmail } from './server/sendEmail';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	plugins: [
		magicLink({
			async sendMagicLink(data, request) {
				const emailRegex = /^[a-z]+\.[a-z]+@aastustudent\.edu\.et$/i;
				if (!emailRegex.test(data.email)) {
					return;
				}
				await sendEmail({
					from: 'reut@kirakos.dev',
					to: [data.email],
					subject: 'Sign in to AASTU Reut',
					html: `
					  <p>Hello,</p>
					  <p>Click the link below to sign in to your AASTU Reut account:</p>
					  <p><a href="${data.url}" target="_blank" rel="noopener">Sign in</a></p>
					  <strong>This link will expire shortly.</strong>
					`
				});
			}
		})
	]
});
