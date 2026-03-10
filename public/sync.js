window.loadCloudState = async function () {
  const res = await fetch("/api/state", {
    method: "GET",
    cache: "no-store"
  });
  const json = await res.json();
  return json.data || {};
};

window.saveCloudState = async function (state) {
  await fetch("/api/state", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(state)
  });
};
