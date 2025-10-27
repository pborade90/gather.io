import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LightRays from "@/components/LightRays";
import Breadcrumbs from "@/components/Breadcrumbs";

const inter = Inter({
    subsets: ["latin"],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: "Gather.io - Connect Through Events",
        template: "%s | Gather.io"
    },
    description: "Discover and create amazing events. Connect with communities and grow together.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
        <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white antialiased">
        {/* Background Effects with LightRays */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
            <LightRays
                raysOrigin="top-center-offset"
                raysColor="#0ea5e9"
                raysSpeed={0.8}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.03}
                noiseAmount={0.1}
                distortion={0.005}
            />

            {/* Additional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        </div>

        {/* Main Layout Structure */}
        <div className="min-h-screen flex flex-col relative z-10">
            <Navbar />

            {/* Main Content Area with Breadcrumbs */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Breadcrumbs />
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">GA</span>
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Gather.io
                            </span>
                        </div>

                        <div className="text-gray-400 text-sm text-center md:text-right">
                            <p>© {new Date().getFullYear()} Gather.io. All rights reserved.</p>
                            <p className="text-xs mt-1">Connect • Create • Celebrate</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        </body>
        </html>
    );
}