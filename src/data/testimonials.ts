import { AvatarColor } from "@/types/testimonials";

export const mockComments = [
    {
      id: 1,
      initials: "SK",
      name: "Sarah K.",
      time: "2 days ago",
      rating: 5,
      text: "Made this last night and it was absolutely perfect. The instructions were so clear and easy to follow!",
    },
    {
      id: 2,
      initials: "JD",
      name: "John D.",
      time: "1 week ago",
      rating: 4,
      text: "Really delicious. I added a bit more seasoning to my taste but the base recipe is spot on.",
    },
];


interface Testimonial {
  initials: string
  name: string
  role: string
  time: string
  color: AvatarColor
  quote: string
}

export const testimonials: Testimonial[] = [
  {
    initials: 'SK',
    name: 'Sarah K.',
    role: 'Home cook',
    time: '3 months ago',
    color: 'purple',
    quote:
      'The recipes on this site are amazing! I\'ve tried several and they all turned out delicious. Highly recommend to anyone looking to spice up their meal routine.',
  },
  {
    initials: 'JD',
    name: 'John D.',
    role: 'Food enthusiast',
    time: '1 month ago',
    color: 'teal',
    quote:
      'I love how easy it is to find new recipes here. The instructions are clear and the results are always fantastic — even on weeknights.',
  },
  {
    initials: 'ER',
    name: 'Emily R.',
    role: 'Recipe collector',
    time: '2 weeks ago',
    color: 'coral',
    quote:
      'This site has become my go-to for meal inspiration. The variety of recipes keeps me coming back every single week for something new.',
  },
]