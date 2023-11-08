<script lang="ts">
	import { auth } from "../stores/auth";
</script>

<div class="my-4">
	{#if $auth}
		<div>
			Authenticated as <span class="font-bold text-black">{$auth.email}</span>
		</div>
	{:else}
		<div>
			No one is authenticated
		</div>
	{/if}
</div>
