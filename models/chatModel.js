import mongoose, { Schema } from "mongoose";

// Define the schema for messages
const messageSchema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        seen: {
            type: Boolean,
            default: false
        },
        img: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

// Define the schema for conversations
const conversationSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
});

// Create models from the schemas
const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);

export { Message, Conversation };
