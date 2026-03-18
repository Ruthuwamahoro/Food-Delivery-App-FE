// export default function Testimonials() {
//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Customers Say</h2>
//             <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <p className="text-gray-600 mb-4">"The recipes on this site are amazing! I've tried several and they all turned out delicious. Highly recommend!"</p>
//                     <p className="text-sm text-gray-500">- Sarah K.</p>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <p className="text-gray-600 mb-4">"I love how easy it is to find new recipes here. The instructions are clear and the results are always fantastic."</p>
//                     <p className="text-sm text-gray-500">- John D.</p>
//                 </div>
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <p className="text-gray-600 mb-4">"This site has become my go-to for meal inspiration. The variety of recipes keeps me coming back for more!"</p>
//                     <p className="text-sm text-gray-500">- Emily R.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }


// components/Testimonials.tsx
import { AvatarColor, Testimonial } from '@/types/testimonials'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { testimonials } from '@/data/testimonials'

const playfair = Playfair_Display({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500'] })





const avatarClasses: Record<AvatarColor, string> = {
  purple: 'bg-[#EEEDFE] text-[#3C3489]',
  teal:   'bg-[#E1F5EE] text-[#085041]',
  coral:  'bg-[#FAECE7] text-[#712B13]',
}

function Stars() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#EF9F27">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { initials, name, role, time, color, quote } = testimonial
  return (
    <div className="bg-white p-8">
      <span
        className={`${playfair.className} block text-[5rem] leading-none text-gray-200 mb-4`}
      >
        "
      </span>
      <Stars />
      <p className="text-gray-500 font-light text-[15px] leading-relaxed mb-7">
        {quote}
      </p>
      <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${avatarClasses[color]}`}
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 m-0">{name}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            {role} · {time}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className={`${dmSans.className} max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-gray-400 mb-2">
        Reviews
      </p>
      <h2 className={`${playfair.className} text-4xl font-normal text-gray-900 mb-12 leading-tight`}>
        What our <em>customers say</em>
      </h2>

      <div className="grid md:grid-cols-3 divide-x divide-y md:divide-y-0 divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </div>
    </section>
  )
}