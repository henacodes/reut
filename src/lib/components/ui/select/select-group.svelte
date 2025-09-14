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
	}: ComponentProps<typeof SelectPrimitive.Group> = $props();
</script>

<SelectPrimitive.Group
	bind:ref
	data-slot="select-group"
	class={cn('space-y-1', className)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.Group>
