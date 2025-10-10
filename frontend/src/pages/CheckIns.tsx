import { useEffect, useMemo, useState } from "react";
import { createCheckIn, listMyCheckIns, confirmCheckIn, CheckIn } from "../services/checkins";

export default function CheckIns() {
  const [dueAt, setDueAt] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "confirmed" | "missed">("");
  const [loading, setLoading] = useState<boolean>(false);
  const [items, setItems] = useState<CheckIn[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const locationPayload = useMemo(() => {
    if (!lat || !lng) return undefined;
    const nlat = Number(lat);
    const nlng = Number(lng);
    if (Number.isNaN(nlat) || Number.isNaN(nlng)) return undefined;
    return { lat: nlat, lng: nlng };
  }, [lat, lng]);

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      const data = await listMyCheckIns(statusFilter || undefined);
      setItems(data);
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to load check-ins");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      if (!dueAt) throw new Error("Due time is required");
      const dueISO = new Date(dueAt).toISOString();
      await createCheckIn({ dueAt: dueISO, note: note || undefined, location: locationPayload });
      setSuccess("Check-in created");
      setDueAt("");
      setNote("");
      setLat("");
      setLng("");
      refresh();
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to create check-in");
    }
  }

  async function onConfirm(id: string) {
    setError("");
    setSuccess("");
    try {
      await confirmCheckIn(id);
      setSuccess("Check-in confirmed");
      refresh();
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to confirm check-in");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Safety Check-Ins</h1>

      {error && <div className="mb-3 p-3 border border-red-300 bg-red-50 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-3 p-3 border border-green-300 bg-green-50 text-green-700 rounded">{success}</div>}

      <form onSubmit={onCreate} className="space-y-3 mb-8 p-4 border rounded">
        <h2 className="text-lg font-medium">Create a Check-In</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Due at</span>
            <input
              type="datetime-local"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              className="border rounded p-2"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Note (optional)</span>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded p-2"
              placeholder="e.g., Walking home"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Latitude (optional)</span>
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="border rounded p-2"
              placeholder="12.9716"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm text-gray-600">Longitude (optional)</span>
            <input
              type="text"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
              className="border rounded p-2"
              placeholder="77.5946"
            />
          </label>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Create</button>
      </form>

      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm">Filter:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="border rounded p-2"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="missed">Missed</option>
        </select>
        <button onClick={refresh} className="ml-2 px-3 py-2 border rounded">Refresh</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li key={it._id} className="p-3 border rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-medium">Due: {new Date(it.dueAt).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Status: {it.status}</div>
                {it.note && <div className="text-sm text-gray-600">Note: {it.note}</div>}
                {it.location && (
                  <div className="text-sm text-gray-600">
                    Location: {it.location.lat}, {it.location.lng}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {it.status === "pending" && (
                  <button
                    onClick={() => onConfirm(it._id)}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                )}
              </div>
            </li>
          ))}
          {items.length === 0 && <li className="text-sm text-gray-600">No check-ins</li>}
        </ul>
      )}
    </div>
  );
}
