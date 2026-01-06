<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import ButtonGlow from './ButtonGlow.svelte';
</script>

{#if stateModal.modal?.name === 'error'}
	<Popup zIndex={zIndex.modal} persistent onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			{@const error = stateModal.modal?.error}
			<span>Sorry, something went wrong.</span>
			<div class="scrollY error-text">
				{#if error}
					{#if error?.error && error?.message}
						<span>{JSON.stringify(error.error || 'unknown')}</span>
						<p>{JSON.stringify(error.message || 'unknown')}</p>
					{:else}
						<p>{error}</p>
					{/if}
				{:else}
					<span>unknown error</span>
				{/if}
			</div>
			<div style="margin-top: 2rem; text-align: center;">
				<ButtonGlow
					variant="blue"
					size="large"
					shape="pill"
					onclick={() => {
						// Reset modal and trigger game refresh logic
						stateModal.modal = null;
						window.location.reload();
					}}
				>
					{@html 'Refresh Game'}
				</ButtonGlow>
			</div>
		</BaseContent>
	</Popup>
{/if}

<style lang="scss">
	.error-text {
		max-height: 100px;
		max-width: 480px;
		border-radius: 8px;
		border: 1px solid red;
		white-space: normal;
		padding: 1rem;
	}
</style>
