"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface FeedbackProps {
    quizId: Id<"quiz">;
}

interface Responses {
  [key: string]: string;
}

const Feedback = ({
    quizId,
}: FeedbackProps) => {  
    const data = useQuery(api.quiz.get, {
        id: quizId,
    })

    const questions = useQuery(api.questions.get, {
        quizId,
    }) || [];

    const [responses, setResponses] = useState<Responses>({});
    const [allAnswered, setAllAnswered] = useState(true);

    const { mutate } = useApiMutation(api.feedback.create)

    const handleResponseChange = (questionId: string, value: string) => {
        setResponses((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSubmit = () => {

        const unansweredQuestions = questions.some(
            (question) => question.questionType === "radio" && !responses[question._id]
        );

        if (unansweredQuestions) {
            toast.error("Please answer all questions before submitting.");
            return;
        }
        
        mutate({ quizId, responses })
            .then(() => {
                toast.success("Feedback submitted successfully!");
            })
            .catch(() => {
                toast.error("Failed to submit feedback.");
            });
    };

    useEffect(() => {
    if (questions) {
      const allAnswered = questions.every((question) => {
        return question.questionType === "radio"
          ? responses[question._id]
          : true; // Assume input types are optional; adjust as needed
      });

      setAllAnswered(allAnswered);
    }
  }, [responses, questions]);

    return ( 
        <div className="border-2 border-red-500 rounded-md bg-[var(--background)] hover:bg-[var(--foreground)] hover:text-[var(--background)] duration-500 p-2">
            <AlertDialog >
                <AlertDialogTrigger>{data?.title}</AlertDialogTrigger>
                <AlertDialogContent className="bg-[var(--background)]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-4xl font-light">{data?.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {questions ? (
                                questions.map(question => (
                                    <div className="flex flex-col gap-2" key={question._id}>
                                        <p className="mt-4 mb-2 text-xl">{question.questionText}</p>
                                        {question.questionType === "radio" ? (
                                            <div className="flex space-x-2">
                                                    👎
                                                {[...Array(10)].map((_, index) => (
                                                    <label key={index}>
                                                        <input
                                                            type="radio" 
                                                            className="w-full"
                                                            name={`question-${question._id}`} 
                                                            value={index + 1} 
                                                            onChange={() => handleResponseChange(question._id, (index + 1).toString())}
                                                        />
                                                        {index + 1}
                                                    </label>
                                                ))}
                                                👍
                                            </div>
                                        ) : question.questionType === "input" ? (
                                            <input 
                                                type="text" 
                                                placeholder="Type your answer here" 
                                                className="border-2 h-8 rounded p-1 w-full" 
                                                onChange={(e) => handleResponseChange(question._id, e.target.value)}
                                            />
                                        ) : null}
                                    </div>
                                ))
                            ) : (
                                <p>No questions found for this quiz.</p>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="hover:bg-[var(--green)]" onClick={handleSubmit}>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
     );
}
 
export default Feedback;