import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { HERO } from "@/data/content";

export function App() {
  return (
    <main className="app">
      <Hero />
      <Gallery />
      <footer className="footer">
        <p>© {HERO.collectionName}. All pieces are single editions.</p>
      </footer>
    </main>
  );
}

export default App;
