<script lang="ts">
    import { Sprite } from 'pixi-svelte';
    export let x: number;
    export let y: number;
    export let scale: number = 1;
</script>

<Sprite
    key="trump"
    {x}
    {y}
    anchor={{ x: 0.5, y: 0.5 }}
    scale={{ x: scale, y: scale }}
/>