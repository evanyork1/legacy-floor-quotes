import { FloorVisualizer } from '@/components/visualizer/FloorVisualizer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FloorVisualizerPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <FloorVisualizer />
      </main>
      <Footer />
    </div>
  );
};

export default FloorVisualizerPage;
