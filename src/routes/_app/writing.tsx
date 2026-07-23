import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/writing")({
  component: WritingPage,
});

function WritingPage() {
  return (
    <div className="p-2">
      <h1 className="font-display flex flex-col items-center justify-center gap-2 text-3xl font-bold">
        {Array.from({ length: 40 }).map((_, index) => (
          <span key={index}>
            WritingWritingWritingWriting
          </span>
        ))}
      </h1>
    </div>
  );
}
