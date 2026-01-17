<script lang="ts">
    import { zIndex } from 'constants-shared/zIndex';
    import { Popup } from 'components-shared';
    import { stateModal, stateSound } from 'state-shared';

    import BaseTitle from './BaseTitle.svelte';
    import BaseContent from './BaseContent.svelte';
    import BaseScrollable from './BaseScrollable.svelte';
    import ModalSettingsSound from './ModalSettingsSound.svelte';
    import { i18nDerived } from '../i18n/i18nDerived';

    function openGameHistory() {
        stateModal.modal = { name: 'gameHistory' };
    }
</script>

<style>
    .history-button {
        font-family: 'BungeeSpice-Regular', sans-serif;
        background: linear-gradient(135deg, #00fff0 0%, #00bfa5 100%);
        color: #000;
        border: none;
        padding: 12px 24px;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0, 255, 240, 0.3);
    }

    .history-button:hover {
        background: linear-gradient(135deg, #00ffff 0%, #00d4b8 100%);
        box-shadow: 0 6px 16px rgba(0, 255, 240, 0.5);
        transform: translateY(-2px);
    }

    .history-button:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 255, 240, 0.4);
    }
</style>

{#if stateModal.modal?.name === 'settings'}
    <Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
        <BaseContent maxWidth="100%">
            <BaseTitle>{i18nDerived.settings()}</BaseTitle>
            <BaseScrollable type="column">
                <div class="flex flex-col gap-4 min-w-[220px] sm:min-w-[360px] md:min-w-[480px]">

                    <ModalSettingsSound bind:value={stateSound.volumeValueMaster}>
                        {i18nDerived.masterVolume()}
                    </ModalSettingsSound>

                    <ModalSettingsSound bind:value={stateSound.volumeValueMusic}>
                        {i18nDerived.musicVolume()}
                    </ModalSettingsSound>

                    <ModalSettingsSound bind:value={stateSound.volumeValueSoundEffect}>
                        {i18nDerived.soundEffectVolume()}
                    </ModalSettingsSound>

                    <button
                        class="history-button"
                        onclick={openGameHistory}
                    >
                        Game History
                    </button>
                </div>
            </BaseScrollable>
        </BaseContent>
    </Popup>
{/if}