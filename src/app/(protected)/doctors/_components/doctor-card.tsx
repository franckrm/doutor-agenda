"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { CalendarIcon, ClockIcon, DollarSignIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { doctorsTable } from "@/db/schema";

import UpserDoctorForm from "./upser-doctor-form";

interface DoctorCardProps {
  doctor: typeof doctorsTable.$inferInsert;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const doctorInitials = doctor.name
    .split(" ")
    .map((name) => name[0])
    .join(" ");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{doctorInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{doctor.name}</h3>
            <p className="text-muted-foreground text-xs">{doctor.specialty}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <CalendarIcon className="mr-1" />
          Segunda a Sexta
        </Badge>
        <Badge variant="outline">
          <ClockIcon className="mr-1" />
          {doctor.availableFromTime} - {doctor.availableToTime}
        </Badge>
        <Badge variant="outline">
          <DollarSignIcon className="mr-1" />
          {doctor.appointmentPriceInCents / 100}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpserDoctorForm />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
