import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type DatePickerProps = {
  setValue: (props: any) => void;
};
const BasicDatePicker: React.FC<DatePickerProps> = ({ setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker onChange={setValue} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
