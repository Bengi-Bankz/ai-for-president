<script lang="ts">
	import Amount from './../../../components-pixi/src/components/Amount.svelte';
	import SpineSlot from './../../../pixi-svelte/src/lib/components/SpineSlot.svelte';
	import type { Snippet } from 'svelte';

	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import img12 from '../../assets/12.png';
	import img13 from '../../assets/13.png';
	import img16 from '../../assets/16.png';
	import img17 from '../../assets/17.png';
	import img19 from '../../assets/19.png';
	import img1 from '../../assets/1.png';
	import img24 from '../../assets/24.png';
	import img25 from '../../assets/25.png';
	import img26 from '../../assets/26.png';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<style>
	:global(h2, h3, p, li) {
		font-family: 'BungeeSpice-Regular', sans-serif;
		color: #00fff0;
	}
	h2 {
		font-size: 2rem;
		font-weight: 600;
	}
	h3 {
		font-size: 1.85rem;
		margin-top: 16px;
		font-weight: 500;
	}
	p,
	li {
		font-size: 1.25rem;
		line-height: 1.5;
	}
	ul {
		padding-left: 20px;
	}
	.button-list {
		margin: 12px 0;
		padding-left: 20px;
	}
	.button-list li {
		margin-bottom: 6px;
	}
	.button-list img {
		height: 96px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.modal-rules-scroll {
		max-height: 70vh;
		overflow-y: auto;
		padding: 24px 16px;
		box-sizing: border-box;
		margin: 48px auto 24px auto;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 16px;
		width: 100%;
		max-width: 600px;
		display: block;
		scrollbar-width: none; /* Firefox */
	}
	.modal-rules-scroll::-webkit-scrollbar {
		display: none; /* Chrome, Safari */
	}

	.bonus-images {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 16px 0;
		align-items: center;
		justify-content: center;
	}

	.scatter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		align-items: center;
		justify-content: center;
	}

	.bonus-row {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.scatter-row img {
		height: 80px;
		width: auto;
	}

	.bonus-row img {
		height: 240px; /* 3 times larger than 80px */
		width: auto;
	}

	@media (max-width: 700px) {
		.modal-rules-scroll {
			max-height: 80vh;
			margin: 16px 0;
			padding: 16px 8px;
			border-radius: 8px;
		}
		.button-list img {
			height: 66px;
			margin-right: 6px;
		}
		.scatter-row img {
			height: 120px;
		}
		.bonus-row img {
			height: 360px; /* 3 times larger than 120px */
		}
	}
</style>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<div class="modal-rules-scroll">
					<h2>DEAF PRESIDENTS</h2>
					<h2> Game Information</h2>

					<section>
						<h3>Theoretical RTP (Return to Player)</h3>
						<p>
							The RTP (Return to Player) represents the expected average return
							over long-term play. All outcomes are determined by chance, so
							individual sessions may vary.
						</p>
						<p><b>RTP Base Game:</b> 97%</p>
						<p><b>RTP Did Not Inhale Spins:</b> 97%</p>
						<p><b>RTP Honest Abe Spins:</b> 97%</p>
						<p><b>RTP Osama Killer Spins:</b> 97%</p>
					</section>

					<section>
						<h3>Bonus Features</h3>
						<div class="paytable-modal-outer" style="background:none;position:static;width:auto;height:auto;box-shadow:none;">
							<div class="paytable-modal-inner" style="box-shadow:none;max-width:100%;width:100%;padding:0;">
								<div class="paytable-section">
									<h3>Did Not Inhale Spins</h3>
									<div class="bonus-images">
										<div class="scatter-row">
											{#each Array(4) as _, i}
												<img src={img1} alt="Scatter symbol {i + 1}" />
											{/each}
										</div>
										<div class="bonus-row">
											<img src={img26} alt="Did Not Inhale Spins" />
										</div>
									</div>
									<div class="paytable-desc" style="font-size:1.25rem;">Trigger: Land 4 scatter symbols<br>Free Spins: 8<br>Purchase Amount: <b>100×</b><br><br>Take your shot at the bonus round with a lighthearted twist! Landing 4 scatters awards Did Not Inhale Spins, giving you a batch of free spins with boosted win potential. Watch the reels heat up as bonus symbols stack and multipliers rise — your chance to spin your way toward that massive 10,000× max award begins here.</div>
								</div>
								<div class="paytable-section">
									<h3>Honest Abe Spins</h3>
									<div class="bonus-images">
										<div class="scatter-row">
											{#each Array(5) as _, i}
												<img src={img1} alt="Scatter symbol {i + 1}" />
											{/each}
										</div>
										<div class="bonus-row">
											<img src={img24} alt="Honest Abe Spins" />
										</div>
									</div>
									<div class="paytable-desc" style="font-size:1.25rem;">Trigger: Land 5 scatter symbols<br>Free Spins: 10<br>Purchase Amount: <b>200×</b><br><br>Honesty is the key! Hit 5 scatters to unlock Honest Abe Spins, where the rewards climb even higher. More spins, better odds, and an extra chance for huge multipliers on top-winning combinations. Every spin could bring you closer to the game’s ultimate 10,000× Award cap — stay true, and let the reels deliver.</div>
								</div>
								<div class="paytable-section">
									<h3>Osama Killer Spins</h3>
									<div class="bonus-images">
										<div class="scatter-row">
											{#each Array(6) as _, i}
												<img src={img1} alt="Scatter symbol {i + 1}" />
											{/each}
										</div>
										<div class="bonus-row">
											<img src={img25} alt="Osama Killer Spins" />
										</div>
									</div>
									<div class="paytable-desc" style="font-size:1.25rem;">Trigger: Land 6 scatter symbols<br>Free Spins: 12<br>Purchase Amount: <b>500×</b><br><br>The top-tier bonus for the bold! Land 6 scatters to trigger Osama Killer Spins, the most powerful feature in the game. Packed with enhanced multipliers and maximum spin potential, this round delivers explosive win opportunities with every reel. Reach for that 10,000× max award — it’s the ultimate victory spin!</div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<h3>Maximum Award</h3>
						<p>
							The maximum possible Award is capped at <b>10,000× </b>.
						</p>
						<p><b>Max Award Base Game:</b> 10,000×</p>
						<p><b>Max Award Did Not Inhale Spins:</b> 10,000×</p>
						<p><b>Max Award Honest Abe Spins:</b> 10,000×</p>
						<p><b>Max Award Osama Killer Spins:</b> 10,000×</p>
					</section>

					<section>
						<h3>Game Controls</h3>
						<ul class="button-list">
							<li>
								<img src={img17} alt="Spin" />
								<b>Spin</b> – Plays a single round at the chosen Amount.
							</li>
							<li>
								<img src={img12} alt="Autoplay" />
								<b>Autoplay</b> – Plays multiple rounds automatically.
							</li>
							<li>
								<img src={img19} alt="Turbo" />
								<b>Turbo</b> – Speeds up animations for faster play.
							</li>
							<li>
								<img src={img13} alt="Bonus Buy" />
								<b>Bonus</b> – Instantly enters the bonus feature for 200×.
							</li>
							<li>
								<img src={img16} alt="Menu" />
								<b>Menu</b> – Opens sound settings, Awardtable, and game Info.
							</li>
						</ul>
					</section>

					<section>
						<h3>Important Notice</h3>
						<ul>
							<li>Malfunctions void all results.</li>
							<li>
								A stable internet connection is required. If disconnected, reload the game
								to continue incomplete rounds.
							</li>
							<li>
								Theoretical values (such as RTP) are averages and do not guarantee
								individual outcomes.
							</li>
						</ul>
					</section>

					<div
						style="margin-top: 24px; text-align: right; font-size: 0.95rem; color: #888;"
					>
						Only Spins Studios
					</div>

					{@render props.children()}
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
