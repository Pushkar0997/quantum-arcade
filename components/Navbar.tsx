"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-cyber-black/90 backdrop-blur-sm border-b border-cyber-gray">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Title */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-cyber-green neon-glow-subtle">
                            QUANTUM ARCADE
                        </h1>
                    </Link>

                    {/* Right Side - Login Button */}
                    <div className="flex items-center">
                        <button className="neon-button flex items-center gap-2 px-4 py-2 border-2 border-cyber-green text-cyber-green font-semibold rounded-md hover:bg-cyber-dim transition-all duration-300">
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
