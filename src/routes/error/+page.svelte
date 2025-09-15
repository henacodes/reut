<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import Button from '@/components/ui/button/button.svelte';
	import { AlertTriangle } from '@lucide/svelte';

	// Get error message from URL query param
	const params = get(page).url.searchParams;
	const urlError = params.get('error');

	export let error: Error | null = null;
	export let status: number | null = null;

	function handleAuth() {
		goto('/auth');
	}

	function handleHome() {
		goto('/');
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-black">
	<!-- Error Icon + Status -->
	<div class="mb-6 flex flex-col items-center">
		<AlertTriangle class="mb-4 text-red-600" size={64} />
		<h1
			class="border-4 border-black bg-red-400 px-6 py-4 text-6xl font-extrabold uppercase shadow-[6px_6px_0_0_black]"
		>
			Error {status ?? ''}
		</h1>
	</div>

	<!-- Error Message -->
	<p
		class=" border-2 border-black bg-pink-200 px-4 py-2 text-lg font-medium shadow-[4px_4px_0_0_black]"
	>
		{urlError || error?.message || 'Something went wrong.'}
	</p>

	<small class=" mt-2 mb-16 text-gray-700">
		{urlError === 'INVALID_TOKEN'
			? 'You are trying to sign in with an already-used link.'
			: 'The link has expired. Try again.'}
	</small>

	<!-- Call-to-Action Buttons -->
	<div class="flex gap-4">
		<Button
			onclick={handleAuth}
			class="border-4 border-black bg-green-300 px-8 py-4 text-2xl font-bold shadow-[6px_6px_0_0_black] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
		>
			Try Again
		</Button>

		<Button
			onclick={handleHome}
			class="border-4 border-black bg-blue-200 px-8 py-4 text-2xl font-bold shadow-[6px_6px_0_0_black] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
		>
			Go Back
		</Button>
	</div>
</div>
