import { FormSection } from "@/components/forms/FormSection";
import { formInputClass } from "@/components/forms/form-styles";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  title?: string;
  subtitle?: string;
  id?: string;
  isRequired?: boolean;
  register?: UseFormRegister<any>;
}

const FormInput = ({
  title,
  subtitle,
  id,
  isRequired,
  register,
}: FormInputProps) => {
  if (!register || !id) return null;

  return (
    <FormSection
      title={title}
      description={subtitle}
      required={isRequired}
      className="mb-6"
    >
      <input
        className={formInputClass}
        placeholder="Your answer"
        type="text"
        id={id}
        required={isRequired}
        {...register(id)}
      />
    </FormSection>
  );
};

export default FormInput;
