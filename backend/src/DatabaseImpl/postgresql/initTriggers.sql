CREATE TRIGGER banUser 
  AFTER UPDATE OF TRW ON users
  FOR ROW WHEN ( NEW.TRW >= 10 )
  EXECUTE FUNCTION ban_user();
