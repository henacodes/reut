<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils';

	interface $$Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
	}

	let { class: userClass = '', ...restProps } = $$props;
</script>

<div
	class={cn(
		'col-start-2 grid justify-items-start gap-1 text-sm font-base [&_p]:leading-relaxed',
		userClass
	)}
	{...restProps}
>
	<slot />
</div>
