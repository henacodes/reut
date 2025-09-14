<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';

	const alert = cva(
		'relative w-full rounded-base border-2 border-border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current shadow-shadow',
		{
			variants: {
				variant: {
					default: 'bg-main text-main-foreground',
					destructive: 'bg-black text-white'
				}
			},
			defaultVariants: {
				variant: 'default'
			}
		}
	);

	interface $$AlertProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof alert> {
		class?: string;
	}

	export let variant: $$AlertProps['variant'] = 'default';
	let { class: userClass = '', ...restProps } = $$props;
</script>

<div role="alert" class={alert({ variant, class: userClass })} {...restProps}>
	<slot />
</div>
