import React, { useEffect, useRef } from 'react';

const MatrixEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fontSize = 16;
  //   const _columns: number[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas(); // Initialize canvas size

    // const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const letters =
      'アカサタナハマヤラワガザダバパイキシチニヒミリヰギジヂビピウクスツヌフムユルグズヅブ⟇⟈⟉⟊⟋⟌⟍⟎⟏⟐⟑⟒⟓⟔⟕⟖⟗⟘⟙⟚⟛⟜⟝⟞⟟⟠⟡⟢⟣⟤⟥⟦⟧⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱⟲⟳⟴⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿プエケセテネヘメレヱゲゼデベペオコソトノホモヨロヲゴゾドボポヴABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    // const letters =
    //   '⟆⟇⟈⟉⟊⟋⟌⟍⟎⟏⟐⟑⟒⟓⟔⟕⟖⟗⟘⟙⟚⟛⟜⟝⟞⟟⟠⟡⟢⟣⟤⟥⟦⟧⟨⟩⟪⟫⟬⟭⟮⟯⟰⟱⟲⟳⟴⟵⟶⟷⟸⟹⟺⟻⟼⟽⟾⟿';
    const drops: number[] = Array(
      Math.floor(window.innerWidth / fontSize)
    ).fill(1);

    // Matrix animation logic
    const draw = () => {
      if (!context || !canvas) return;

      context.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Black with transparency
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0'; // Green text
      context.font = `${fontSize}px monospace`;

      for (let x = 0; x < drops.length; x++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        context.fillText(text, x * fontSize, drops[x] * fontSize);

        // Reset drop to the top randomly
        if (drops[x] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0; // Reset drop to the top
        }
        drops[x]++; // Increment drop
      }
    };

    const interval = setInterval(draw, 50);

    // Listen for window resizing to adjust the canvas size dynamically
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className='absolute top-0 left-0' />;
};

export default MatrixEffect;
