/* eslint-disable no-undef */
const Instructor = require('../models/domain/instructors.model')
const Course = require('../models/domain/course.model')
const Review = require('../models/domain/course_review.model')

const instructorData = [{
    full_name: 'Instructor 1',
    avatar: 'http://placekitten.com/g/200/300',
    job_title: 'Writer'
},
{
    full_name: 'Instructor 2',
    avatar: 'http://placekitten.com/g/200/300',
    job_title: 'Software Eng.'
},
{
    full_name: 'Instructor 3',
    avatar: 'http://placekitten.com/g/200/300',
    job_title: 'QA'
}]

const courseData = [
    {
        title: 'Elegant Automation Frameworks with Python and Pytest',
        description: 'Build high-performing, reliable automated test suites with actionable reporting',
        cover_image: '',
        cover_movie: '',
        instructors: [],
        attributes: {
            video_content_length: 80,
            num_articles: 6,
            num_practice_tests: 4,
            has_lifetime_access: true,
            has_assignments: true,
            has_certificate: true
        },
        number_subscribers: 10,
        category: {
            name: 'Software development'
        },
        sub_category: {
            name: 'Test Automation'
        },
        price: {
            amount: 184.9,
            currency: "EUR",
            currency_symbol: "€",
            price_string: "€184.90",
        }
    },
    {
        title: 'Step by Step Rest API Testing using Python + Pytest +Allure',
        description: 'This course will help you to understand API & Python programming from Scratch to Expert Level. It is specially designed by keeping Software Testing in mind so almost all already/libraries of API Testing using Python which are required in automation would be covered in his course.',
        cover_image: '',
        cover_movie: '',
        instructors: [],
        attributes: {
            video_content_length: 80,
            num_articles: 6,
            num_practice_tests: 4,
            has_lifetime_access: true,
            has_assignments: true,
            has_certificate: true
        },
        number_subscribers: 10,
        category: {
            name: 'Software development'
        },
        sub_category: {
            name: 'REST API'
        },
        price: {
            amount: 184.9,
            currency: "EUR",
            currency_symbol: "€",
            price_string: "€184.90",
        }
    }
]
const reviewData = [{
    comment: 'Nunc non dignissim sem. Sed consequat sem lorem, sollicitudin consectetur ipsum rutrum vel. Quisque posuere.',
    rating: 4
},
{
    comment: 'Aenean interdum mauris nec lorem tincidunt, vel lacinia erat sagittis. Pellentesque tellus nibh, rhoncus eget.',
    rating: 5
},
{
    comment: 'Aenean vel mauris et orci laoreet interdum. Nulla et tempus lacus. Aenean et nunc vitae',
    rating: 2
},
{
    comment: 'Integer faucibus risus lorem, quis rhoncus purus facilisis id. Vivamus nisl ex, tempor non urna.',
    rating: 4
},
{
    comment: 'Morbi ullamcorper ante eu lacus egestas, ut faucibus justo ultricies. Duis convallis lacus hendrerit neque.',
    rating: 1
},]

module.exports.addInstructores = async () => {
    let authorIds = []
    for (var author in instructorData) {
        await new Instructor(instructorData[author])
            .save()
            .then(result => {
                authorIds.push(result._id.valueOf())
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    return authorIds
};

module.exports.addCourses = async (authores) => {
    let coursesIds = []
    for (var course in courseData) {
        newCourses = new Course(courseData[course])
        newCourses.instructors.push(authores[Math.floor(Math.random() * (authores.length - 0) + 0)])
        await newCourses.save()
            .then(result => {
                coursesIds.push(result._id.valueOf())
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    return coursesIds
}

module.exports.addReviews = async (courses) => {

    for (var review in reviewData) {
        newReview = new Review(reviewData[review])
        newReview.course = courses[Math.floor(Math.random() * (courses.length - 0) + 0)]
        await newReview.save()
            .then(result => {
                Course.findById(result.course.valueOf(), (err, course) => {
                    if (course) {
                        course.reviews.push(result)
                        course.save()
                    }
                });
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}