"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";

interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: string;
}

interface ActionItemsTableProps {
  actionItems: ActionItem[];
  addActionItem: () => void;
  updateActionItem: (
    index: number,
    field: keyof ActionItem,
    value: string,
  ) => void;
  removeActionItem: (index: number) => void;
}

const ActionItemsTable = ({
  actionItems,
  addActionItem,
  updateActionItem,
  removeActionItem,
}: ActionItemsTableProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Action Items</CardTitle>

        <Button
          type="button"
          size="sm"
          onClick={addActionItem}
          className="rounded-xl"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {actionItems.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-3 border rounded-xl p-4"
          >
            <Input
              className="lg:col-span-4"
              placeholder="Task"
              value={item.task}
              onChange={(e) => updateActionItem(index, "task", e.target.value)}
            />

            <Input
              className="lg:col-span-2"
              placeholder="Owner"
              value={item.owner}
              onChange={(e) => updateActionItem(index, "owner", e.target.value)}
            />

            <Input
              className="lg:col-span-2"
              type="date"
              value={item.dueDate}
              onChange={(e) =>
                updateActionItem(index, "dueDate", e.target.value)
              }
            />

            <Input
              className="lg:col-span-2"
              placeholder="Status"
              value={item.status}
              onChange={(e) =>
                updateActionItem(index, "status", e.target.value)
              }
            />

            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="lg:col-span-1"
              onClick={() => removeActionItem(index)}
              disabled={actionItems.length === 1}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActionItemsTable;
