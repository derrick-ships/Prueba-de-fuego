import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import EnemySection from '@/components/EnemySection';
import Calculator from '@/components/Calculator';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <EnemySection />
        <Calculator />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
