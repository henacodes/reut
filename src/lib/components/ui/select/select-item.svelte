<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn, type WithoutChild } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: WithoutChild<SelectPrimitive.ItemProps> = $props();

	// These will be provided by Bits-UI internally
	let selected = false;
	let highlighted = false;
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={cn(
		'relative flex w-full cursor-default items-center gap-2 rounded-base py-1.5 pr-8 pl-2 text-sm select-none ' +
			'outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground ' +
			"data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	<span class="absolute right-2 flex size-3.5 items-center justify-center">
		{#if selected}
			<CheckIcon class="size-4" />
		{/if}
	</span>

	{#if childrenProp}
		{@render childrenProp({ selected, highlighted })}
	{:else}
		{label || value}
	{/if}
</SelectPrimitive.Item>
