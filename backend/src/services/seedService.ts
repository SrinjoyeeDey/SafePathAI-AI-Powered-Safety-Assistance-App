import FAQ from "../models/FAQ";
import { FAQ_DATA } from "../constants/faqData";

export async function seedFAQs(): Promise<void> {
  try {
    const count = await FAQ.countDocuments();
    if (count > 0) {
      console.log("FAQs already exist, skipping seed");
      return;
    }
    
    await FAQ.insertMany(FAQ_DATA);
    console.log(`Successfully seeded ${FAQ_DATA.length} FAQs`);
  } catch (error) {
    console.error("Failed to seed FAQs:", error);
    throw error;
  }
}
