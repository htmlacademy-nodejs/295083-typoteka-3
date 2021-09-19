-- Получить список всех категорий (идентификатор, наименование категории)
SELECT id, name FROM categories;

-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT DISTINCT id, name FROM categories
JOIN article_categories
ON categories."id" = article_categories.category_id
ORDER BY id;

-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT id, name, COUNT(article_categories.category_id) AS count FROM categories
LEFT JOIN article_categories
ON categories."id" = article_categories.category_id
GROUP BY id
ORDER BY count, id;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации,
-- имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации
SELECT
	articles."id",
	articles.title,
	articles.announce,
	articles.created_at,
	users.first_name,
	users.last_name,
	users.email,
	COUNT(comments."id") AS comments_count,
	string_agg(DISTINCT categories."name", ', ') AS category_list
FROM
	articles
	JOIN article_categories ON articles."id" = article_categories.article_id
	JOIN categories ON categories.id = article_categories.category_id
	JOIN
	users
	ON articles.user_id = users."id"
	LEFT JOIN
	comments
	ON articles."id" = comments.article_id
	GROUP BY articles.id,	users."id"




