import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
}

const MagneticButton = ({
  children,
  className = "",
  strength = 0.4,
  onClick,
  href,
  target,
  rel,
  download,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 15,
        mass: 0.5,
      }}
      className={`inline-block ${className}`}
    >
      <motion.div
        animate={{
          x: position.x * 0.3,
          y: position.y * 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 15,
          mass: 0.5,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} download={download} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className="inline-block cursor-pointer">
      {content}
    </div>
  );
};

export default MagneticButton;
