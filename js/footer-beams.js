/**
 * Fresh Print — Footer beam + noise animation
 * Adapted from canvas hero effect (vanilla JS, brand colors)
 */
(function () {
  'use strict';

  const LAYERS = 3;
  const BEAMS_PER_LAYER = 6;
  const BEAM_RGB = '104, 211, 145'; /* --green-light */
  const BEAM_RGB_ALT = '154, 230, 92'; /* --green-lime */

  function getMotionScale() {
    if (window.matchMedia('(max-width: 640px)').matches) return 4;
    if (window.matchMedia('(max-width: 768px)').matches) return 2.75;
    return 1;
  }

  function createBeam(width, height, layer, motionScale) {
    const angle = -35 + Math.random() * 10;
    const baseSpeed = 0.15 + layer * 0.12;
    const baseOpacity = 0.06 + layer * 0.04;
    const baseWidth = 8 + layer * 4;
    const opacityBoost = motionScale > 1 ? 1.35 : 1;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      width: baseWidth,
      length: height * 2.2,
      angle,
      speed: (baseSpeed + Math.random() * 0.15) * motionScale,
      opacity: Math.min(1, (baseOpacity + Math.random() * 0.08) * opacityBoost),
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: (0.008 + Math.random() * 0.012) * motionScale,
      layer,
      alt: Math.random() > 0.5,
    };
  }

  function initFooterBeams(footer) {
    if (!footer || footer.dataset.beamsInit) return;
    footer.dataset.beamsInit = '1';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fx = document.createElement('div');
    fx.className = 'footer__fx';
    fx.setAttribute('aria-hidden', 'true');

    const beamCanvas = document.createElement('canvas');
    beamCanvas.className = 'footer__beam-canvas';

    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.className = 'footer__noise-canvas';

    fx.appendChild(beamCanvas);
    fx.appendChild(noiseCanvas);
    footer.insertBefore(fx, footer.firstChild);

    if (reducedMotion) {
      footer.classList.add('footer--beams-static');
      return;
    }

    const ctx = beamCanvas.getContext('2d');
    const nCtx = noiseCanvas.getContext('2d');
    if (!ctx || !nCtx) return;

    let beams = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let running = false;

    function resetBeams() {
      beams = [];
      const motionScale = getMotionScale();
      for (let layer = 1; layer <= LAYERS; layer++) {
        for (let i = 0; i < BEAMS_PER_LAYER; i++) {
          beams.push(createBeam(width, height, layer, motionScale));
        }
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = footer.clientWidth;
      height = footer.clientHeight;

      [beamCanvas, noiseCanvas].forEach((canvas) => {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      nCtx.setTransform(1, 0, 0, 1, 0, 0);
      nCtx.scale(dpr, dpr);

      resetBeams();
    }

    function drawNoise() {
      const imgData = nCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const v = Math.random() * 255;
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 10;
      }
      nCtx.putImageData(imgData, 0, 0);
    }

    function drawBeam(beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = Math.min(1, beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.4));
      const rgb = beam.alt ? BEAM_RGB_ALT : BEAM_RGB;
      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `rgba(${rgb}, 0)`);
      gradient.addColorStop(0.2, `rgba(${rgb}, ${pulsingOpacity * 0.45})`);
      gradient.addColorStop(0.5, `rgba(${rgb}, ${pulsingOpacity})`);
      gradient.addColorStop(0.8, `rgba(${rgb}, ${pulsingOpacity * 0.45})`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);

      ctx.fillStyle = gradient;
      ctx.filter = `blur(${2 + beam.layer * 1.5}px)`;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!running) return;

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, '#1a202c');
      bg.addColorStop(0.55, '#152a22');
      bg.addColorStop(1, '#1a6b3c');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      beams.forEach((beam) => {
        beam.y -= beam.speed * (beam.layer / LAYERS + 0.5);
        beam.pulse += beam.pulseSpeed;
        if (beam.y + beam.length < -50) {
          beam.y = height + 50;
          beam.x = Math.random() * width;
        }
        drawBeam(beam);
      });

      drawNoise();
      frameId = requestAnimationFrame(animate);
    }

    function start() {
      if (running) return;
      running = true;
      animate();
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    resize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(resize);
      ro.observe(footer);
    } else {
      window.addEventListener('resize', resize);
    }

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.05 }
      );
      io.observe(footer);
    } else {
      start();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
  }

  function boot() {
    document.querySelectorAll('.footer').forEach(initFooterBeams);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
