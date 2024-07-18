import Navbar from '../../components/client-side/navbar';
import Hero from '../../components/client-side/homepage/hero';
import OurServices from '../../components/client-side/homepage/ourServices';
import WhyUs from '../../components/client-side/homepage/whyUs';
import Testimonial from '../../components/client-side/homepage/testimonial';
import GettingStarted from '../../components/client-side/homepage/gettingStarted';
import FAQ from '../../components/client-side/homepage/faq';
import Footer from '../../components/client-side/footer';

import '../../style/main/style.css'
import '../../style/main/responsive.css'

export default function Homepage() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Hero />
                <OurServices />
                <WhyUs />
                <Testimonial />
                <GettingStarted />
                <FAQ />
            </main>
            <Footer />
        </>
    );
}
