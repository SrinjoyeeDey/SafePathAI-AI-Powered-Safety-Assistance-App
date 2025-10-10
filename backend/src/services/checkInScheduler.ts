import CheckIn from "../models/CheckIn";
import FavoriteContact from "../models/FavoriteContact";
import User from "../models/User";

// Run every minute. Mark overdue pending check-ins as missed and notify favorites.
export function startCheckInScheduler(intervalMs: number = 60_000, graceMs: number = 5 * 60_000) {
  async function tick() {
    try {
      const now = Date.now();
      const cutoff = new Date(now - graceMs);
      const overdue = await CheckIn.find({ status: "pending", dueAt: { $lt: cutoff } }).limit(100);

      for (const item of overdue) {
        try {
          item.status = "missed";
          await item.save();

          const user = await User.findById(item.user);
          if (!user) continue;

          const favorites = await FavoriteContact.find({ user: user._id });
          const coords = item.location ? `(${item.location.lat}, ${item.location.lng})` : "(unknown)";
          for (const fav of favorites) {
            // Replace with SMS/Email provider as needed
            console.log(
              `⚠️ Missed check-in: Notified ${fav.name} (${fav.phone}) about ${user.name}'s missed check-in due ${item.dueAt.toISOString()} at ${coords}`
            );
          }
        } catch (e) {
          console.error("Error processing overdue check-in", item._id, e);
        }
      }
    } catch (err) {
      console.error("checkInScheduler tick error", err);
    }
  }

  // Immediate run, then interval
  tick();
  const timer = setInterval(tick, intervalMs);
  console.log(`CheckInScheduler started: every ${intervalMs}ms (grace ${graceMs}ms)`);
  return () => clearInterval(timer);
}
