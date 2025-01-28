import { Cookie } from "mee-components";

export function checkAdmin(authPages?: boolean) {
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
