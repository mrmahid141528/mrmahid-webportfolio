import LenisProvider from "@/components/layout/LenisProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // We omit Preloader here since users usually don't want the full site preloader again when deep linking to a blog post, but keeping it for consistency is fine.
    // Actually, keeping the exact same layout structure as frontend is best for seamless navigation.

    return (
        <ThemeProvider>
            <Preloader />
            <LenisProvider>
                <CustomCursor />
                <Navbar />
                <WhatsAppButton />
                <main className="relative z-10 w-full min-h-screen">
                    {children}
                </main>
                <Footer />
            </LenisProvider>
        </ThemeProvider>
    );
}
