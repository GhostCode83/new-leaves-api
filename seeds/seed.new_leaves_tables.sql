BEGIN;

TRUNCATE
  new_leaves_comments,
  new_leaves_articles,
  new_leaves_users
  RESTART IDENTITY CASCADE;

INSERT INTO new_leaves_users (username, fullname, password)
VALUES
  ('dunder', 'Dunder Mifflin', '$2a$12$h89D/xSd.933Z2kDVEiY4OAbikuNoeuTXzIZWaJpBArHsuIzkZVg6'),
  ('Account1', 'Account One', '$2a$12$HVOt0M/MQqhXvkn4dYboYuNIUKNIbAJrw8O23bo8h5nFSPHnrs8Bi'),
   ('b.deboop', 'Bodeep Deboop', '$2a$12$hqZ5WhsgY59P3j/d7/lL4.T28LtfoS3RkvAKvBm4ih98US6q4K./6'),
  ('c.bloggs', 'Charlie Bloggs', '$2a$12$sUBUcnyu.TF0V6CKw/O9d.mYvZmyzPcCI87sDgVqjdDXQhQgM/ZT2'),
  ('s.smith', 'Sam Smith', '$2a$12$tY/gWPvbkwKrhfWuNtnjMuaXQVS26.JlVt9H0/z3bfc2ZCOhgxGD2'),
  ('lexlor', 'Alex Taylor',  '$2a$12$lVPgWxM9WFY0V9pVE3ArnueyHHJ0HGeo03LU..wBIsbTiVb0TCiLy'),
  ('wippy', 'Ping Won In',  '$2a$12$qgLOXd.fF/UAuVe9qcs7pOOwC6DJzom3xgqjooRVL3n4mFeRAKI6m');
  
INSERT INTO new_leaves_articles (title, summary, article_type, date_published)
VALUES 
  ('How My Family Celebrates Winnie-The-Pooh Day!!!',
    'Praesent sagittis a mi sit amet dictum. 
    Donec orci nibh, dignissim in leo et, congue semper mauris. 
    Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. 
    Curabitur sit amet placerat neque, a tempus mi. 
    Suspendisse a tempus dolor. 
    Nullam porttitor nisi sed justo dictum consequat. 
    Etiam sed congue felis.',
    'Holiday',
    '2100-05-22T16:28:32.615Z'),
  ('Hack for After Dinner Cleanup',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Duis at consectetur lorem donec massa sapien. Arcu odio ut sem nulla pharetra diam sit amet. In hendrerit gravida rutrum quisque. 
    Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Molestie nunc non blandit massa enim nec. 
    Viverra adipiscing at in tellus integer feugiat scelerisque. Purus in massa tempor nec feugiat nisl pretium fusce. 
    Sed nisi lacus sed viverra tellus in hac habitasse. Ornare quam viverra orci sagittis eu volutpat odio. 
    Sapien pellentesque habitant morbi tristique senectus. 
    Sed felis eget velit aliquet sagittis id consectetur purus ut. Cursus vitae congue mauris rhoncus. 
    Praesent tristique magna sit amet purus gravida quis blandit turpis.',
    'Family',
    '2100-05-22T16:28:32.615Z'),
  ('Driving My Kids, Without Being Driven Crazy!',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Vulputate mi sit amet mauris commodo quis imperdiet massa. 
      Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. 
      Lacus sed viverra tellus in hac habitasse platea dictumst. 
      Sed arcu non odio euismod lacinia at. Ultrices sagittis orci a scelerisque purus semper eget. 
      Orci a scelerisque purus semper eget duis at tellus at. Nisi est sit amet facilisis magna etiam tempor orci eu. 
      Eu sem integer vitae justo eget magna fermentum iaculis. Pellentesque sit amet porttitor eget dolor morbi non arcu. 
      Non odio euismod lacinia at quis risus. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus.',
     'Adaptation',
     '2100-05-22T16:28:32.615Z');

     INSERT INTO new_leaves_comments (
  text,
  article_id,
  user_id
) VALUES
  (
    'This post is amazing',
    1,
    2
  ),
  (
    'Yeh I agree it''s amazing',
    1,
    3
  ),
  (
    'I would go so far as to say it''s double amazing',
    1,
    4
  ),
  (
    'A-mazing!',
    1,
    5
  ),
  (
    'That''s some interesting lorems you raise',
    2,
    6
  ),
  (
    'Yeh totally I''d never thought about lorems like that before',
    2,
    1
  ),
  (
    'So you''re saying consectetur adipisicing elit?',
    2,
    3
  ),
  (
    'Sixth? You mean sith?!!',
    1,
    6
  ),
  (
    'What do you call an evil procrastinator? Darth Later! Hahahahaha!',
    1,
    4
  ),
  (
    'Ten ten ten ten ten ten ten!',
    1,
    3
  ),
  (
    'Iste, architecto obcaecati tenetur quidem voluptatum ipsa quam!!!',
    1,
    5
  ),
  (
    '5, 6, 7, 8! My boot-scootin'' baby is drivin'' me crazy...!',
    1,
    1
  ),
  (
    'My obsession from a western! My dance floor date',
    1,
    2
  ),
  (
    'My rodeo Romeo. A cowboy god from head to toe',
    1,
    3
  ),
  (
    'Wanna make you mine. Better get in line. 5, 6, 7, 8!',
    1,
    4
  ),
  (
    'Just a lonely comment',
    3,
    6
  ),
  (
    'Really? Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris??!',
    3,
    5
  ),
  (
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris for sure!!',
    3,
    1
  ),
  (
    'WOAH!!!!!',
    2,
    2
  ),
  (
    '°º¤ø,¸¸,ø¤º°`°º¤ø,¸,ø¤°º¤ø,¸¸,ø¤º°`°º¤ø,¸',
    2,
    4
  );

COMMIT;
