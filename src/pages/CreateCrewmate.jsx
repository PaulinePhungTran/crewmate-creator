import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CreateCrewmate() {
  const [form, setForm] = useState({ name: "", speed: "", color: "Red" });
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("crewmates")
      .insert([form])
      .select(); // ✅ This ensures we get the new record back

    if (error) {
      alert(error.message);
    } else if (data && data.length > 0) {
      const newCrewmate = data[0];
      console.log("✅ New crewmate created:", newCrewmate);
      nav("/gallery"); // ✅ Go back to gallery, not edit
    }
  }

  function updateField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        required
      />
      <input
        placeholder="Speed (mph)"
        type="number"
        step="0.1"
        value={form.speed}
        onChange={(e) => updateField("speed", e.target.value)}
        required
      />
      <select
        value={form.color}
        onChange={(e) => updateField("color", e.target.value)}
      >
        {["Red", "Green", "Blue", "Purple", "Yellow", "Orange", "Pink", "Rainbow"].map(
          (c) => (
            <option key={c}>{c}</option>
          )
        )}
      </select>
      <button style={{ background: "#ff69b4" }}>Save Crewmate</button>
    </form>
  );
}

