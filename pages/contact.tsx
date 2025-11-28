"use client"

import Head from "next/head"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import NavBarLandingPage from "@/components/NavBarLandingPage"

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Cocoinbox • Contact</title>
      </Head>
      <div className="tropical-page">
        <NavBarLandingPage />

        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="text-center mb-16">
            <h1
              className="text-6xl font-black tracking-tight mb-6 text-white"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.2)" }}
            >
              Get in Touch
            </h1>
            <p className="text-2xl text-white/95 font-semibold">We'd love to hear from you. Send us a message!</p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-none shadow-2xl rounded-3xl overflow-hidden mb-12">
            <div className="h-2 bg-gradient-to-r from-cyan-400 to-orange-400"></div>
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-orange-50 pb-6">
              <CardTitle className="text-3xl font-black text-slate-800">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="pt-10 px-10">
              <form className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg font-bold text-slate-700">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="rounded-xl bg-white/80 border-2 border-cyan-200 text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 text-base py-3"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-bold text-slate-700">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl bg-white/80 border-2 border-cyan-200 text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 text-base py-3"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="subject" className="text-lg font-bold text-slate-700">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="What is this about?"
                    className="rounded-xl bg-white/80 border-2 border-cyan-200 text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 text-base py-3"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="msg" className="text-lg font-bold text-slate-700">
                    Message
                  </Label>
                  <Textarea
                    id="msg"
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="rounded-xl bg-white/80 border-2 border-cyan-200 text-slate-800 placeholder:text-slate-400 focus:border-cyan-400 text-base p-4"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-white py-4 text-lg font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300 rounded-xl">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-orange-400"></div>
              <CardContent className="pt-8 px-8">
                <h3 className="font-black text-2xl mb-3 text-cyan-600">📧 Email</h3>
                <p className="text-slate-600 text-lg font-semibold">support@cocoinbox.com</p>
              </CardContent>
            </Card>
            <Card className="bg-white/95 backdrop-blur-sm border-none shadow-xl rounded-2xl overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-orange-400 to-cyan-400"></div>
              <CardContent className="pt-8 px-8">
                <h3 className="font-black text-2xl mb-3 text-orange-600">⏱️ Response Time</h3>
                <p className="text-slate-600 text-lg font-semibold">We typically respond within 24 hours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tropical-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #38BDF8 0%, #22D3EE 50%, #06B6D4 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </>
  )
}
