const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Professional gradient base matching OFPPT colors */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(210 25% 6%) 0%, hsl(210 30% 10%) 50%, hsl(210 25% 8%) 100%)'
        }}
      />
      
      {/* Subtle animated gradient orbs */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full animate-glow"
        style={{
          left: '-10%',
          top: '-20%',
          background: 'radial-gradient(circle, hsla(174 72% 40% / 0.08) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full animate-glow"
        style={{
          right: '-5%',
          bottom: '-10%',
          background: 'radial-gradient(circle, hsla(210 85% 45% / 0.08) 0%, transparent 70%)',
          animationDelay: '1.5s',
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] rounded-full animate-glow"
        style={{
          right: '30%',
          top: '20%',
          background: 'radial-gradient(circle, hsla(145 63% 40% / 0.05) 0%, transparent 70%)',
          animationDelay: '3s',
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(210 20% 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(210 20% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute w-2 h-2 rounded-full animate-float opacity-30"
          style={{ 
            left: '10%', 
            top: '60%', 
            background: 'hsl(174 72% 40%)',
            animationDuration: '15s' 
          }} 
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full animate-float opacity-25"
          style={{ 
            left: '50%', 
            top: '75%', 
            background: 'hsl(210 85% 45%)',
            animationDuration: '12s' 
          }} 
        />
        <div 
          className="absolute w-2 h-2 rounded-full animate-float opacity-20"
          style={{ 
            left: '85%', 
            top: '55%', 
            background: 'hsl(145 63% 40%)',
            animationDuration: '18s' 
          }} 
        />
        <div 
          className="absolute w-1 h-1 rounded-full animate-float opacity-30"
          style={{ 
            left: '25%', 
            top: '35%', 
            background: 'hsl(174 72% 40%)',
            animationDuration: '10s' 
          }} 
        />
        <div 
          className="absolute w-1.5 h-1.5 rounded-full animate-float opacity-25"
          style={{ 
            left: '70%', 
            top: '25%', 
            background: 'hsl(210 85% 45%)',
            animationDuration: '14s' 
          }} 
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;