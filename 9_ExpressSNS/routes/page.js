const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;     // req.user 넣었다 = 넌적스에서 user객체 통해 사용자 정보에 접근 가능
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird'});
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: '회원가입 - NodeBird'});
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
});

module.exports = router;

// res.locals로 값 설정하는 이유: user, followingCount, followerCount, followerIdList변수를 모든 템플릿 엔진에서 공통으로 써서
// isLoggedIn과 isNotLoggedIn 미들웨어를 라우터에서 사용