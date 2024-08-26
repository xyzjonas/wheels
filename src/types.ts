export interface Base {
  collectionId: string;
  id: string;
  created: Date;
  updated: Date;
}

export interface FuelEntry extends Base {
  odometer: number;
  amount: number;
  price: number;
  price_per_unit: number;
  reset: boolean;
  full_tank: boolean;
  refueled: Date;
}

export interface Vehicle extends Base {
  name: string;
  model: string;
  registration: string;
  vin: string;
  icon: string;
  fuel_entries: string[];
  expand?: {
    fuel_entries: FuelEntry[];
  }
}