"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Search, Truck } from "lucide-react";

interface TrackEvent {
  id: string;
  event_type: string;
  message: string;
  created_at: string;
}

interface TrackResult {
  shipment_no: string;
  origin: string;
  destination: string;
  method: string;
  status: string;
  key_dates: Record<string, string>;
  events: TrackEvent[];
}

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  booked: "Booked",
  in_transit: "In Transit",
  arrived: "Arrived at Port",
  clearing: "Customs Clearing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  booked: "bg-blue-50 text-blue-700",
  in_transit: "bg-amber-50 text-amber-700",
  arrived: "bg-cyan-50 text-cyan-700",
  clearing: "bg-purple-50 text-purple-700",
  out_for_delivery: "bg-orange-50 text-orange-700",
  delivered: "bg-green-50 text-green-700",
};

export function TrackLookup() {
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<TrackResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(ref.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Shipment not found.");
      } else {
        setResult(data);
      }
    } catch {
      setError("Unable to reach tracking service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            placeholder="Enter shipment or inquiry reference (e.g. SHP-20260415-1001)"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3.5 rounded-2xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] disabled:opacity-50 shrink-0"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg shadow-slate-900/5">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-slate-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-[var(--accent)] tracking-wider">
                  {result.shipment_no}
                </p>
                <h3 className="text-xl font-bold text-[var(--ink)] mt-1">
                  {result.origin} → {result.destination}
                </h3>
                <p className="text-sm text-slate-500 mt-0.5 capitalize">
                  {result.method} freight
                </p>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  STATUS_COLORS[result.status] || "bg-slate-100 text-slate-600"
                }`}
              >
                {STATUS_LABELS[result.status] || result.status}
              </span>
            </div>

            {/* Key Dates */}
            {Object.keys(result.key_dates).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-slate-200">
                {Object.entries(result.key_dates).map(([k, v]) =>
                  v ? (
                    <div key={k}>
                      <p className="text-xs text-slate-500 capitalize">{k}</p>
                      <p className="text-sm font-medium text-slate-700">{v}</p>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="p-6">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Tracking History
            </h4>
            {result.events.length > 0 ? (
              <div className="space-y-0">
                {result.events.map((ev, i) => {
                  const isFirst = i === 0;
                  const isLast = i === result.events.length - 1;
                  return (
                    <div key={ev.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            isFirst
                              ? "bg-[var(--accent)] text-white"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {ev.event_type === "status_change" ? (
                            <Truck size={14} />
                          ) : isFirst ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <Clock size={14} />
                          )}
                        </div>
                        {!isLast && <div className="w-px flex-1 bg-slate-200 my-1" />}
                      </div>
                      <div className="pb-4 pt-1">
                        <p className={`text-sm ${isFirst ? "font-medium text-slate-900" : "text-slate-600"}`}>
                          {ev.message || ev.event_type.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(ev.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No tracking events recorded yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
