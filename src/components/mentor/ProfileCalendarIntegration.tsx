
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Link2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import ScheduleCalendar from "@/components/ScheduleCalendar";

export function ProfileCalendarIntegration() {
  const [isConnected, setIsConnected] = useState(false);
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleConnect = () => {
    // In a real implementation, this would trigger the Google OAuth flow
    setTimeout(() => {
      setIsConnected(true);
    }, 1500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  // This would be populated from the Google Calendar API in a real implementation
  const blockedDates = [
    new Date(new Date().getTime() + 86400000 * 2),
    new Date(new Date().getTime() + 86400000 * 5),
  ];

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={isConnected ? "outline" : "default"}
            className={
              isConnected
                ? "border-neki-teal text-neki-teal hover:bg-neki-teal/10"
                : "bg-neki-gradient hover:opacity-90"
            }
          >
            <Calendar className="mr-2 h-4 w-4" />
            {isConnected ? "Calendário conectado" : "Conectar Google Calendar"}
            {isConnected && <Check className="ml-2 h-4 w-4 text-green-500" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Integração com Google Calendar</DialogTitle>
            <DialogDescription>
              {isConnected
                ? "Seu calendário já está conectado. Você pode visualizar os eventos ou desconectar."
                : "Conecte sua conta do Google Calendar para sincronizar sua disponibilidade."}
            </DialogDescription>
          </DialogHeader>

          {isConnected ? (
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex items-center p-2 rounded-md bg-muted">
                <Calendar className="h-5 w-5 mr-2 text-neki-teal" />
                <span className="text-sm font-medium">calendario@gmail.com</span>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2">Visualizar agenda</h4>
                <ScheduleCalendar 
                  selectedDate={date}
                  onDateChange={setDate}
                  disabledDates={blockedDates}
                />
              </div>
            </div>
          ) : (
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-4">
                Ao conectar seu Google Calendar, suas disponibilidades serão
                sincronizadas automaticamente.
              </p>
              <div className="flex items-center justify-center p-8 border border-dashed rounded-md">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
          )}

          <DialogFooter>
            {isConnected ? (
              <Button
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleDisconnect}
              >
                Desconectar
              </Button>
            ) : (
              <Button
                className="bg-neki-gradient hover:opacity-90"
                onClick={handleConnect}
              >
                <Link2 className="mr-2 h-4 w-4" />
                Conectar conta
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          className={
            isConnected
              ? "border-neki-teal text-neki-teal hover:bg-neki-teal/10"
              : "bg-neki-gradient hover:opacity-90"
          }
        >
          <Calendar className="mr-2 h-4 w-4" />
          {isConnected ? "Calendário conectado" : "Conectar Google Calendar"}
          {isConnected && <Check className="ml-2 h-4 w-4 text-green-500" />}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Integração com Google Calendar</DrawerTitle>
          <DrawerDescription>
            {isConnected
              ? "Seu calendário já está conectado. Você pode visualizar os eventos ou desconectar."
              : "Conecte sua conta do Google Calendar para sincronizar sua disponibilidade."}
          </DrawerDescription>
        </DrawerHeader>
        
        {isConnected ? (
          <div className="px-4 flex flex-col space-y-4">
            <div className="flex items-center p-2 rounded-md bg-muted">
              <Calendar className="h-5 w-5 mr-2 text-neki-teal" />
              <span className="text-sm font-medium">calendario@gmail.com</span>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-2">Visualizar agenda</h4>
              <ScheduleCalendar 
                selectedDate={date}
                onDateChange={setDate}
                disabledDates={blockedDates}
              />
            </div>
          </div>
        ) : (
          <div className="px-4">
            <p className="text-sm text-muted-foreground mb-4">
              Ao conectar seu Google Calendar, suas disponibilidades serão
              sincronizadas automaticamente.
            </p>
            <div className="flex items-center justify-center p-8 border border-dashed rounded-md">
              <Calendar className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
        )}

        <DrawerFooter className="pt-2">
          {isConnected ? (
            <Button
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleDisconnect}
            >
              Desconectar
            </Button>
          ) : (
            <Button
              className="bg-neki-gradient hover:opacity-90"
              onClick={handleConnect}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Conectar conta
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileCalendarIntegration;
