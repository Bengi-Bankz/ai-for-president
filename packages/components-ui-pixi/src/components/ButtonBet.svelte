<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    // Rotation state for the play button
    const playRotation = tweened(0, { duration: 400, easing: cubicOut });
    let playRotationValue = $state(0);
    const ROTATE_AMOUNT = Math.PI / 4; // 45 degrees
    let enticeInterval: any;

    // Entice animation: rotate 45° every 10s, then return to 0
    function enticeRotate() {
        playRotation.set(ROTATE_AMOUNT);
        setTimeout(() => playRotation.set(0), 400);
    }

    onMount(() => {
        enticeInterval = setInterval(enticeRotate, 10000);
        const unsub = playRotation.subscribe(v => playRotationValue = v);
        return () => {
            clearInterval(enticeInterval);
            unsub();
        };
    });
    import { Container, Text, Sprite } from 'pixi-svelte';
    import { Button, type ButtonProps } from 'components-pixi';
    import { OnHotkey } from 'components-shared';
    import { stateBet, stateBetDerived } from 'state-shared';

    import ButtonBetProvider from './ButtonBetProvider.svelte';
    import UiSprite from './UiSprite.svelte';
    import { UI_BASE_FONT_SIZE, UI_BASE_SIZE } from '../constants';
    import { i18nDerived } from '../i18n/i18nDerived';
    import { WHITE, DISABLED_SECONDARY } from 'constants-shared/colors';

    const props: Partial<Omit<ButtonProps, 'children'>> = $props();
    // Removed disabled logic so button is always enabled
    const disabled = $derived(() => false);
    // Make the button larger and round
    const BUTTON_SIZE = UI_BASE_SIZE * 1;
    const sizes = { width: BUTTON_SIZE, height: BUTTON_SIZE };

    // Check if bonus mode is active (any mode other than 'BASE')
    const isBonusActive = $derived(() => {
        return stateBet.activeBetModeKey !== 'BASE';
    });

    // Calculate text color based on state
    const textColor = $derived(() => {
        return disabled ? DISABLED_SECONDARY : WHITE;
    });

    // Use fixed button variant for all states
    const buttonVariant = $derived(() => 'glow-blue');

    // Make the button perfectly round
    const borderRadius = $derived(() => BUTTON_SIZE / 2);
</script>

<ButtonBetProvider>
    {#snippet children({ key, onpress })}
        <OnHotkey hotkey="Space" {onpress} />
        <Button
            {...props}
            {sizes}
            onpress={onpress}
            on:click={() => {
                playRotation.set(playRotationValue + ROTATE_AMOUNT);
                if (typeof onpress === 'function') onpress();
            }}
            class="bet-round-btn"
        >
            {#snippet children({ center, hovered, pressed })}
                <!-- Glowing round background -->
                <UiSprite
                    {...center}
                    anchor={0.5}
                    width={sizes.width}
                    height={sizes.height}
                    borderRadius={borderRadius()}
                    variant={buttonVariant()}
                    state={pressed ? 'pressed' : hovered ? 'hover' : 'normal'}
                />
                
                <!-- Icon and text content -->
                <Container {...center}>
                    {#if ['spin_default', 'spin_disabled'].includes(key)}
                        <Sprite
                            key="play01"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                            scale={0.50}
                            rotation={playRotationValue}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else if key === 'bonus-active'}
                        <Sprite
                            key="stop"
                            anchor={0.5}
                            scale={0.5}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text="Bonus"
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {:else}
                        <Sprite
                            key="stop"
                            width={sizes.width}
                            height={sizes.height}
                            anchor={0.5}
                            scale={0.5}
                        />
                        <Text
                            anchor={0.5}
                            y={BUTTON_SIZE * 0.13}
                            text=""
                            style={{
                                align: 'center',
                                fontFamily: 'bungeeSpice',
                                fontSize: BUTTON_SIZE * 0.4,
                                fill: textColor(),
                                dropShadow: true,
                            }}
                        />
                    {/if}
                </Container>
            {/snippet}
        </Button>
    {/snippet}
</ButtonBetProvider>

