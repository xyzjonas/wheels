import type { FuelEntry } from "@/types"
import { round } from "./math"

export const calculateAverageCostPerDistance = (data: FuelEntry[]) => {
    let result = 0
  
    if (data.length <= 0) {
      return 0
    }
  
    data.reduce((prev: FuelEntry, current: FuelEntry) => {
  
      if (current.reset) {
        return current
      }
  
      const distanceDriven = current.odometer - prev.odometer
      const price = current.price / distanceDriven
      if (result === 0) {
        result = price
      } else {
        result = (result + price) / 2
      }
  
      return current
    })
  
    if (result === 0) {
      return 0
    }
  
    return round(result, 2)
  }