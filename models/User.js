import mongoose, { models } from "mongoose"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property"
        }
    ]
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User