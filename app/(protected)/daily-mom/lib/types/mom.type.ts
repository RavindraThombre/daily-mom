export interface ActionItem {
  id: string;
  task: string;
  owner: string;
  dueDate: string;
  status: "Pending" | "Done";
}

export interface DiscussionPoint {
  id: string;
  point: string;
  owner: string;
}

export interface MOMEntry {
  id: string;

  // Core Details
  date: string;
  subject: string;

  // Mail Recipients
  to: string[]; // Main recipients
  cc: string[]; // Attendees emails
  bcc?: string[];

  // Meeting Participants
  attendees: string[];

  // Discussion Points with ownership
  discussionPoints: DiscussionPoint[];

  // Daily Updates
  morningUpdate: string;
  eveningUpdate: string;

  // Optional task tracking
  actionItems?: ActionItem[];

  // Draft / Sent Status
  draft: boolean;

  // Metadata
  createdAt: string;
  updatedAt: string;
}
