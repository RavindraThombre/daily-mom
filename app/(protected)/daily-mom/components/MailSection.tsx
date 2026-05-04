"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MOMEntry } from "../lib/types/mom.type";

interface MailSectionProps {
  momData: MOMEntry;
  updateField: <K extends keyof MOMEntry>(field: K, value: MOMEntry[K]) => void;
  updateAttendees: (attendees: string[]) => void;
}

const MailSection = ({
  momData,
  updateField,
  updateAttendees,
}: MailSectionProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Daily MOM Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Date + Subject */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={momData.date}
              onChange={(e) => updateField("date", e.target.value)}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Daily MOM - Project Sync Meeting"
              value={momData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
            />
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <Label htmlFor="to">To (comma separated emails)</Label>

          <Input
            id="to"
            placeholder="team@company.com, manager@company.com"
            value={momData.to.join(", ")}
            onChange={(e) =>
              updateField(
                "to",
                e.target.value
                  .split(",")
                  .map((email) => email.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>

        {/* Attendees */}
        <div className="space-y-2">
          <Label htmlFor="attendees">Attendees Emails (auto CC)</Label>

          <Input
            id="attendees"
            placeholder="member1@company.com, member2@company.com"
            value={momData.attendees.join(", ")}
            onChange={(e) =>
              updateAttendees(
                e.target.value
                  .split(",")
                  .map((email) => email.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>

        {/* CC */}
        <div className="space-y-2">
          <Label htmlFor="cc">CC</Label>

          <Input id="cc" value={momData.cc.join(", ")} readOnly />
        </div>

        {/* BCC */}
        <div className="space-y-2">
          <Label htmlFor="bcc">BCC (optional)</Label>

          <Input
            id="bcc"
            placeholder="hr@company.com"
            value={momData.bcc?.join(", ") || ""}
            onChange={(e) =>
              updateField(
                "bcc",
                e.target.value
                  .split(",")
                  .map((email) => email.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default MailSection;
