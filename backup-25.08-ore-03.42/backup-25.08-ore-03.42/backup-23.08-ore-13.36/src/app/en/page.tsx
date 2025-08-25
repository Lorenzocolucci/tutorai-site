import Header from "../../components/Header";
import Hero from "../../components/Hero";
import MiniWhy from "../../components/MiniWhy";
import Features from "../../components/Features";
import Demo from "../../components/Demo";
import AcademicPath from "../../components/AcademicPath";
import ROI from "../../components/ROI";
import Testimonials from "../../components/Testimonials";
import BetaAccess from "../../components/BetaAccess";
import Curricula from "../../components/Curricula";
import FAQ from "../../components/FAQ";
import Pricing from "../../components/Pricing";
import Footer from "../../components/Footer";

export const metadata = {
  title: "TutorAI – The tutor that adapts to your mind",
  description: "Clear explanations, targeted exercises, real results. Limited Beta: 1000 students."
}

export default function Page() {
  return (
    <>
      <Header locale="en" />
      <main>
        <Hero locale="en" />
        <MiniWhy />
        <Features />
        <Demo />
        <AcademicPath />
        <ROI />
        <Testimonials />
        <BetaAccess />
        <Curricula />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
