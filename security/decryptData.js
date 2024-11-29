import { createDecipheriv } from 'crypto';

// encryptedData = de versleutelde gegevens die moeten worden ontsleuteld
// key = de sleutel in hex-formaat
// iv = de initialisatievector in hex-formaat

function decryptData(encryptedData, key, iv) {
    // Maak een decipher object aan
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

    // Ontsleutel de gegevens
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}