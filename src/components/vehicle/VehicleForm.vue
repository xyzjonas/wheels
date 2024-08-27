<template>
  <q-form @submit.prevent="$emit('submit', model)" class="h-full flex flex-col gap-3">
    <q-input filled v-model="model.vin" label="VIN" hint="VIN Number">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-text-number-sign" />
      </template>
    </q-input>

    <q-input filled v-model="model.registration" label="Registration" hint="Registration Number">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-task-edit-01" />
      </template>
    </q-input>

    <q-input filled v-model="model.name" label="Name" hint="Name it anything you like ;)">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-heading-01" />
      </template>
    </q-input>

    <q-input filled v-model="model.model" label="Model" hint="Vehicle brand and model">
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-car-04" />
      </template>
    </q-input>

    <separator class="text-lg mt-5">Attachements</separator>

    <div class="flex gap-2 items-start flex-nowrap">
      <q-img :src="iconUrl" spinner-color="white" width="68px" height="68px" />
      <q-file
        clearable
        filled
        bottom-slots
        use-chips
        v-model="iconFile"
        label="Icon"
        counter
        class="flex-1 max-w-[100%]"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        <template v-slot:file="{ index, file }">
          <q-chip
            color="primary"
            class="text-white max-w-[80%] overflow-hidden"
            @remove="iconFile.value = undefined"
            >{{ file.name.substring(file.name.length - 15, file.name.length) }}</q-chip
          >
        </template>

        <template v-slot:hint>Replace your vehicle's icon image</template>
      </q-file>
      <q-btn
        @click="$emit('uploadIcon', iconFile)"
        unelevated
        :disable="!iconFile"
        color="primary"
        icon="i-hugeicons-cloud-upload"
        class="min-h-[68px]"
        >Upload</q-btn
      >
    </div>

    <separator class="text-lg mt-5">Miscellaneous Settings</separator>

    <q-input
      filled
      v-model="model.setting_color"
      :rules="['anyColor']"
      label="Primary Color"
      hint="Select the theme primary color"
      class="my-input"
    >
      <template v-slot:prepend>
        <div class="w-[24px] h-[24px] rounded-full" :style="`background-color: ${model.setting_color};`"></div>
      </template>
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="model.setting_color" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

    <q-input
      filled
      v-model="model.setting_currency"
      label="Currency Name"
      hint="Set an arbitrary currency label"
    >
      <template v-slot:prepend>
        <q-icon name="i-hugeicons-dollar-02" />
      </template>
    </q-input>

    <q-select
      filled
      v-model="model.setting_currency_position"
      :options="['before', 'after']"
      label="Currency position"
      hint="Whether the currency label is put before or after the number"
    />

    <q-select
      filled
      v-model="model.setting_measurement"
      :options="['metric', 'imperial']"
      label="Measurement"
      hint="Set this car's units to metric or imperial"
    />

    <div class="flex gap-2 mt-auto pt-5">
      <q-btn unelevated label="Submit" type="submit" color="primary" class="flex-1" />
      <q-btn @click="$emit('cancel')" label="go back" color="primary" outline class="flex-1" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useVehicles } from '@/composables/vehicles'
import type { Vehicle } from '@/types'

import Separator from '@/components/Separator.vue'
import { computed, ref } from 'vue'

const { settings, getThumbnail } = useVehicles()
const model = defineModel<Partial<Vehicle>>({ required: true })

const iconFile = ref()
const iconUrl = computed(() => {
  if (iconFile.value) {
    return URL.createObjectURL(iconFile.value)
  }
  return getThumbnail(model.value as any)
})
defineEmits(['submit', 'cancel', 'uploadIcon'])
</script>

<style lang="css" scoped>
.flex-fluid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 0 auto;
}
</style>
