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
					<div class="paytable-modal-inner">
						<button
							class="paytable-modal-close-btn"
							onclick={() => (stateModal.modal = null)}
							aria-label="Close">
							&times;
						</button>

						<h2 class="paytable-title">⚔️ AWARD TABLE ⚔️</h2>

						<!-- Special Symbols Section -->
						<div class="section-header">SPECIAL SYMBOLS</div>

						{#each [
							{
								name: 'VS DUEL WILD',
								src: wildImg,
								isSpecial: true,
								text: `Triggers head-to-head duels!
The winner's multiplier is applied to your wins.

Available in Base Game & Bonus!

Possible Multipliers:
2× · 4× · 5× · 7× · 10× · 15× · 25× · 50× · 100×`
							},
							{
								name: 'SCATTER',
								src: scatterImg,
								isSpecial: true,
								text: `Triggers Warlord VS Spins!

4 Scatters = 8 Free Spins
5 Scatters = 10 Free Spins
6 Scatters = 12 Free Spins

Retrigger: 2 Scatters = +2 Spins
Retrigger: 4 Scatters = +4 Spins`
							}
						] as symbol}
							<div class="paytable-section special">
								<img
									class="paytable-symbol-img special-img"
									src={symbol.src}
									alt={symbol.name}
								/>
								<div class="symbol-name special-name">{symbol.name}</div>
								<div class="paytable-desc">
									{symbol.text}
								</div>
							</div>
						{/each}

						<!-- High Symbols Section -->
						<div class="section-header">HIGH VALUE SYMBOLS</div>

						{#each [
							{
								name: 'SCATTER WOLF RUN',
								src: h1Img,
								payouts: { low: '4×', mid: '6×', high: '12×' }
							},
							{
								name: 'CASHOUT CASSIDY',
								src: h2Img,
								payouts: { low: '3×', mid: '5×', high: '10×' }
							},
							{
								name: 'RED BUFFALO BLAZE',
								src: h3Img,
								payouts: { low: '2×', mid: '4×', high: '8×' }
							},
							{
								name: 'BINGE BEAR SPIN',
								src: h3_2Img,
								payouts: { low: '1.5×', mid: '3×', high: '6×' }
							},
							{
								name: 'TOMAHAWK SET',
								src: h4Img,
								payouts: { low: '1×', mid: '2×', high: '5×' }
							}
						] as symbol}
							<div class="paytable-section">
								<img
									class="paytable-symbol-img"
									src={symbol.src}
									alt={symbol.name}
								/>
								<div class="symbol-name">{symbol.name}</div>
								<div class="payout-grid">
									<div class="payout-item">
										<span class="cluster-size">8-9</span>
										<span class="payout-value">{symbol.payouts.low}</span>
									</div>
									<div class="payout-item">
										<span class="cluster-size">10-11</span>
										<span class="payout-value">{symbol.payouts.mid}</span>
									</div>
									<div class="payout-item">
										<span class="cluster-size">12+</span>
										<span class="payout-value high">{symbol.payouts.high}</span>
									</div>
								</div>
							</div>
						{/each}

						<!-- Low Symbols Section -->
						<div class="section-header">LOW VALUE SYMBOLS</div>

						{#each [
							{
								name: 'ENCHANTED HEADDRESS',
								src: l1Img,
								payouts: { low: '0.3×', mid: '0.8×', high: '1×' }
							},
							{
								name: 'COLT REVOLVER',
								src: l2Img,
								payouts: { low: '0.3×', mid: '0.8×', high: '1×' }
							},
							{
								name: 'SPIRIT SKULL',
								src: l3Img,
								payouts: { low: '0.3×', mid: '0.8×', high: '1×' }
							},
							{
								name: 'TEEPEE TENT',
								src: l4Img,
								payouts: { low: '0.3×', mid: '0.8×', high: '1×' }
							}
						] as symbol}
							<div class="paytable-section low">
								<img
									class="paytable-symbol-img"
									src={symbol.src}
									alt={symbol.name}
								/>
								<div class="symbol-name">{symbol.name}</div>
								<div class="payout-grid">
									<div class="payout-item">
										<span class="cluster-size">8-9</span>
										<span class="payout-value">{symbol.payouts.low}</span>
									</div>
									<div class="payout-item">
										<span class="cluster-size">10-11</span>
										<span class="payout-value">{symbol.payouts.mid}</span>
									</div>
									<div class="payout-item">
										<span class="cluster-size">12+</span>
										<span class="payout-value">{symbol.payouts.high}</span>
									</div>
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
		background: rgba(0, 0, 0, 0.7);
		z-index: 9;
	}

	.paytable-modal-inner {
		background: linear-gradient(
			180deg,
			rgba(30, 15, 5, 0.98) 0%,
			rgba(20, 10, 5, 0.99) 100%
		);
		border: 3px solid #8B4513;
		border-radius: 18px;
		box-shadow:
			0 0 40px rgba(139, 69, 19, 0.5),
			inset 0 0 60px rgba(0, 0, 0, 0.5);
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
		position: relative;
	}

	.paytable-modal-inner::-webkit-scrollbar {
		display: none;
	}

	.paytable-title {
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 2.2rem;
		color: #FFD700;
		text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
		margin-bottom: 24px;
		text-align: center;
	}

	.section-header {
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 1.4rem;
		color: #D2691E;
		text-shadow: 0 0 10px rgba(210, 105, 30, 0.5);
		margin: 24px 0 16px 0;
		padding: 8px 24px;
		border-bottom: 2px solid rgba(139, 69, 19, 0.6);
		border-top: 2px solid rgba(139, 69, 19, 0.6);
		width: 100%;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
	}

	.paytable-modal-close-btn {
		position: absolute;
		top: 18px;
		right: 24px;
		background: none;
		border: none;
		font-size: 2.5rem;
		color: #D2691E;
		cursor: pointer;
		z-index: 2;
		transition: all 0.2s;
		text-shadow: 0 0 10px rgba(210, 105, 30, 0.5);
	}
	.paytable-modal-close-btn:hover {
		color: #FFD700;
		transform: scale(1.1);
	}

	.paytable-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(
			180deg,
			rgba(40, 20, 10, 0.8) 0%,
			rgba(20, 10, 5, 0.9) 100%
		);
		border: 2px solid rgba(139, 69, 19, 0.5);
		border-radius: 12px;
		margin-bottom: 16px;
		padding: 20px 16px;
		box-shadow:
			0 0 15px rgba(139, 69, 19, 0.2),
			inset 0 0 20px rgba(0, 0, 0, 0.3);
		width: 100%;
		max-width: 420px;
		transition: all 0.3s ease;
	}

	.paytable-section:hover {
		border-color: rgba(210, 105, 30, 0.7);
		box-shadow:
			0 0 25px rgba(210, 105, 30, 0.3),
			inset 0 0 20px rgba(0, 0, 0, 0.3);
		transform: translateY(-2px);
	}

	.paytable-section.special {
		background: linear-gradient(
			180deg,
			rgba(80, 40, 20, 0.9) 0%,
			rgba(40, 20, 10, 0.95) 100%
		);
		border-color: #FFD700;
		box-shadow:
			0 0 20px rgba(255, 215, 0, 0.3),
			inset 0 0 30px rgba(0, 0, 0, 0.4);
	}

	.paytable-section.low {
		max-width: 380px;
	}

	.paytable-symbol-img {
		width: 160px;
		height: 160px;
		border-radius: 10px;
		box-shadow: 0 0 15px rgba(139, 69, 19, 0.5);
		background: rgba(0, 0, 0, 0.3);
		margin-bottom: 12px;
		transition: transform 0.3s ease;
	}

	.paytable-symbol-img.special-img {
		width: 180px;
		height: 180px;
		box-shadow: 0 0 25px rgba(255, 215, 0, 0.4);
	}

	.paytable-section:hover .paytable-symbol-img {
		transform: scale(1.05);
	}

	.symbol-name {
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 1.3rem;
		color: #E8DCC4;
		text-align: center;
		margin-bottom: 12px;
		font-weight: bold;
	}

	.symbol-name.special-name {
		color: #FFD700;
		font-size: 1.5rem;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
	}

	.paytable-desc {
		color: #E8DCC4;
		font-size: 1.1rem;
		font-weight: 500;
		text-align: center;
		font-family: 'Crimes Times Six', sans-serif;
		line-height: 1.5;
		white-space: pre-line;
	}

	.payout-grid {
		display: flex;
		gap: 16px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.payout-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.4);
		padding: 8px 16px;
		border-radius: 8px;
		border: 1px solid rgba(139, 69, 19, 0.4);
	}

	.cluster-size {
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 0.9rem;
		color: #888;
		margin-bottom: 4px;
	}

	.payout-value {
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 1.3rem;
		color: #00FF00;
		font-weight: bold;
		text-shadow: 0 0 8px rgba(0, 255, 0, 0.4);
	}

	.payout-value.high {
		color: #FFD700;
		text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
	}

	@media (max-width: 700px) {
		.paytable-modal-inner {
			max-width: 100vw;
			width: 100vw;
			border-radius: 0;
			padding: 16px 8px;
		}
		.paytable-section {
			max-width: 98vw;
			padding: 16px 8px;
		}
		.paytable-symbol-img {
			width: 140px;
			height: 140px;
		}
		.paytable-symbol-img.special-img {
			width: 160px;
			height: 160px;
		}
		.payout-grid {
			gap: 8px;
		}
		.payout-item {
			padding: 6px 12px;
		}
	}
</style>
