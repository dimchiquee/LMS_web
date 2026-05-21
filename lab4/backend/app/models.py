from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Skin(db.Model):
    __tablename__ = "skins"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    weapon = db.Column(db.String(80), nullable=False)
    weapon_type = db.Column(db.String(80), nullable=False)
    rarity = db.Column(db.String(80), nullable=False)
    collection = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    wear = db.Column(db.String(80), nullable=False)
    source = db.Column(db.String(120), nullable=False)
    release_year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "weapon": self.weapon,
            "weaponType": self.weapon_type,
            "rarity": self.rarity,
            "collection": self.collection,
            "price": self.price,
            "wear": self.wear,
            "source": self.source,
            "releaseYear": self.release_year,
            "image": self.image,
            "description": self.description,
        }


class QuizQuestion(db.Model):
    __tablename__ = "quiz_questions"

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(20), nullable=False)  # single, multiple, matching, sorting

    options = db.relationship("QuizOption", backref="question", cascade="all, delete-orphan", lazy=True)
    pairs = db.relationship("QuizPair", backref="question", cascade="all, delete-orphan", lazy=True)

    def to_dict(self):
        data = {
            "id": self.id,
            "question": self.question,
            "type": self.type,
        }

        if self.type in ("single", "multiple"):
            sorted_options = sorted(self.options, key=lambda item: item.id)
            data["options"] = [item.text for item in sorted_options]
            if self.type == "single":
                correct = next((item.text for item in sorted_options if item.is_correct), None)
                data["correctAnswer"] = correct
            else:
                data["correctAnswers"] = [item.text for item in sorted_options if item.is_correct]

        if self.type == "sorting":
            sorted_options = sorted(self.options, key=lambda item: item.order_number or 0)
            data["sortingItems"] = [item.text for item in sorted_options]
            data["correctOrder"] = [item.text for item in sorted_options]

        if self.type == "matching":
            sorted_pairs = sorted(self.pairs, key=lambda item: item.pair_order or 0)
            data["pairs"] = [
                {"left": item.left_text, "right": item.right_text}
                for item in sorted_pairs
            ]

        return data


class QuizOption(db.Model):
    __tablename__ = "quiz_options"

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("quiz_questions.id"), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    is_correct = db.Column(db.Boolean, default=False)
    order_number = db.Column(db.Integer, nullable=True)


class QuizPair(db.Model):
    __tablename__ = "quiz_pairs"

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey("quiz_questions.id"), nullable=False)
    left_text = db.Column(db.String(255), nullable=False)
    right_text = db.Column(db.String(255), nullable=False)
    pair_order = db.Column(db.Integer, nullable=False)
