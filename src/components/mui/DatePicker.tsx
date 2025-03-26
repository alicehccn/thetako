import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { formatApiDate } from "../../constant";

type DatePickerProps = {
  setValue: (props: any) => void;
};
const BasicDatePicker: React.FC<DatePickerProps> = ({ setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        onChange={setValue}
        minDate={dayjs(formatApiDate(365))}
        maxDate={dayjs(formatApiDate(2))}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
