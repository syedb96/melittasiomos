import { ReactNode, useEffect, useState, useRef, forwardRef } from "react";
import { motion, useInView } from "framer-motion";

// Fade-in-up section wrapper
export const FadeInUp = forwardRef<HTMLDivElement, {
  children: ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className = "", delay = 0 }, _ref) => {
  const internalRef = useRef(null);
  const isInView = useInView(internalRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={internalRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
FadeInUp.displayName = "FadeInUp";

// Staggered children container
export const StaggerContainer = forwardRef<HTMLDivElement, {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}>(({ children, className = "", staggerDelay = 0.1 }, _ref) => {
  const internalRef = useRef(null);
  const isInView = useInView(internalRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={internalRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
StaggerContainer.displayName = "StaggerContainer";

// Individual stagger child
export const StaggerItem = forwardRef<HTMLDivElement, {
  children: ReactNode;
  className?: string;
}>(({ children, className = "" }, _ref) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    }}
    className={className}
  >
    {children}
  </motion.div>
));
StaggerItem.displayName = "StaggerItem";

// Animated counter
export const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

// Scale-in on view
export const ScaleIn = forwardRef<HTMLDivElement, {
  children: ReactNode;
  className?: string;
  delay?: number;
}>(({ children, className = "", delay = 0 }, _ref) => {
  const internalRef = useRef(null);
  const isInView = useInView(internalRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={internalRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
});
ScaleIn.displayName = "ScaleIn";
