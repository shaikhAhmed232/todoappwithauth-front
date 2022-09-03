export function currentTimeToSec() {
  const currentTime = new Date();
  const currentTimeInSeconds = currentTime.getTime() / 1000;
  return currentTimeInSeconds;
}
