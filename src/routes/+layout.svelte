<script lang="ts">
	import IconButton from '@smui/icon-button';
	import Menu from '@smui/menu';
	import { goto } from '$app/navigation';
	import List, { Item, Separator, Text } from '@smui/list';
	import TopAppBar, { Row, Title, Section, AutoAdjust }  from '@smui/top-app-bar';
	import { onMount } from 'svelte';
	import { initFirebase } from '$lib';
	import { auth as authStore } from '../stores/auth'
	import { onAuthStateChanged } from 'firebase/auth'
	import Tooltip, { Wrapper } from '@smui/tooltip';

	let topAppBar = undefined;
	let menu: Menu;
	let logout;

	onMount(() => {
		const { auth } = initFirebase();
		logout = () => auth.signOut();
		onAuthStateChanged(auth, authStore.set);

	})



	let lightTheme =
		typeof window === 'undefined' || window.matchMedia('(prefers-color-scheme: light)').matches;
	function switchTheme() {
		lightTheme = !lightTheme;
		let themeLink = document.head.querySelector<HTMLLinkElement>('#theme');
		if (!themeLink) {
			themeLink = document.createElement('link');
			themeLink.rel = 'stylesheet';
			themeLink.id = 'theme';
		}
		themeLink.href = `/smui${lightTheme ? '' : '-dark'}.css`;
		document.head
			.querySelector<HTMLLinkElement>('link[href="/smui-dark.css"]')
			?.insertAdjacentElement('afterend', themeLink);
	}
</script>

<div class="top-app-bar-container flexor">
	<TopAppBar variant="fixed" bind:this={topAppBar}>
		<Row>
			<Section>
				<IconButton class="material-icons"
										on:click={() => menu.setOpen(true)}>
					menu</IconButton>
				<Menu bind:this={menu}>
					<List>
						<Item on:SMUI:action={() => goto('/')}>
							<Text>Acceuil</Text>
						</Item>
						<Separator/>
						<Item on:SMUI:action={() => goto('/login')}>
							<Text>Connexion</Text>
						</Item>
					</List>
				</Menu>
				<Title>Wishlist</Title>
			</Section>
			<Section align="end" toolbar>
				{#if $authStore}
					<Wrapper>
						<IconButton class="material-icons" aria-label="Log out" on:click={logout()}>
							logout
						</IconButton>
						<Tooltip>Déconnexion</Tooltip>
					</Wrapper>
				{:else}
					<Wrapper>
						<IconButton class="material-icons" aria-label="Log in" on:click={() => goto('/login')}>
							login
						</IconButton>
						<Tooltip>Se Connecter</Tooltip>
					</Wrapper>
				{/if}
				<IconButton
					class="material-icons mdc-icon-button__icon--on"
					aria-label="Change the color scheme"
					on:click={switchTheme}>
					{lightTheme ? 'dark_mode' : 'light_mode'}
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<slot/>
	</AutoAdjust>
</div>
