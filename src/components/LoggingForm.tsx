import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara"
];

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  department: z.string().trim().min(2, "Department is required").max(100, "Department name is too long"),
  regNumber: z.string().trim().min(3, "Registration number is required").max(50, "Registration number is too long"),
  stateOfOrigin: z.string().min(1, "Please select a state of origin"),
  age: z.coerce.number().min(10, "Age must be at least 10").max(120, "Age must be less than 120"),
});

type FormData = z.infer<typeof formSchema>;

export const LoggingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Form submitted:", data);
    
    toast.success("Registration Successful", {
      description: `Welcome, ${data.name}! Your information has been logged.`,
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg border-border/50">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-3xl font-bold text-foreground">Registration Form</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Please fill in your details to complete registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              className="transition-all"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="department" className="text-sm font-medium">
              Department <span className="text-destructive">*</span>
            </Label>
            <Input
              id="department"
              placeholder="Enter your department"
              className="transition-all"
              {...register("department")}
            />
            {errors.department && (
              <p className="text-sm text-destructive">{errors.department.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="regNumber" className="text-sm font-medium">
              Registration Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="regNumber"
              placeholder="Enter your registration number"
              className="transition-all"
              {...register("regNumber")}
            />
            {errors.regNumber && (
              <p className="text-sm text-destructive">{errors.regNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateOfOrigin" className="text-sm font-medium">
              State of Origin <span className="text-destructive">*</span>
            </Label>
            <Select onValueChange={(value) => setValue("stateOfOrigin", value)}>
              <SelectTrigger className="transition-all">
                <SelectValue placeholder="Select your state of origin" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {NIGERIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.stateOfOrigin && (
              <p className="text-sm text-destructive">{errors.stateOfOrigin.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium">
              Age <span className="text-destructive">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              className="transition-all"
              {...register("age")}
            />
            {errors.age && (
              <p className="text-sm text-destructive">{errors.age.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full transition-all hover:scale-[1.02]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
