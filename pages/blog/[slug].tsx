"use client"

import Head from "next/head"
import { useRouter } from "next/router"
import NavBarLandingPage from "@/Components/NavBarLandingPage"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Rocket, Lock, Shield, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPosts: Record<string, any> = {
    "welcome-to-cocoinbox": {
        title: "Welcome to Cocoinbox",
        excerpt: "Discover how our privacy-first tools are revolutionizing the way you protect your digital identity online.",
        date: "Oct 15, 2025",
        category: "Getting Started",
        icon: Rocket,
        readTime: "5 min read",
        image: "/capture.png",
        author: {
            name: "Sarah Chen",
            role: "Product Manager",
            avatar: "/capture (2).png"
        },
        content: `
      <h2>Introduction to Privacy-First Tools</h2>
      <p>In today's digital landscape, protecting your privacy has never been more important. Cocoinbox was built from the ground up with one core principle: your data belongs to you, and only you.</p>
      
      <p>We believe that privacy shouldn't be complicated. That's why we've created a suite of tools that make it easy to protect your digital identity without sacrificing convenience or usability.</p>
      
      <h2>What Makes Cocoinbox Different?</h2>
      <p>Unlike traditional email and file-sharing services, Cocoinbox uses client-side encryption to ensure that your data is protected before it ever leaves your device. This means that even we can't access your encrypted files or read your private notes.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Temporary Email:</strong> Create disposable email addresses in seconds</li>
        <li><strong>Encrypted File Sharing:</strong> Share files securely with end-to-end encryption</li>
        <li><strong>Secure Notes:</strong> Store sensitive information with zero-knowledge encryption</li>
        <li><strong>No Tracking:</strong> We don't track your activity or sell your data</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Ready to take control of your digital privacy? Getting started with Cocoinbox is simple:</p>
      <ol>
        <li>Create a free account (no credit card required)</li>
        <li>Choose the tool you need</li>
        <li>Start protecting your privacy</li>
      </ol>
      
      <p>Join thousands of users who have already made the switch to privacy-first tools. Your digital identity deserves better protection.</p>
    `
    },
    "client-side-encryption": {
        title: "How Client-Side Encryption Works",
        excerpt: "Deep dive into the Web Crypto API and how we ensure your data is encrypted before it ever leaves your device.",
        date: "Oct 10, 2025",
        category: "Security",
        icon: Lock,
        readTime: "8 min read",
        image: "/capture (1).png",
        author: {
            name: "Alex Rivera",
            role: "Security Engineer",
            avatar: "/capture (3).png"
        },
        content: `
      <h2>Understanding Client-Side Encryption</h2>
      <p>Client-side encryption is the cornerstone of true privacy. Unlike server-side encryption, where your data is encrypted only after it reaches our servers, client-side encryption ensures your data is protected from the moment you hit "send".</p>
      
      <h2>The Web Crypto API</h2>
      <p>We leverage the modern Web Crypto API, a powerful browser-native encryption standard that provides cryptographically secure operations directly in your browser.</p>
      
      <h3>How It Works</h3>
      <p>When you upload a file or create a note in Cocoinbox, here's what happens:</p>
      <ol>
        <li>Your browser generates a unique encryption key</li>
        <li>The data is encrypted using AES-256-GCM</li>
        <li>Only the encrypted data is sent to our servers</li>
        <li>The encryption key never leaves your device</li>
      </ol>
      
      <h2>Zero-Knowledge Architecture</h2>
      <p>This approach means we operate on a zero-knowledge basis. Even if someone gained access to our servers, they would only find encrypted data that's mathematically impossible to decrypt without your key.</p>
      
      <p>Your privacy isn't just a promise—it's guaranteed by mathematics.</p>
    `
    },
    "privacy-tips": {
        title: "5 Privacy Tips for Daily Life",
        excerpt: "Simple, actionable steps you can take today to protect your digital identity and maintain your privacy online.",
        date: "Oct 5, 2025",
        category: "Privacy",
        icon: Shield,
        readTime: "6 min read",
        image: "/capture (2).png",
        author: {
            name: "Maya Patel",
            role: "Privacy Advocate",
            avatar: "/capture.png"
        },
        content: `
      <h2>Protecting Your Digital Identity</h2>
      <p>Privacy doesn't have to be complicated. Here are five simple tips you can implement today to significantly improve your digital privacy.</p>
      
      <h3>1. Use Temporary Emails for Sign-ups</h3>
      <p>Don't give out your real email address to every website. Use a temporary email service like Cocoinbox to sign up for newsletters, trials, and services you're not sure about.</p>
      
      <h3>2. Enable Two-Factor Authentication</h3>
      <p>2FA adds an extra layer of security to your accounts. Even if someone gets your password, they won't be able to access your account without the second factor.</p>
      
      <h3>3. Review App Permissions Regularly</h3>
      <p>Many apps request more permissions than they need. Regularly review and revoke unnecessary permissions on your phone and computer.</p>
      
      <h3>4. Use a Password Manager</h3>
      <p>Reusing passwords is one of the biggest security risks. A password manager helps you create and store unique, strong passwords for every account.</p>
      
      <h3>5. Be Mindful of What You Share</h3>
      <p>Think twice before posting personal information online. Once it's out there, it's nearly impossible to take back.</p>
      
      <h2>Start Small, Stay Consistent</h2>
      <p>You don't need to implement all of these at once. Start with one or two, make them habits, then add more. Small, consistent steps lead to big improvements in your digital privacy.</p>
    `
    }
}

export default function BlogDetailPage() {
    const router = useRouter()
    const { slug } = router.query

    const post = slug ? blogPosts[slug as string] : null

    if (!post) {
        return (
            <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
                    <Link href="/blog" className="text-[var(--color-primary)] font-bold hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        )
    }

    const Icon = post.icon

    return (
        <>
            <Head>
                <title>{post.title} • Cocoinbox Blog</title>
                <meta name="description" content={post.excerpt} />
            </Head>

            <div className="min-h-screen bg-[var(--bg-light)] font-sans selection:bg-[var(--color-primary)] selection:text-white">
                <NavBarLandingPage />

                <section className="relative pt-32 pb-0 overflow-hidden bg-white">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] font-medium mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center gap-4 mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-bold">
                                <Icon className="w-4 h-4" />
                                {post.category}
                            </span>
                            <span className="flex items-center gap-2 text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {post.date}
                            </span>
                            <span className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                {post.readTime}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pb-8 border-b border-gray-200 mb-12">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold">
                                    {post.author.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">{post.author.name}</div>
                                    <div className="text-sm text-gray-500">{post.author.role}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Share2 className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <Bookmark className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
                            <div className="aspect-video relative">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <article
                            className="prose prose-lg prose-gray max-w-none
                prose-headings:font-black prose-headings:text-gray-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-[var(--color-primary)] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 prose-strong:font-bold
                prose-ul:my-6 prose-ol:my-6
                prose-li:text-gray-600 prose-li:mb-2"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </section>

                <section className="py-24 bg-[var(--bg-light)]">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-16 text-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]"></div>
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
                                    Enjoyed this article?
                                </h2>
                                <p className="text-xl text-white/90 mb-8 font-medium max-w-2xl mx-auto">
                                    Explore more insights on privacy, security, and digital freedom.
                                </p>
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 bg-white text-[var(--color-primary)] px-10 py-5 rounded-full font-bold text-lg hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] transform hover:-translate-y-1 transition-all duration-300"
                                >
                                    View All Articles
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
