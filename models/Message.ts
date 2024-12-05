import { Date, ObjectId, Schema, model, models } from 'mongoose';
import { deflate } from 'zlib';
export interface IMessage {
    _id: ObjectId
    sender: {
        username: string
    },
    recipient: ObjectId,
    property: {
        name: string
    },
    name: string,
    email: string,
    phone: string,
    body: string,
    read: boolean,
    createdAt: Date,
}

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'Property',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    phone: {
        type: String,
    },
    body: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Message = models.Message || model('Message', MessageSchema);

export default Message;