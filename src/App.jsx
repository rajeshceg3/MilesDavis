import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { chapters } from './data/content';
import BackToTop from './components/BackToTop';

const Chapter = ({ data, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.9], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  // Hand-tuned easing
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative py-24 px-6 md:px-12 snap-center"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Side */}
        <motion.div
          style={{ opacity, y: smoothY }}
          className={`order-2 md:order-1 ${index % 2 === 1 ? 'md:order-2' : ''}`}
        >
          <div className="mb-6 flex items-center gap-4 opacity-60">
            <span className="text-miles-brass text-sm font-sans tracking-widest uppercase">{data.subtitle}</span>
            <div className="h-[1px] w-12 bg-miles-brass/50"></div>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-miles-paper mb-8 leading-tight">
            {data.title}
          </h2>

          <p className="text-lg md:text-xl font-serif leading-relaxed text-miles-smoke max-w-md">
            {data.content}
          </p>
        </motion.div>

        {/* Visual Side */}
        <figure className={`relative aspect-[4/5] md:aspect-square overflow-hidden order-1 md:order-2 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
          <motion.div
            role="img"
            aria-label={`Abstract visualization for ${data.title}`}
            style={{ scale: imageScale, opacity }}
            className={`w-full h-full ${data.imageColor} relative`}
          >
             {/* Abstract Visual Representation instead of stock photos */}
             <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-gradient-to-tr from-miles-dark to-transparent"></div>
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

             {/* Dynamic Light Element */}
             <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-miles-brass rounded-full blur-[100px] opacity-20 animate-pulse"></div>
          </motion.div>

          {/* Label */}
          <figcaption className="absolute bottom-4 right-4 text-xs text-miles-smoke font-sans tracking-widest uppercase">
            Figure {index + 1}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-miles-brass origin-left z-50 opacity-50 mix-blend-difference"
      style={{ scaleX }}
    />
  );
};

const App = () => {
  const contentRef = useRef(null);

  const scrollToContent = () => {
    const content = contentRef.current;
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
      // Move focus to content so keyboard users are in the right context
      content.focus({ preventScroll: true });
    }
  };

  return (
    <div className="bg-miles-dark min-h-screen text-miles-paper selection:bg-miles-brass selection:text-black">
      <div className="noise-overlay"></div>

      <ScrollProgress />
      <BackToTop />

      {/* Intro / Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier
          className="text-center"
        >
          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-miles-paper to-miles-smoke/20 mb-6">
            MILES
          </h1>
          <p className="text-miles-brass font-sans tracking-[0.2em] text-sm md:text-base uppercase opacity-80">
            A Lived Memory
          </p>
        </motion.div>

        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 text-xs text-miles-smoke uppercase tracking-widest animate-pulse motion-reduce:animate-none hover:animate-none focus:animate-none hover:text-miles-brass focus:text-miles-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-miles-brass focus-visible:ring-offset-2 focus-visible:ring-offset-miles-dark rounded-sm cursor-pointer transition-colors"
          aria-label="Scroll to first chapter"
        >
          Scroll to Listen
        </motion.button>
      </section>

      {/* Chapters */}
      <div className="pb-32 outline-none" ref={contentRef} tabIndex={-1} aria-label="Chapters">
        {chapters.map((chapter, index) => (
          <Chapter key={chapter.id} data={chapter} index={index} />
        ))}
      </div>

      {/* Footer */}
      <footer className="h-[50vh] flex items-center justify-center bg-black relative z-10">
        <motion.figure
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl px-6 group"
        >
          <blockquote
            className="font-serif italic text-2xl md:text-3xl text-miles-smoke mb-6 transition-colors duration-500 group-hover:text-miles-paper"
            cite="https://en.wikipedia.org/wiki/Miles_Davis"
          >
            "Don't play what's there, play what's not there."
          </blockquote>
          <motion.div
            className="w-8 h-[1px] bg-miles-brass mx-auto transition-all duration-500 group-hover:w-24 group-hover:bg-miles-brass"
          />
          <figcaption className="mt-4 text-xs font-sans uppercase tracking-[0.2em] text-miles-brass opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Miles Davis
          </figcaption>
        </motion.figure>
      </footer>
    </div>
  );
};

export default App;
