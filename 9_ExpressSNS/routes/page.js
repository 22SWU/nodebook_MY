const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: '내 정보 - NodeBird'});
});

router.get('/join', (req, res) => {
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