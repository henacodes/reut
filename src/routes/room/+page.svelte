<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Card from '@/components/ui/card/card.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import type { User } from 'better-auth';

	let { data } = $props();

	let {
		user,
		profile: { block, dorm },
		prevChats,
		room
	} = data;

	let messages = $derived(prevChats || []);
	console.log('preeeeeeeeev', messages);
	let newMessage = $state('');

	export async function sendMessage({
		block,
		dorm,
		userId,
		content
	}: {
		block: string;
		dorm: string;
		userId: string;
		content: string;
	}) {
		messages = [
			...messages,
			{
				content: newMessage,
				user: { ...user, image: user.image || null },
				id: 0,
				createdAt: new Date().toDateString(),
				userId: user.id,
				roomId: room?.id
			}
		];

		newMessage = '';
		try {
			const res = await fetch('/api/room/send-message', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ block, dorm, userId, content })
			});

			if (!res.ok) {
				const err = await res.json();
				throw new Error(err.error || 'Failed to send message');
			}

			const data = await res.json();
			return data; // { success: true, roomId, message }
		} catch (err) {
			console.error('sendMessage error:', err);
			throw err;
		}
	}
</script>

<div class="flex h-screen flex-col">
	<!-- Header -->
	<header class="flex items-center justify-between border-b bg-gray-100 p-4">
		<h1 class="text-lg font-semibold">
			Block {data.profile.block}, Dorm {data.profile.dorm} Chatroom
		</h1>
	</header>

	<!-- Messages -->
	<main class="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
		{#each messages as msg}
			<div class="flex flex-col">
				<span class="text-sm font-semibold text-gray-700">{msg.user.name}</span>
				<span
					class="flex flex-col rounded-base border-2 border-border bg-background p-3 font-base text-foreground shadow-shadow"
					>{msg.content}</span
				>
				<span class="my-1 text-xs text-gray-400">{msg.createdAt}</span>
			</div>
			<div class="flex flex-col">
				<span class="text-sm font-semibold text-gray-700">{msg.user.name}</span>
				<span
					class="flex flex-col rounded-base border-2 border-border bg-background p-3 font-base text-foreground shadow-shadow"
					>{msg.content}</span
				>
				<span class="my-1 text-xs text-gray-400">{msg.createdAt}</span>
			</div>
		{/each}
	</main>

	<!-- Input -->
	<footer class="border-t bg-white p-3">
		<form
			class="flex items-center space-x-2"
			onsubmit={() => sendMessage({ block, dorm, userId: user.id, content: newMessage })}
		>
			<Input
				bind:value={newMessage}
				placeholder="Type your message..."
				class="flex-1 rounded border px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
			/>
			<Button type="submit">Send</Button>
		</form>
	</footer>
</div>
