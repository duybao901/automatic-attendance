import mongoose from 'mongoose'

const StudentScheme = new mongoose.Schema({

}, {
    timestamps: true
})

export default mongoose.model('student', StudentScheme)