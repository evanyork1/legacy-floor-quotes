import { FloorVisualizer } from '@/components/visualizer/FloorVisualizer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Seo } from '@/components/seo/Seo';

const FloorVisualizerPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title="Floor Visualizer | Legacy Industrial Coatings"
        description="Interactive tool to preview garage floor coating colors on your space."
        path="/floor-visualizer"
        noindex
      />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <FloorVisualizer />
      </main>
      <Footer />
    </div>
  );
};

export default FloorVisualizerPage;
