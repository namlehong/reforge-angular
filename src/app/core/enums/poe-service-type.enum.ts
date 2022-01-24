import { SyndicateMaster } from './syndicate-master.enum'
import { SyndicateDivision } from './syndicate-division.enum'
import { SyndicateTier } from './syndicate-tier.enum'
import { TempleRoom } from './temple-room.enum'
import { Boss } from './boss.enum'
import { HarvestCraft } from './harvest-craft.enum'
import { GenericService } from './generic-service.enum'

export class PoeServiceType {
  static readonly GENERIC = new PoeServiceType('generic', 'Generic')
  static readonly BENCH_CRAFT = new PoeServiceType('bench_craft', 'Bench Craft')
  static readonly HARVEST = new PoeServiceType('harvest', 'Harvest')
  static readonly SYNDICATE = new PoeServiceType('syndicate', 'Syndicate (Jun)')
  static readonly TEMPLE = new PoeServiceType('temple', 'Temple (Alva)')
  static readonly BOSSING = new PoeServiceType('bossing', 'Boss Carry')
  static readonly ADVANCED = new PoeServiceType('advanced', 'Advanced')
  static readonly FRACTURE = new PoeServiceType('fracture', 'Fracture Fossil')
  static readonly BEAST_SPLIT = new PoeServiceType('split', 'Beast Split')
  static readonly MIRROR = new PoeServiceType('mirror', 'Mirror')
  static readonly ENCHANT = new PoeServiceType('enchant', 'Enchant')
  // static readonly BULK = 'bulk'
  // static readonly CHALLENGE = 'challenge'

  static readonly OPTS: PoeServiceType[] = [
    PoeServiceType.GENERIC,
    PoeServiceType.BENCH_CRAFT,
    PoeServiceType.HARVEST,
    PoeServiceType.BOSSING,
  ]

  static readonly MAP: { [key: string]: PoeServiceType } = PoeServiceType.OPTS.reduce(
    (a, b) => Object.assign(a, { [b.value]: b }),
    {},
  )

  private constructor(public readonly value: string, public readonly label: string) {}

  toString() {
    return this.value
  }
}
