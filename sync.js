export async function loadCloudState() {
  const response = await fetch("/api/state", {
    method: "GET",
    headers: {
      "Accept": "application/json"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to load cloud state");
  }

  const result = await response.json();
  return result?.data ?? {};
}

export async function saveCloudState(state) {
  const response = await fetch("/api/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state ?? {})
  });

  if (!response.ok) {
    throw new Error("Failed to save cloud state");
  }

  return await response.json();
}
