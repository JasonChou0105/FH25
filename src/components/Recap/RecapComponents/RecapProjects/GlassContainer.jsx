function GlassContainer({ children, translateX = 0, className = "" }) {
    return (
        <div 
            className={`rounded-xl bg-white/5 backdrop-blur-sm border border-white/20 ${className}`}
            style={{ 
                fontFamily: 'Roboto, sans-serif',
                transform: `translateX(${translateX}px)`,
                boxShadow: '0 0 20px rgba(120, 192, 255, 0.15), 0 0 40px rgba(186, 180, 255, 0.13), 0 0 60px rgba(219, 176, 255, 0.1)'
            }}
        >
            {children}
        </div>
    );
}

export default GlassContainer;

