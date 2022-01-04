module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            Question_text: String,
            Options: {
                a: String,
                b: String,
                c: String,
            },
            Answer: String,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("question", schema);
};
