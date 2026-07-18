"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "span";
};

const buildVariants = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: "easeOut" },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 12,
  duration = 0.4,
  once = true,
  amount = 0.4,
  as = "div",
}: RevealProps): React.ReactElement {
  const Component = motion[as];
  const variants = buildVariants(y, duration, delay);

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
  as?: "div" | "section" | "ul";
};

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger },
  },
});

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  once = true,
  amount = 0.4,
  as = "div",
}: RevealGroupProps): React.ReactElement {
  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  as?: "div" | "li" | "span";
};

export function RevealItem({
  children,
  className,
  y = 12,
  duration = 0.4,
  as = "div",
}: RevealItemProps): React.ReactElement {
  const Component = motion[as];
  const variants = buildVariants(y, duration, 0);

  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  );
}