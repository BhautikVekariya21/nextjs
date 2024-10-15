import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    // Remove the '?' from the field names
    forgotPasswordToken: {
        type: String,
        default: null, // Optional but defaults to null
    },
    forgotPasswordTokenExpiry: {
        type: Number,
        default: null, // Optional but defaults to null
    },
    verifyToken: {
        type: String,
        default: null, // Optional but defaults to null
    },
    verifyTokenExpiry: {
        type: Number,
        default: null, // Optional but defaults to null
    },
});

// Ensure the model is created only once
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
