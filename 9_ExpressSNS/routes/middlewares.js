exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {    // 로그인중이면 true, 아니면 false
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
};

exports.inNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};