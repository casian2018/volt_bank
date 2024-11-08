"use client";

export default function TermsPage() {
  return (
    <>
      <div className="bg-white text-black dark:bg-black dark:text-white">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            Effective Date: 2024-07-15
          </h2>
          <div className="w-full flex">
            <h1 className="text-3xl font-bold mb-4 text-blue-900 dark:text-orange-400">
              Terms of Service for Your Business
            </h1>
          </div>
          <p className="mb-6 text-base">
            Welcome to our website. Please read these terms of service carefully before using the website. By using the website, you agree to be bound by these terms of service. If you do not agree to these terms, you may not use the website. These terms of service govern your use of the website and all services provided by the website.
          </p>
          
          {/* Section: General Terms */}
          <div className="pb-5">
            <h2 className="font-bold text-lg text-blue-800 dark:text-orange-300 mb-2">
              General
            </h2>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <p className="text-base">
                  By accessing this website, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. The materials contained in this website are protected by copyright and trademark law.
                </p>
              </li>
              <li>
                <p className="text-base">
                  We reserve the right to change these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service. Any updates will be sent via email notification.
                </p>
              </li>
              <li>
                <p className="text-base">
                We reserve the right to modify or remove any content on this website at any time without prior notice. By using the website, you acknowledge that content may change, and you agree to be bound by the current content as it is updated.                </p>
              </li>
                <li>
                <p className="text-base">
                We reserve the right to modify or remove any content on this website at any time without prior notice. By using the website, you acknowledge that content may change, and you agree to be bound by the current content as it is updated.                </p>
              </li>

              <li>
                <p className="text-base">We may update or discontinue services offered on this website without notice. By continuing to use the website after such changes, you agree to accept any modifications to services as part of the terms of service.</p>
              </li>

              <li>
                <p className="text-base">Our Privacy Policy is subject to change without notice. Your continued use of the website signifies your acceptance of the updated Privacy Policy, which will be effective as of its publication date.</p>
              </li>

              <li>
                <p className="text-base">We may, at our discretion, update or alter the terms governing user accounts. By keeping an account on this website, you agree to comply with the most current version of these terms, which we may update without prior notice.</p>
              </li>
            </ul>
          </div>
          
          {/* Repeatable Terms Sections Here */}

        </div>
      </div>
    </>
  );
}
