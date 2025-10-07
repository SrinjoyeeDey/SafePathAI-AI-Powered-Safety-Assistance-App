import { useState, useEffect } from "react";
import api from "../services/api";

interface Favorite {
  _id: string;
  name: string;
  phone: string;
  email?: string;
}

const Favorites = () => {
  const [contacts, setContacts] = useState<Favorite[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/favorites"); // ✅ matches backend route
      setContacts(res.data);
    } catch (err: any) {
      console.error("Error fetching favorites:", err.response || err.message);
      setError(err.response?.data?.message || "Failed to load favorites");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const addContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/favorites", form); // ✅ matches backend route
      setForm({ name: "", phone: "", email: "" });
      fetchContacts();
    } catch (err: any) {
      console.error("Error adding favorite:", err.response || err.message);
      alert(err.response?.data?.message || "Failed to add favorite");
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await api.delete(`/favorites/${id}`); // ✅ matches backend route
      fetchContacts();
    } catch (err: any) {
      console.error("Error deleting favorite:", err.response || err.message);
      alert("Failed to delete contact");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="pt-10 text-2xl font-semibold mb-4">Favorite Contacts</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={addContact} className="space-y-3 mb-6">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Contact
        </button>
      </form>

      <ul className="space-y-4">
        {contacts.map((c) => (
          <li
            key={c._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-bold">{c.name}</p>
              <p>{c.phone}</p>
              {c.email && <p>{c.email}</p>}
            </div>
            <button
              onClick={() => deleteContact(c._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
