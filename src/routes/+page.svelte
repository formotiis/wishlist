<script lang="ts">
	import { auth as authStore } from '../stores/auth';
	import { setContext } from 'svelte'
	import ConceptHome from '../components/ConceptHome.svelte';
	import Wishlist from '../components/Wishlist.svelte';
	import { Constants } from '$lib/constants';


	setContext(Constants.WishlistUserID, $authStore?.uid)
</script>

{#if $authStore?.uid}
	<Wishlist></Wishlist>
{:else}
	<ConceptHome></ConceptHome>
{/if}
