export default function(errorCode){
    switch (errorCode) {
        case "auth/invalid-email":
            return "Geçersiz E-posta Adresi"
        case "auth/email-already-exists":
            return "Kullanıcı Zaten Mevcut"
        case "auth/user-not-found":
            return "Kullanıcı Bulunamadı"
        case "auth/email-already-in-use":
            return "E-Mail Zaten Kullanımda"
        case "auth/invalid-credential":
            return "e-posta veya şifreniz yanlış"
        default:
            return errorCode;
    }
}