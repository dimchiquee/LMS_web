import csv
from pathlib import Path
from .models import db, Skin, QuizQuestion, QuizOption, QuizPair

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"


def _read_csv(filename):
    with open(DATA_DIR / filename, "r", encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file))


def load_initial_data():
    if Skin.query.first() is None:
        for row in _read_csv("skins.csv"):
            skin = Skin(
                id=int(row["id"]),
                name=row["name"],
                weapon=row["weapon"],
                weapon_type=row["weapon_type"],
                rarity=row["rarity"],
                collection=row["collection"],
                price=float(row["price"]),
                wear=row["wear"],
                source=row["source"],
                release_year=int(row["release_year"]),
                image=row["image"],
                description=row["description"],
            )
            db.session.add(skin)

    if QuizQuestion.query.first() is None:
        for row in _read_csv("quiz_questions.csv"):
            db.session.add(QuizQuestion(
                id=int(row["id"]),
                question=row["question"],
                type=row["type"],
            ))

        for row in _read_csv("quiz_options.csv"):
            db.session.add(QuizOption(
                id=int(row["id"]),
                question_id=int(row["question_id"]),
                text=row["text"],
                is_correct=row["is_correct"].lower() == "true",
                order_number=int(row["order_number"]) if row["order_number"] else None,
            ))

        for row in _read_csv("quiz_pairs.csv"):
            db.session.add(QuizPair(
                id=int(row["id"]),
                question_id=int(row["question_id"]),
                left_text=row["left_text"],
                right_text=row["right_text"],
                pair_order=int(row["pair_order"]),
            ))

    db.session.commit()
