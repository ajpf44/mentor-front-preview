
import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SkillsInputProps {
  value: string[];
  onChange: (skills: string[]) => void;
}

const SkillsInput = ({ value, onChange }: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Adicionar habilidade quando pressionar Enter
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      
      // Verifica se a habilidade já existe
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="space-y-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite uma habilidade e pressione Enter"
      />
      
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((skill) => (
          <Badge 
            key={skill} 
            variant="secondary"
            className="bg-neki-gradient-light text-neki-blue-dark font-normal gap-1 pr-1"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="ml-1 rounded-full hover:bg-muted p-0.5"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remover {skill}</span>
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;
