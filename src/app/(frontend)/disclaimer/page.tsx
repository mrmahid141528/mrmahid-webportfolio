export const metadata = {
    title: 'Disclaimer | Md Mahid Raza',
    description: 'General disclaimer regarding the information provided on mrmahid.com.',
};

export default function Disclaimer() {
    const lastUpdated = "March 8, 2026";

    return (
        <main className="flex flex-col min-h-screen pt-32 pb-24 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10 prose prose-invert prose-lg prose-a:text-primary hover:prose-a:text-accent">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Disclaimer</h1>
                <p className="text-gray-400 mb-10">Last updated: {lastUpdated}</p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">General Information</h2>
                <p>
                    The information provided by <strong>Md Mahid Raza</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on <a href="https://www.mrmahid.com" className="text-primary hover:underline">mrmahid.com</a> (the &quot;Site&quot;) is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                </p>

                <p className="font-bold text-white">
                    UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">External Links Disclaimer</h2>
                <p>
                    The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                </p>

                <p>
                    WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Professional Disclaimer</h2>
                <p>
                    The Site cannot and does not contain professional web development, design, or marketing advice. The web development and general technical information is provided for general informational and educational purposes only and is not a substitute for professional advice.
                </p>
                <p>
                    Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional web development advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Contact Us</h2>
                <p>
                    If you have any questions about this Disclaimer, please contact us at: <strong>mrmahid141@gmail.com</strong>
                </p>
            </div>
        </main>
    );
}
