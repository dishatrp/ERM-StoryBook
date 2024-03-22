export function setCookie(name: string, value: string, hours?: number): void {
  let expires = "";
  if (hours) {
    //console.log("hours");
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
    const expiresIn = date?.getTime() + hours * 60 * 60 * 1000;
    //console.log("expaires", expiresIn.toString());
    typeof window !== "undefined" && localStorage.setItem("expiresIn", expiresIn.toString());
  }
  //console.log("ouside hours", expires);
  document.cookie = `${name}=${value}${expires}; path=/; samesite=lax Secure`;
}

export function removeCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax; Secure`;
}

const getExpireTime = (expireTime: string) => {
  try {
    const match = expireTime.match(/^(\d+)([a-zA-Z]+)$/);
    if (match) {
      const time = parseInt(match[0]);
      const timeText = match[1];
      let miliSec = 0;
      if (timeText == "h") {
        miliSec = time * 60 * 60 * 1000;
      } else if (timeText == "m") {
        miliSec = time * 60 * 1000;
      } else if (timeText == "s") {
        miliSec = time * 1000;
      }
      const oneHourFromNow = new Date(Date.now() + miliSec);

      return oneHourFromNow;
    }
  } catch (err: any) {
    console.error(err);
  }
};
