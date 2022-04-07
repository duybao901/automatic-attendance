import mongoose from 'mongoose'


const ReportScheme = new mongoose.Schema({

}, {
    timestamps: true
})
export default mongoose.model("report", ReportScheme)