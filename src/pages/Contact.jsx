import { useState } from 'react'

export function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="bg-gradient-to-br from-orange-200/40 via-transparent to-amber-200/40 px-4 py-12 md:px-5">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Contact Us</h1>
          <p className="text-neutral-600">We’d love to hear from you.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-10 px-4 pb-16 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] md:gap-12 md:px-5">
        <div>
          <h2 className="text-2xl font-semibold">Visit or Message Us</h2>
          <p className="mt-3 text-neutral-700">
            Whether you’re planning a celebration, have a question about our menu, or just want to say
            hello, feel free to reach out using the form or visit us in person.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-neutral-800">
            <li>
              <strong>Address:</strong> 123 Coastal Avenue, Your City, ST 00000
            </li>
            <li>
              <strong>Phone:</strong> (555) 123-4567
            </li>
            <li>
              <strong>Email:</strong> hello@sunsetbistro.com
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="mb-2 font-semibold">Find Us</h3>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.093593582241!2d-122.41941508468182!3d37.77492977975981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c1f3c6e4b%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="h-[260px] w-full rounded-2xl border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-[0_16px_34px_rgba(15,23,42,0.12)] md:p-8">
          <h2 className="text-2xl font-semibold">Send Us a Message</h2>
          {sent ? (
            <p className="mt-4 text-sm text-green-700" role="status">
              Thanks! Your message has been recorded for this demo. (Connect a backend to send email.)
            </p>
          ) : (
            <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="rounded-xl border border-slate-900/15 bg-[#fefdfb] px-3 py-2 text-[inherit] outline-none ring-orange-500/25 focus:border-transparent focus:ring-2"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="rounded-xl border border-slate-900/15 bg-[#fefdfb] px-3 py-2 text-[inherit] outline-none ring-orange-500/25 focus:border-transparent focus:ring-2"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help?"
                  className="rounded-xl border border-slate-900/15 bg-[#fefdfb] px-3 py-2 text-[inherit] outline-none ring-orange-500/25 focus:border-transparent focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 px-6 py-2.5 text-sm font-semibold text-[#1f1308] shadow-[0_10px_25px_rgba(249,115,22,0.3)] transition hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
