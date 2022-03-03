const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {    // 로그인시 실행, req.session객체에 어떤 데이터 저장할지 정하는 메서드. 매개변수로 user받고 done함수에 두 번째 인수로 user.id넘겨
        done(null, user.id);    // 첫 인수- 에러 발생시, 두 번째 인수- 저장하고 싶은 데이터
    });

    passport.deserializeUser((id, done) => {    // 매 요청 시 실행. passportㄴㄷㄴ냐ㅐㅜ alemfdnpdjrk dl aptmem ghcnf
        User.findOne({ where: {id} })   // serializeUser의 두 번째 인수가 여기의 매개변수(현재는 id)
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local();
    kakao();
};