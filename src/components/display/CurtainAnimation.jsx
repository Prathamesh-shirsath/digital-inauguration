function CurtainAnimation({
    inaugurated,
}) {
    return (
        <>
            {!inaugurated && (
                <div className="absolute inset-0 flex z-50">

                    <div className="w-1/2 h-full bg-red-900 transition-all duration-[4000ms]" />

                    <div className="w-1/2 h-full bg-red-900 transition-all duration-[4000ms]" />
                </div>
            )}

            {inaugurated && (
                <div className="absolute inset-0 flex z-50 pointer-events-none">

                    <div className="w-1/2 h-full bg-red-900 -translate-x-full transition-all duration-[4000ms]" />

                    <div className="w-1/2 h-full bg-red-900 translate-x-full transition-all duration-[4000ms]" />
                </div>
            )}
        </>
    );
}

export default CurtainAnimation;