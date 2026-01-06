<script lang="ts">
	import { Button, Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseTitle from './BaseTitle.svelte';
	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import BaseButtonWrap from './BaseButtonWrap.svelte';
	import BetMenuAmountToggle from './BetMenuAmountToggle.svelte';
	import BetMenuAmountGrid from './BetMenuAmountGrid.svelte';
	import { i18nDerived } from '../i18n/i18nDerived';

	const confirm = () => {
		stateModal.modal = null;
	};
</script>

{#if stateModal.modal?.name === 'betAmountMenu'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseTitle>
				{i18nDerived.betMenu()}
			</BaseTitle>
			<BaseScrollable type="column">
				<div class="bet-menu-scroll">
					<span>{i18nDerived.selectYourBet()}</span>
					<BetMenuAmountToggle />
					<BetMenuAmountGrid />
				</div>
			</BaseScrollable>
			<BaseButtonWrap type="full-width">
				<Button 
					data-test="confirm-button" 
					variant="blue" 
					size="large" 
					shape="pill"
					onclick={confirm}
				>
					<span style="font-size: 1rem; font-weight: bold;">{i18nDerived.confirm()}</span>
				</Button>
			</BaseButtonWrap>
		</BaseContent>
	</Popup>
{/if}

<style lang="scss">
	.bet-menu-scroll {
		max-height: 70vh;
		overflow-y: auto;
		padding: 16px 8px;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		scrollbar-width: none; /* Firefox */

		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari */
		}

		@media (max-width: 700px) {
			max-height: 80vh;
			padding: 12px 4px;
		}

		@media (max-height: 600px) {
			max-height: 60vh;
		}
	}
</style>