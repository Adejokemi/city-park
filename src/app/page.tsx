// pages/index.tsx
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>City Park - Explore Nature</title>
        <meta
          name="description"
          content="Welcome to City Park - Your ultimate outdoor adventure destination"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01
              L14.5,12l4.5,6H5l3.5-4.5z"
              />
            </svg>
            <h1 className="text-2xl font-bold tracking-tight">City Park</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#about"
                  className="hover:text-green-200 transition-colors font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#activities"
                  className="hover:text-green-200 transition-colors font-medium"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-green-200 transition-colors font-medium"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-green-200 transition-colors font-medium"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative h-screen max-h-[700px] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Experience Nature at{" "}
              <span className="text-green-300">City Park</span>
            </h1>
            <p className="text-xl mb-8 text-green-50">
              Discover breathtaking landscapes, thrilling adventures, and
              unforgettable memories in our pristine wilderness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors text-center shadow-lg"
              >
                Book Now
              </Link>
              <a
                href="#activities"
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Explore Activities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              Our Story
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Welcome to City Park
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 text-gray-700">
              <p className="text-lg mb-6 leading-relaxed">
                Nestled in the heart of pristine wilderness, City Park spans
                over 5,000 acres of diverse landscapes, from lush forests to
                scenic mountain trails and crystal-clear lakes.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Our park is dedicated to preserving nature while providing
                accessible adventures for visitors of all ages and abilities. We
                blend conservation with recreation to create a sustainable
                natural paradise.
              </p>
              <p className="text-lg leading-relaxed">
                Whether you&apos;re seeking a peaceful walk through ancient
                woodland, an exhilarating hiking experience along mountain
                ridges, or a challenging climb up majestic rock formations, City
                Park offers something for everyone.
              </p>
            </div>
            <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-96 w-full">
                <div className="absolute inset-0 bg-green-900/20 z-10 rounded-2xl"></div>
                <Image
                  layout="fill"
                  objectFit="cover"
                  src="/hero.jpg"
                  alt="City Park forest landscape"
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              Adventures Await
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Explore Our Activities
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Hiking */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                className="h-56 relative bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nfGVufDB8fDB8fHww')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="text-2xl font-bold">Hiking Adventures</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Explore our extensive network of trails winding through
                  ancient forests and mountain ridges, suitable for all skill
                  levels.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-semibold text-lg">
                    From #3000
                  </p>
                </div>
              </div>
            </div>

            {/* Walking */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                className="h-56 relative bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1566846726999-5fa76d10c98b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJvYXJkd2Fsa3xlbnwwfHwwfHx8MA%3D%3D')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="text-2xl font-bold">Scenic Walks</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Enjoy leisurely strolls through our beautiful landscaped
                  gardens, meadows, and alongside tranquil lakes.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-semibold text-lg">
                    From #1500
                  </p>
                </div>
              </div>
            </div>

            {/* Climbing */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div
                className="h-56 relative bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1601224748193-d24f166b5c77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMGNsaW1iaW5nfGVufDB8fDB8fHww')",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <h3 className="text-2xl font-bold">Rock Climbing</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-700 leading-relaxed">
                  Challenge yourself with our rock climbing experiences
                  featuring routes for beginners and seasoned climbers alike.
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-green-600 font-semibold text-lg">
                    From #4000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              Visual Journey
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Park Gallery
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
              "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              "https://images.unsplash.com/photo-1444464666168-49d633b86797",
              "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
              "https://images.unsplash.com/photo-1652254694570-7f90486a675f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHBhcmtzfGVufDB8fDB8fHww",
              "https://images.unsplash.com/photo-1543353071-873f17a7a088",
            ].map((src, index) => (
              <div
                key={index}
                className="relative h-40 md:h-64 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
              >
                <Image
                  width={600}
                  height={400}
                  src={`${src}?auto=format&fit=crop&w=600&q=80`}
                  alt={`Park image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-green-900/20 hover:bg-green-900/10 transition-colors z-10"></div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="#"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View More Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              What We Offer
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Park Features
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Thrilling Experiences
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Experience our state-of-the-art attractions and adventure
                activities designed for maximum excitement and unforgettable
                memories.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Family Activities
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy activities suitable for all ages, from toddlers to
                grandparents, creating lasting memories together in our
                beautiful natural setting.
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Dining & Shopping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Discover delicious locally-sourced food options and unique,
                eco-friendly souvenirs throughout the park&apos;s shops and
                restaurants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-green-600 font-semibold uppercase tracking-wider mb-2">
              Get In Touch
            </span>
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
              Contact Us
            </h2>
            <div className="w-16 h-1 bg-green-500 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <div className="bg-green-50 p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-green-700">
                  Visit City Park
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Address</h4>
                      <p className="text-gray-600">
                        123 Nature Way, Forest County
                      </p>
                      <p className="text-gray-600">Wilderness Region, 54321</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Phone</h4>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri: 8am - 8pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email</h4>
                      <p className="text-gray-600">info@Citypark.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Hours</h4>
                      <p className="text-gray-600">
                        Open daily: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-gray-600">
                        Summer hours: 7:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-semibold text-lg mb-3">
                      Connect With Us
                    </h4>
                    <div className="flex space-x-4">
                      <a
                        href="#"
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12.07c0-5.525-4.475-10-10-10s-10 4.475-10 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.797c0-2.506 1.492-3.896 3.777-3.896 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988C18.343 21.198 22 17.061 22 12.07z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2zm4.55 6.61c.215-.05.44-.077.67-.077-.215.465-.505.86-.87 1.175.01.13.01.25.01.38 0 3.91-2.97 8.41-8.39 8.41-1.67 0-3.22-.49-4.53-1.33.23.03.46.04.7.04 1.37 0 2.64-.46 3.64-1.25-1.28-.02-2.36-.86-2.73-2.02.18.04.36.05.54.05.26 0 .52-.04.76-.1-1.34-.27-2.35-1.45-2.35-2.87v-.04c.4.22.84.35 1.32.37-.78-.53-1.3-1.42-1.3-2.43 0-.54.15-1.04.4-1.47 1.44 1.77 3.6 2.93 6.04 3.06-.05-.22-.08-.44-.08-.67 0-1.62 1.31-2.93 2.93-2.93.84 0 1.6.36 2.14.93.67-.13 1.29-.37 1.86-.7-.22.69-.68 1.26-1.27 1.63z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="bg-green-50 p-8 rounded-xl shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-6 text-green-700">
                  Send Us a Message
                </h3>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Message subject"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <svg
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M21,19V5c0-1.1-0.9-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14C20.1,21,21,20.1,21,19z M8.5,13.5l2.5,3.01
                  L14.5,12l4.5,6H5l3.5-4.5z"
                  />
                </svg>
                <h3 className="text-2xl font-bold tracking-tight">City Park</h3>
              </div>
              <p className="text-green-100 mb-6">
                Your ultimate outdoor adventure destination with breathtaking
                landscapes and unforgettable experiences for all ages.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12.07c0-5.525-4.475-10-10-10s-10 4.475-10 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54v-2.891h2.54V9.797c0-2.506 1.492-3.896 3.777-3.896 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.891h-2.33v6.988C18.343 21.198 22 17.061 22 12.07z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.475 2 2 6.475 2 12s4.475 10 10 10 10-4.475 10-10S17.525 2 12 2zm4.55 6.61c.215-.05.44-.077.67-.077-.215.465-.505.86-.87 1.175.01.13.01.25.01.38 0 3.91-2.97 8.41-8.39 8.41-1.67 0-3.22-.49-4.53-1.33.23.03.46.04.7.04 1.37 0 2.64-.46 3.64-1.25-1.28-.02-2.36-.86-2.73-2.02.18.04.36.05.54.05.26 0 .52-.04.76-.1-1.34-.27-2.35-1.45-2.35-2.87v-.04c.4.22.84.35 1.32.37-.78-.53-1.3-1.42-1.3-2.43 0-.54.15-1.04.4-1.47 1.44 1.77 3.6 2.93 6.04 3.06-.05-.22-.08-.44-.08-.67 0-1.62 1.31-2.93 2.93-2.93.84 0 1.6.36 2.14.93.67-.13 1.29-.37 1.86-.7-.22.69-.68 1.26-1.27 1.63z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25zM12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Activities
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Tickets
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Park Information</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Park Map
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Operating Hours
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Accessibility
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Safety Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Conservation Efforts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
              <p className="text-green-100 mb-4">
                Subscribe to receive updates on special events and promotions.
              </p>
              <form className="mb-4">
                <div className="flex">
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Your email"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-r-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              </form>
              <p className="text-sm text-green-300">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </p>
            </div>
          </div>

          <div className="border-t border-green-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-green-200 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} City Park. All rights
                reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
