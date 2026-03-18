export type AvatarColor = 'purple' | 'teal' | 'coral'

export interface Testimonial {
  initials: string
  name: string
  role: string
  time: string
  color: AvatarColor
  quote: string
}