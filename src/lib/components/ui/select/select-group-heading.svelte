<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import type { ComponentProps } from 'svelte';

	// Props
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.GroupHeading> = $props();
</script>

<SelectPrimitive.GroupHeading
	bind:ref
	data-slot="select-group-heading"
	class={cn(
		'px-2 py-1.5 text-xs font-heading tracking-tight text-muted-foreground uppercase',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.GroupHeading>
