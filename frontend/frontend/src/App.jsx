import { useState } from "react";
import "./App.css";

function App() {
  const [sector, setSector] = useState("");
  const [country, setCountry] = useState("");
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const searchInvestors = async () => {
    if (!sector || !country) {
  setError("Please enter both sector and country");
  setInvestors([]);      // clear old results
  setShowAll(false);     // reset show more
  return;
}


    setError("");
    setLoading(true);
    setInvestors([]);
    setShowAll(false);

    try {
      const response = await fetch("http://localhost:5000/api/investors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sector, country }),
      });

      const data = await response.json();

      // ✅ Parse: Name + Reason blocks
      const list = data.result
        .split("\n\n")
        .map(block => {
          const [name, reason] = block.split("\n");
          return name && reason
            ? { name: name.trim(), reason: reason.trim() }
            : null;
        })
        .filter(Boolean)
        .slice(0, 5);

      setInvestors(list);
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const exportCSV = () => {
    const csv = investors.map(i => `${i.name},${i.reason}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "investors.csv";
    a.click();
  };

  const exportPDF = () => {
    const win = window.open("", "_blank");
    win.document.write(
      `<h2>Investor List</h2><ul>${investors
        .map(i => `<li><b>${i.name}</b><br/>${i.reason}</li>`)
        .join("")}</ul>`
    );
    win.print();
  };

  const visibleInvestors = showAll ? investors : investors.slice(0, 3);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="card fade-in">
        {/* Header */}
        <div className="top-bar">
          <h1 className="title">AI Investor Finder</h1>
          <button
            className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            <span className="icon-wrapper">
              {darkMode ? "☀️" : "🌙"}
            </span>
            <span className="tooltip">Toggle theme</span>
          </button>
        </div>

        <p className="subtitle">Find investors using AI</p>

        <input
          placeholder="Sector (e.g. Cybersecurity)"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        />

        <input
          placeholder="Country (e.g. Israel)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button onClick={searchInvestors} disabled={loading}>
          {loading ? "Searching..." : "Search Investors"}
        </button>

        {investors.length > 0 && (
          <>
            <div className="results">
              {visibleInvestors.map((inv, index) => (
                <div className="investor-card fade-in" key={index}>
                  <span className="icon">💼</span>

                  <div className="info">
                    <div className="number">
                      {index + 1}. <span className="name">{inv.name}</span>
                    </div>
                    <div className="reason">{inv.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="actions">
              {investors.length > 3 && (
                <button
                  className="toggle"
                  onClick={() => setShowAll(!showAll)}
                >
            
                </button>
              )}

              <button className="export" onClick={exportCSV}>⬇ CSV</button>
              <button className="export" onClick={exportPDF}>⬇ PDF</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
