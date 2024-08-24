import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export function Register({ event, onRegister }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [step, setStep] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmedRole, setConfirmedRole] = useState("");

  const isFull =
    event.number_of_participants >= event.number_of_participants_needed &&
    event.number_of_volunteers >= event.number_of_volunteers_needed;

  const handleNext = () => {
    if (selectedRole) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    onRegister(selectedRole);
    setConfirmedRole(selectedRole);
    setStep(1);
    setSelectedRole("");
    setDialogOpen(false);
  };

  return (
    <div className="flex justify-center mt-8">
      {isFull ? (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Sorry!</AlertTitle>
          <AlertDescription>The event is full.</AlertDescription>
        </Alert>
      ) : (
        <>
          <Button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setDialogOpen(true)}
          >
            {confirmedRole
              ? `Already registered as ${confirmedRole}`
              : "Register"}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              {step === 1 ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Select Your Role</DialogTitle>
                    <DialogDescription>
                      Please select a role to proceed with registration.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <RadioGroup value={selectedRole}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="participant"
                          id="participant"
                          onClick={() => setSelectedRole("participant")}
                        />
                        <Label htmlFor="participant">
                          Register as Participant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <RadioGroupItem
                          value="volunteer"
                          id="volunteer"
                          onClick={() => setSelectedRole("volunteer")}
                        />
                        <Label htmlFor="volunteer">Register as Volunteer</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleNext} disabled={!selectedRole}>
                      Next
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Confirm Your Registration</DialogTitle>
                    <DialogDescription>
                      Please confirm your registration details below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p className="text-lg">{`Event: ${event.event_name}`}</p>
                    <p className="text-lg">{`Date: ${new Date(
                      event.event_date,
                    ).toLocaleDateString()}`}</p>
                    <p className="text-lg">{`Location: ${event.event_location}`}</p>
                    <p className="text-lg">{`Role: ${selectedRole}`}</p>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleConfirm}>Confirm</Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setStep(1);
                        setDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
