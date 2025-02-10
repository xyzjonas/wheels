
<template>
    <q-btn dense rounded color="secondary" unelevated @click="clickCopy">
        <div class="block content-center w-6 h-6">
            <q-icon name="content_copy" size="14px"></q-icon>
        </div>
    </q-btn>
</template>
    
<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { useQuasar } from 'quasar';

const props = defineProps<{ value: string }>()

const { copy } = useClipboard()

const $q = useQuasar()
const clickCopy = () => {
    copy(props.value)
    $q.notify({
        type: 'positive',
        message: 'Text copied'
    })
}

</script>

<style lang="scss" scoped></style>
