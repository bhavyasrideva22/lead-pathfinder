import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-assessment.jpg";

interface Question {
  id: string;
  category: string;
  question: string;
  type: "likert" | "multiple" | "boolean";
  options?: string[];
  scale?: { min: number; max: number; labels: string[] };
}

const questions: Question[] = [
  // Psychometric Section
  {
    id: "psych_1",
    category: "Interest & Personality",
    question: "I enjoy bringing people from different teams together to solve problems.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "psych_2",
    category: "Interest & Personality", 
    question: "I prefer structured tasks over ambiguous, high-level problem spaces.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "psych_3",
    category: "Interest & Personality",
    question: "I am energized by influencing without formal authority.",
    type: "likert", 
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "psych_4",
    category: "Interest & Personality",
    question: "I bounce back quickly from interpersonal conflict.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },

  // Technical & Aptitude Section
  {
    id: "tech_1",
    category: "Technical Knowledge",
    question: "Which of the following best describes Agile methodology?",
    type: "multiple",
    options: [
      "A project management approach focused on delivering working software in short iterations",
      "A programming language used for web development", 
      "A type of database management system",
      "A marketing strategy for software products"
    ]
  },
  {
    id: "tech_2", 
    category: "Technical Knowledge",
    question: "What is a key responsibility of a Product Owner in Scrum?",
    type: "multiple",
    options: [
      "Writing code for the product",
      "Managing the product backlog and defining user stories",
      "Conducting daily standup meetings",
      "Testing the final product"
    ]
  },
  {
    id: "tech_3",
    category: "Technical Knowledge", 
    question: "KPIs (Key Performance Indicators) are primarily used to:",
    type: "multiple",
    options: [
      "Measure and track progress toward business objectives",
      "Assign tasks to team members",
      "Schedule meetings and events", 
      "Create user interface designs"
    ]
  },

  // WISCAR Framework Questions
  {
    id: "will_1",
    category: "Will & Drive",
    question: "How often do you proactively seek leadership opportunities?",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  },
  {
    id: "interest_1", 
    category: "Interest & Alignment",
    question: "How much does cross-functional leadership align with your career goals?",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Not at all", "Slightly", "Moderately", "Very much", "Completely"] }
  },
  {
    id: "skill_1",
    category: "Current Skills",
    question: "Rate your current stakeholder management skills.",
    type: "likert", 
    scale: { min: 1, max: 5, labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"] }
  },
  {
    id: "cognitive_1",
    category: "Cognitive Readiness",
    question: "You're leading a project where two departments have conflicting priorities. What's your first step?",
    type: "multiple",
    options: [
      "Schedule a meeting with both departments to understand their perspectives",
      "Make a decision based on which department has more seniority",
      "Escalate the issue to upper management immediately", 
      "Choose the solution that seems most cost-effective"
    ]
  },
  {
    id: "ability_1",
    category: "Learning Ability",
    question: "I actively seek feedback to improve my performance.",
    type: "likert",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "realworld_1",
    category: "Real-World Fit",
    question: "Which work environment appeals to you most?",
    type: "multiple", 
    options: [
      "Fast-paced, cross-functional teams with ambiguous challenges",
      "Structured, predictable tasks within a single department",
      "Independent work with minimal collaboration",
      "Creative projects with flexible deadlines"
    ]
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isStarted, setIsStarted] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to results with answers
      navigate('/results', { state: { answers } });
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 bg-black/20"></div>
          <img 
            src={heroImage} 
            alt="Cross-functional leadership" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
          />
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl font-bold mb-6">
                Is Cross-Functional Leadership Right for You?
              </h1>
              <p className="text-xl mb-8 opacity-90">
                A comprehensive readiness & alignment assessment to discover if this career path matches your interests, skills, and goals.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setIsStarted(true)}
                className="bg-white/90 text-primary hover:bg-white shadow-glow"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h2 className="text-3xl font-bold mb-6">What Is Cross-Functional Leadership?</h2>
                  <p className="text-muted-foreground mb-6">
                    Cross-Functional Leaders guide and coordinate across multiple departments (engineering, marketing, product, sales) to deliver unified outcomes. They are connectors, strategists, and problem-solvers who work across organizational silos.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Typical Career Paths</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" /> Product Manager / Product Owner</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" /> Program or Project Manager</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" /> Operations Manager</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" /> Agile Coach / Scrum Master</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 text-success mr-2" /> Business Strategist / Consultant</li>
                  </ul>
                </div>
              </div>

              <Card className="p-8 bg-gradient-card shadow-card">
                <h3 className="text-2xl font-semibold mb-4">Assessment Overview</h3>
                <p className="text-muted-foreground mb-6">
                  This 25-30 minute assessment evaluates your fit across multiple dimensions including personality, technical knowledge, motivation, and real-world alignment.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-foreground font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Personality & Interest</h4>
                    <p className="text-sm text-muted-foreground">Assess your natural inclinations and motivations</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-foreground font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Skills & Knowledge</h4>
                    <p className="text-sm text-muted-foreground">Evaluate your current capabilities and readiness</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-foreground font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Career Alignment</h4>
                    <p className="text-sm text-muted-foreground">Determine real-world fit with your goals</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Cross-Functional Leadership Assessment</h1>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="p-8 shadow-card">
            <div className="mb-6">
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {currentQ.category}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold mb-8">{currentQ.question}</h2>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {currentQ.type === "likert" && currentQ.scale && (
                <div className="space-y-3">
                  {currentQ.scale.labels.map((label, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name={currentQ.id}
                        value={index + 1}
                        checked={currentAnswer === index + 1}
                        onChange={() => handleAnswer(currentQ.id, index + 1)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="group-hover:text-primary transition-smooth">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              )}

              {currentQ.type === "multiple" && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <label key={index} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="radio"
                        name={currentQ.id}
                        value={option}
                        checked={currentAnswer === option}
                        onChange={() => handleAnswer(currentQ.id, option)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="group-hover:text-primary transition-smooth">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className="shadow-elegant"
              >
                {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;