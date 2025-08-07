import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // hoặc 'en' nếu bạn muốn tiếng Anh

dayjs.extend(relativeTime);
dayjs.locale('vi');

export const formatDateTime = (date: any) => {
    // date is less than 1min ago , return "just now"
    // date is less than 1hr ago , return "x minutes ago"
    // date is less than 1day ago , return "hh:mm A"
    // date is greater than 1day ago , return "DDD MMM DD"
    const now = dayjs();
    const messageDate = dayjs(date);

    if (now.diff(messageDate, "minute") < 1) return "now";
    if (now.diff(messageDate, "hour") < 1) return messageDate.format("hh:mm A");
    if (now.diff(messageDate, "day") < 1) return messageDate.format("hh:mm A");
    if (now.diff(messageDate, "year") < 1)
        return messageDate.format("MMM DD hh:mm A");
    return messageDate.format("DDD MM YYYY hh:mm A");
};


export default dayjs;
