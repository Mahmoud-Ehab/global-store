CREATE OR REPLACE FUNCTION ban_user() 
RETURNS TRIGGER AS $ban_user$
BEGIN
  UPDATE users
  SET users.banned = TRUE
  WHERE users.id = NEW.id;

  RETURN NEW;
END;
$ban_user$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_user() 
RETURNS TRIGGER AS $delete_user$
BEGIN
  DELETE FROM publications WHERE user_id = OLD.id;
  RETURN OLD;
END;
$delete_user$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION delete_publication() 
RETURNS TRIGGER AS $delete_publication$
BEGIN
  DELETE FROM reviews WHERE publication_id = OLD.id;
  RETURN OLD;
END;
$delete_publication$ LANGUAGE plpgsql;

