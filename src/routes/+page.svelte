<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import Input from '@/components/ui/input/input.svelte';
</script>

<Button>Hello Saaar</Button>

<Alert.Root>
	<Alert.Title>Heads up!</Alert.Title>
	<Alert.Description>You can add components to your app using the cli.</Alert.Description>
</Alert.Root>
<Input />
