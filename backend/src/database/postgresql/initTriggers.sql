CREATE TRIGGER banUser 
  AFTER UPDATE OF TRW ON users
  FOR ROW WHEN ( NEW.TRW >= 10 )
  EXECUTE FUNCTION ban_user();

CREATE TRIGGER onDeleteUser 
  BEFORE DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION delete_user();

CREATE TRIGGER onDeletePublication
  BEFORE DELETE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION delete_publication();
