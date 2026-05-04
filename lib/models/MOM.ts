import { Schema, models, model } from "mongoose";

const DiscussionPointSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    point: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const ActionItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Done"],
      default: "Pending",
    },
  },
  { _id: false },
);

const MOMSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: [String],
      required: true,
      default: [],
    },

    cc: {
      type: [String],
      default: [],
    },

    bcc: {
      type: [String],
      default: [],
    },

    attendees: {
      type: [String],
      default: [],
    },

    discussionPoints: {
      type: [DiscussionPointSchema],
      default: [],
    },

    morningUpdate: {
      type: String,
      default: "",
    },

    eveningUpdate: {
      type: String,
      default: "",
    },

    actionItems: {
      type: [ActionItemSchema],
      default: [],
    },

    draft: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const MOM = models.MOM || model("MOM", MOMSchema);

export default MOM;
