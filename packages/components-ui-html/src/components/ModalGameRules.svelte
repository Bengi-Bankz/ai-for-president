<script lang="ts">
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
	import img26 from '../../assets/26.png';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<style>
	:global(h2, h3, p, li) {
		font-family: 'Crimes Times Six', sans-serif;
		color: #FFD700;
	}
	h2 {
		font-size: 2rem;
		font-weight: 600;
		text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
		text-align: center;
	}
	h3 {
		font-size: 1.85rem;
		margin-top: 20px;
		font-weight: 500;
		color: #D2691E;
		text-shadow: 0 0 10px rgba(210, 105, 30, 0.4);
		border-bottom: 2px solid rgba(139, 69, 19, 0.5);
		padding-bottom: 8px;
	}
	p,
	li {
		font-size: 1.25rem;
		line-height: 1.6;
		color: #E8DCC4;
	}
	ul {
		padding-left: 20px;
	}
	.highlight {
		color: #00FF00;
		font-weight: bold;
	}
	.multiplier {
		color: #FF6347;
		font-weight: bold;
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
		background: linear-gradient(
			180deg,
			rgba(30, 15, 5, 0.95) 0%,
			rgba(20, 10, 5, 0.98) 100%
		);
		border: 3px solid #8B4513;
		border-radius: 16px;
		width: 100%;
		max-width: 650px;
		display: block;
		scrollbar-width: none;
		box-shadow:
			0 0 30px rgba(139, 69, 19, 0.4),
			inset 0 0 50px rgba(0, 0, 0, 0.5);
	}
	.modal-rules-scroll::-webkit-scrollbar {
		display: none;
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
		height: 240px;
		width: auto;
	}

	.feature-box {
		background: rgba(0, 0, 0, 0.4);
		border: 2px solid rgba(139, 69, 19, 0.6);
		border-radius: 12px;
		padding: 16px;
		margin: 16px 0;
	}

	.multiplier-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		margin: 12px 0;
	}

	.multiplier-badge {
		background: linear-gradient(135deg, #8B0000 0%, #DC143C 100%);
		color: #FFD700;
		padding: 6px 12px;
		border-radius: 8px;
		font-weight: bold;
		font-size: 1.1rem;
		box-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
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
			height: 360px;
		}
	}
</style>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<div class="modal-rules-scroll">
					<h2>⚔️ COWBOYS VS INDIANS ⚔️</h2>
					<h2>Game Information</h2>

					<section>
						<h3>🎰 How To Play</h3>
						<p>
							Step into the Wild West where Cowboys and Indians battle for glory and gold!
							Land matching symbols in clusters of 8 or more to win. Symbols connect
							horizontally and vertically to form winning clusters.
						</p>
						<p>
							After each win, matching symbols explode and new symbols tumble down,
							giving you multiple chances to win on a single spin!
						</p>
					</section>

					<section>
						<h3>⚔️ VS Duel Multipliers</h3>
						<div class="feature-box">
							<p>
								<span class="highlight">Available in BOTH Base Game and Bonus!</span>
							</p>
							<p>
								When a VS Wild symbol lands, it triggers an epic duel between a Cowboy and an Indian.
								Each fighter carries a random multiplier - the winner's multiplier is applied to your wins!
							</p>
							<div class="multiplier-list">
								<span class="multiplier-badge">2×</span>
								<span class="multiplier-badge">4×</span>
								<span class="multiplier-badge">5×</span>
								<span class="multiplier-badge">7×</span>
								<span class="multiplier-badge">10×</span>
								<span class="multiplier-badge">50×</span>
								<span class="multiplier-badge">100×</span>
							</div>
							<p>
								Multiple duels can occur on the same spin, and their multipliers
								<span class="multiplier">stack together</span> for massive win potential!
							</p>
						</div>
					</section>

					<section>
						<h3>🎯 Warlord VS Spins (Free Spins)</h3>
						<div class="paytable-modal-outer" style="background:none;position:static;width:auto;height:auto;box-shadow:none;">
							<div class="paytable-modal-inner" style="box-shadow:none;max-width:100%;width:100%;padding:0;">
								<div class="paytable-section">
									<div class="bonus-images">
										<div class="scatter-row">
											{#each Array(6) as _, i}
												<img src={img1} alt="Scatter symbol {i + 1}" />
											{/each}
										</div>
										<div class="bonus-row">
											<img src={img26} alt="Warlord VS Spins" />
										</div>
									</div>
									<div class="feature-box">
										<p><b>Trigger:</b> Land <span class="highlight">4, 5, or 6</span> Scatter symbols</p>
										<p><b>Free Spins Awarded:</b></p>
										<ul>
											<li>4 Scatters = <span class="highlight">8 Free Spins</span></li>
											<li>5 Scatters = <span class="highlight">10 Free Spins</span></li>
											<li>6 Scatters = <span class="highlight">12 Free Spins</span></li>
										</ul>
										<p><b>Retriggers:</b></p>
										<ul>
											<li>2 Scatters during bonus = <span class="highlight">+2 Extra Spins</span></li>
											<li>4 Scatters during bonus = <span class="highlight">+4 Extra Spins</span></li>
										</ul>
										<p>
											During Warlord VS Spins, VS Duels appear more frequently and
											multipliers can reach legendary heights!
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section>
						<h3>💰 Buy Bonus</h3>
						<div class="feature-box">
							<p>
								Can't wait for the action? Purchase instant access to <span class="highlight">Warlord VS Spins</span>
								for <span class="multiplier">200× your bet</span>!
							</p>
							<p>
								Jump straight into the heat of battle with guaranteed free spins and
								increased duel frequency.
							</p>
						</div>
					</section>

					<section>
						<h3>🏆 Maximum Win</h3>
						<div class="feature-box">
							<p>
								The maximum possible win is capped at <span class="multiplier">30,000×</span> your bet,
								achievable in both the Base Game and Warlord VS Spins through stacked multipliers!
							</p>
						</div>
					</section>

					<section>
						<h3>📊 RTP (Return to Player)</h3>
						<p><b>Base Game RTP:</b> <span class="highlight">97%</span></p>
						<p><b>Warlord VS Spins RTP:</b> <span class="highlight">97%</span></p>
						<p style="font-size: 1rem; color: #888;">
							RTP represents the theoretical long-term return. Individual sessions may vary significantly.
						</p>
					</section>

					<section>
						<h3>🎮 Game Controls</h3>
						<ul class="button-list">
							<li>
								<img src={img17} alt="Spin" />
								<b>Spin</b> – Start a single round at your chosen bet amount.
							</li>
							<li>
								<img src={img12} alt="Autoplay" />
								<b>Autoplay</b> – Automatically play multiple rounds.
							</li>
							<li>
								<img src={img19} alt="Turbo" />
								<b>Turbo</b> – Speed up animations for faster gameplay.
							</li>
							<li>
								<img src={img13} alt="Bonus Buy" />
								<b>Bonus</b> – Purchase instant access to Warlord VS Spins.
							</li>
							<li>
								<img src={img16} alt="Menu" />
								<b>Menu</b> – Access settings, history, paytable, and game info.
							</li>
						</ul>
					</section>

					<section>
						<h3>⚠️ Important Notice</h3>
						<ul>
							<li>Malfunctions void all plays and pays.</li>
							<li>
								A stable internet connection is required. If disconnected,
								reload the game to continue any incomplete rounds.
							</li>
							<li>
								RTP values are theoretical averages and do not guarantee specific outcomes.
							</li>
						</ul>
					</section>

					<div
						style="margin-top: 24px; text-align: center; font-size: 1rem; color: #8B4513;"
					>
						🤠 Only Spins Studios 🏹
					</div>

					{@render props.children()}
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
