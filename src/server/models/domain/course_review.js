const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    id: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    comment: {
        type: String,
        required: 'for comment min of 3 letters'
    },
    rating: {
        type: Number,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret.__v;
            delete ret._id;
            return ret;
        }
    }
});

module.exports = mongoose.model('CourseReview', schema)