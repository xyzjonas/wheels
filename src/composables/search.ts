import type { MaintenanceEntry } from '@/types'
import { Fzf } from 'fzf'

export const useFzfSearch = () => {
  function search(term: string, results: MaintenanceEntry[]) {
    const fzf = new Fzf(results, {
      selector: (item) => item.description
    })
    const preppedTerm = term.toLowerCase().split(" ").join("")
    return fzf.find(preppedTerm).map(match => match.item)
  }

  return {
    search
  }
}
