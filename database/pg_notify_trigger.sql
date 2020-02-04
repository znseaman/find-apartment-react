
CREATE TRIGGER notify_new_user
  AFTER INSERT
  ON "users"
  FOR EACH ROW
  EXECUTE PROCEDURE notify_new_user();