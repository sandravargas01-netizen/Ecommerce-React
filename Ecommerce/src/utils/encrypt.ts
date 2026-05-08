import CryptoJS from "crypto-js";

const AES_SECRET_KEY = "0123456789ABCDEF0123456789ABCDEF";

export const encryptAesCbc = (text: string) => {
  const key = CryptoJS.enc.Utf8.parse(AES_SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(AES_SECRET_KEY.substring(0, 16));

  const encrypted = CryptoJS.AES.encrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
};