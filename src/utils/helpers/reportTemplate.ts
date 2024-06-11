import { EScheduleType } from "@/graphql/generated/graphql";

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysPassed = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((daysPassed + firstDayOfYear.getDay() + 1) / 7);
}

export function validateSubmission(
  scheduleType: EScheduleType,
  existingSubmissions: Submission[]
) {
  if (scheduleType === EScheduleType.OneTime) {
    return existingSubmissions.length === 0;
  }
  if (scheduleType === EScheduleType.Daily) {
    const today = new Date().toDateString();
    return !existingSubmissions.some(
      (submission) =>
        new Date(submission.submission_date).toDateString() === today
    );
  }
  if (scheduleType === EScheduleType.Weekly) {
    const currentWeek = getWeekNumber(new Date());
    return !existingSubmissions.some(
      (submission) =>
        getWeekNumber(new Date(submission.submission_date)) === currentWeek
    );
  }
  if (scheduleType === EScheduleType.Monthly) {
    const currentMonth = new Date().getMonth();
    return !existingSubmissions.some(
      (submission) =>
        new Date(submission.submission_date).getMonth() === currentMonth
    );
  }

  return true;
}
