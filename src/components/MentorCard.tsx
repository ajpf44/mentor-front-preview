
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export interface MentorProps {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  skills: string[];
  availability?: string;
  contact?: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

const MentorCard = ({
  id,
  name,
  role,
  description,
  imageUrl,
  skills,
  availability,
  contact,
}: MentorProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col hover:shadow-md">
      <div className="aspect-[3/2] w-full relative overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={`${name} - ${role}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <CardDescription className="text-neki-blue">{role}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="bg-neki-gradient-light text-neki-blue-dark font-normal"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-muted-foreground">
              +{skills.length - 4}
            </Badge>
          )}
        </div>
        {availability && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays size={14} />
            <span>{availability}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button
          asChild
          className="flex-1 bg-neki-gradient hover:opacity-90 transition-opacity"
        >
          <Link to={`/agendar?mentor=${id}`}>Agendar</Link>
        </Button>
        <div className="flex gap-1">
          {contact?.email && (
            <Button variant="outline" size="icon" asChild className="h-9 w-9">
              <a href={`mailto:${contact.email}`} aria-label="Email">
                <Mail size={16} />
              </a>
            </Button>
          )}
          {contact?.linkedin && (
            <Button variant="outline" size="icon" asChild className="h-9 w-9">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </Button>
          )}
          {contact?.phone && (
            <Button variant="outline" size="icon" asChild className="h-9 w-9">
              <a href={`tel:${contact.phone}`} aria-label="Phone">
                <Phone size={16} />
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
