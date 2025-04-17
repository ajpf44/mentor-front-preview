
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ProfileFormValues } from "@/pages/MentorProfile";

interface ProfileBasicInfoProps {
  control: Control<ProfileFormValues>;
}

export default function ProfileBasicInfo({ control }: ProfileBasicInfoProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo / Posição</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Líder de Desenvolvimento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição / Biografia</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva sua experiência, áreas de especialização e o que você pode oferecer como mentor..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Seja detalhado sobre sua experiência e áreas de especialização.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL da Foto de Perfil</FormLabel>
            <FormControl>
              <Input placeholder="https://exemplo.com/minha-foto.jpg" {...field} />
            </FormControl>
            <FormDescription>
              Adicione um link para uma foto profissional sua (recomendado: formato quadrado).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
