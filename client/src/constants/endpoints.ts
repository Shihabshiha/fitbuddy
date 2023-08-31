const END_POINTS = {
  REGISTER_USER : 'api/user/signup',
  LOGIN_USER : 'api/user/login',
  LOGIN_ADMIN : 'api/admin/login',
  SEND_OTP : 'api/user/send-otp',
  VERIFY_OTP : 'api/user/verify-otp',
  REGISTER_TRAINER : 'api/trainer/register',
  LOGIN_TRAINER : 'api/trainer/login',
  GET_TRAINERS_VERIFICATION_LIST : 'api/admin/get-pending-trainer-verification',
  SEND_ACCEPTANCE_MAIL: 'api/admin/sent-accepted-mail',
  SEND_REJECTED_MAIL : 'api/admin/send-rejected-mail',
  GOOGLE_LOGIN_USER : 'api/user/login-with-google',
}

export default END_POINTS