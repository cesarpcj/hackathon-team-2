# hackathon-team-2

//routes

MODELS

- user
- posts (comments subdocument)

ROUTES

- /

- /posts/{postid} + (comments)
- /posts/create
- /posts/{postid}/edit
- /posts/{postid}/delete

- /profile/{profileid}
- /profile/{profileid}/edit
- /profile/{profileid}/delete

- /authentication
- /authentication/sign-in
- /authentication/sign-up

VIEWS

- index
- authentication
  - sign-in
  - sign-up
- partials
- posts
  - edit
  - create
  - message
- profile
  - edit
  - user
- categories

NAV

- Home
- Profile
- Categories
