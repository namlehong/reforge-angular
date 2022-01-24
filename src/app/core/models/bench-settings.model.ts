import { BenchModTier } from './bench-mod-tier.model'

export interface BenchSettings {
  category: string
  mod: string[]
  tiers: BenchModTier[]
}
