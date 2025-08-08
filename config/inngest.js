import { Inngest } from "inngest";
import connectDb from "./db";
import User from "@/models/Users";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Jdproducts-next" });

/**
 * CREATE user from Clerk
 */
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    };

    await connectDb();
    await User.create(userData);

    console.log("✅ User created:", userData);
  }
);

/**
 * UPDATE user from Clerk
 */
export const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-update-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedData = {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    };

    await connectDb();
    await User.findByIdAndUpdate(id, updatedData, { new: true });

    console.log("✏️ User updated:", updatedData);
  }
);

/**
 * DELETE user from Clerk
 */
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await connectDb();
    await User.findByIdAndDelete(id);

    console.log("🗑️ User deleted:", id);
  }
);
