CREATE TYPE post_category AS ENUM (
    'Holiday',
    'Adaptation',
    'Family',
    'Food',
    'Clothing'
);

ALTER TABLE new_leaves_posts
  ADD COLUMN
    post_type post_category;
