export const metadata = {
    title: 'Terms & Conditions | Md Mahid Raza',
    description: 'Terms and Conditions for using mrmahid.com portfolio and services.',
};

export default function TermsAndConditions() {
    const lastUpdated = "March 8, 2026";

    return (
        <main className="flex flex-col min-h-screen pt-32 pb-24 bg-[#0F172A] relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10 prose prose-invert prose-lg prose-a:text-primary hover:prose-a:text-accent">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Terms and Conditions</h1>
                <p className="text-gray-400 mb-10">Last updated: {lastUpdated}</p>

                <p>Welcome to <strong>Md Mahid Raza Portfolio</strong>!</p>

                <p>
                    These terms and conditions outline the rules and regulations for the use of Md Mahid Raza&apos;s Website, located at <a href="https://www.mrmahid.com" className="text-primary hover:underline">mrmahid.com</a>.
                </p>

                <p>
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Md Mahid Raza Portfolio if you do not agree to take all of the terms and conditions stated on this page.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Cookies</h2>
                <p>
                    We employ the use of cookies. By accessing Md Mahid Raza Portfolio, you agreed to use cookies in agreement with our Privacy Policy. Most interactive websites use cookies to let us retrieve the user&apos;s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">License</h2>
                <p>
                    Unless otherwise stated, Md Mahid Raza and/or its licensors own the intellectual property rights for all material on Md Mahid Raza Portfolio. All intellectual property rights are reserved. You may access this from Md Mahid Raza Portfolio for your own personal use subjected to restrictions set in these terms and conditions.
                </p>
                <p>You must not:</p>
                <ul>
                    <li>Republish material from Md Mahid Raza Portfolio</li>
                    <li>Sell, rent or sub-license material from Md Mahid Raza Portfolio</li>
                    <li>Reproduce, duplicate or copy material from Md Mahid Raza Portfolio</li>
                    <li>Redistribute content from Md Mahid Raza Portfolio</li>
                </ul>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Reservation of Rights</h2>
                <p>
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and it&apos;s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Disclaimer</h2>
                <p>
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>
                <ul>
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>
                <p>
                    The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                </p>
                <p>
                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                </p>
            </div>
        </main>
    );
}
