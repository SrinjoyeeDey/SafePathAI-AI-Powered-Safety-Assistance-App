import { useState, useEffect } from "react";
import api from "../services/api";
import { motion } from "framer-motion";

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
      const res = await api.get("/favorites");
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
      await api.post("/favorites", form);
      setForm({ name: "", phone: "", email: "" });
      fetchContacts();
    } catch (err: any) {
      console.error("Error adding favorite:", err.response || err.message);
      alert(err.response?.data?.message || "Failed to add favorite");
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await api.delete(`/favorites/${id}`);
      fetchContacts();
    } catch (err: any) {
      console.error("Error deleting favorite:", err.response || err.message);
      alert("Failed to delete contact");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-xl mx-auto mt-10 p-4"
    >
      <motion.h2
        className="text-2xl font-semibold mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Favorite Contacts
      </motion.h2>
      {error && <motion.p className="text-red-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{error}</motion.p>}
      <motion.form
        onSubmit={addContact}
        className="space-y-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded w-full"
          required
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.input
          placeholder="Email (optional)"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
        >
          Add Contact
        </motion.button>
      </motion.form>
      <motion.ul className="space-y-4">
        {contacts.map((c, idx) => (
          <motion.li
            key={c._id}
            className="flex justify-between items-center border p-3 rounded bg-white dark:bg-gray-800 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.01, boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
          >
            <div>
              <p className="font-bold">{c.name}</p>
              <p>{c.phone}</p>
              {c.email && <p>{c.email}</p>}
            </div>
            <motion.button
              onClick={() => deleteContact(c._id)}
              className="text-red-600"
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              Delete
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Favorites;
