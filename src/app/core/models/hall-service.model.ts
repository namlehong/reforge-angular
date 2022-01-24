import { HallPrice } from './hall-price.model'
import { Category } from './category.model'

export interface HallService {
  id: number
  title: string
  slug: string
  category: number
  tags: string[]
  categoryInfo?: Category
  price?: HallPrice
  is_active?: boolean
}
