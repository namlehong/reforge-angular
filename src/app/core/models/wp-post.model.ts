export interface WpPostContent {
  protected?: boolean
  rendered: string
}

export interface WpPost {
  author: number
  categories: number[]
  comment_status: string
  content: WpPostContent
  date: string
  date_gmt: string
  excerpt: WpPostContent
  featured_media: number
  format: string
  guid: any
  id: number
  jetpack_featured_media_url: string
  link: string
  meta: any
  modified: string
  modified_gmt: string
  ping_status: string
  slug: string
  status: string
  sticky: boolean
  tags: any[]
  template: string
  title: WpPostContent
  type: string
  _links: any[]
}
