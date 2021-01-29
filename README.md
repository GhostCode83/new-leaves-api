# New Leaves API
The New Leaves API is a RESTful API that uses standard HTTP verbs. 

## Technologies ##
- Node
- Express
- PostgreSQL 
- JavaScript ES6

## API Reference

### Login

**URL**: `api/auth/login`

**Method**: `POST`

**Headers**: 
  `'content-type': 'application/json'`
  
**Body**
```json
{
  "username": "[username]",
  "password": "[password]"
}
```

### Success Response

**Code**: `200 OK`

**Body Response**

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMCwiaWF0IjoxNjExODc1MzEzLCJzdWIiOiJSYW5keSJ9.qk7W1CnO7pZN8BMBI_t_IV1I_ah0onCmfeEaay--2OA",
  "userId": 47
}
```
---


### User

**URL**: `api/users`

**Method**: `POST`

**Headers**: 
  `'content-type': 'application/json'`
  
**Body**
```json
{  
  "fullname": "[fullname]",
  "username": "[username]",
  "password": "[password]"
}
```

### Success Response

**Code**: `200 OK`

**Body Response**

```json
{
    "id": 97,
    "fullname": "Full Name, Sr.",
    "username": "Fully327",
    "date_created": "2021-01-28T23:36:38.541Z"
}
```
---


### Articles

**URL**: `api/articles`

**Method**: `GET`

**Headers**: 
  ```json
  'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJpYXQiOjE2MTE4Nzc3ODgsInN1YiI6IlJhbmR5In0.PC7gj3Ap3vu2IboR1EBSj78DeiK_1UH3UkHCL8a083M',
  ```

### Success Response

**Code**: `200 OK`

**Body Response**

```json
[
  {
        "id": 2,
        "title": "Hack for After Dinner Cleanup",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n    Duis at consectetur lorem donec massa sapien. Arcu odio ut sem nulla pharetra diam sit amet. In hendrerit gravida rutrum quisque. \n    Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Molestie nunc non blandit massa enim nec. \n    Viverra adipiscing at in tellus integer feugiat scelerisque. Purus in massa tempor nec feugiat nisl pretium fusce. \n    Sed nisi lacus sed viverra tellus in hac habitasse. Ornare quam viverra orci sagittis eu volutpat odio. \n    Sapien pellentesque habitant morbi tristique senectus. \n    Sed felis eget velit aliquet sagittis id consectetur purus ut. Cursus vitae congue mauris rhoncus. \n    Praesent tristique magna sit amet purus gravida quis blandit turpis.",
        "article_type": "Family",
        "date_published": "2100-05-22T16:28:32.615Z",
        "author": 1
  },
  {
        "id": 3,
        "title": "Driving My Kids, Without Being Driven Crazy!",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n      Vulputate mi sit amet mauris commodo quis imperdiet massa. \n      Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. \n      Lacus sed viverra tellus in hac habitasse platea dictumst. \n      Sed arcu non odio euismod lacinia at. Ultrices sagittis orci a scelerisque purus semper eget. \n      Orci a scelerisque purus semper eget duis at tellus at. Nisi est sit amet facilisis magna etiam tempor orci eu. \n      Eu sem integer vitae justo eget magna fermentum iaculis. Pellentesque sit amet porttitor eget dolor morbi non arcu. \n      Non odio euismod lacinia at quis risus. Eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus.",
        "article_type": "Adaptation",
        "date_published": "2100-05-22T16:28:32.615Z",
        "author": 7
  },
  {
        "id": 4,
        "title": "How My Family Celebrates Winnie-The-Pooh Day!!!",
        "summary": "Praesent sagittis a mi sit amet dictum. \n    Donec orci nibh, dignissim in leo et, congue semper mauris. \n    Donec elit lacus, dictum et placerat eget, rhoncus sodales erat. \n    Curabitur sit amet placerat neque, a tempus mi. \n    Suspendisse a tempus dolor. \n    Nullam porttitor nisi sed justo dictum consequat. \n    Etiam sed congue felis.",
        "article_type": "Holiday",
        "date_published": "2100-05-22T16:28:32.615Z",
        "author": 2
  }
]
```
---

**URL**: `api/articles`

**Method**: `POST`

**Headers**: 

```json
'content-type': 'application/json',
'mode': 'cors',
'Access-Control-Allow-Origin': '*',
'authorization': 'bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJpYXQiOjE2MTE4Nzc3ODgsInN1YiI6IlJhbmR5In0.PC7gj3Ap3vu2IboR1EBSj78DeiK_1UH3UkHCL8a083M'
```

**Body**
```json
{
    "title": "5 minutes of gratitude daily habit", 
    "summary": "I take 5 minutes each morning to write three things I am grateful for. I normally use my planner and/ or specific journal for writing down what I am grateful for.",
    "article_type": "Daily Practice",
    "author": 19
}
```

### Success Response

**Code**: `200 OK`

**Body Response**

```json
{
    "id": 123,
    "title": "5 minutes of gratitude daily habit",
    "summary": "I take 5 minutes each morning to write three things I am grateful for. I normally use my planner and/ or specific journal for writing down what I am grateful for.",
    "article_type": "Daily Practice",
    "date_published": "2021-01-29T00:10:07.513Z",
    "author": 67
}
```
---

**URL**: `api/articles/:articles_id`

**Method**: `GET`

**Headers**: 
  ```json
  'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJpYXQiOjE2MTE4Nzc3ODgsInN1YiI6IlJhbmR5In0.PC7gj3Ap3vu2IboR1EBSj78DeiK_1UH3UkHCL8a083M',
```

### Success Response

**Code**: `200 OK`

**Body Response**

```json
{
        "id": 2,
        "title": "Hack for After Dinner Cleanup",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n    Duis at consectetur lorem donec massa sapien. Arcu odio ut sem nulla pharetra diam sit amet. In hendrerit gravida rutrum quisque. \n    Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Molestie nunc non blandit massa enim nec. \n    Viverra adipiscing at in tellus integer feugiat scelerisque. Purus in massa tempor nec feugiat nisl pretium fusce. \n    Sed nisi lacus sed viverra tellus in hac habitasse. Ornare quam viverra orci sagittis eu volutpat odio. \n    Sapien pellentesque habitant morbi tristique senectus. \n    Sed felis eget velit aliquet sagittis id consectetur purus ut. Cursus vitae congue mauris rhoncus. \n    Praesent tristique magna sit amet purus gravida quis blandit turpis.",
        "article_type": "Family",
        "date_published": "2100-05-22T16:28:32.615Z",
        "author": 1
}
```
---

**URL**: `api/articles/:articles_id`

**Method**: `DELETE`

**Headers**: 

```json
'authorization': 'bearer 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo5LCJpYXQiOjE2MTE4Nzc3ODgsInN1YiI6IlJhbmR5In0.PC7gj3Ap3vu2IboR1EBSj78DeiK_1UH3UkHCL8a083M'
```

### Success Response

**Code**: `204 No Content`
