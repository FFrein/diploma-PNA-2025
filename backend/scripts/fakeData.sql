-- Очистка таблиц (если нужно)
TRUNCATE TABLE "TelegramUser", "User", "AnimalBreed", "Animal", "AnimalImage",
"Vaccination", "VaccinationAnimal", "Review", "News", "Transactions"
RESTART IDENTITY CASCADE;

-- Заполнение таблицы User
INSERT INTO "User" (role, "FIO", phone, email, password)
VALUES
('admin', 'Иванов Иван Иванович', '+79161234567', 'admin@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'), --123123
('support', 'Петров Петр Петрович', '+79162345678', 'support@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Сидоров Сидор Сидорович', '+79163456789', 'user1@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Кузнецова Анна Сергеевна', '+79164567890', 'user2@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Смирнова Елена Владимировна', '+79165678901', 'user3@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Васильев Дмитрий Николаевич', '+79166789012', 'user4@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Николаева Ольга Игоревна', '+79167890123', 'user5@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Федоров Артем Викторович', '+79168901234', 'user6@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('user', 'Морозова Татьяна Александровна', '+79169012345', 'user7@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi'),
('guest', 'Гость Гостьевич Гостьев', '+79160123456', 'guest@example.com', '$2b$10$wHk3Bmy3N96QcecjppdZSuyJmCyI5ebThtqzZAF4916EhysIdMMQi');

-- Заполнение таблицы AnimalBreed
INSERT INTO "AnimalBreed" ("animalType", "name", "description")
VALUES
('dog', 'Лабрадор', 'Дружелюбная и активная порода'),
('dog', 'Овчарка', 'Умная и преданная собака'),
('dog', 'Бульдог', 'Спокойная и добродушная порода'),
('dog', 'Пудель', 'Умная и легко обучаемая собака'),
('dog', 'Такса', 'Энергичная и любопытная порода'),
('cat', 'Персидская', 'Пушистая и спокойная кошка'),
('cat', 'Сиамская', 'Общительная и голосистая порода'),
('cat', 'Британская', 'Независимая и спокойная кошка'),
('cat', 'Сфинкс', 'Бесшерстная и теплолюбивая порода'),
('cat', 'Мейн-кун', 'Крупная и дружелюбная кошка');

-- Заполнение таблицы Animal
INSERT INTO "Animal" (
  "name", "animalType", "gender", "status", "health", "diseasesDescription",
  "age", "size", "color", "foodPerDay", "toiletPerDay", "description",
  "animalBreedId", "sterilized"
)
VALUES
('Барсик', 'cat', 'male', 'new', 'healthy', NULL, 2, 'small', 'black', 2, 3, 'Ласковый и игривый кот', 6, true),
('Рекс', 'dog', 'male', 'saled', 'healthy', NULL, 3, 'medium', 'brown', 3, 4, 'Послушный и умный пес', 1, true),
('Мурка', 'cat', 'female', 'new', 'temporaryIllness', 'Простуда', 1, 'small', 'white', 2, 2, 'Спокойная кошечка', 7, false),
('Шарик', 'dog', 'male', 'new', 'chronic', 'Аллергия', 5, 'large', 'grey', 4, 5, 'Добрый и терпеливый', 2, true),
('Васька', 'cat', 'male', 'dead', 'healthy', NULL, 4, 'medium', 'ginger', 2, 3, 'Любит спать на солнце', 8, false),
('Джесси', 'dog', 'female', 'saled', 'healthy', NULL, 2, 'medium', 'black', 3, 4, 'Энергичная и веселая', 3, true),
('Снежок', 'cat', 'male', 'new', 'healthy', NULL, 1, 'small', 'white', 2, 2, 'Белый как снег', 9, false),
('Бим', 'dog', 'male', 'new', 'temporaryIllness', 'Расстройство желудка', 4, 'large', 'brown', 4, 5, 'Любит долгие прогулки', 4, true),
('Зоя', 'cat', 'female', 'saled', 'healthy', NULL, 3, 'medium', 'grey', 2, 3, 'Нежная и ласковая', 10, true),
('Граф', 'dog', 'male', 'new', 'chronic', 'Артрит', 6, 'large', 'black', 3, 4, 'Спокойный и мудрый', 5, true);

-- Заполнение таблицы AnimalImage
INSERT INTO "AnimalImage" ("imageUrl", "animalId")
VALUES
('https://i.pinimg.com/736x/6c/bc/ff/6cbcff49dd33135a19f8970a48a0b6f4.jpg', 1),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwmV7JfIDA6KiI2gCJuiHoDafjWwsNGLXAgg&s', 2),
('https://mrkot.com/wp-content/uploads/2018/11/lusi.jpg', 3),
('https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/475B/production/_98776281_gettyimages-521697453.jpg.webp', 4),
('https://image1.thematicnews.com/uploads/images/68/22/64/02017/10/07/aa47713dff.jpg', 5),
('https://s5.stc.all.kpcdn.net/family/wp-content/uploads/2023/02/top-v-luchshie-porody-krupnykh-sobak-960x540-1-960x540.jpg', 6),
('https://i.uaportal.com/news/2024/2/15/pexels-photo-13997897.jpeg?size=375x250', 7),
('https://cdnn21.img.ria.ru/images/07e4/0c/0a/1588655917_611:0:2659:2048_1280x0_80_0_0_3e0b64c5cdaccb42ccae9f4c8afe1859.jpg', 8),
('https://hvost.news/upload/resize_cache/iblock/785/750_400_1/pochemu_kot_khuliganit_doma.jpg', 9),
('https://petslike.ua/media/ckeditor/blog/Blog/Pomeranskiy%20shpits.jpg', 10);

-- Заполнение таблицы Vaccination
INSERT INTO "Vaccination" ("name", "description", "animalType")
VALUES
('Комплексная', 'От бешенства, чумы и других заболеваний', 'cat'),
('От бешенства', 'Обязательная ежегодная вакцинация', 'cat'),
('От чумы', 'Для щенков и взрослых собак', 'cat'),
('От лишая', 'Для кошек и собак', 'cat'),
('От глистов', 'Профилактическая обработка', 'cat'),
('От блох', 'Сезонная обработка', 'cat'),
('От аллергии', 'Специальная вакцина', 'cat'),
('От инфекций', 'Комплексная защита', 'cat'),
('Для щенков', 'Первые прививки', 'dog'),
('Для котят', 'Первые прививки', 'cat');

-- Заполнение таблицы VaccinationAnimal
INSERT INTO "VaccinationAnimal" ("animalId", "vaccinationId")
VALUES
(1, 4), (1, 10),
(2, 1), (2, 2), (2, 3),
(3, 4), (3, 7),
(4, 1), (4, 5),
(5, 4),
(6, 1), (6, 2), (6, 6),
(7, 4), (7, 9),
(8, 1), (8, 5), (8, 8),
(9, 4),
(10, 1), (10, 2), (10, 3);

-- Заполнение таблицы Review
INSERT INTO "Review" ("userId", "rating", "description")
VALUES
(3, 5, 'Отличный приют, всем рекомендую!'),
(4, 4, 'Хорошие условия для животных'),
(5, 5, 'Профессиональные сотрудники'),
(6, 3, 'Все понравилось, но долго оформляли документы'),
(7, 5, 'Забрали чудесного кота, спасибо!'),
(8, 4, 'Чисто, аккуратно, животные ухоженные'),
(9, 5, 'Помогли подобрать идеальную собаку для семьи'),
(10, 2, 'Не понравилось отношение сотрудников'),
(1, 5, 'Лучший приют в городе!'),
(2, 4, 'Хороший сервис, но мало информации');

-- Заполнение таблицы News
INSERT INTO "News" ("iamge", "title", "description")
VALUES
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Новые поступления', 'В приют поступили 10 новых животных'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Акция', 'Скидки на стерилизацию весь месяц'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Волонтеры', 'Нам нужна помощь волонтеров'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Новый корм', 'Поступил специальный корм для аллергиков'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Выставка', 'Приходите на выставку животных из приюта'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Обучение', 'Мастер-класс по уходу за животными'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Праздник', 'День открытых дверей в приюте'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Сотрудничество', 'Новый партнер - ветеринарная клиника'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Реконструкция', 'Обновляем вольеры для собак'),
('https://s3-minsk.becloud.by/media-assets/news-by/4b62fc3d-ba7a-46a1-b0b5-7b08a1c311cd/8a98b770-0aec-4624-9c37-1a50fa01fa50.png', 'Благотворительность', 'Собранные средства пойдут на лечение животных');

-- Заполнение таблицы Transactions
INSERT INTO "Transactions" ("amount", "date")
VALUES
(5000, '2023-01-15'),
(1200, '2023-01-16'),
(3000, '2023-01-17'),
(750, '2023-01-18'),
(1500, '2023-01-19'),
(2300, '2023-01-20'),
(1800, '2023-01-21'),
(950, '2023-01-22'),
(3200, '2023-01-23'),
(1100, '2023-01-24');