"use client";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20">
      <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 sm:p-10 shadow-brutal dark:shadow-[8px_8px_0px_0px_white] prose prose-black dark:prose-invert max-w-none">
        <h1 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter mb-8 text-black dark:text-white">
          Privacy Policy
        </h1>
        
        <p className="font-medium text-sm text-black/60 dark:text-white/60 mb-8">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">1. Introduction</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          Welcome to Survive Uni. We respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy explains how we collect, use, and share information when you visit our website.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">2. Information We Do Not Collect</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          <strong>We do not collect or store any of your personal academic data.</strong> All calculations for attendance, GPAs, and aggregates are performed directly in your web browser. We do not save your grades, marks, or attendance records to any external database or server.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">3. Cookies and Advertising</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          We use Google AdSense and other third-party services to serve ads. These companies may use cookies and similar technologies to collect data about your interactions with our site and other websites to provide personalized advertisements.
        </p>
        <div className="bg-zinc-100 dark:bg-zinc-800 p-6 border-4 border-black mb-6">
          <ul className="list-disc pl-5 font-medium text-black/80 dark:text-white/80 space-y-2">
            <li><strong>Google AdSense:</strong> Google uses cookies to serve ads based on your prior visits to our website or other websites.</li>
            <li><strong>Opt-out:</strong> You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="underline">Ads Settings</a>.</li>
            <li><strong>GDPR Compliance:</strong> For users in the European Economic Area (EEA), we request consent before serving personalized ads.</li>
            <li><strong>CCPA Compliance:</strong> We do not sell your personal information. California residents have specific rights regarding their data.</li>
          </ul>
        </div>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">4. Data Security</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          While we do not store your academic data on our servers, we take reasonable measures to protect our website from unauthorized access. Since all calculations happen locally in your browser, your data remains private to your device.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">5. Third-Party Links</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          Our website may contain links to other sites (like university portals). We are not responsible for the privacy practices or content of these third-party websites.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">6. Contact Us</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" className="text-[#4A90E2] underline hover:text-black dark:hover:text-white">Contact Page</a> or email us at hassan10mehar@gmail.com.
        </p>
      </div>
    </div>
  );
}
