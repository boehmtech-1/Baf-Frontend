import React from 'react';

const MirrorButton = ({
    children = "Book a Consultation",
    onClick,
    className = "",
    disabled = false,
    href,
    target,
    ...props
}) => {
    const buttonContent = (
        <div className="relative inline-block">
            <div
                className="relative px-4 py-1.5"
                style={{
                    // black fill + metallic gradient border
                    background: `
                        linear-gradient(#000, #000) padding-box,
                        linear-gradient(135deg,
                          rgba(255,255,255,0.85) 0%,
                          rgba(180,180,180,0.35) 25%,
                          rgba(255,255,255,0.8) 50%,
                          rgba(120,120,120,0.35) 75%,
                          rgba(255,255,255,0.9) 100%
                        ) border-box
                    `,
                    border: "1px solid transparent",
                    borderRadius: "11px",
                    overflow: "hidden",
                    boxShadow: `
                        0 0 0 1px rgba(255,255,255,0.15),
                        0 12px 26px rgba(255,255,255,0.05),
                        inset 0 1px 0 rgba(255,255,255,0.12),
                        inset 0 -1px 0 rgba(255,255,255,0.05)
                    `
                }}
            >
                {/* top-right subtle radial highlight */}
                <div
                    className="absolute top-0 right-0"
                    style={{
                        width: "5.5rem",
                        height: "5.5rem",
                        background:
                            "radial-gradient(80% 80% at 100% 0%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.12) 35%, rgba(255,255,255,0.04) 55%, transparent 70%)",
                        pointerEvents: "none",
                        mixBlendMode: "screen",
                        filter: "blur(0.3px)"
                    }}
                />

                {/* bottom-left subtle radial highlight */}
                <div
                    className="absolute bottom-0 left-0"
                    style={{
                        width: "5.5rem",
                        height: "5.5rem",
                        background:
                            "radial-gradient(80% 80% at 0% 100%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.04) 55%, transparent 70%)",
                        pointerEvents: "none",
                        mixBlendMode: "screen",
                        filter: "blur(0.3px)"
                    }}
                />

                {/* text */}
                <div className="relative z-10">
                    <span
                        className="whitespace-nowrap"
                        style={{
                            color: "#7f7f7f",
                            fontSize: "16px",
                            fontWeight: 400,
                            letterSpacing: "0.02em",
                            fontFamily:
                                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
                        }}
                    >
                        {children}
                    </span>
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <a
                href={href}
                target={target}
                className={`inline-block cursor-pointer transition-all duration-200 hover:brightness-110 ${className}`}
                {...props}
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {buttonContent}
        </button>
    );
};

export default MirrorButton;
