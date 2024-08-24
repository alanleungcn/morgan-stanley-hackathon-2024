import {
  differenceInMilliseconds,
  format,
  formatDuration,
  intervalToDuration,
} from "date-fns";

export const formatDayShort = (d: Date) => {
  return format(d, "MMM d");
};

export const formatDateShort = (d: Date) => {
  return format(d, "MMM d") + " at " + formatTime(d);
};

export const formatDateWithWeekday = (d: Date) => {
  return format(d, "d MMM yyyy (eee)");
};

export const formatTime = (d: Date) => {
  return format(d, "h:mm aaa");
};

export const diffReadableWithPrefix = (laterDate: Date, earlyDate: Date) => {
  const diffMs = differenceInMilliseconds(laterDate, earlyDate);

  if (diffMs < 0) {
    return "pass due";
  }

  return "in " + diff_readable(laterDate, earlyDate);
};

export const diff_readable = (laterDate: Date, earlyDate: Date) => {
  const duration = intervalToDuration({
    start: earlyDate,
    end: laterDate,
  });

  if (duration.weeks && duration.weeks >= 1) {
    return formatDuration(duration, { format: ["weeks"] });
  } else if (duration.days && duration.days >= 1) {
    return formatDuration(duration, { format: ["days"] });
  } else if (duration.hours && duration.hours >= 1) {
    return formatDuration(duration, { format: ["hours"] });
  } else if (duration.minutes && duration.minutes >= 1) {
    return formatDuration(duration, { format: ["minutes"] });
  } else if (duration.seconds && duration.seconds >= 1) {
    return formatDuration(duration, { format: ["seconds"] });
  } else {
    return formatDuration(duration);
  }
};

export const greeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else if (hour >= 18 && hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
