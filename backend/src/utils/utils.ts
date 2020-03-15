import * as bcrypt from "bcrypt";

export async function generateSaltedPassword(
  password: string
): Promise<string> {
  return new Promise((resolve, reject) =>
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
        return;
      }
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          reject(err);
          return;
        }
        resolve(hash);
      });
    })
  );
}
