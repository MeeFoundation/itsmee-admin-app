import { Cookie } from "mee-components";

export function checkAdmin(authPages?: boolean, signUpSoonPage?: boolean) {
  const signUpAvailable = Cookie.getCookie("sign-up-available");
  if (!signUpAvailable && !signUpSoonPage) {
    window.location.hash = "sign-up-soon";
    return false;
  } else if (signUpAvailable && signUpSoonPage) {
    window.location.hash = "sign-in";
    return false;
  }

  if (signUpSoonPage) {
    return false;
  }

  const admin = Cookie.getCookie("admin");
  if (!authPages && !admin) {
    window.location.hash = "sign-in";
    return false;
  } else if (authPages === true && !!admin) {
    window.location.hash = "";
    return false;
  }

  return true;
}
