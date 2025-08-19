//@ts-ignore
import CryptoJS from 'crypto-js';


export const encrypt = (sensitiveData: string) => {
  const config = useRuntimeConfig();
  const secretKey = config.public.secret_key;
  // Generate a random IV (Initialization Vector)
  const iv = CryptoJS.lib.WordArray.random(16);

  // Encrypt the data with AES-256-CBC and IV
  const encryptedData = CryptoJS.AES.encrypt(sensitiveData, secretKey, { iv }).toString();

  // Base64 encode the encrypted data and IV
  const base64EncryptedData = encryptedData;
  const base64Iv = iv.toString(CryptoJS.enc.Base64);

  return {base64EncryptedData, base64Iv};
}

export default encrypt;