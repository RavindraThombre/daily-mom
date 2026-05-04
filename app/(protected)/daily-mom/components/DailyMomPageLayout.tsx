"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Save, Send, PlusCircle } from "lucide-react";

import ActionItemsTable from "./ActionItemTable";
import DiscussionPointsSection from "./DiscussionPointsSection";
import EveningSection from "./EveningSection";
import MorningSection from "./MorningSection";
import PreviewDialog from "./PreviewDialog";
import MailSection from "./MailSection";

import { useMomForm } from "../lib/hook/useMomForm";
import { useSession } from "next-auth/react";
import { createMOM } from "../lib/api/mom.service";
import { toast } from "sonner";

const DailyMomPageLayout = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
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
  } = useMomForm();

  const handleSaveDraft = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);

      const payload = {
        ...momData,
        userId: session.user.id,
        draft: true,
      };

      await createMOM(payload);

      toast.success("Draft saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save draft");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMOM = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);

      const payload = {
        ...momData,
        userId: session.user.id,
        draft: false,
      };

      await createMOM(payload);

      // Future:
      // await sendEmail(payload);

      toast.success("MOM sent successfully!");

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send MOM");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1">
        {/* Sidebar */}

        {/* Main Page */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">
                    Daily MOM Dashboard
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    Create, manage, preview, and send daily meeting minutes.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={handleSaveDraft}
                    disabled={loading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => setPreviewOpen(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>

                  <Button
                    className="rounded-xl"
                    onClick={handleSendMOM}
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send MOM
                  </Button>

                  <Button
                    variant="secondary"
                    className="rounded-xl"
                    onClick={resetForm}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New MOM
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <MailSection
                  momData={momData}
                  updateField={updateField}
                  updateAttendees={updateAttendees}
                />

                <DiscussionPointsSection
                  discussionPoints={momData.discussionPoints}
                  addDiscussionPoint={addDiscussionPoint}
                  updateDiscussionPoint={updateDiscussionPoint}
                  removeDiscussionPoint={removeDiscussionPoint}
                />

                <MorningSection
                  value={momData.morningUpdate}
                  onChange={(value) => updateField("morningUpdate", value)}
                />

                <EveningSection
                  value={momData.eveningUpdate}
                  onChange={(value) => updateField("eveningUpdate", value)}
                />

                <ActionItemsTable
                  actionItems={momData.actionItems || []}
                  addActionItem={addActionItem}
                  updateActionItem={updateActionItem}
                  removeActionItem={removeActionItem}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Preview Dialog */}
      <PreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        momData={momData}
      />
    </div>
  );
};

export default DailyMomPageLayout;
