import { env } from '$env/dynamic/private';
import * as zod from 'zod';

const sendEmailSchema = zod.object({
	from: zod.email(), // sender email
	to: zod.array(zod.email()).min(1), // at least one recipient
	subject: zod.string().min(1),
	html: zod.string().min(1)
});

type SendEmailProps = zod.infer<typeof sendEmailSchema>;

export async function sendEmail(props: SendEmailProps) {
	const parsed = sendEmailSchema.parse(props);

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.RESEND_API_KEY}`
		},
		body: JSON.stringify({
			from: parsed.from,
			to: parsed.to,
			subject: parsed.subject,
			html: parsed.html
		})
	});

	if (!res.ok) {
		const errorData = await res.json();
		console.log('error data', errorData);
		throw new Error(`Failed to send email: ${JSON.stringify(errorData)}`);
	}

	return res.json();
}
