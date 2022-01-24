import { HallService } from './hall-service.model'
import { Category } from './category.model'

export interface UserService {
  id: string
  service: number
  league: number
  user: number
  tags: string[]
  options: any
  price: string
  chaos_equivalent: number
  ex_equivalent: number
  is_active: boolean
  dateLoaded?: any
  item_level: number
  profile?: any
  username?: string
  serviceInfo?: HallService
  categoryInfo?: Category
  created_at?: string
  approved?: number
}
