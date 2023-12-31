const User=require('../models/user');

module.exports.signuppage=(req,res)=>{
    return res.render('signup');
}



function hasNumbers(str){
    let string1 = String(str);
    for (let i in string1) {
      if (!isNaN(string1.charAt(i)) && !(string1.charAt(i) === " ")) {
        return true;
      }
    }
    return false;
}


function checkPasswordStrength(password){
    if(password.length<3){
        return{"success":false,"message":"password is too small"};
    }
    else if(password.length>15){
        return{"success":false,"message":"password is too big"};
    }
        else if (hasNumbers(password)==false) {
            return {"success": false, "message": "password should contain atleast a digit"};

        }

    else{

        return{"success":true,"message":"password is set successfully"};
}
}

module.exports.signup = async function(req, res) {
  console.log(req.body);
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;
  try {
      console.log(password);
      console.log(confirm_password);
      if (password!==confirm_password) {
          // alert user that passwords don't match
          console.log("passwords don't match");
          return res.redirect('back');
      } else {
          if (checkPasswordStrength(password).success) {
              // add the user's data to the database
              var user = await User.findOne({email: email});
              if (user) {
                  // alert user that his/her email already exists
                  console.log("Email already exists");
                  return res.redirect("/auth/signin");
              } else {
                  var user = await User.create({name: name, email: email, password: password});
                  console.log(user);
                  console.log("user is successfully signed up");
                  return res.redirect('/auth/signin');
              }
          } else {
              // alert user regarding the password
              console.log(checkPasswordStrength(password).message);
          }
      }
  } catch(err) {
      console.log(err);
      return res.redirect('back');
  }
  return res.redirect('back');
}



module.exports.signinpage=function(req,res){

  return res.render("signin");
}


module.exports.signin = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  try {
    var user = await User.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        console.log("user is successfully logged in");
        return res.redirect('/users/profile');
      } else {
        // alert user that passwords don't match
        console.log("passwords don't match");
        return res.redirect('back');
      }
    } else {
      // alert the user that email does not exist, so please signup
      console.log("no such user exists with this email id");
      return res.redirect('/auth/signup');
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).send("Internal Server Error");
  }
}

  