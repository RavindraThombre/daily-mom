"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface EveningSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const EveningSection = ({ value, onChange }: EveningSectionProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Evening Update</CardTitle>
      </CardHeader>

      <CardContent>
        <Textarea
          placeholder="Enter evening wrap-up, completed tasks, pending items, blockers, final updates, and summary..."
          className="min-h-[180px] resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default EveningSection;
