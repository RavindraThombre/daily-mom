"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllMOMs } from "../daily-mom/lib/api/mom.service";
import { MOMEntry } from "../daily-mom/lib/types/mom.type";

export default function DraftsPage() {
  const { data: session } = useSession();

  const [drafts, setDrafts] = useState<MOMEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!session?.user?.id) return;

      try {
        const data = await getAllMOMs(session.user.id);

        setDrafts(data.filter((mom: MOMEntry) => mom.draft));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [session]);

  return (
    <main className="p-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Draft MOMs</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p>Loading drafts...</p>
          ) : drafts.length === 0 ? (
            <p>No drafts available.</p>
          ) : (
            <div className="space-y-4">
              {drafts.map((draft: MOMEntry) => (
                <Card key={draft.id} className="p-4 rounded-xl">
                  <h3 className="font-semibold">{draft.subject}</h3>
                  <p className="text-sm text-muted-foreground">{draft.date}</p>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
