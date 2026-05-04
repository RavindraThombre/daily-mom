"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { MOMEntry } from "../lib/types/mom.type";

interface PreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  momData: MOMEntry;
}

const PreviewDialog = ({ open, onOpenChange, momData }: PreviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Daily MOM Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-4">
            <p>
              <strong>Date:</strong> {momData.date}
            </p>

            <p>
              <strong>Subject:</strong> {momData.subject}
            </p>

            <p>
              <strong>To:</strong> {momData.to.join(", ")}
            </p>

            <p>
              <strong>CC:</strong>{" "}
              {momData.cc.length ? momData.cc.join(", ") : "-"}
            </p>

            <p>
              <strong>BCC:</strong>{" "}
              {momData.bcc?.length ? momData.bcc.join(", ") : "-"}
            </p>

            <p>
              <strong>Attendees:</strong> {momData.attendees.join(", ")}
            </p>
          </div>

          {/* Discussion Points */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Discussion Points</h3>

            <div className="space-y-3">
              {momData.discussionPoints.map((point, index) => (
                <div key={point.id} className="border rounded-lg p-3">
                  <p>
                    <strong>Point {index + 1}:</strong> {point.point}
                  </p>

                  <p>
                    <strong>Owner:</strong> {point.owner}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Morning */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Morning Update</h3>

            <p className="whitespace-pre-wrap">{momData.morningUpdate}</p>
          </div>

          {/* Evening */}
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold mb-3">Evening Update</h3>

            <p className="whitespace-pre-wrap">{momData.eveningUpdate}</p>
          </div>

          {/* Action Items */}
          {momData.actionItems && momData.actionItems.length > 0 && (
            <div className="border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Action Items</h3>

              <div className="space-y-3">
                {momData.actionItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-4 gap-2 border rounded-lg p-3"
                  >
                    <p>
                      <strong>Task:</strong> {item.task}
                    </p>

                    <p>
                      <strong>Owner:</strong> {item.owner}
                    </p>

                    <p>
                      <strong>Due:</strong> {item.dueDate}
                    </p>

                    <p>
                      <strong>Status:</strong> {item.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          <Button>Send MOM</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialog;
