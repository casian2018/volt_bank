import Nav from "../components/navsignin";
import Footer from "../components/footer";

export default function Home() {
  return (
    <>
      <Nav />

      <div className="flex flex-col items-center justify-center mb-36 px-4 sm:px-0">
        <div className="flex flex-col items-center justify-center text-center px-48 min-h-screen max-sm:mt-8">
          <h1 className="mx-auto max-w-4xl font-display text-6xl font-bold tracking-normal text-slate-900 max-sm:text-3xl  max-sm:mt-4">
            Make your money work for you with
            <span className="relative whitespace-nowrap text-orange-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-orange-300/70"
                preserveAspectRatio="none"
              >
                <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">Volt Bank</span>
            </span>
          </h1>
          <p className="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
            Volt Bank is a digital bank offering streamlined accounts, smart
            financial tools, and fast online banking for easy money management.
          </p>
          <a
            className="bg-black rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-black/80"
            href="/login"
          >
            Login →
          </a>
        </div>

        <h1 className="text-center text-3xl font-bold mb-11">Track Partners</h1>

        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-32 mb-4">
            <img src="/haufe.png" className="w-[200px]" alt="Haufe" />
            <img src="/nokia.png" className="w-[200px]" alt="Nokia" />
            <img src="/access.png" className="w-[200px]" alt="Access" />
          </div>

          <div className="flex flex-wrap justify-center gap-32">
            <img src="/faber.png" className="w-[200px]" alt="Faber" />
            <img src="/tm.png" className="w-[200px]" alt="TM" />
            <img src="/pebune.png" className="w-[200px]" alt="Pebune" />
          </div>
        </div>

        <section
          id="testimonials"
          aria-label="What our customers are saying"
          className="bg-slate-50 py-20 sm:py-32"
        >
          <div className="mx-auto min-w-full px-4 sm:px-6 lg:px-8 ">
            <div className="mx-auto max-w-2xl md:text-center">
              <h2 className="font-display text-3xl tracking-tight text-slate-900  sm:text-4xl mb-8">
                What Our Customers Are Saying
              </h2>
            </div>
            <ul
              role="list"
              className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
            >
              {/* Testimonial 1 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “Volt Bank makes managing finances so much easier. The
                      interface is so user-friendly and the features are
                      incredibly helpful.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon10.jpg"
                        alt="Customer 1"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Gheorghe Hagi</p>
                      <p className="text-slate-600">Manager of Liga I club Farul Constanta</p>
                    </div>
                    <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.599 1.507 88.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z"></path>
                  </figcaption>
                </figure>
              </li>
              {/* Testimonial 2 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “The financial tools have helped me make smarter
                      investment decisions. I can track my spending easily!”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon9.png"
                        alt="Customer 2"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Amba Tucan</p>
                      <p className="text-slate-600">Investor & Entrepreneur</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
              {/* Testimonial 3 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “I love how easy it is to manage all my accounts in one
                      place. Volt Bank's app has everything I need.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon15.webp"
                        alt="Customer 3"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Floarea Dragomir</p>
                      <p className="text-slate-600">Product Manager</p>
                    </div>
                  </figcaption>
                </figure>
              </li>

              {/* Testimonial 4 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “Volt Bank's customer support is top-notch. They helped me resolve an issue quickly, and I felt supported every step of the way.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon14.jpg"
                        alt="Customer 4"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Cazian Qprea</p>
                      <p className="text-slate-600">Software Engineer</p>
                    </div>
                  </figcaption>
                </figure>
              </li>

              {/* Testimonial 5 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “I appreciate how fast and simple it is to transfer money with Volt Bank. I can handle everything on the go, no stress.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon13.jpg"
                        alt="Customer 5"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Elisabeth</p>
                      <p className="text-slate-600">Marketing Specialist</p>
                    </div>
                  </figcaption>
                </figure>
              </li>

              {/* Testimonial 6 */}
              <li>
                <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                  <blockquote className="mt-10">
                    <p className="text-lg text-slate-900">
                      “Volt Bank’s budgeting features have made managing my expenses so much easier. It’s never been simpler to save and invest.”
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-14 w-14 rounded-full"
                        src="/icon11.jpeg"
                        alt="Customer 6"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <p className="text-slate-900">Vadim  Tudor</p>
                      <p className="text-slate-600">Financial Advisor</p>
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
