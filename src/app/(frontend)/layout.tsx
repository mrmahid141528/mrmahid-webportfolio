import LenisProvider from "@/components/layout/LenisProvider";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function FrontendLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
