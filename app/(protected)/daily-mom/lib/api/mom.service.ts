import { MOMEntry } from "../types/mom.type";

export async function createMOM(data: MOMEntry) {
  const response = await fetch("/api/mom", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create MOM");
  }

  return result;
}

export async function getAllMOMs(userId: string) {
  const response = await fetch(`/api/mom?userId=${userId}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch MOMs");
  }

  return result.data;
}
