CREATE TYPE user_type AS ENUM (
    'Active',
    'Inactive',
    'Blocked',
    'Administrator'
);

ALTER TABLE new_leaves_users
  ADD COLUMN
    user_status user_type;
