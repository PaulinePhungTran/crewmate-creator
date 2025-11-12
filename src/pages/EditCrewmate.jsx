import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function EditCrewmate() {
  const { id } = useParams(); // ✅ This gets the ID from the URL
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", speed: "", color: "Red" });

  useEffect(() => {
    if (!id) {
      console.error("❌ No ID found in URL.");
      return;
    }

    // ✅ Fetch the crewmate only when the ID exists
    (async () => {
      console.log("Fetching crewmate with ID:", id);
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .maybeSingle(); // ← prevents crashing if no match found

      if (error) {
        console.error("❌ Supabase fetch error:", error.message);
        alert(`Failed to load crewmate: ${error.message}`);
      } else if (data) {
        console.log("✅ Fetched crewmate:", data);
        setForm({ name: data.name, speed: data.speed, color: data.color });
      } else {
        console.warn("⚠️ No crewmate found with ID:", id);
      }
    })();
  }, [id]);

  function updateField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const { error } = await supabase.from("crewmates").update(form).eq("id", id);
    if (error) alert(error.message);
    else nav("/gallery");
  }

  async function handleDelete() {
    if (!confirm("Delete this crewmate?")) return;
    const { error } = await supabase.from("crewmates").delete().eq("id", id);
    if (error) alert(error.message);
    else nav("/gallery");
  }

  return (
    <form onSubmit={handleUpdate} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <input
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        required
      />
      <input
        type="number"
        step="0.1"
        value={form.speed}
        onChange={(e) => updateField("speed", e.target.value)}
        required
      />
      <select value={form.color} onChange={(e) => updateField("color", e.target.value)}>
        {["Red", "Green", "Blue", "Purple", "Yellow", "Orange", "Pink", "Rainbow"].map(
          (c) => (
            <option key={c}>{c}</option>
          )
        )}
      </select>

      <button style={{ background: "#ff69b4" }}>Save Changes</button>
      <button type="button" onClick={handleDelete} style={{ background: "#ffdddd" }}>
        Delete Crewmate
      </button>
    </form>
  );
}
