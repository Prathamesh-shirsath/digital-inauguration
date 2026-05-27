function CurtainAnimation({
    inaugurated,
}) {
    return (
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">

            {/* LEFT CURTAIN */}
            <div
                className={`
          absolute left-0 top-0
          w-1/2 h-full
          bg-gradient-to-r
          from-red-950
          via-red-800
          to-red-900
          shadow-[20px_0_60px_rgba(0,0,0,0.5)]
          transition-all
          duration-[5000ms]
          ease-in-out
          ${inaugurated
                        ? "-translate-x-full"
                        : "translate-x-0"
                    }
        `}
            >
                {/* Curtain texture */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent)]" />

                {/* Vertical folds */}
                <div className="absolute inset-0 flex justify-around opacity-30">
                    {[
                        ...Array(12),
                    ].map((_, i) => (
                        <div
                            key={i}
                            className="w-[10px] h-full bg-black/30"
                        />
                    ))}
                </div>
            </div>

            {/* RIGHT CURTAIN */}
            <div
                className={`
          absolute right-0 top-0
          w-1/2 h-full
          bg-gradient-to-l
          from-red-950
          via-red-800
          to-red-900
          shadow-[-20px_0_60px_rgba(0,0,0,0.5)]
          transition-all
          duration-[5000ms]
          ease-in-out
          ${inaugurated
                        ? "translate-x-full"
                        : "translate-x-0"
                    }
        `}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent)]" />

                <div className="absolute inset-0 flex justify-around opacity-30">
                    {[
                        ...Array(12),
                    ].map((_, i) => (
                        <div
                            key={i}
                            className="w-[10px] h-full bg-black/30"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CurtainAnimation;