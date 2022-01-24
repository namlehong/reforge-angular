import { UserSettings } from './user-setting.model'
import { Profile } from './profile.model'

export interface User {
  email: string
  token: string
  username: string
  bio: string
  image: string
  settings: UserSettings
  profile: Profile
}
