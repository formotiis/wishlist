<script lang='ts'>
	import { page } from '$app/stores';
</script>

<style>
	section {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		margin-top: 0.25rem;
	}
</style>

<section>
	<h1>{$page.status} {$page.error.message}</h1>
	<h2>Quelque chose s'est mal passé, re-essayez ou contactez le support</h2>
</section>

