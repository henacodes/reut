<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = 'default',
		...restProps
	}: WithoutChild<SelectPrimitive.TriggerProps> & {
		size?: 'sm' | 'default';
	} = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="select-trigger"
	data-size={size}
	class={cn(
		'inline-flex w-full items-center justify-between gap-2 rounded-base border-2 border-border bg-main px-3 py-2 text-sm font-base text-main-foreground select-none ' +
			'ring-offset-white focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden ' +
			'whitespace-nowrap transition-all disabled:cursor-not-allowed disabled:opacity-50 ' +
			'[*:data-[slot=select-value]]:line-clamp-1 [*:data-[slot=select-value]]:flex [*:data-[slot=select-value]]:items-center [*:data-[slot=select-value]]:gap-2 ' +
			"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 " +
			(size === 'sm' ? 'h-9' : 'h-10'),
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronDownIcon class="size-4 opacity-50" />
</SelectPrimitive.Trigger>
