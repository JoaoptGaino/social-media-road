import bcrypt from "bcrypt";

export default class Authentication {
  async hashPassword(password: string, saltRounds = 10) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);

      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log(error);
    }
  }
  async comparePassword(password:string,hash:any){
    try{
      return await bcrypt.compare(password,hash);
    }catch(err){
      console.log(err);
    }
  }
}
