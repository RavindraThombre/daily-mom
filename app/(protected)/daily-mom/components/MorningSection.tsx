"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface MorningSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const MorningSection = ({ value, onChange }: MorningSectionProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Morning Update</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          placeholder="Enter morning meeting summary, standup updates, blockers, progress, and key notes..."
          className="min-h-[180px] resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default MorningSection;
