import React from 'react';

const TimeSpan = (
  {
    startTime, endTime, prefix, before,
  }: {
    startTime: number, endTime: number, prefix: string, before: boolean,
  },
) => {
  const time = endTime - startTime;
  let outputString = (new Date(endTime)).toLocaleString();
  if (before) outputString = (new Date(startTime)).toLocaleString();

  // if time < 12h
  if (time < 11 * 60 * 60 * 1000) {
    const t = new Date(time);
    const mins = (t.getUTCMinutes() < 10 ? '0' : '') + t.getUTCMinutes();
    const sec = (t.getUTCSeconds() < 10 ? '0' : '') + t.getUTCSeconds();
    outputString = `${prefix}  ${t.getUTCHours()}:${mins}:${sec}`;
  }

  return <span>{outputString}</span>;
};
export default TimeSpan;
