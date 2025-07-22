import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi'; // hoặc 'en' nếu bạn muốn tiếng Anh

dayjs.extend(relativeTime);
dayjs.locale('vi');

export default dayjs;
