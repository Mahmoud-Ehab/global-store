CREATE OR REPLACE FUNCTION ban_user() RETURNS TRIGGER AS $ban_user$
BEGIN
  UPDATE users
  SET users.banned = TRUE
  WHERE users.id = NEW.id;

  RETURN NEW;
END;
$ban_user$ LANGUAGE plpgsql;
