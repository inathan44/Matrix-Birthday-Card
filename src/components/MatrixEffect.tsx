import React, { useEffect, useRef } from 'react';

const MatrixEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontSize = 16;
  const dropsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        dropsRef.current = Array(Math.floor(window.innerWidth / fontSize)).fill(
          1
        );
      }
    };

    resizeCanvas(); // Initialize canvas size

    const letters =
      'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブ⟇⟈⟉⟊⟋⟌⟍⟎⟏⟐⟑⟒⟓⟔⟕⟖⟗⟘⟙⟚⟛⟜⟝⟞⟟⟠⟡⟢⟣⟤⟥⟦⟧⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱⟲⟳⟴⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿プエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    // Matrix animation logic
    const draw = () => {
      if (!context || !canvas) return;

      context.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Black with transparency
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0'; // Green text
      context.font = `${fontSize}px monospace`;

      for (let x = 0; x < dropsRef.current.length; x++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        context.fillText(text, x * fontSize, dropsRef.current[x] * fontSize);

        // Reset drop to the top randomly
        if (
          dropsRef.current[x] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          dropsRef.current[x] = 0; // Reset drop to the top
        }
        dropsRef.current[x]++; // Increment drop
      }
    };

    const interval = setInterval(draw, 50);

    // Throttle resize event
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='bg-black min-h-screen'>
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full h-full' />
    </div>
  );
};

export default MatrixEffect;
