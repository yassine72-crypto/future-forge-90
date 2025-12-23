const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Gradient base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, hsl(280 40% 12%) 0%, hsl(220 40% 12%) 50%, hsl(210 50% 15%) 100%)'
        }}
      />
      
      {/* Animated waves */}
      <div className="absolute w-[200%] h-[200%] animate-wave opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(330 100% 50%), hsl(185 100% 50%), transparent)',
        }}
      />
      <div className="absolute w-[200%] h-[200%] animate-wave opacity-[0.08]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(330 100% 50%), hsl(185 100% 50%), transparent)',
          animationDelay: '-2s',
        }}
      />
      <div className="absolute w-[200%] h-[200%] animate-wave opacity-[0.06]"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(330 100% 50%), hsl(185 100% 50%), transparent)',
          animationDelay: '-4s',
        }}
      />
      
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute w-6 h-6 rounded-full animate-float opacity-20 blur-sm"
          style={{ 
            left: '8%', 
            top: '65%', 
            background: 'linear-gradient(180deg, hsl(185 100% 50%), hsl(330 100% 50%))',
            animationDuration: '12s' 
          }} 
        />
        <div 
          className="absolute w-4 h-4 rounded-full animate-float opacity-15 blur-sm"
          style={{ 
            left: '52%', 
            top: '80%', 
            background: 'linear-gradient(180deg, hsl(185 100% 50%), hsl(330 100% 50%))',
            animationDuration: '9s' 
          }} 
        />
        <div 
          className="absolute w-7 h-7 rounded-full animate-float opacity-15 blur-sm"
          style={{ 
            left: '80%', 
            top: '60%', 
            background: 'linear-gradient(180deg, hsl(185 100% 50%), hsl(330 100% 50%))',
            animationDuration: '14s' 
          }} 
        />
        <div 
          className="absolute w-5 h-5 rounded-full animate-float opacity-20 blur-sm"
          style={{ 
            left: '25%', 
            top: '40%', 
            background: 'linear-gradient(180deg, hsl(185 100% 50%), hsl(330 100% 50%))',
            animationDuration: '10s' 
          }} 
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
