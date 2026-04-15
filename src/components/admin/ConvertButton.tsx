"use client";

import { useTransition } from "react";
import { Truck } from "lucide-react";

export function ConvertButton({
  action,
  entityId,
}: {
  action: (formData: FormData) => Promise<void>;
  entityId: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm("Convert this inquiry to a shipment? A client record will be created if one doesn't exist.")) return;
    const fd = new FormData();
    fd.set("id", entityId);
    startTransition(() => action(fd));
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-50"
    >
      <Truck size={16} />
      {pending ? "Converting..." : "Convert to Shipment"}
    </button>
  );
}
