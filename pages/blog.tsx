"use client"

import Head from "next/head"
import Link from "next/link"
import { Card, CardContent } from "@/Components/ui/card"
import NavBarLandingPage from "@/Components/NavBarLandingPage"
import { Rocket, Lock, Shield, Calendar, ArrowRight, Tag } from "lucide-react"
import Image from "next/image"

const posts = [
  {
    slug: "welcome-to-cocoinbox",
    title: "Welcome to Cocoinbox",
    excerpt: "Discover how our privacy-first tools are revolutionizing the way you protect your digital identity online.",
    date: "Oct 15, 2025",
    category: "Getting Started",
    icon: Rocket,
    readTime: "5 min read",
    image: "/capture.png"
  },
  {
    slug: "client-side-encryption",
    title: "How Client-Side Encryption Works",
    excerpt: "Deep dive into the Web Crypto API and how we ensure your data is encrypted before it ever leaves your device.",
    date: "Oct 10, 2025",
    category: "Security",
    icon: Lock,
    readTime: "8 min read",
    image: "/capture (1).png"
  },
  {
    slug: "privacy-tips",
    title: "5 Privacy Tips for Daily Life",
    excerpt: "Simple, actionable steps you can take today to protect your digital identity and maintain your privacy online.",
    date: "Oct 5, 2025",
    category: "Privacy",
    icon: Shield,
    readTime: "6 min read",
    image: "/capture (2).png"
  },
]

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog • Cocoinbox</title>
        <meta name="description" content="Privacy tips, security insights, and product updates from the Cocoinbox team." />
      </Head>

      <div className="min-h-screen bg-[var(--bg-light)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
        <NavBarLandingPage />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30"
            style={{ background: 'var(--gradient-hero)' }}></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold tracking-wide mb-6">
              INSIGHTS & UPDATES
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-gray-900 leading-tight">
              Cocoinbox <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed text-gray-600 font-medium">
              Privacy tips, security insights, and the latest updates from our team.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const Icon = post.icon

                return (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                      <CardContent className="p-0">
                        <div className="relative h-48 overflow-hidden bg-gray-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={400}
                            height={300}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />

                          <div className="absolute top-4 left-4 z-20">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[var(--color-primary)] text-xs font-bold">
                              <Icon className="w-3 h-3" />
                              {post.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {post.date}
                            </span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold">
                            Read Article
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-24 bg-[var(--bg-light)]">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"></div>
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
                  Never miss an update
                </h2>
                <p className="text-xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest privacy tips and product updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
