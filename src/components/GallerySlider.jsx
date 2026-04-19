import { useEffect, useState } from 'react'
import { gallerySlides } from '../data/site'

export function GallerySlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = gallerySlides.length

  const go = (i) => setIndex((i + n) % n)

  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % n)
    }, 5000)
    return () => clearInterval(id)
  }, [n, paused])

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-black shadow-[0_20px_45px_rgba(15,23,42,0.18)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {gallerySlides.map((slide) => (
          <div key={slide.src} className="min-w-full shrink-0">
            <div className="h-[220px] sm:h-[260px]">
              <img
                src={slide.src}
                alt={slide.alt}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/55 text-lg text-white"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
      >
        &#10094;
      </button>
      <button
        type="button"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-slate-900/55 text-lg text-white"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {gallerySlides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={[
              'h-2.5 rounded-full transition-all',
              i === index ? 'w-6 bg-orange-500' : 'w-2.5 bg-white/45',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}
