const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MIN_LENGTH_PATTERN = /^.{3,}$/

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
    full_name: {
        type: String,
        required: 'for title min of 3 letters',
        match: MIN_LENGTH_PATTERN
    },
    avatar: {
        type: String
    },
    job_title: {
        type: String,
        required: true
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

module.exports = mongoose.model('Instructor', schema)