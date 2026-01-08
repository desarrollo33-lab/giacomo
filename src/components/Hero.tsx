import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

/**
 * Hero Component - DCR Motors
 * 
 * Features full-screen YouTube video background with autoplay.
 * 
 * Video Autoplay Technique:
 * - Uses YouTube Embed API with specific parameters
 * - Muted by default (required for autoplay) via URL parameter
 * - Loop enabled with playlist parameter
 * - No controls visible
 * - Positioned absolutely to cover entire section
 * 
 * Aspect Ratio Trick:
 * - Width: 100vw (full viewport width)
 * - Height: 56.25vw (16:9 aspect ratio)
 * - minWidth: 177.77vh (ensures full height coverage on landscape)
 * - minHeight: 100vh (ensures full height coverage)
 * - Centered with transform: translate(-50%, -50%)
 * 
 * This technique ensures the video always covers the entire hero section
 * regardless of screen size or orientation.
 */

const HERO_VIDEO_ID = 'M7FIvfx5J10'; // Porsche 911 GT3 official video

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 
        Video Background Container
        Positioned absolutely, centered, covering entire section
        z-index: 0 (behind all content)
        pointer-events: none (allows clicks to pass through)
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <iframe
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1`}
          title="DCR Motors - Hero Video Background"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            // Aspect ratio trick for full coverage
            width: '100vw',
            height: '56.25vw', // 16:9 ratio
            minWidth: '177.77vh', // Ensures vertical coverage
            minHeight: '100vh', // Ensures full height
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 
        Dark Overlay
        - 60% opacity black overlay
        - Improves text readability
        - z-index: 10 (above video, below content)
      */}
      <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

      {/* 
        Hero Content
        - z-index: 20 (above all layers)
        - Centered vertically
        - Responsive container with padding
      */}
      <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="max-w-5xl mt-16 md:mt-0">
          {/* Tagline */}
          <h2 className="text-primary text-xs md:text-base font-light tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
            Exclusividad. Performance. Pasión.
          </h2>

          {/* Main Headline */}
          <h1 className="text-white text-[12vw] sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-none mb-6 tracking-tighter">
            DCR{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary">
              MOTORS
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl font-light max-w-2xl mb-10 leading-relaxed">
            Participa en sorteos exclusivos de vehículos premium de alto rendimiento.
            <br className="hidden md:block" />
            <span className="text-primary font-semibold">Tu próximo sueño está a un sticker de distancia.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/collection">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-none text-base px-8 py-6 font-semibold tracking-wide group"
              >
                Ver Colección
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <Link to="/raffles">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-black rounded-none text-base px-8 py-6 font-semibold tracking-wide"
              >
                Sorteo Activo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 
        Scroll Indicator
        - Animated bounce effect
        - Bottom center position
        - DCR Yellow accent line
      */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-primary text-xs tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>

      {/* 
        Bottom Gradient Fade
        - Smooth transition to next section
        - Positioned at bottom
      */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
