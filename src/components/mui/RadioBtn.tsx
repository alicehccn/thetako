import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

type RadioBtnProps = {
  value: string;
  handleChange: (e: any) => void;
};

export const RadioBtn: React.FC<RadioBtnProps> = ({ value, handleChange }) => {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="radio-form-label"
        name="radio-buttons-group"
        onChange={handleChange}
        value={value}
      >
        <FormControlLabel value="natural" control={<Radio />} label="Natural" />
        <FormControlLabel
          value="enhanced"
          control={<Radio />}
          label="Enhanced"
        />
        <FormControlLabel value="cloud" control={<Radio />} label="Cloud" />
        <FormControlLabel value="aerosol" control={<Radio />} label="Aerosol" />
      </RadioGroup>
    </FormControl>
  );
};
