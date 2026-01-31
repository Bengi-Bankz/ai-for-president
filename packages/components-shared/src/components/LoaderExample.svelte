<script lang="ts">
	import { onDestroy } from 'svelte';

	type Props = {
		src?: string;
		timeout?: number;
	};

	const props: Props = $props();

	const timeoutMs = props.timeout ?? 5000;
	let loading = $state(true);

	const timer = setTimeout(() => {
		loading = false;
	}, timeoutMs);

	onDestroy(() => clearTimeout(timer));
</script>

{#if loading}
	<div class="rdr-loader-demo" aria-live="polite" aria-label="Loading">
		<div class="rdr-brand">
			<div class="rdr-revolver-loader" aria-hidden="true">
				<div class="rdr-hammer"></div>

				<div class="rdr-smoke-container">
					<div class="rdr-smoke"></div>
					<div class="rdr-smoke"></div>
				</div>

				<div class="rdr-sparks">
					<div class="rdr-spark"></div>
					<div class="rdr-spark"></div>
					<div class="rdr-spark"></div>
				</div>

				<svg class="rdr-ring-svg" viewBox="0 0 100 100">
					<circle class="rdr-ring-bg" cx="50" cy="50" r="45"></circle>
					<circle class="rdr-ring-fill" cx="50" cy="50" r="45"></circle>
				</svg>

				<div class="rdr-cylinder">
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
					<div class="rdr-chamber">
						<div class="rdr-bullet"></div>
						<div class="rdr-dead-eye-x"></div>
					</div>
				</div>
			</div>

			<div class="rdr-brand-text" aria-label="Only Spins Studios">
				<span class="rdr-brand-main">Only Spins</span>
				<span class="rdr-brand-sub">Studios</span>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.rdr-loader-demo {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #000;
		z-index: 999;
	}

	.rdr-brand {
		display: flex;
		align-items: center;
		gap: 1.2em;
		color: #ffffff;
		filter: none;
		mix-blend-mode: normal;
	}

	.rdr-revolver-loader {
		--rdr-red: #e40000;
		--rdr-red-dark: #8a0000;
		--rdr-brass: #d4af37;
		--rdr-brass-dark: #997c1f;
		--rdr-metal: #1f1f1f;
		--rdr-metal-highlight: #3b3b3b;
		--rdr-paper: #f0f0f0;
		--rdr-smoke: rgba(200, 200, 200, 0.12);
		--rdr-spark: #ffb100;
		--rdr-size: 8.5em;

		position: relative;
		width: var(--rdr-size);
		height: var(--rdr-size);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		animation: rdr-recoil-shock 4.5s ease-out infinite;
	}

	.rdr-hammer {
		position: absolute;
		top: -15%;
		width: 1.5em;
		height: 4em;
		background: linear-gradient(to bottom, #222, #000);
		border: 1px solid #333;
		border-radius: 4px;
		z-index: 0;
		transform-origin: bottom center;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
		animation: rdr-hammer-action 4.5s infinite;
	}

	.rdr-ring-svg {
		position: absolute;
		width: 110%;
		height: 110%;
		transform: rotate(-90deg);
		z-index: 1;
		filter: drop-shadow(0 0 4px black);
	}

	.rdr-ring-bg {
		fill: none;
		stroke: rgba(255, 255, 255, 0.05);
		stroke-width: 1;
	}

	.rdr-ring-fill {
		fill: none;
		stroke: var(--rdr-red);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-dasharray: 283;
		stroke-dashoffset: 283;
		animation: rdr-fill-ring 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	.rdr-smoke-container {
		position: absolute;
		top: -30%;
		left: 50%;
		width: 100%;
		height: 100%;
		transform: translateX(-50%);
		pointer-events: none;
		z-index: 0;
	}

	.rdr-smoke {
		position: absolute;
		bottom: 50%;
		left: 50%;
		width: 2em;
		height: 4em;
		background: radial-gradient(ellipse at center, var(--rdr-smoke) 0%, transparent 70%);
		border-radius: 50%;
		opacity: 0;
		transform-origin: bottom center;
		animation: rdr-smoke-rise 4.5s ease-out infinite;
		filter: blur(5px);
	}

	.rdr-smoke:nth-child(2) {
		width: 3.5em;
		left: 40%;
		animation-delay: 2.2s;
	}

	.rdr-sparks {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 5;
	}

	.rdr-spark {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 3px;
		height: 1px;
		background: var(--rdr-spark);
		box-shadow: 0 0 4px var(--rdr-spark);
		opacity: 0;
		animation: rdr-spark-fly 4.5s linear infinite;
	}

	.rdr-spark:nth-child(1) {
		transform: rotate(15deg);
		animation-delay: 1.6s;
	}
	.rdr-spark:nth-child(2) {
		transform: rotate(-45deg);
		animation-delay: 1.7s;
	}
	.rdr-spark:nth-child(3) {
		transform: rotate(80deg);
		animation-delay: 1.65s;
	}

	.rdr-cylinder {
		position: relative;
		width: 60%;
		height: 60%;
		background: radial-gradient(circle at 30% 30%, var(--rdr-metal-highlight), var(--rdr-metal));
		border-radius: 50%;
		border: 1px solid #000;
		box-shadow: inset 0 0 2em #000, 0 1em 2em rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: rdr-spin-cylinder 4.5s cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
		z-index: 2;
	}

	.rdr-cylinder::before {
		content: '';
		position: absolute;
		top: 2%;
		left: 2%;
		right: 2%;
		bottom: 2%;
		border-radius: 50%;
		border: 1px dashed rgba(255, 255, 255, 0.05);
		pointer-events: none;
	}

	.rdr-cylinder::after {
		content: '';
		position: absolute;
		width: 1.4em;
		height: 1.4em;
		background: radial-gradient(circle, #444, #111);
		border: 1px solid #222;
		border-radius: 50%;
		box-shadow: 0 0 0.5em #000;
		z-index: 4;
	}

	.rdr-chamber {
		position: absolute;
		width: 1.9em;
		height: 1.9em;
		background-color: #050505;
		border-radius: 50%;
		box-shadow: inset 1px 1px 4px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.05);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.rdr-chamber:nth-child(1) {
		transform: rotate(0deg) translate(2.3em) rotate(0deg);
	}
	.rdr-chamber:nth-child(2) {
		transform: rotate(60deg) translate(2.3em) rotate(-60deg);
	}
	.rdr-chamber:nth-child(3) {
		transform: rotate(120deg) translate(2.3em) rotate(-120deg);
	}
	.rdr-chamber:nth-child(4) {
		transform: rotate(180deg) translate(2.3em) rotate(-180deg);
	}
	.rdr-chamber:nth-child(5) {
		transform: rotate(240deg) translate(2.3em) rotate(-240deg);
	}
	.rdr-chamber:nth-child(6) {
		transform: rotate(300deg) translate(2.3em) rotate(-300deg);
	}

	.rdr-bullet {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: radial-gradient(circle, var(--rdr-brass) 30%, var(--rdr-brass-dark) 70%);
		position: relative;
		transform: scale(0);
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
		animation: rdr-load-bullet 4.5s infinite;
	}

	.rdr-bullet::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 35%;
		height: 35%;
		background: radial-gradient(circle, #e0e0e0, #888);
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.3);
		box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.2);
	}

	.rdr-dead-eye-x {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 5;
		opacity: 0;
		animation: rdr-paint-x 4.5s infinite;
	}

	.rdr-dead-eye-x::before,
	.rdr-dead-eye-x::after {
		content: '';
		position: absolute;
		width: 80%;
		height: 3px;
		background-color: #ff0000;
		border-radius: 2px;
		box-shadow: 0 0 4px #ff0000;
	}
	.rdr-dead-eye-x::before {
		transform: rotate(45deg);
	}
	.rdr-dead-eye-x::after {
		transform: rotate(-45deg);
	}

	.rdr-chamber:nth-child(1) .rdr-bullet,
	.rdr-chamber:nth-child(1) .rdr-dead-eye-x {
		animation-delay: 0.1s;
	}
	.rdr-chamber:nth-child(2) .rdr-bullet,
	.rdr-chamber:nth-child(2) .rdr-dead-eye-x {
		animation-delay: 0.2s;
	}
	.rdr-chamber:nth-child(3) .rdr-bullet,
	.rdr-chamber:nth-child(3) .rdr-dead-eye-x {
		animation-delay: 0.3s;
	}
	.rdr-chamber:nth-child(4) .rdr-bullet,
	.rdr-chamber:nth-child(4) .rdr-dead-eye-x {
		animation-delay: 0.4s;
	}
	.rdr-chamber:nth-child(5) .rdr-bullet,
	.rdr-chamber:nth-child(5) .rdr-dead-eye-x {
		animation-delay: 0.5s;
	}
	.rdr-chamber:nth-child(6) .rdr-bullet,
	.rdr-chamber:nth-child(6) .rdr-dead-eye-x {
		animation-delay: 0.6s;
	}

	.rdr-brand-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 900;
		font-family: 'Segoe UI', system-ui, sans-serif;
		text-shadow: 0 2px 0 #000, 0 0 12px rgba(255, 255, 255, 0.15);
		opacity: 1;
		z-index: 6;
		mix-blend-mode: normal;
	}

	.rdr-brand-main {
		color: #ffffff;
		font-size: 3.1em;
		line-height: 1;
		letter-spacing: 0.08em;
	}

	.rdr-brand-sub {
		color: #ff2b2b;
		font-size: 1.1em;
		letter-spacing: 0.32em;
		margin-top: 0.25em;
		animation: rdr-fade-text 2s ease-in-out infinite alternate;
	}

	@keyframes rdr-recoil-shock {
		0%,
		54% {
			transform: translateY(0) rotate(0);
		}
		55% {
			transform: translateY(2px) rotate(1deg);
		}
		58% {
			transform: translateY(-1px) rotate(-0.5deg);
		}
		62% {
			transform: translateY(0) rotate(0);
		}
	}

	@keyframes rdr-hammer-action {
		0% {
			transform: translateY(0);
		}
		10% {
			transform: translateY(1.5em) rotate(-10deg);
		}
		15% {
			transform: translateY(1.5em) rotate(-10deg);
		}
		35% {
			transform: translateY(0) rotate(0);
		}
		100% {
			transform: translateY(0);
		}
	}

	@keyframes rdr-spin-cylinder {
		0% {
			transform: rotate(0deg);
		}
		15% {
			transform: rotate(-60deg);
		}
		40% {
			transform: rotate(720deg);
		}
		55% {
			transform: rotate(720deg);
		}
		100% {
			transform: rotate(720deg);
		}
	}

	@keyframes rdr-fill-ring {
		0%,
		50% {
			stroke-dashoffset: 283;
		}
		90% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes rdr-load-bullet {
		0%,
		55% {
			transform: scale(0);
			opacity: 0;
		}
		60% {
			transform: scale(1);
			opacity: 1;
		}
		65% {
			transform: scale(0.9);
		}
		90% {
			transform: scale(0.9);
			opacity: 1;
		}
		95% {
			transform: scale(0);
			opacity: 0;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}

	@keyframes rdr-paint-x {
		0%,
		60% {
			opacity: 0;
			transform: scale(1.5);
		}
		62% {
			opacity: 1;
			transform: scale(1);
		}
		75% {
			opacity: 1;
		}
		85% {
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes rdr-spark-fly {
		0%,
		35% {
			transform: translate(0, 0) scale(0);
			opacity: 0;
		}
		36% {
			opacity: 1;
			transform: translate(0, 0) scale(1);
		}
		45% {
			transform: translate(60px, -60px) scale(0);
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes rdr-smoke-rise {
		0% {
			transform: translateX(-50%) translateY(0) scale(0.5);
			opacity: 0;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			transform: translateX(-50%) translateY(-30px) scale(1.5);
			opacity: 0;
		}
	}

	@keyframes rdr-fade-text {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 1;
		}
	}
</style>
