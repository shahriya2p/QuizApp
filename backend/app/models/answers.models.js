module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            question_id: String,
            selectedAnswer: String,
            free_text: String,
            result: Boolean,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("answer", schema);
};
