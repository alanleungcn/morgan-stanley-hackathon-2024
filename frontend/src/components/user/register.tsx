import { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export function Register({ onRegister }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterClick = (option) => {
    setSelectedOption(option);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      onRegister(selectedOption);
      setIsRegistered(true);
    }
    setShowConfirmation(false);
    setIsPopoverOpen(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setIsPopoverOpen(false);
  };
  return (
    <div className="flex justify-center mt-8">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setIsPopoverOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isRegistered}
          >
            {isRegistered ? "Already Registered" : "Register"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 h-64 p-6 bg-white rounded shadow-md flex items-center justify-center">
          {!showConfirmation ? (
            <RadioGroup defaultValue="participant">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="participant"
                  id="participant"
                  onClick={() => handleRegisterClick("participant")}
                />
                <Label htmlFor="participant">Register as Participant</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem
                  value="volunteer"
                  id="volunteer"
                  onClick={() => handleRegisterClick("volunteer")}
                />
                <Label htmlFor="volunteer">Register as Volunteer</Label>
              </div>
            </RadioGroup>
          ) : (
            <div className="text-center space-y-4">
              <p>{`You want to join as a ${selectedOption}`}</p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleConfirm}>Confirm</Button>
                <Button onClick={handleCancel} variant="secondary">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
