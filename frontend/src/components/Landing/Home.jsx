import BlockchainModeBanner from "../BlockchainModeBanner"
import AllProjectsSection from "./AllProjectsSection"
import CallToActionBanner from "./CallToActionBanner"
import FAQs from "./FAQs"
import FeaturedProjectsSection from "./FeaturedProjectsSection"
import Footer from "./Footer"
import Header from "./Header"
import HeroSection from "./HeroSection"
import HowItWorksSection from "./HowItWorksSection"
import NewsletterSubscription from "./NewsLetterSubscription"
import StatisticsAndImpactSection from "./StatisticsAndImpactSection"
import TestimonialSection from "./TestemonialSection"

const Home = () => {
    return (
        <>
            <BlockchainModeBanner />
            < Header />
            < HeroSection />
            <FeaturedProjectsSection />
            < AllProjectsSection />
            < HowItWorksSection />
            < TestimonialSection />
            < StatisticsAndImpactSection />
            < CallToActionBanner />
            < FAQs />
            < NewsletterSubscription />
            < Footer />
        </>
    )
}

export default Home