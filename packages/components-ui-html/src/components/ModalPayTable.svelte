<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';

	import scatterImg from '../../assets/1.png';
	import wildImg from '../../assets/2.png';
	import h1Img from '../../assets/3.png';
	import h2Img from '../../assets/4.png';
	import h3Img from '../../assets/5.png';
	import h3_2Img from '../../assets/6.png';
	import h4Img from '../../assets/7.png';
	import l1Img from '../../assets/8.png';
	import l2Img from '../../assets/9.png';
	import l3Img from '../../assets/10.png';
	import l4Img from '../../assets/11.png';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

{#if stateModal.modal?.name === 'payTable'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<div class="paytable-modal-outer">
					<div class="paytable-modal-inner" style="position:relative;">
						<button
							class="paytable-modal-close-btn"
							onclick={() => (stateModal.modal = null)}
							aria-label="Close">
							&times;
						</button>

						{#each [
							{
								name: 'w',
								src: wildImg,
								text: `VS DUEL
	Triggers head-to-head duels.
	Winning side applies multipliers:
	2x · 4x · 5x · 7x · 10x · 15x · 25x · 50x · 100x`
							},
							{
								name: 's',
								src: scatterImg,
								text: `SCATTER
	4 Scatters = 8 Warlord VS Spins
	5 Scatters = 10 Warlord VS Spins
	6 Scatters = 12 Warlord VS Spins
	In bonus: 2 Scatters = +2 spins; 4 Scatters = +4 spins`
							},

							/* ===== HIGH SYMBOLS (GRENADE BANK ROBBERS) ===== */
							{
								name: 'h1',
								src: h1Img,
								text: `SCATTER WOLF RUN
8–9 = 4x
10–11 = 6x
12+ = 12x`
							},
							{
								name: 'h2',
								src: h2Img,
								text: `CASHOUT CASSIDY
8–9 = 3x
10–11 = 5x
12+ = 10x`
							},
							{
								name: 'h3',
								src: h3Img,
								text: `RED BUFFALO BLAZE
8–9 = 2x
10–11 = 4x
12+ = 8x`
							},
							{
								name: 'h4',
								src: h4Img,
								text: `SPIRIT SKULL
8–9 = 1.5x
10–11 = 3x
12+ = 6x`
							},
							{
								name: 'h5',
								src: h3_2Img,
								text: `SHERIFF SILVERTON
8–9 = 1x
10–11 = 2x
12+ = 5x`
							},

							/* ===== LOW SYMBOLS ===== */
							{
								name: 'l1',
								src: l1Img,
								text: `TOMAHAWK SET
8–9 = 0.3x
10–11 = 0.8x
12+ = 1x`
							},
							{
								name: 'l2',
								src: l2Img,
								text: `ENCHANTED HEADDRESS
8–9 = 0.3x
10–11 = 0.8x
12+ = 1x`
							},
							{
								name: 'l3',
								src: l3Img,
								text: `COLT REVOLVER
8–9 = 0.3x
10–11 = 0.8x
12+ = 1x`
							},
							{
								name: 'l4',
								src: l4Img,
								text: `TEEPEE TENT
8–9 = 0.3x
10–11 = 0.8x
12+ = 1x`
							}
						] as symbol}
							<div class="paytable-section">
								<img
									class="paytable-symbol-img"
									src={symbol.src}
									alt={symbol.name}
								/>
								<div class="paytable-desc" style="white-space: pre-line">
									{symbol.text}
								</div>
							</div>
						{/each}

						{@render props.children()}
					</div>
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}


<style>
	.paytable-modal-outer {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9;
	}

	.paytable-modal-inner {
		background: #050505;
		border-radius: 18px;
		box-shadow: 0 4px 32px #228B22;
		max-width: 700px;
		width: 95vw;
		max-height: 90vh;
		overflow-y: auto;
		padding: 32px 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		scrollbar-width: none;
		box-sizing: border-box;
	}

	.paytable-modal-inner::-webkit-scrollbar {
		display: none;
	}

	.paytable-modal-close-btn {
		position: absolute;
		top: 18px;
		right: 24px;
		background: none;
		border: none;
		font-size: 2.5rem;
		color:#228B22;
		cursor: pointer;
		z-index: 2;
		transition: color 0.2s;
	}
	.paytable-modal-close-btn:hover {
		color: #222;
	}

	.paytable-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #020202;
		border-radius: 12px;
		margin-bottom: 24px;
		padding: 20px 12px 16px 12px;
		box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.04);
		width: 100%;
		max-width: 420px;
	}
	.paytable-symbol-img {
		width: 190px;
		height: 190px;
		border-radius: 10px;
		box-shadow: 0 3px 6px 0 #228B22;
		background: #020202;
		margin-bottom: 12px;
	}
	.paytable-desc {
		color: #00fff0;
		font-size: 2rem;
		font-weight: 500;
		text-align: center;
		font-family: 'Crimes Times Six', sans-serif;
		line-height: 1.6;
	}

	@media (max-width: 700px) {
		.paytable-modal-inner {
			max-width: 100vw;
			width: 100vw;
			border-radius: 0;
			padding: 16px 0;
		}
		.paytable-section {
			max-width: 98vw;
			padding: 16px 4vw 12px 4vw;
		}
		.paytable-symbol-img {
			width: 170px;
			height: 170px;
		}
	}
</style>;