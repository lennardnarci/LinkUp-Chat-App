import CryptoJS from "crypto-js";

export const decryptMessage = (encryptedMessage) => {
  // Decrypt message
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedMessage);
  const iv = CryptoJS.lib.WordArray.create(encryptedBytes.words.slice(0, 4)); // IV är de första 16 byten
  const cipherText = CryptoJS.lib.WordArray.create(
    encryptedBytes.words.slice(4),
    encryptedBytes.sigBytes - 16
  );
  const keyHex = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRYPTION_KEY);
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherText }, keyHex, {
    iv: iv,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // Konverterar tillbaka till klartext
};

export const encryptMessage = (plainMessage) => {
  // Encrypt message
  const keyHex = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_ENCRYPTION_KEY);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(plainMessage, keyHex, { iv: iv });
  const encryptedBytes = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(encryptedBytes);
};
