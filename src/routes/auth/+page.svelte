<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { DEPARTMENTS } from '$lib/constants';
	import { type DepartmentIdType } from '@/types';
	import { getStudent } from '@/data/utils';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { authClient } from '@/auth-client';

	let studentId = $state('ETS0727/17');
	let departmentId = $state<DepartmentIdType | undefined>('Software');
	let student = $state<ReturnType<typeof getStudent> | null>(null);
	let error: { title: string; content: string } | null = $state(null);

	function handleSubmit() {
		error = null;
		if (!departmentId || !studentId) {
			error = {
				title: 'Please fill all fields',
				content: ''
			};
			return;
		}
		student = getStudent(departmentId, studentId);
		console.log(student);
		if (!student) {
			error = {
				title: 'Search Failed',
				content:
					'We were unable to find your data in the document the university released. Please make sure you entered your ID/Deparment correct '
			};
		}
	}

	async function handleSignIn() {
		if (!student?.email) {
			console.log('invalid');
			return;
		}

		console.log(student.email);
		const { data, error } = await authClient.signIn.magicLink({
			email: student.email,
			name: `${student['First Name']} ${student['Father Name']}`,
			callbackURL: '/welcome',
			newUserCallbackURL: '/room',
			errorCallbackURL: '/error'
		});

		console.log(data);
		console.log(error);
	}
</script>

<div class=" flex justify-center pt-32">
	<form class=" flex w-[20rem] flex-col justify-center gap-4">
		<Input placeholder="Enter your Student Id" bind:value={studentId} />
		<Select.Root
			type="single"
			value={departmentId}
			onValueChange={(v) => (departmentId = v as DepartmentIdType)}
		>
			<Select.Trigger class=""
				>{(departmentId && DEPARTMENTS[departmentId]) || 'Choose your department'}</Select.Trigger
			>
			<Select.Content>
				{#each Object.keys(DEPARTMENTS) as depId}
					<Select.Item value={depId}>{DEPARTMENTS[depId as DepartmentIdType]}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<Button onclick={handleSubmit}>Submit</Button>

		{#if error}
			<Alert.Root variant="destructive">
				<Alert.Title>{error.title}</Alert.Title>
				<Alert.Description class="text-destructive">
					<p>{error.content}</p>
				</Alert.Description>
			</Alert.Root>
		{/if}

		{#if student}
			<Card.Root class="max-w-md rounded-2xl bg-white p-4 shadow">
				<Card.Header>
					<Card.Title>
						{student['First Name']}
						{student['Father Name']}
						{student['GFather Name']}
					</Card.Title>
					<Card.Description>{student['Dept.Stream']}</Card.Description>
				</Card.Header>

				<Card.Content>
					<p>
						<strong>Block:</strong>
						{student.Block}
					</p>
					<p>
						<strong>Dorm Room:</strong>
						{student.Dorm}
					</p>
				</Card.Content>

				<Card.Footer class="flex flex-col items-start  justify-start ">
					<Button onclick={handleSignIn}>Sign In with School Email</Button>
					<small class=" my-3">A sign-in link will be sent to your university mail box. </small>
				</Card.Footer>
			</Card.Root>
		{/if}
	</form>
</div>
