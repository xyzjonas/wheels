import type { PbFetchError } from '@/types'
import { useQuasar } from 'quasar'
import { ref } from 'vue'

const isOffline = ref(false)

export const useApi = () => {
  const $q = useQuasar()

  async function errorNotify(err: unknown) {
    const details = err as PbFetchError

    let message: string = 'Something wrong happened...'

    if (!details.status) {
      isOffline.value = true
      message = 'You are offline!'
    } else {
      isOffline.value = false
    }

    if (details.status >= 500) {
      message = 'Server error, this is not your fault.'
    } else if (details.status >= 400) {
      message = `Client error, ${details.message.toLowerCase()}`
    }

    $q.notify({
      type: 'negative',
      message: message
    })

    throw err
  }

  return {
    isOffline,
    errorNotify
  }
}
