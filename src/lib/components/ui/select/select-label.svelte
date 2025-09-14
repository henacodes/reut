<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	// Props
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="select-label"
	class={cn(
		'border-2 border-transparent py-1.5 pr-8 pl-2 text-sm font-base text-main-foreground/80',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
