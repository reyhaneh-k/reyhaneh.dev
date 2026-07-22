import { cn } from "@/utils/classname";

export function Hero() {
  return (
    <div>
      {Array.from({ length: 50 }).map((_, index) => (
        <h1
          key={index}
          className={cn(
            "text-4xl font-bold",
            index % 2 === 0 && "text-red-500"
          )}
        >
          Hello World
        </h1>
      ))}
    </div>
  );
}
