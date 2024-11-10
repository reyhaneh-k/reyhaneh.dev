"use client";
import Image from "next/image";
import { useRef, useEffect } from "react";

type Position =
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

export const Electron = ({
  icon,
  alt,
  position,
  priority = false,
}: {
  icon: string;
  alt: string;
  position: Position;
  priority?: boolean;
}) => {
  const electronRef = useRef<HTMLImageElement | null>(null);
  const angle = useRef((position * Math.PI * 5) / 20);
  const animationID = useRef<number>(0);
  const radius = useRef<number>(position * 7);

  useEffect(() => {
    if (window.matchMedia("(max-width:768px)").matches) {
      radius.current = position * 7;
    } else {
      radius.current = position * 11;
    }
  }, [position]);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width:768px)").matches) {
        radius.current = position * 7;
      } else {
        radius.current = position * 11;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [position, radius]);

  useEffect(() => {
    const animate = () => {
      const x = radius.current * Math.cos(angle.current);
      const y = radius.current * Math.sin(angle.current);
      if (electronRef.current) {
        electronRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      angle.current += radius.current / 50000;
      animationID.current = requestAnimationFrame(animate);
    };
    animationID.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationID.current);
    };
  }, []);

  return (
    <div
      className="flex flex-col z-20 absolute h-[20%] w-[20%] mx-auto inset-0 my-auto items-center"
      ref={electronRef}
    >
      <Image
        alt={alt}
        src={icon}
        width={50}
        height={50}
        sizes="(min-width: 768px) 50px,30px"
        priority={priority}
        className={`hover:animate-pulse h-[50%] w-[50%]`}
      ></Image>
      <span className="text-text opacity-30 text-sm font-code">
        {alt.charAt(0).toUpperCase()}
        {alt.slice(1)}
      </span>
    </div>
  );
};
