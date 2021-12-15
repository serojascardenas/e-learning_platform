const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MIN_LENGTH_PATTERN = /^.{5,}$/

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
    title: {
        type: String,
        required: 'for title min of 5 letters',
        match: MIN_LENGTH_PATTERN
    },
    description: {
        type: String,
        required: true
    },
    instructors: [{
        type: Schema.Types.ObjectId,
        ref: "Instructor"
    }],
    cover_image: {
        type: String,
        default: 'https://picsum.photos/800'
    },
    cover_movie: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "CourseReview"
    }],
    attributes: {
        video_content_length: {
            type: Number,
            default: 0
        },
        num_articles: {
            type: Number,
            default: 0
        },
        num_practice_tests: {
            type: Number,
            default: 0
        },
        has_lifetime_access: {
            type: Boolean,
            default: false
        },
        has_assignments: {
            type: Boolean,
            default: false
        },
        has_certificate: {
            type: Boolean,
            default: false
        }
    },
    number_subscribers: {
        type: Number,
        default: 0
    },
    category: [{
        _id: false,
        name: {
            type: String
        }
    }],
    sub_category: [{
        _id: false,
        name: {
            type: String
        }
    }],
    price: {
        amount: {
            type: String
        },
        currency: {
            type: String
        },
        currency_symbol: {
            type: String
        },
        price_string: {
            type: String
        },
        is_free: {
            type: Boolean,
            default: false
        }
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

module.exports = mongoose.model('Course', schema)