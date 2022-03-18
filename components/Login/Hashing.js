import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


const Hash = (password) => {
        const hashDigest = sha256(password);
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, "test"));
        console.log(hmacDigest);
        return hmacDigest;
}

export default Hash;