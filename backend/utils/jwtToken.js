//  Creating Token and saving in cookie

const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();

    // options for cookie

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        secure:process.env.NODE_ENV === 'production',
        httpOnly:true,
        sameSite: 'Lax',  // Required for cross-origin cookies
    };


    res.status(statusCode).cookie("token", token, options).json({
        success:true,
        user,
        token,
    });
};


module.exports = sendToken;

module.exports = sendToken;
