CREATE TYPE article_category AS ENUM (
    'Holiday',
    'Adaptation',
    'Family',
    'Food',
    'Clothing',
    'Daily Practice'
);

ALTER TABLE new_leaves_articles
  ADD COLUMN
    article_type article_category;
