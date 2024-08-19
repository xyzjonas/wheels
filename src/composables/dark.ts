import { useStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'

const isDark = useStorage('theme-dark', false)

export const useDark = () => {
  const $q = useQuasar()
  $q.dark.set(isDark.value)

  const toggle = () => {
    isDark.value = !isDark.value
    $q.dark.set(isDark.value)
  }

  return {
    isDark,
    toggle
  }
}
