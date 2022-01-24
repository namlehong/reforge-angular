import { HarvestTarget } from './harvest-target.enum'

export class HarvestOperation {
  static readonly AUGMENT = new HarvestOperation('Augment')
  static readonly AUGMENT_LUCKY = new HarvestOperation('Augment Lucky')
  static readonly RANDOMISE = new HarvestOperation('Randomise')
  static readonly REFORGE = new HarvestOperation('Reforge')
  static readonly REMOVE = new HarvestOperation('Remove')
  static readonly REMOVE_ADD = new HarvestOperation('Remove/Add')
  static readonly REMOVE_NON_ADD = new HarvestOperation('Remove non/Add')
  static readonly CHANGE_RESIST = new HarvestOperation('Change Resist', [
    'Cold resist to Fire resist',
    'Cold resist to Lightning resist',
    'Fire resist to Cold resist',
    'Fire resist to Lightning resist',
    'Lightning resist to Cold resist',
    'Lightning resist to Fire resist',
  ])
  static readonly EXCHANGE = new HarvestOperation('Exchange item', [
    'Harbinger Unique or Unique Piece into random Beachhead Map',
    'Map to another same tier map, prioritising Maps you have not yet completed',
    'Pale Court Key into another',
    'Sacrifice or Mortal Fragment',
    'Unique into a random unique Ring, Amulet or Belt',
    'Unique into random unique',
    'Elder Fragment',
    'Offering to the Goddess into a Dedication to the Goddess',
    'Offering to the Goddess into a Gift to the Goddess',
    'Offering to the Goddess into a Tribute to the Goddess',
    'Breach splinters into Breachstone',
    'Catalysts',
    'Delirium Orbs',
    'Divination Cards',
    'Essences',
    'Fossil',
    'Gem',
    'Oils',
    'Scarab',
    'Shaper Fragment',
    'Timeless splinters into Timeless Emblem',
    'Unique armour into another',
    'Unique Bestiary item',
    'Unique item into another',
    'Unique Jewel into another',
    'Unique Ring, Amulet or Belt',
    'Unique Weapon into another',
  ])
  static readonly ENCHANT_MAP = new HarvestOperation('Enchant Map', [
    "Has an additional modifier from Zana's crafting bench at random",
    'Map boss is surrounded by Tormented Spirits',
    "Map doesn't consume Sextant charges",
    'Map has a Vaal Side Area',
  ])
  static readonly ENCHANT_FLASK = new HarvestOperation('Enchant Flask', [
    'Flask increases its Duration',
    'Flask increases its Effect',
    'Flask increases its Maximum Charges',
    'Flask reduces its Charges used',
  ])
  static readonly ENCHANT_WEAPON = new HarvestOperation('Enchant Weapon', [
    'melee Weapon Range',
    'Accuracy',
    'Area of Effect',
    'Attack speed',
    'Critical Strike Chance',
    'Elemental Damage',
  ])
  static readonly ENCHANT_BODY_ARMOUR = new HarvestOperation('Enchant Body Armour', [
    '+ Dexterity',
    '+ Intelligent',
    '+ Strength',
    '+ Maximum Life',
    '+ Maximum Mana',
    '+% cold resist',
    '+% fire resist',
    '+% lightning resist',
  ])
  static readonly FRACTURE = new HarvestOperation('Fracture', [
    '5 mods',
    '3 mods on prefix',
    '3 mods on suffix',
  ])
  static readonly IMPLICIT = new HarvestOperation('Set Implicit', [
    'Abyss or Timeless Jewel',
    'Cluster Jewel',
    'Cobalt, Crimson, Viridian or Prismatic Jewel',
  ])
  static readonly QUALITY = new HarvestOperation('Add Quality', [
    '10% to flask (max 20%)',
    '10% to gem (max 20%)',
  ])
  static readonly REFORGE_SPECIAL = new HarvestOperation('Reforge Special', [
    'Rare item with lucky modifiers, keeping all Prefixes',
    'keeping all Prefixes',
    'Rare item with lucky modifiers, keeping all Suffixes',
    'keeping all Suffixes',
    'Colours of sockets on an item 10 times',
    'Links between sockets on an item 10 times',
    '3 random sockets, turning them Red, Green and Blue',
    '2 random sockets, turning them Blue and Green',
    '2 random sockets, turning them Red and Green',
    '2 random sockets, turning them Blue and Red',
    'a non-Blue socket, turning it Blue',
    'a non-Red socket, turning it Red',
    'a non-Green socket, turning it Green',
    'a random socket, turning it White',
    'linking 5 sockets',
    'linking 6 sockets',
  ])
  static readonly EXCHANGE_SPECIAL = new HarvestOperation('Exchange Special')

  private constructor(
    public readonly value: string,
    public readonly opts: any[] = Object.keys(HarvestTarget).map(k => HarvestTarget[k]),
  ) {}

  toString() {
    return this.value
  }
}
