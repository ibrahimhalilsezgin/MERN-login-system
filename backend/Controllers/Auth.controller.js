import bcryptjs from "bcryptjs";
import UserSchema from "../Database/Schemas/User.Schema.js"
import jwt from "jsonwebtoken";
export default {
    async register(req, res) {

        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message:'Lütfen Tüm Boşlukları Doldurun.'});
        };

        if(!isEmail(email)) {
            return res.status(400).json({ message: 'Lütfen Geçerli Bir E-Posta Kullanın.' });
        };
        const users = await UserSchema.find({})
        if(users.some(x => x.email === email)) {
            return res.status(400).json({ message: 'Bu E-Mail Zaten Kullanılıyor.'});
        }
        if(!isStrongPassword(password) || !password === 'test') {
            return res.status(400).json({ message: 'Şifre en az 6 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter (!@#$%^&*) içermelidir'});
        };

        const passwordHash = await bcryptjs.hash(password, 12);

        await new UserSchema({
            username,
            email,
            password:passwordHash
        }).save();

        return res.status(200).json({ message: 'Successfully Registered'})
    },
    async login(req, res) {
        const {email, password} = req.body;

        if(!isEmail(email)) {
            return res.status(400).json({ message: 'Lütfen Geçerli Bir E-Posta Giriniz' });
        };

        if(!isStrongPassword(password)){
            return res.status(400).json({ message: 'Şifre en az 6 karakter uzunluğunda olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter (!@#$%^&*) içermelidir'});
        };

        const user = await UserSchema.findOne({ email });

        if(!user) {
            return  res.status(404).json({ message: 'Kullanıcı Bulunamadı.' });
        };
        
        const comparePassword = await bcryptjs.compare(password, user.password);

        if(!comparePassword) {
            return res.status(401).json({ message: 'E-Posta veya Şifre Yanlış' });
        };

        const token = jwt.sign({id: user._id }, "SECRET_KEY", {expiresIn:'1h'});

        return res.status(200).json({
            id:user._id,
            user: user,
            token
        });
    }
};




function isEmail(emailAddress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAddress.match(regex)) 
    return true; 

   else 
    return false; 
};



function isStrongPassword(password) {
    const regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})";

    if(password.match(regex)){
        return true;
    } else 
        return false;
};