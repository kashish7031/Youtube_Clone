export default function Filters({ onSelect }) {
  const categories = ["All", "React", "Node", "Music", "Gaming", "News", "Movies"];
  return (
    <div style={{ marginBottom: 20 }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat === "All" ? "" : cat)}
          style={{
            marginRight: 10,
            padding: "8px 12px",
            borderRadius: 20,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
