export interface Base {
  collectionId: string
  id: string
  created: Date
  updated: Date
}

export interface FuelEntry extends Base {
  odometer: number
  amount: number
  price: number
  price_per_unit: number
  reset: boolean
  full_tank: boolean
  refueled: string
  average?: number
}

export type Category = "maintenance" | "service" | "tax" | "reminder_check"

export interface MaintenanceEntry extends Base {
  date: string
  odometer: number
  price: number
  description: string
  body: string
  attachements: string[]
  category: Category
}

export interface CreateMaintenanceEntry
  extends Omit<MaintenanceEntry, 'id' | 'created' | 'updated' | 'collectionId'> {}


export type SettingMeasurement = 'metric' | 'imperial'
export type SettingCurrencyPosition = 'before' | 'after'

export interface CreateFuelEntry
  extends Omit<FuelEntry, 'id' | 'created' | 'updated' | 'collectionId'> {}

export interface Vehicle extends Base {
  name: string
  model: string
  registration: string
  vin: string
  icon: string
  fuel_entries: string[]
  maintenance_entries: string[],
  expand?: {
    fuel_entries: FuelEntry[],
    maintenance_entries: MaintenanceEntry[],
  }
  purchased: string
  purchased_price: number
  purchased_odometer: number

  setting_color?: string
  setting_currency?: string
  setting_measurement?: SettingMeasurement
  setting_currency_position?: SettingCurrencyPosition
}

export interface PbFetchError {
  url: string
  status: number
  isAbort: boolean
  name: string
  stack: string
  message: string
}
