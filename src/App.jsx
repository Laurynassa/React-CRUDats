import React, { useState, useEffect } from "react";

const App = () => {
  const initialFormData = {
    id: null,
    pavadinimas: "",
    grupe: "",
    svoris: "",
    gyvenaZoo: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("data"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editing) {
      setData([...data, { ...formData, id: Date.now() }]);
    } else {
      setData(data.map((item) => (item.id === formData.id ? formData : item)));
      setEditing(false);
    }
    setFormData(initialFormData);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditing(true);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleSort = (key) => {
    setData([...data].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
  };

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        React CRUD ats
      </h1>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="pavadinimas"
          value={formData.pavadinimas}
          onChange={handleChange}
          placeholder="Pavadinimas"
          required
        />
        <input
          type="text"
          name="grupe"
          value={formData.grupe}
          onChange={handleChange}
          placeholder="Grupė"
          required
        />
        <input
          type="number"
          name="svoris"
          value={formData.svoris}
          onChange={handleChange}
          placeholder="Svoris"
          required
        />
        <label>
          <input
            type="checkbox"
            name="gyvenaZoo"
            checked={formData.gyvenaZoo}
            onChange={() =>
              setFormData({ ...formData, gyvenaZoo: !formData.gyvenaZoo })
            }
          />
          Gyvena ZOO
        </label>
        <button type="submit">{editing ? "Redaguoti" : "Įvesti"}</button>
      </form>
      <br />
      <button
        style={{
          display: "flex",
          marginLeft: "420px",
        }}
        onClick={() => setData([])}
      >
        Išvalyti
      </button>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("pavadinimas")}>Pavadinimas</th>
            <th onClick={() => handleSort("grupe")}>Grupė</th>
            <th onClick={() => handleSort("svoris")}>Svoris</th>
            <th onClick={() => handleSort("gyvenaZoo")}>Gyvena ZOO</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.pavadinimas}</td>
              <td>{item.grupe}</td>
              <td>{item.svoris}</td>
              <td>{item.gyvenaZoo ? "Taip" : "Ne"}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Redaguoti</button>
                <button onClick={() => handleDelete(item.id)}>Ištrinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
