
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import SkillsInput from "@/components/SkillsInput";
import { ProfileFormValues } from "@/pages/MentorProfile";

interface ProfileSkillsProps {
  control: Control<ProfileFormValues>;
}

export default function ProfileSkills({ control }: ProfileSkillsProps) {
  return (
    <FormField
      control={control}
      name="skills"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Habilidades e Especialidades</FormLabel>
          <FormControl>
            <SkillsInput 
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormDescription>
            Adicione suas principais habilidades e áreas de especialização.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
