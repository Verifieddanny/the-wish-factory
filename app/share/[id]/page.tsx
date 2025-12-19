import WishCard from "@/components/WishCard";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface SharePageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params;

  const wish = await prisma.wish.findUnique({
    where: { id },
  });

  if (!wish) {
    return {
      title: "Wish Not Found",
    };
  }

  const title = wish.occasion === "NEW_YEAR" 
    ? `Happy New Year from ${wish.sender}! 🎆`
    : `Merry Christmas from ${wish.sender}! 🎄`;

  return {
    title: title,
    description: `A special message for ${wish.receiver}. Tap to open your gift.`,
    openGraph: {
      title: title,
      description: `For ${wish.receiver}`,
      type: "article",
    },
  };
}


export default async function SharePage({ params }: SharePageProps) {
    const { id } = await params;



    const wish = await prisma.wish.findUnique({
        where: { id }
    })


    if (!wish) {
        notFound();
    }
    return (
        <WishCard
            sender={wish.sender}
            receiver={wish.receiver}
            message={wish.message}
            occasion={wish.occasion}
            songId={wish.songId}
            styleVariant={wish.styleVariant}
        />
    )
}
