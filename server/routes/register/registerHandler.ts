import bcrypt from 'bcryptjs';
import DbHandler from "../../utils/db";

class RegisterHandler {

  private db: DbHandler;

  constructor() {
    this.db = new DbHandler();
  }

  public async register(login: string, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const role = 'Player';

    try {
      await this.execute(login, hashedPassword, role);
    } catch (err) {
      console.error("error executing query:", err);
      return 500;
    }

    return 200;
  }

  private async execute(login: string, password: string, role: string) {
    const query = 'INSERT INTO users (name, password, role) VALUES ($1, $2, $3)';
    const values = [login, password, role];

    await this.db.query(query, values);
  }

}

export default RegisterHandler;