<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: Props = $props();
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		type="file"
		bind:files
		bind:value
		data-slot="input"
		class={cn(
			'flex h-10 w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm font-base text-foreground ' +
				'selection:bg-main selection:text-main-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 ' +
				'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		{...restProps}
	/>
{:else}
	<input
		bind:this={ref}
		bind:value
		data-slot="input"
		{type}
		class={cn(
			'flex h-10 w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm font-base text-foreground ' +
				'selection:bg-main selection:text-main-foreground placeholder:text-foreground/50 ' +
				'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		{...restProps}
	/>
{/if}
