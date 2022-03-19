import mongoose from 'mongoose'

const LessonScheme = new mongoose.Schema({

    // Gio bat dau khoa hoc
    timeStart: {
        type: String,
        default: "",
        trim: true
    },
    // Gio ket thuc khoa hoc
    timeEnd: {
        type: String,
        default: "",
        trim: true

    },
    // Mo ta buoi
    desc: {
        type: String,
        default: "",
        trim: true
    },
    // Mon hoc
    course: {
        ref: 'course',
        type: mongoose.Schema.Types.ObjectId
    },
    // Thu
    weekday: {
        type: String,
        trim: true,
        default: 'Thứ 2',
    }
},
    {
        timestamps: true
    }
)

export default mongoose.model('lesson', LessonScheme)