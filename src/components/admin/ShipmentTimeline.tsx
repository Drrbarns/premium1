import { CheckCircle2, Clock, MessageSquare, Truck } from "lucide-react";

interface Event {
  id: string;
  event_type: string;
  message: string | null;
  created_at: string;
  created_by: string | null;
}

const EVENT_ICONS: Record<string, React.ElementType> = {
  status_change: Truck,
  created: CheckCircle2,
  note: MessageSquare,
};

export function ShipmentTimeline({ events }: { events: Event[] }) {
  if (!events.length) return <p className="text-sm text-slate-400">No events recorded.</p>;

  return (
    <div className="space-y-0">
      {events.map((ev, i) => {
        const Icon = EVENT_ICONS[ev.event_type] || Clock;
        const isLast = i === events.length - 1;
        return (
          <div key={ev.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                <Icon size={14} className="text-slate-500" />
              </div>
              {!isLast && <div className="w-px flex-1 bg-slate-200 my-1" />}
            </div>
            <div className="pb-4 pt-1">
              <p className="text-sm text-slate-700">{ev.message || ev.event_type.replace(/_/g, " ")}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {new Date(ev.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
