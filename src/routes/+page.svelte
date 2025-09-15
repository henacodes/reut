<script>
	import { goto } from '$app/navigation';
	import Button from '@/components/ui/button/button.svelte';
	import { MessageSquareShare } from '@lucide/svelte';

	function tooRoom() {
		goto('/room');
	}
</script>

<div class="flex min-h-screen flex-col items-center justify-center text-black">
	<!-- Title -->
	<h1
		class="mb-6 border-4 border-black px-6 py-4 text-6xl font-extrabold uppercase shadow-[6px_6px_0_0_black]"
	>
		AASTU Reut
	</h1>

	<!-- Subtitle -->
	<p
		class="mb-10 border-2 border-black bg-pink-200 px-4 py-2 text-lg font-medium shadow-[4px_4px_0_0_black]"
	>
		Meet and chat with your dormmates beforehand
	</p>

	<!-- Call-to-Action Button -->
	<Button
		onclick={tooRoom}
		class="border-4 border-black bg-green-300 px-8 py-4 text-2xl font-bold shadow-[6px_6px_0_0_black] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
	>
		Get Started →
	</Button>
</div>
