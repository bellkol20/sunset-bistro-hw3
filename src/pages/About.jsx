export function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-orange-200/40 via-transparent to-amber-200/40 px-4 py-12 md:px-5">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Our Story</h1>
          <p className="text-neutral-600">From a small dream to a neighborhood favorite.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-10 px-4 py-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] md:gap-12 md:px-5">
        <div className="space-y-4 text-neutral-700">
          <h2 className="text-2xl font-semibold text-neutral-900">A Sunset That Started It All</h2>
          <p>
            Sunset Bistro began as a simple idea between friends watching the sun dip below the horizon
            on a summer evening: create a place where people could slow down, share a meal, and feel at
            home. What started as a weekend pop-up quickly grew into a full-fledged restaurant, thanks to
            a community that believed in good food and genuine hospitality.
          </p>
          <p>
            Our kitchen focuses on seasonal, locally sourced ingredients, allowing farmers and producers
            from our region to shine on every plate. From handcrafted pastas to slow-braised meats and
            vibrant vegetarian dishes, every recipe is inspired by the flavors of the coast and the warmth
            of a shared table.
          </p>
          <p>
            At Sunset Bistro, we believe in more than just feeding people—we believe in creating memories.
            Whether it’s your first date, a family gathering, or a casual weeknight dinner, we’re honored
            to be part of your story.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_18px_38px_rgba(15,23,42,0.13)]">
          <img
            src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Chef plating food"
            className="h-56 w-full object-cover md:h-[230px]"
          />
          <p className="px-6 py-5 text-sm italic text-neutral-600">
            “Food tastes better when it’s shared with the people you love.”
          </p>
        </div>
      </section>

      <section className="bg-[#f2ebe3] py-12">
        <div className="mx-auto grid max-w-[1100px] gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3 md:px-5">
          {[
            {
              title: 'Our Mission',
              text: 'To create a welcoming space where guests can enjoy honest food, thoughtful service, and the simple joy of gathering together.',
            },
            {
              title: 'Fresh Ingredients',
              text: 'We partner with local farms and artisans to ensure every dish is as fresh, flavorful, and sustainable as possible.',
            },
            {
              title: 'Community First',
              text: 'From hosting charity nights to featuring local artists, we believe our restaurant should reflect the community we serve.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.09)]"
            >
              <h3 className="mb-2 font-semibold text-neutral-900">{card.title}</h3>
              <p className="text-sm text-neutral-700">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
