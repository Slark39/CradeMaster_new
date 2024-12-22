import React, { useState } from "react";

const Stepper = () => {
  // Define the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to move to the next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-lg">
      <div className="mb-4 flex justify-between">
        {/* Stepper indicators */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: 3 }).map((_, index) => {
            const step = index + 1;
            return (
              <div
                key={step}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${
                  currentStep === step ? "bg-blue-600" : currentStep > step ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                {step}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="rounded-lg border border-gray-300 p-6 shadow-md">
        <h2 className="text-xl mb-4 font-semibold">Step {currentStep}</h2>
        <p className="text-gray-600">
          {currentStep === 1
            ? "This is the first step."
            : currentStep === 2
              ? "This is the second step."
              : "This is the third step."}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <button
          className={`rounded-md bg-gray-500 px-4 py-2 text-white ${
            currentStep === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className={`rounded-md bg-blue-600 px-4 py-2 text-white ${
            currentStep === 3 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={nextStep}
          disabled={currentStep === 3}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
