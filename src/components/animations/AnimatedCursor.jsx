// src/components/AnimatedCursor.js
import React, { useState, forwardRef } from "react";
import { motion } from "framer-motion";

// Simple store to hold background color
function useStore() {
    const [store, setStore] = useState({ background: "#0099FF" });
    return [store, setStore];
}

// HOC: rotate effect
export function withRotate(Component) {
    return forwardRef((props, ref) => (
        <Component
            ref={ref}
            {...props}
            animate={{ rotate: 90 }}
            transition={{ duration: 2 }}
        />
    ));
}

// HOC: hover scale effect
export function withHover(Component) {
    return forwardRef((props, ref) => (
        <Component ref={ref} {...props} whileHover={{ scale: 1.05 }} />
    ));
}

// HOC: random color effect
export function withRandomColor(Component) {
    return forwardRef((props, ref) => {
        const [store, setStore] = useStore();

        function randomColor() {
            return "#" + Math.floor(Math.random() * 16777215).toString(16);
        }

        return (
            <Component
                ref={ref}
                {...props}
                animate={{ background: store.background }}
                onClick={() => setStore({ background: randomColor() })}
            />
        );
    });
}

// Compose all effects for the cursor
const CursorBase = motion.div;

// Usage: <AnimatedCursor style={{ width: 32, height: 32, borderRadius: "50%" }} />
export const AnimatedCursor = withRandomColor(withHover(withRotate(CursorBase)));