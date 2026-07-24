import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="p-2">
      <h1 className="font-display text-3xl font-bold">
        Contact
      </h1>
    </div>
  );
}
