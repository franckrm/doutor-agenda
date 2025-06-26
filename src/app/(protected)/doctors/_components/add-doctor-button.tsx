"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpserDoctorForm from "./upser-doctor-form";

const AddDoctorButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Médico
        </Button>
      </DialogTrigger>
      <UpserDoctorForm onSuccess={() => setIsOpen(false)} />
    </Dialog>
  );
};

export default AddDoctorButton;
