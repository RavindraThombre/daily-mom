"use client";

import { useState } from "react";
import { MOMEntry, DiscussionPoint, ActionItem } from "../types/mom.type";

const createEmptyMom = (): MOMEntry => ({
  id: crypto.randomUUID(),

  date: new Date().toISOString().split("T")[0],

  subject: "",

  to: ["team@company.com", "manager@company.com"],

  cc: [],

  bcc: [],

  attendees: [],

  discussionPoints: [
    {
      id: crypto.randomUUID(),
      point: "",
      owner: "",
    },
  ],

  morningUpdate: "",

  eveningUpdate: "",

  actionItems: [],

  draft: true,

  createdAt: new Date().toISOString(),

  updatedAt: new Date().toISOString(),
});

export function useMomForm() {
  const [momData, setMomData] = useState<MOMEntry>(createEmptyMom());

  const updateField = <K extends keyof MOMEntry>(
    field: K,
    value: MOMEntry[K],
  ) => {
    setMomData((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Auto-generate CC from attendees
  const updateAttendees = (attendees: string[]) => {
    setMomData((prev) => ({
      ...prev,
      attendees,
      cc: attendees,
      updatedAt: new Date().toISOString(),
    }));
  };

  // Discussion Points
  const addDiscussionPoint = () => {
    setMomData((prev) => ({
      ...prev,
      discussionPoints: [
        ...prev.discussionPoints,
        {
          id: crypto.randomUUID(),
          point: "",
          owner: "",
        },
      ],
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateDiscussionPoint = (
    index: number,
    field: keyof DiscussionPoint,
    value: string,
  ) => {
    const updated = [...momData.discussionPoints];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateField("discussionPoints", updated);
  };

  const removeDiscussionPoint = (index: number) => {
    const updated = momData.discussionPoints.filter((_, i) => i !== index);

    updateField(
      "discussionPoints",
      updated.length
        ? updated
        : [
            {
              id: crypto.randomUUID(),
              point: "",
              owner: "",
            },
          ],
    );
  };

  // Action Items
  const addActionItem = () => {
    updateField("actionItems", [
      ...(momData.actionItems || []),
      {
        id: crypto.randomUUID(),
        task: "",
        owner: "",
        dueDate: "",
        status: "Pending",
      },
    ]);
  };

  const updateActionItem = (
    index: number,
    field: keyof ActionItem,
    value: string,
  ) => {
    const updated = [...(momData.actionItems || [])];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateField("actionItems", updated);
  };

  const removeActionItem = (index: number) => {
    const updated = (momData.actionItems || []).filter((_, i) => i !== index);

    updateField("actionItems", updated);
  };

  const resetForm = () => {
    setMomData(createEmptyMom());
  };

  return {
    momData,

    updateField,
    updateAttendees,

    addDiscussionPoint,
    updateDiscussionPoint,
    removeDiscussionPoint,

    addActionItem,
    updateActionItem,
    removeActionItem,

    resetForm,
  };
}
