import React, { useRef, useEffect } from 'react';

const PastelGradientCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;
    const animate = () => {
      time += 0.005; // Slow increment for ambient motion
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Base fill for a light pastel foundation
      ctx.fillStyle = '#F8F8FF'; // GhostWhite
      ctx.fillRect(0, 0, w, h);

      // Left side: Pink blob
      let cx1 = w * 0.2 + Math.sin(time) * 50;
      let cy1 = h / 2 + Math.cos(time) * 50;
      const grad1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, w / 2);
      grad1.addColorStop(0, 'rgba(255, 182, 193, 0.8)');
      grad1.addColorStop(1, 'rgba(255, 182, 193, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      // Left side: Peach blob
      let cx2 = w * 0.3 + Math.cos(time * 1.2) * 60;
      let cy2 = h / 2 + Math.sin(time * 1.2) * 60;
      const grad2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, w / 1.5);
      grad2.addColorStop(0, 'rgba(255, 229, 180, 0.7)');
      grad2.addColorStop(1, 'rgba(255, 229, 180, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // Left side: Magenta blob
      let cx3 = w * 0.1 + Math.sin(time * 0.8) * 40;
      let cy3 = h / 2 + Math.cos(time * 0.8) * 40;
      const grad3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, w / 2.5);
      grad3.addColorStop(0, 'rgba(255, 119, 168, 0.6)');
      grad3.addColorStop(1, 'rgba(255, 119, 168, 0)');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, w, h);

      // Center: Yellow blob
      let cx4 = w / 2 + Math.sin(time * 1.1) * 30;
      let cy4 = h / 2 + Math.cos(time * 1.1) * 30;
      const grad4 = ctx.createRadialGradient(cx4, cy4, 0, cx4, cy4, w / 3);
      grad4.addColorStop(0, 'rgba(255, 255, 153, 0.8)');
      grad4.addColorStop(1, 'rgba(255, 255, 153, 0)');
      ctx.fillStyle = grad4;
      ctx.fillRect(0, 0, w, h);

      // Right side: Lavender blob
      let cx5 = w * 0.7 + Math.cos(time * 0.9) * 50;
      let cy5 = h / 2 + Math.sin(time * 0.9) * 50;
      const grad5 = ctx.createRadialGradient(cx5, cy5, 0, cx5, cy5, w / 2);
      grad5.addColorStop(0, 'rgba(195, 177, 225, 0.7)');
      grad5.addColorStop(1, 'rgba(195, 177, 225, 0)');
      ctx.fillStyle = grad5;
      ctx.fillRect(0, 0, w, h);

      // Right side: Light blue blob
      let cx6 = w * 0.8 + Math.sin(time * 1.3) * 40;
      let cy6 = h / 2 + Math.cos(time * 1.3) * 40;
      const grad6 = ctx.createRadialGradient(cx6, cy6, 0, cx6, cy6, w / 1.8);
      grad6.addColorStop(0, 'rgba(167, 199, 231, 0.6)');
      grad6.addColorStop(1, 'rgba(167, 199, 231, 0)');
      ctx.fillStyle = grad6;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default PastelGradientCanvas;