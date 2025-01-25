"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

const steps = [
  {
    title: "Welcome to FocusSpace",
    content:
      "This tour will guide you through the main features of FocusSpace. Let's get started!",
    target: null
  },
  {
    title: "Game Selector",
    content: "Click here to choose a focus game to play while you work.",
    target: ".game-selector"
  },
  {
    title: "Settings",
    content: "Access FocusSpace settings here to customize your environment.",
    target: ".settings-button"
  },
  {
    title: "Clock Display",
    content: "View the current time or set a timer for your focus sessions.",
    target: ".clock-display"
  },
  {
    title: "Music Player",
    content: "Listen to focus-enhancing music while you work.",
    target: ".spotify-embed"
  }
]

export function GuidanceTour({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState(null)

  useEffect(() => {
    const target = document.querySelector(steps[currentStep].target || "body")
    if (target) {
      const rect = target.getBoundingClientRect()
      setTargetElement(rect)
    }
  }, [currentStep])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-black/50" />
      {targetElement && steps[currentStep].target && (
        <motion.div
          className="absolute border-2 border-white  rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: targetElement.left - 4,
            y: targetElement.top - 4,
            width: targetElement.width + 8,
            height: targetElement.height + 8
          }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md pointer-events-auto">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{steps[currentStep].content}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? "bg-primary" : "bg-gray-300"
                  }`}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                />
              ))}
            </div>
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
