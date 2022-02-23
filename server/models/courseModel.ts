import mongoose from 'mongoose'

const CourseScheme = new mongoose.Schema({
    // Ten mon hoc
    name: {
        type: String,
        default: "",
        required: true,
        minlength: [10, "Tên khoá học có ít nhất 10 ký tự"],
        maxlength: [200, "Tên khoá học dài nhất 200 ký tự"],
        trim: true
    },
    // Giao vien chu nhiem
    teacher: { type: mongoose.Types.ObjectId, ref: 'user' },
    // Hoc ki gom: 1, 2, 3,...
    semester: {
        type: String, 
    },
    // Ngay bat dau
    yearStart: {
        type: String
    },
    // Ngay ket thuc
    yearEnd: {
        type: String
    },
    // So tin chi
    credits: {
        type: Number,
        require: true
    },
    // Ma hoc phan
    courseCode: {
        type: String,
        default: '',
    }
}, {
    timestamps: true
})

export default mongoose.model('course', CourseScheme)