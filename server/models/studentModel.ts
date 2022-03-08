import mongoose from 'mongoose'

const StudentScheme = new mongoose.Schema({
    // Ho ten sinh vien
    name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    // Ma so sinh vien
    studentCode: {
        type: String,
        trim: true,
        maxlength: 50,
        // unique: true, // Duy nhat
    },
    // Gioi tinh
    gender: {
        type: String,
        default: "male", // 1: male, 2:female
    },
    birthDay: {
        type: String,
    },
    address: {
        type: String,
        trim: true
    }    
}, {
    timestamps: true
})

export default mongoose.model('student', StudentScheme)