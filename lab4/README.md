# Дополнение lab3 до full-stack приложения

Основа: существующий React-проект `lab3`.

## Что добавляется

1. Flask backend с SQLAlchemy ORM.
2. SQLite база данных `skins_market.db`.
3. Загрузка данных из CSV:
   - `skins.csv` — основная таблица `skins`;
   - `quiz_questions.csv` — вопросы теста;
   - `quiz_options.csv` — варианты ответов и порядок сортировки;
   - `quiz_pairs.csv` — пары для задания на сопоставление.
4. API для таблицы, фильтрации, сортировки, пагинации, группировки, теста и CRUD.
5. React-страницы, которые получают данные из API.

## Куда копировать

Папку `backend` нужно положить внутрь `lab3`:

```text
lab3/
  backend/
  public/
  src/
  package.json
```

Файлы из `frontend/src` нужно скопировать в `lab3/src` с заменой одноимённых файлов.

## Запуск backend

```bash
cd lab3/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

После запуска проверить:

```text
http://127.0.0.1:5000/api/health
http://127.0.0.1:5000/api/skins
http://127.0.0.1:5000/api/quiz
```

## Запуск frontend

В отдельном терминале:

```bash
cd lab3
npm install
npm start
```

## API

- `GET /api/skins` — список с пагинацией, фильтрацией и сортировкой;
- `GET /api/skins/<id>` — динамическая страница выбранного изображения;
- `GET /api/skins/groups?group_by=rarity` — сгруппированные данные для графиков;
- `GET /api/quiz` — вопросы теста из БД;
- `POST /api/skins` — добавление записи;
- `PUT /api/skins/<id>` — обновление записи;
- `DELETE /api/skins/<id>` — удаление записи.
