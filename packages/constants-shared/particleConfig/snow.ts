export default {
	alpha: {
		start: 1,
		end: 0.84,
	},
	scale: {
		start: 0.3,
		end: 2.65,
		minimumScaleMultiplier: 0.3,
	},
	color: {
		start: '#00ff00',
		end: '#00ff00ff',
	},
	speed: {
		start: 5,
		end: 5,
		minimumSpeedMultiplier: 1,
	},
	acceleration: {
		x: 1,
		y: 17,
	},
	maxSpeed: 0,
	startRotation: {
		min: 12,
		max: 0,
	},
	noRotation: false,
	rotationSpeed: {
		min: 50,
		max: 100,
	},
	lifetime: {
		min: 40,
		max: 140,
	},
	blendMode: 'add',
	frequency: 0.4,
	emitterLifetime: -1,
	maxParticles: 400,
	pos: {
		x: 0,
		y: 0,
	},
	addAtBack: false,
	spawnType: 'rect',
	spawnRect: {
		x: -500,
		y: 0,
		w: 1000,
		h: 0,
	},
};
