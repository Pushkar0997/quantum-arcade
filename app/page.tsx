import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-cyber-black flex items-center justify-center pt-16">
      {/* Hero Section */}
      <section className="text-center px-4 sm:px-6 lg:px-8">
        {/* Decorative Element */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-gray border border-cyber-green/20">
            <Sparkles className="w-4 h-4 text-cyber-green" />
            <span className="text-sm text-gray-400">Next-Gen Gaming Experience</span>
          </div>
        </div>

        {/* Main Heading with Glow Effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cyber-green neon-glow mb-6 tracking-tight">
          MASTER THE
          <br />
          QUANTUM REALM
        </h1>

        {/* Subtext */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10">
          Gamified Simulations. AI-Powered Training.
        </p>

        {/* CTA Button */}
        <Link href="/dashboard">
          <button className="neon-button group inline-flex items-center gap-3 px-8 py-4 bg-cyber-green text-cyber-black font-bold text-lg rounded-lg hover:bg-cyber-green/90 transition-all duration-300 shadow-lg shadow-cyber-green/25">
            Enter Simulation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(#00ff99 1px, transparent 1px), linear-gradient(90deg, #00ff99 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-cyber-black" />
        </div>
      </section>
    </main>
  );
}
