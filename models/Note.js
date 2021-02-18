const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        unique: true,
        trim: true,
        maxLength: [40, 'Title can not be more than 40 characters']
    },
    description: {
        type: String,
        required: true,
        maxLength: [200, 'Description can not be more than 200 characters']
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)