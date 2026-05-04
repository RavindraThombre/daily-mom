"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PlusCircle, Trash2 } from "lucide-react";

import { DiscussionPoint } from "../lib/types/mom.type";

interface DiscussionPointsSectionProps {
  discussionPoints: DiscussionPoint[];
  addDiscussionPoint: () => void;
  updateDiscussionPoint: (
    index: number,
    field: keyof DiscussionPoint,
    value: string,
  ) => void;
  removeDiscussionPoint: (index: number) => void;
}

const DiscussionPointsSection = ({
  discussionPoints,
  addDiscussionPoint,
  updateDiscussionPoint,
  removeDiscussionPoint,
}: DiscussionPointsSectionProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Discussion Points
        </CardTitle>

        <Button
          type="button"
          size="sm"
          onClick={addDiscussionPoint}
          className="rounded-xl"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Point
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {discussionPoints.map((point, index) => (
          <div
            key={point.id}
            className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start border rounded-xl p-4"
          >
            {/* Discussion Point */}
            <Input
              className="md:col-span-7"
              placeholder={`Discussion Point ${index + 1}`}
              value={point.point}
              onChange={(e) =>
                updateDiscussionPoint(index, "point", e.target.value)
              }
            />

            {/* Owner */}
            <Input
              className="md:col-span-4"
              placeholder="Owner / Speaker"
              value={point.owner}
              onChange={(e) =>
                updateDiscussionPoint(index, "owner", e.target.value)
              }
            />

            {/* Delete */}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="md:col-span-1"
              onClick={() => removeDiscussionPoint(index)}
              disabled={discussionPoints.length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DiscussionPointsSection;
