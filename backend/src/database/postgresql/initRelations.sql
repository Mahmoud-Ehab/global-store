CREATE TABLE IF NOT EXISTS users (
  id varchar(6) NOT NULL PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  password varchar(256) NOT NULL,
  nickname varchar(20),
  CR SMALLINT DEFAULT 1,
  TRW SMALLINT DEFAULT 0,
  banned boolean DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS publications (
  id serial NOT NULL PRIMARY KEY,
  user_id varchar(6) NOT NULL REFERENCES users(id),
  title varchar(45) NOT NULL,
  description varchar(512),
  price int NOT NULL,
  currency char(3) NOT NULL,
  phone varchar(15)
);

CREATE TABLE IF NOT EXISTS reviews (
  user_id varchar(6) NOT NULL REFERENCES users(id),
  publication_id int NOT NULL REFERENCES publications(id),
  title varchar(45) NOT NULL,
  body varchar(512) NOT NULL,
  PRIMARY KEY(user_id, publication_id)
);
