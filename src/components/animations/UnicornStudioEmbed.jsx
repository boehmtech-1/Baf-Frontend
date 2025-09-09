import React, { useEffect, useRef } from "react";

/**
 * UnicornStudioEmbed React component
 *
 * Props:
 * - projectId: string (optional) - Unicorn Studio project ID
 * - projectJSON: string (optional) - Unicorn Studio project data JSON
 * - scale, dpi, fps: numbers for rendering configuration
 * - altText, ariaLabel: accessibility strings
 * - lazyLoad: boolean flag to lazy load the project
 * - header: string - optional H1 visually hidden for SEO/accessibility
 */
export default function UnicornStudioEmbed(props) {
    const elementRef = useRef(null);
    const sceneRef = useRef(null);
    const scriptId = useRef(
        `unicorn-project-${Math.random().toString(36).substr(2, 9)}`
    );

    useEffect(() => {
        // Function to remove watermark - more comprehensive targeting
        const removeWatermark = () => {
            // Target common Unicorn Studio watermark elements
            const watermarkSelectors = [
                '[data-us-watermark]',
                '[class*="watermark"]',
                '[id*="watermark"]',
                '[class*="unicorn"]',
                '[id*="unicorn"]',
                '[class*="us-"]',
                '[data-us-*]',
                '[style*="watermark"]',
                '[style*="unicorn"]',
                // Common Unicorn Studio specific selectors
                '[class*="us-watermark"]',
                '[class*="us-embed"]',
                '[class*="us-button"]',
                '[class*="us-logo"]'
            ];
            
            watermarkSelectors.forEach(selector => {
                try {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        // Check if it's a watermark (small size, contains watermark text, or has watermark-like styling)
                        if (el.offsetHeight < 100 && 
                            (el.textContent?.includes('unicorn') || 
                             el.textContent?.includes('watermark') ||
                             el.className?.includes('watermark') ||
                             el.className?.includes('unicorn'))) {
                            el.remove();
                        }
                    });
                } catch (e) {
                    // Ignore selector errors
                }
            });

            // Remove any remaining elements with watermark text
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.textContent && 
                    (element.textContent.includes('Made with unicorn.studio') ||
                     element.textContent.includes('unicorn.studio') ||
                     element.textContent.includes('Unicorn Studio')) &&
                    element.offsetHeight < 100) {
                    element.remove();
                }
            });

            // Remove any iframes that might contain the watermark
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => {
                if (iframe.src && iframe.src.includes('unicorn')) {
                    iframe.remove();
                }
            });
        };

        // Set up interval to remove watermark
        const watermarkRemovalInterval = setInterval(removeWatermark, 300);

        // Remove watermark after Unicorn Studio loads
        const delayedRemoval = setTimeout(removeWatermark, 3000);

        const isEditingOrPreviewing = ["CANVAS", "PREVIEW"].includes(
            window?.RenderTarget?.current?.() || ""
        );

        // If editing in Framer canvas, do not run
        if (window?.RenderTarget?.current?.() === "CANVAS") {
            return;
        }

        // Dynamically load the Unicorn Studio script if not already loaded
        const initializeScript = (callback) => {
            const existingScript = document.querySelector(
                'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio"]'
            );
            if (!existingScript) {
                const script = document.createElement("script");
                script.src =
                    "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
                script.onload = callback;
                document.head.appendChild(script);
            } else {
                callback();
            }
        };

        // Initialize the project either from JSON or ID
        const initializeUnicornStudio = () => {
            if (props.projectJSON) {
                try {
                    // Add project JSON as a JSON script tag in head
                    const dataScript = document.createElement("script");
                    dataScript.id = scriptId.current;
                    dataScript.type = "application/json";
                    dataScript.textContent = props.projectJSON;
                    document.head.appendChild(dataScript);

                    elementRef.current.setAttribute(
                        "data-us-project-src",
                        `${scriptId.current}`
                    );
                } catch (e) {
                    console.error("Failed to parse project JSON:", e);
                    return;
                }
            } else if (props.projectId) {
                const query = props.projectId.split("?");
                const projectId = query[0];
                const production = query[1] && query[1].includes("production");
                const cacheBuster = isEditingOrPreviewing
                    ? "?update=" + Math.random()
                    : "";
                elementRef.current.setAttribute(
                    "data-us-project",
                    projectId + cacheBuster
                );

                if (production) {
                    elementRef.current.setAttribute("data-us-production", 1);
                }
            }

            if (window.UnicornStudio) {
                const existingScene = window.UnicornStudio.scenes?.find(
                    (scene) =>
                        scene.element === elementRef.current ||
                        scene.element.contains(elementRef.current)
                );
                if (existingScene) {
                    existingScene.destroy();
                } else {
                    window.UnicornStudio.destroy();
                }
                window.UnicornStudio.init().then((scenes) => {
                    const ourScene = scenes.find(
                        (scene) =>
                            scene.element === elementRef.current ||
                            scene.element.contains(elementRef.current)
                    );
                    if (ourScene) {
                        sceneRef.current = ourScene;
                    }
                });
            }
        };

        if (props.projectId || props.projectJSON) {
            if (window.UnicornStudio) {
                initializeUnicornStudio();
            } else {
                initializeScript(initializeUnicornStudio);
            }
        }

        return () => {
            clearInterval(watermarkRemovalInterval);
            clearTimeout(delayedRemoval);
            if (sceneRef.current) {
                sceneRef.current.destroy();
                sceneRef.current = null;
            }
            // Remove JSON script if present
            const dataScript = document.getElementById(scriptId.current);
            if (dataScript) {
                dataScript.remove();
            }
        };
    }, [props.projectId, props.projectJSON]);

    // Render placeholder in Framer canvas editor
    if (window?.RenderTarget?.current?.() === "CANVAS") {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.15)",
                    color: "#4B5563",
                    fontWeight: 500,
                    textAlign: "center",
                    padding: "16px",
                }}
            >
                <p style={{ fontSize: "1.25rem", marginBottom: "12px" }}>
                    Scene will render in Preview and on your published site.
                </p>
                {!props.projectId && !props.projectJSON ? (
                    <p style={{ fontSize: "1rem", color: "#EF4444" }}>
                        No project ID, please export your scene and add its project ID in
                        the detail panel.
                    </p>
                ) : (
                    " "
                )}
            </div>
        );
    }

    // Actual render container that Unicorn Studio script targets
    return (
        <div
            ref={elementRef}
            data-us-dpi={props.dpi}
            data-us-scale={props.scale}
            data-us-fps={props.fps}
            data-us-altText={props.altText}
            data-us-ariaLabel={props.ariaLabel}
            data-us-lazyload={props.lazyLoad ? "true" : ""}
            style={{ width: "100%", height: "100%", ...props.style }}
        >
            {props.header && (
                <h1
                    style={{
                        width: "1px",
                        height: "1px",
                        margin: "-1px",
                        padding: "0",
                        overflow: "hidden",
                        clip: "rect(0, 0, 0, 0)",
                        border: "0",
                    }}
                >
                    {props.header}
                </h1>
            )}
        </div>
    );
}