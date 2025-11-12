import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    async function fetchCrewmate() {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("❌ Failed to load crewmate: " + error.message);
      } else {
        setCrewmate(data);
      }
    }
    fetchCrewmate();
  }, [id]);

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this crewmate?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("crewmates").delete().eq("id", id);

    if (error) {
      alert("❌ Error deleting crewmate: " + error.message);
    } else {
      alert("🗑️ Crewmate deleted!");
      navigate("/crewmates"); // redirect back to gallery
    }
  }

  if (!crewmate) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{crewmate.name}</h2>
      <p>Speed: {crewmate.speed} mph</p>
      <p>Color: {crewmate.color}</p>

      <button onClick={handleDelete} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "8px 14px", borderRadius: 6, cursor: "pointer" }}>
        Delete Crewmate
      </button>
    </div>
  );
}
