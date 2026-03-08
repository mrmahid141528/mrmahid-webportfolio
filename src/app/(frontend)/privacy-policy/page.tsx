export const metadata = {
    title: 'Privacy Policy | Md Mahid Raza',
    description: 'Privacy Policy for mrmahid.com outlining data collection and usage.',
};

export default function PrivacyPolicy() {
    const lastUpdated = "March 8, 2026";

    return (
        <main className="flex flex-col min-h-screen pt-32 pb-24 bg-background relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-4xl relative z-10 prose prose-invert prose-lg prose-a:text-primary hover:prose-a:text-accent">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
                <p className="text-muted mb-10">Last updated: {lastUpdated}</p>

                <p>
                    At <strong>Md Mahid Raza Portfolio</strong> (accessible from <a href="https://www.mrmahid.com" className="text-primary hover:underline">mrmahid.com</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Md Mahid Raza and how we use it.
                </p>

                <p>
                    If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>mrmahid141@gmail.com</strong>.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Log Files</h2>
                <p>
                    Md Mahid Raza follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Cookies and Web Beacons</h2>
                <p>
                    Like any other website, Md Mahid Raza uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Google DoubleClick DART Cookie</h2>
                <p>
                    Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Third Party Privacy Policies</h2>
                <p>
                    Md Mahid Raza&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                </p>

                <p>
                    You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
                </p>

                <h2 className="text-2xl font-semibold text-foreground mt-10 mb-4">Consent</h2>
                <p>
                    By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
                </p>
            </div>
        </main>
    );
}
