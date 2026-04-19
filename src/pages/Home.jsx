import { Link } from 'react-router-dom'
import { GallerySlider } from '../components/GallerySlider'

export function Home() {
  return (
    <>
      <section
        className="relative flex min-h-[60vh] items-center justify-center bg-cover bg-center md:min-h-[70vh]"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(15,23,42,0.55), rgba(15,23,42,0.35)), url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
        }}
      >
        <div className="relative mx-auto max-w-[1100px] px-4 py-16 text-center text-[#fffdf7]">
          <h1 className="mb-4 text-4xl font-bold uppercase tracking-[0.15em] sm:text-5xl">
            Sunset Bistro
          </h1>
          <p className="mx-auto mb-7 max-w-md text-base sm:text-lg">
            Fresh flavors, warm evenings, and unforgettable memories.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 px-7 py-2.5 text-sm font-semibold text-[#1f1308] shadow-[0_10px_25px_rgba(249,115,22,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(249,115,22,0.4)]"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] md:gap-12 md:px-5">
        <div>
          <h2 className="mb-4 text-3xl font-semibold">Welcome to Sunset Bistro</h2>
          <p className="mb-6 text-neutral-600">
            Nestled in the heart of the city, Sunset Bistro brings together seasonal ingredients,
            handcrafted cocktails, and cozy ambiance. Whether it’s a casual dinner or a special
            celebration, we’re here to make every moment feel unforgettable.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center justify-center rounded-full border-2 border-orange-500 px-6 py-2.5 text-sm font-semibold text-orange-500 transition hover:bg-orange-500/10"
          >
            Learn Our Story
          </Link>
        </div>
        <div className="grid gap-4">
          {[
            {
              title: 'Farm-to-Table',
              text: 'Locally sourced ingredients prepared fresh every day.',
            },
            {
              title: 'Chef’s Specials',
              text: 'Rotating seasonal dishes inspired by global flavors.',
            },
            {
              title: 'Cozy Atmosphere',
              text: 'Warm lighting, soft music, and friendly faces.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
            >
              <h3 className="mb-1 text-[1.05rem] font-semibold">{card.title}</h3>
              <p className="text-sm text-neutral-600">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f2ebe3] py-14">
        <div className="mx-auto max-w-[1100px] px-4 md:px-5">
          <h2 className="mb-2 text-center text-3xl font-semibold">Gallery</h2>
          <p className="mb-8 text-center text-neutral-600">
            A glimpse of our dishes and space.
          </p>
          <GallerySlider />
        </div>
      </section>

      <section className="mx-auto max-w-[1100px] px-4 py-14 md:px-5">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-300 px-6 py-8 text-[#1f1308] sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="text-2xl font-bold">Book Your Table Tonight</h2>
            <p className="mt-1 text-sm sm:text-base">
              Walk-ins are welcome, but reservations are recommended on weekends.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 px-7 py-2.5 text-sm font-semibold text-[#1f1308] shadow-[0_10px_25px_rgba(249,115,22,0.3)] ring-2 ring-[#1f1308]/10 transition hover:-translate-y-0.5"
          >
            Reserve Now
          </Link>
        </div>
      </section>
    </>
  )
}
