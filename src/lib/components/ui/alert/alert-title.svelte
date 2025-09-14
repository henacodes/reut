<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
	}

	let { class: userClass = '', ...restProps } = $$props;
</script>

<div
	class={cn('col-start-2 line-clamp-1 min-h-4 font-heading tracking-tight', userClass)}
	{...restProps}
>
	<slot />
</div>
