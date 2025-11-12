import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Gallery() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("crewmates")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) {
        console.log("✅ Loaded rows:", data);
        setRows(data ?? []);
      } else {
        console.error("❌ Supabase error:", error.message);
      }
    })();
  }, []);

  if (!rows.length)
    return (
      <p style={{ textAlign: "center" }}>
        Your Crewmate Gallery is empty. Create one!
      </p>
    );

  return (
    <div style={{ display: "grid", gap: 16, justifyContent: "center" }}>
      {rows.map((r) => {
        // ✅ Handle both possible key names (id or uuid)
        const crewmateId = r.id || r.uuid;
        console.log("Crewmate ID:", crewmateId);

        return (
          <div key={crewmateId} className="card">
            <h3>{r.name}</h3>
            <p>
              Speed: {r.speed} • Color: {r.color}
            </p>

            {/* ✅ Fixed links that use correct ID */}
            <Link to={`/crewmates/${crewmateId}`}>View</Link> {" · "}
            <Link to={`/crewmates/${crewmateId}/edit`}>Edit</Link>
          </div>
        );
      })}
    </div>
  );
}
