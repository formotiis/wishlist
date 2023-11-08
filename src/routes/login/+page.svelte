<script lang="ts">
	import { applyAction } from "$app/forms";
	import { goto } from "$app/navigation";
	import type { ActionResult } from "@sveltejs/kit";
	import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
	import { onMount } from "svelte";
	import { auth } from '../../stores/auth'
	import Textfield from '@smui/textfield';
	import Button from '@smui/button';
	import Banner, { Label } from '@smui/banner';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Paper, { Title, Content } from '@smui/paper';


	let email = ''
	let password = ''
	let open = false;
	onMount(() => {
		return auth.subscribe((user) => {
			if (user) {
				goto('/')
			}
		});
	});
	const login = async (email: string | undefined, password: string | undefined): Promise<ActionResult> => {
		if (!email || !password) {
			open = true;
			return {
				type: 'success',
				error: 'Email and password are required'
			};
		}
		const auth = getAuth();
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			return {
				type: 'success',
				status: 200,
				data: { user },
			}
		} catch (error) {
			open = true;
			return {
				type: 'success',
				status: 403,
				data: {
					errorMessage: (error as Error).message
				}
			}
		}
	}

	async function handleSubmit(this: HTMLFormElement): Promise<void> {
		const result = await login(email, password);
		applyAction(result);
	}

</script>

<Banner bind:open={open} fixed mobileStacked content$style="max-width: max-content;">
	<Label slot="label">
		Impossible de vous authentifier, vérfiez vos identifiants.
	</Label>
	<Button slot="actions">Ok</Button>
</Banner>

<div class='container'>
<LayoutGrid>
	<Cell spanDevices={{ desktop: 3, tablet: 2, phone: 0 }}/>
	<Cell spanDevices={{ desktop: 6, tablet: 8, phone: 12 }} align="middle">
		<Paper variant="outlined">
			<form class="mt-4" method="POST" on:submit|preventDefault="{handleSubmit}">
			<Title>Connectez Vous</Title>
			<Content>
				<Textfield
					bind:value={email}
					variant="filled"
					label="Email"
					class='c-full-width'>
				</Textfield>
				<Textfield
					bind:value={password}
					variant="filled"
					label="Password"
					type='password'
					class='c-full-width c-margin-top-8'>
				</Textfield>
				<Button type='submit' on:submit={() => handleSubmit()} class='c-full-width c-margin-top-8'>
					Connexion
				</Button>
			</Content>
			</form>
		</Paper>
	</Cell>
	</LayoutGrid>
</div>
