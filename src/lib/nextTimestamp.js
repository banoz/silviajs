export default function(timestamp, now = new Date()) {
  const S_IN_DAY = 24 * 60 * 60;
  let timestampNow = now.valueOf() / 1000;

  if(timestamp < timestampNow) {
    timestamp = timestamp + Math.ceil((timestampNow - timestamp) / S_IN_DAY) * S_IN_DAY;
  }
  return timestamp;
};

