export async function onRequestGet(context) {
  try {
    const row = await context.env.DB
      .prepare("SELECT payload, updated_at FROM app_state WHERE id = ?")
      .bind("main")
      .first();

    return new Response(
      JSON.stringify({
        success: true,
        data: row ? JSON.parse(row.payload) : {},
        updated_at: row ? row.updated_at : null
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "cache-control": "no-store"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const payload = JSON.stringify(body ?? {});

    await context.env.DB
      .prepare(`
        INSERT INTO app_state (id, payload, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id)
        DO UPDATE SET
          payload = excluded.payload,
          updated_at = CURRENT_TIMESTAMP
      `)
      .bind("main", payload)
      .run();

    return new Response(
      JSON.stringify({
        success: true
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    );
  }
}
