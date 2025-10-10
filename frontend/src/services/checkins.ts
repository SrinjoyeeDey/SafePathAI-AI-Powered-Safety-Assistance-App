import api from "./api";

export interface CheckInPayload {
  dueAt: string; // ISO string
  note?: string;
  location?: { lat: number; lng: number };
}

export interface CheckIn {
  _id: string;
  user: string;
  dueAt: string;
  confirmedAt?: string | null;
  status: "pending" | "confirmed" | "missed";
  note?: string;
  location?: { lat: number; lng: number };
  createdAt: string;
  updatedAt: string;
}

export async function createCheckIn(payload: CheckInPayload) {
  const { data } = await api.post<{ checkIn: CheckIn }>("/checkins", payload);
  return data.checkIn;
}

export async function confirmCheckIn(id: string) {
  const { data } = await api.post<{ checkIn: CheckIn }>(`/checkins/${id}/confirm`);
  return data.checkIn;
}

export async function listMyCheckIns(status?: "pending" | "confirmed" | "missed") {
  const { data } = await api.get<{ items: CheckIn[] }>("/checkins/me", {
    params: status ? { status } : undefined,
  });
  return data.items;
}
