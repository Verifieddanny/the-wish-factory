"use server";

import { prisma } from "@/lib/db";
import { Occasion } from "@prisma/client";
import { customAlphabet } from "nanoid";

const generateId = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  12
);

const THEMES = ["classic-red", "snow-blue", "golden-star", "cozy-green"];

export const createWish = async (formData: FormData) => {
  const sender = formData.get("sender");
  const receiver = formData.get("receiver");
  const message = formData.get("message");
  const song = formData.get("song");
  const ocassion = formData.get("ocassion");

  if (!sender || !receiver || !message) {
    return { error: "Please fill in all fields" };
  }

  const randomStyle = THEMES[Math.floor(Math.random() * THEMES.length)];

  const parsedOccasion = Object.values(Occasion).includes(
    String(ocassion) as Occasion
  )
    ? (String(ocassion) as Occasion)
    : Occasion.CHRISTMAS;

  try {
    const cleanId = generateId();
    const result = await prisma.wish.create({
      data: {
        id: cleanId,
        sender: String(sender),
        receiver: String(receiver),
        message: String(message),
        songId: String(song),
        occasion: parsedOccasion,
        styleVariant: randomStyle,
      },
    });

    return { success: true, id: result.id };
  } catch (e) {
    return { error: "Failed to create wish" };
  }
};
