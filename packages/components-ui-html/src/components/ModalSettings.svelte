<script lang="ts">
    import { zIndex } from 'constants-shared/zIndex';
    import { Popup } from 'components-shared';
    import { stateModal, stateSound } from 'state-shared';

    import BaseTitle from './BaseTitle.svelte';
    import BaseContent from './BaseContent.svelte';
    import BaseScrollable from './BaseScrollable.svelte';
    import ModalSettingsSound from './ModalSettingsSound.svelte';
    import { i18nDerived } from '../i18n/i18nDerived';
</script>

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
                </div>
            </BaseScrollable>
        </BaseContent>
    </Popup>
{/if}