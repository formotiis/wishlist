<script lang='ts'>
	import Card, {
		Content,
		PrimaryAction,
		Media,
		Actions,
		ActionButtons,
		ActionIcons,
	} from '@smui/card';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { getContext } from 'svelte'
	import { getDocs, query, where, doc, getDoc} from 'firebase/firestore/lite';
	import { Constants } from '../lib/constants';
	import { initFirebase } from '$lib';
	import type { WishlistEntry, UserPreferences } from '$lib';
	import {auth as authStore} from '../stores/auth'
	import { goto } from '$app/navigation';

	const uid = getContext(Constants.WishlistUserID) ?? $authStore?.uid;

	const { wishlistCollection, db } = initFirebase();
	let clicked = 0;

	async function fetch(): Promise<[WishlistEntry[], UserPreferences|null]> {

		const q = query(wishlistCollection, where("user", "==", uid));
		const prefSnap = await getDoc(doc(db, 'preferences', uid));
		const querySnapshot = await getDocs(q)
		let entries : WishlistEntry[] = [];

		console.log("querySnapshot", querySnapshot)
		querySnapshot.forEach(item => {
			entries.push(item.data() as WishlistEntry)
		});
		console.log("Entries", entries)
		return [entries, prefSnap.exists() ? (prefSnap.data() as UserPreferences) : null ]
	}

</script>

{#await fetch()}
	<p>Loading</p>
{:then [entries, prefs] }
	<h1 class='c-margin-left-8'>Wishlist page for {prefs.displayName ?? uid}</h1>
	{#if entries.length > 0}
		<LayoutGrid>
		{#each entries as entry}
			<Cell spanDevices={{ desktop: 4, tablet: 6, phone: 12 }}>
			<Card>
				<PrimaryAction on:click={() => goto(entry.item.link)}>
					<Media aspectRatio="16x9" style='background-image: url({entry.item.image})'/>
					<Content class="mdc-typography--body2">
						<h2 class="mdc-typography--headline6" style="margin: 0;">
							{entry.item.name}
						</h2>
						{entry.item.description}
					</Content>
				</PrimaryAction>
				<Actions>
					<ActionButtons>
						<Button on:click={() => clicked++}>
							<Label>Reservé</Label>
						</Button>
						<Button on:click={() => clicked++}>
							<Label>Commandé</Label>
						</Button>
					</ActionButtons>
					<ActionIcons>
						<IconButton
							on:click={() => clicked++}
							toggle
							aria-label="Add to favorites"
							title="Add to favorites"
						>
							<Icon class="material-icons" on>favorite</Icon>
							<Icon class="material-icons">favorite_border</Icon>
						</IconButton>
						<IconButton
							class="material-icons"
							on:click={() => clicked++}
							title="Share">share</IconButton
						>
						<IconButton
							class="material-icons"
							on:click={() => clicked++}
							title="More options">more_vert</IconButton
						>
					</ActionIcons>
				</Actions>
			</Card>
			</Cell>
		{/each}
		</LayoutGrid>
	{:else}
		<p>Rien à voir ici. Pourquoi ne pas ajouter une nouvelle entrée ?</p>
	{/if}
{:catch error}
	<p>{error}</p>
{/await}
