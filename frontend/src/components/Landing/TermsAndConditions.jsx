import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Terms and Conditions</h1>

            {/* Section 1: Introduction */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">1. Introduction</h2>
                <p className="text-gray-700">
                    Welcome to Veladao (the "Platform"). By using our Platform, you agree to the following Terms and Conditions. Please read them carefully. If you do not agree with these terms, you may not use the Platform.
                </p>
            </section>

            {/* Section 2: Definitions */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">2. Definitions</h2>
                <ul className="list-disc ml-6">
                    <li><strong>User</strong>: Any person or entity that uses the Platform.</li>
                    <li><strong>Campaign Owner</strong>: Users who create campaigns to raise funds.</li>
                    <li><strong>Backer</strong>: Users who donate to campaigns.</li>
                    <li><strong>Platform</strong>: Refers to Veladao, including its website and mobile applications.</li>
                </ul>
            </section>

            {/* Section 3: Acceptance of Terms */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">3. Acceptance of Terms</h2>
                <p className="text-gray-700">
                    By accessing or using the Platform, you agree to be bound by these Terms and Conditions, including our Privacy Policy. If you do not agree, please do not use our Platform.
                </p>
            </section>

            {/* Section 4: Eligibility */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">4. Eligibility</h2>
                <p className="text-gray-700">
                    You must be at least 18 years old to use the Platform. By using the Platform, you represent and warrant that you meet this age requirement.
                </p>
            </section>

            {/* Section 5: Campaign Verification */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">5. Campaign Verification</h2>
                <p className="text-gray-700 mb-2">To create a campaign on the Platform, you must:</p>
                <ul className="list-disc ml-6">
                    <li>Submit a detailed Fund Usage Plan for verification and update if changes occur.</li>
                    <li>Provide required documentation, including identification and business registration proof.</li>
                    <li>Agree to verification procedures before the campaign goes live.</li>
                </ul>
            </section>

            {/* Section 6: Fund Usage */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">6. Fund Usage</h2>
                <ul className="list-disc ml-6">
                    <li>Transparency: Campaign owners must use funds according to the approved plan.</li>
                    <li>Milestone-Based Fund Release: Funds are released based on approved milestones.</li>
                    <li>Documentation: Owners must provide fund usage documentation upon request.</li>
                </ul>
            </section>

            {/* Additional Sections */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">7. Impact Reports</h2>
                <p className="text-gray-700">Campaign owners must submit regular progress updates and documentation for transparency.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">8. User Responsibilities</h2>
                <ul className="list-disc ml-6">
                    <li>Maintain confidentiality of your account information.</li>
                    <li>Prohibited Activities: You may not use the Platform for illegal activities.</li>
                </ul>
            </section>

            {/* More Sections */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">9. Platform Fees</h2>
                <p className="text-gray-700">We charge a fee on successful campaigns. Additional fees apply for promoted campaigns.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">10. Intellectual Property</h2>
                <p className="text-gray-700">All content on the Platform is protected by intellectual property laws.</p>
            </section>

            {/* Disclaimer */}
            <section className="mt-12 p-6 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Disclaimer</h2>
                <p className="text-gray-700">
                    We strive to verify campaigns thoroughly, but we cannot guarantee the legitimacy of any campaign or its outcomes.
                </p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
