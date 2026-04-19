export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 bg-neutral-900 px-4 py-9 text-sm text-neutral-200 md:px-6">
      <div className="mx-auto grid max-w-[1100px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="mb-1 text-base font-semibold text-white">Sunset Bistro</h3>
          <p>
            123 Coastal Avenue
            <br />
            Your City, ST 00000
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-base font-semibold text-white">Hours</h3>
          <p>
            Mon–Thu: 11:00am – 9:00pm
            <br />
            Fri–Sat: 11:00am – 11:00pm
            <br />
            Sun: 10:00am – 8:00pm (Brunch)
          </p>
        </div>
        <div>
          <h3 className="mb-1 text-base font-semibold text-white">Connect</h3>
          <ul className="grid gap-1">
            <li>
              <a href="#" className="text-neutral-200 hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-neutral-200 hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="text-neutral-200 hover:underline">
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1100px] border-t border-white/10 pt-4 text-center text-neutral-400">
        <p>
          &copy; {year} Sunset Bistro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
