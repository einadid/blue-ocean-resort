import Hero from '@/components/home/Hero'
import Features from '@/components/home/Features'

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean to-ocean-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready for Your Dream Vacation?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your stay now and experience paradise
          </p>
          <a
            href="/rooms"
            className="inline-block px-10 py-4 bg-white text-ocean font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  )
}