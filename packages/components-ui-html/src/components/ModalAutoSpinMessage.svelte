<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseTitle from './BaseTitle.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';
import ButtonGlow from './ButtonGlow.svelte';

	const messageMap = $derived({
		lossLimitReached: i18nDerived.lossLimitReached(),
		singleWinLimitReached: i18nDerived.singleWinLimitReached(),
		insufficientFunds: i18nDerived.insufficientFunds(),
	});
</script>

{#if stateModal.modal?.name === 'autoSpinMessage'}
 <Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
  <BaseContent maxWidth="100%">
   <BaseTitle>
	{i18nDerived.notification()}
   </BaseTitle>
   <BaseScrollable type="column">
	<span class="text" data-test="auto-spin-stop-info">{i18nDerived.autoSpinsStopInfo()}</span>
	<div class="scrollY info-text" data-test="auto-spin-stop-content">
	 {messageMap[stateModal.modal.message]}
	</div>
   </BaseScrollable>
   <div style="margin-top: 2rem; text-align: center;">
	<ButtonGlow
	 variant="blue"
	 size="large"
	 shape="pill"
	 onclick={() => {
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
	.text {
		text-align: center;
	}

	.info-text {
		text-align: center;
		max-height: 100px;
		max-width: 480px;
		border-radius: 8px;
		border: 1px solid white;
		white-space: normal;
		padding: 1rem;
	}
</style>
