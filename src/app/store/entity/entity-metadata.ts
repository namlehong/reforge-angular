import { EntityMetadataMap, PropsFilterFnFactory } from '@ngrx/data'
import { HallService, UserService } from 'src/app/core/models'

function titleFilter(entities: HallService[], pattern: string) {
  let newPattern = pattern
    .split(' ')
    .filter(i => !!i)
    .map(i => `(?=.*${i})`)
    .join('')

  newPattern = newPattern ? `^${newPattern}` : ''

  return PropsFilterFnFactory<HallService>(['title'])(entities, newPattern)
}

function serviceIdFilter(entities: UserService[], ids: number[]) {
  console.log('serviceIdFilter', ids)
  return entities.filter(i => ids.includes(i.service))
}

const entityMetadata: EntityMetadataMap = {
  League: {},
  Currency: {},
  Category: {},
  WpCategory: {},
  WpPost: {},
  HallService: {
    filterFn: titleFilter,
  },
  HallPrice: {},
  UserService: {},
  UserServiceBeta: {
    filterFn: serviceIdFilter,
  },
  MyService: {},
  Profile: {
    selectId: model => model.username,
  },
  Vouch: {},
}

// because the plural of "hero" is not "heros"
const pluralNames = {
  // Hero: 'Heroes',
  // HallService: 'hall-services',
}

export const entityConfig = {
  entityMetadata,
  pluralNames,
}
