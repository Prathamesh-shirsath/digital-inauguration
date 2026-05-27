function CurtainAnimation({
    inaugurated,
}) {
    return (
        <div className="absolute inset-0 z-50 overflow-hidden pointer-events-none">

            {/* LEFT CURTAIN */}
            <div
                className={`
          absolute top-0 left-0
          w-1/2 h-full
          origin-top-right
          transition-all
          duration-[5000ms]
          ease-in-out
          ${inaugurated
                        ? "-translate-x-full rotate-[12deg] scale-x-0 scale-y-[1.6]"
                        : "translate-x-0 rotate-0 scale-100"
                    }
        `}
            >
                <div
                    className="w-full h-full bg-cover bg-no-repeat relative"
                    style={{
                        backgroundImage:
                            `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/950358/curtain.svg")`,
                        backgroundSize:
                            "cover",
                    }}
                >
                    {/* Purple Overlay */}
                    <div className="absolute inset-0 bg-red-500/80 mix-blend-multiply" />

                    {/* Extra folds */}
                    <div className="absolute inset-0 flex justify-around opacity-25">
                        {[...Array(12)].map(
                            (_, i) => (
                                <div
                                    key={i}
                                    className="w-[12px] h-full bg-black/30"
                                />
                            )
                        )}
                    </div>

                    {/* Shadow */}
                    <div className="absolute right-0 top-0 h-full w-[20px] bg-black/40 blur-md" />
                </div>
            </div>

            {/* RIGHT CURTAIN */}
            <div
                className={`
          absolute top-0 right-0
          w-1/2 h-full
          origin-top-left
          transition-all
          duration-[5000ms]
          ease-in-out
          ${inaugurated
                        ? "translate-x-full rotate-[-12deg] scale-x-0 scale-y-[1.6]"
                        : "translate-x-0 rotate-0 scale-100"
                    }
        `}
            >
                <div
                    className="w-full h-full bg-cover bg-no-repeat relative"
                    style={{
                        backgroundImage:
                            `url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/950358/curtain.svg")`,
                        backgroundPosition:
                            "right center",
                        backgroundSize:
                            "cover",
                    }}
                >
                    {/* Purple Overlay */}
                    <div className="absolute inset-0 bg-red-500/80 mix-blend-multiply" />

                    {/* Extra folds */}
                    <div className="absolute inset-0 flex justify-around opacity-25">
                        {[...Array(12)].map(
                            (_, i) => (
                                <div
                                    key={i}
                                    className="w-[12px] h-full bg-black/30"
                                />
                            )
                        )}
                    </div>

                    {/* Shadow */}
                    <div className="absolute left-0 top-0 h-full w-[20px] bg-black/40 blur-md" />
                </div>
            </div>

            {/* Stage Glow */}
            <div
                className={`
          absolute left-1/2
          w-[9000px]
          h-[9000px]
          rounded-full
          -translate-x-1/2
          transition-all
          duration-[5000ms]
          ease-out
          shadow-[0_0_120px_120px_rgba(255,255,255,0.25)]
          ${inaugurated
                        ? "top-[108%]"
                        : "top-[133%]"
                    }
        `}
            />
        </div>
    );
}

export default CurtainAnimation;