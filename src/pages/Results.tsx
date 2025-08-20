import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  BookOpen, 
  Target, 
  TrendingUp,
  Award,
  Users,
  Lightbulb
} from "lucide-react";

interface AnalysisResult {
  psychometric: number;
  technical: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realworld: number;
    overall: number;
  };
  recommendation: "yes" | "maybe" | "no";
  insights: string[];
  nextSteps: string[];
  alternatives: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || {};

  // Calculate scores based on answers
  const calculateResults = (): AnalysisResult => {
    // Psychometric scoring
    const psychAnswers = [answers.psych_1, answers.psych_2, answers.psych_3, answers.psych_4];
    const psychScore = (psychAnswers.reduce((sum, ans) => sum + (ans || 0), 0) / (psychAnswers.length * 5)) * 100;

    // Technical scoring
    const techCorrectAnswers = {
      tech_1: "A project management approach focused on delivering working software in short iterations",
      tech_2: "Managing the product backlog and defining user stories", 
      tech_3: "Measure and track progress toward business objectives"
    };
    
    let techCorrect = 0;
    Object.entries(techCorrectAnswers).forEach(([key, correct]) => {
      if (answers[key] === correct) techCorrect++;
    });
    const techScore = (techCorrect / Object.keys(techCorrectAnswers).length) * 100;

    // WISCAR scoring
    const wiscarScores = {
      will: ((answers.will_1 || 0) / 5) * 100,
      interest: ((answers.interest_1 || 0) / 5) * 100,
      skill: ((answers.skill_1 || 0) / 5) * 100,
      cognitive: answers.cognitive_1 === "Schedule a meeting with both departments to understand their perspectives" ? 100 : 50,
      ability: ((answers.ability_1 || 0) / 5) * 100,
      realworld: answers.realworld_1 === "Fast-paced, cross-functional teams with ambiguous challenges" ? 100 : 50,
      overall: 0
    };
    
    wiscarScores.overall = Object.values(wiscarScores).slice(0, -1).reduce((sum, score) => sum + score, 0) / 6;

    // Overall recommendation
    const overallScore = (psychScore + techScore + wiscarScores.overall) / 3;
    let recommendation: "yes" | "maybe" | "no";
    if (overallScore >= 70) recommendation = "yes";
    else if (overallScore >= 40) recommendation = "maybe";
    else recommendation = "no";

    // Generate insights
    const insights = [];
    if (psychScore >= 75) insights.push("Strong interpersonal orientation and leadership mindset");
    if (techScore >= 80) insights.push("Solid understanding of cross-functional business concepts");
    if (wiscarScores.will >= 80) insights.push("High drive and proactive leadership tendencies");
    if (wiscarScores.interest >= 80) insights.push("Strong alignment with cross-functional career goals");
    if (techScore < 60) insights.push("Need to build familiarity with agile methodologies and business frameworks");
    if (psychScore < 50) insights.push("May benefit from developing interpersonal and influence skills");

    // Generate next steps
    const nextSteps = [];
    if (recommendation === "yes") {
      nextSteps.push("Enroll in Agile/Scrum or Leadership Foundations course");
      nextSteps.push("Seek cross-functional projects to shadow or lead");
      nextSteps.push("Learn stakeholder communication frameworks");
      nextSteps.push("Build a portfolio of cross-departmental collaboration examples");
    } else if (recommendation === "maybe") {
      nextSteps.push("Start with foundational business and leadership courses");
      nextSteps.push("Practice influence and communication skills");
      nextSteps.push("Gain experience in project coordination roles");
    } else {
      nextSteps.push("Explore alternative career paths that better match your profile");
      nextSteps.push("Consider developing core business skills first");
    }

    // Generate alternatives
    const alternatives = [
      "Business Analyst - Focus on requirements and process improvement",
      "UX Strategist - Bridge user needs with business goals", 
      "Change Management Coordinator - Drive organizational transformations",
      "Specialized Team Lead - Lead within a specific functional area"
    ];

    return {
      psychometric: Math.round(psychScore),
      technical: Math.round(techScore),
      wiscar: {
        ...wiscarScores,
        will: Math.round(wiscarScores.will),
        interest: Math.round(wiscarScores.interest),
        skill: Math.round(wiscarScores.skill),
        cognitive: Math.round(wiscarScores.cognitive),
        ability: Math.round(wiscarScores.ability),
        realworld: Math.round(wiscarScores.realworld),
        overall: Math.round(wiscarScores.overall)
      },
      recommendation,
      insights,
      nextSteps,
      alternatives
    };
  };

  const results = calculateResults();

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "yes": return "text-success";
      case "maybe": return "text-warning";
      case "no": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case "yes": return <CheckCircle className="h-8 w-8" />;
      case "maybe": return <AlertCircle className="h-8 w-8" />;
      case "no": return <XCircle className="h-8 w-8" />;
      default: return null;
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case "yes": return "Strong alignment - Pursue this path!";
      case "maybe": return "Moderate alignment - Consider with preparation";
      case "no": return "Low alignment - Explore alternatives";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate('/')} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
            <p className="text-muted-foreground">
              Comprehensive analysis of your fit for Cross-Functional Leadership
            </p>
          </div>

          {/* Overall Recommendation */}
          <Card className="p-8 mb-8 bg-gradient-card shadow-elegant">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                results.recommendation === 'yes' ? 'bg-success/10' : 
                results.recommendation === 'maybe' ? 'bg-warning/10' : 'bg-destructive/10'
              }`}>
                <div className={getRecommendationColor(results.recommendation)}>
                  {getRecommendationIcon(results.recommendation)}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {getRecommendationText(results.recommendation)}
              </h2>
              <p className="text-muted-foreground">
                Based on your responses across personality, skills, and career alignment factors
              </p>
            </div>
          </Card>

          {/* Score Breakdown */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Core Scores */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Target className="mr-2 h-5 w-5 text-primary" />
                Core Assessment Scores
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Personality & Interest Fit</span>
                    <span className="text-sm font-medium">{results.psychometric}%</span>
                  </div>
                  <Progress value={results.psychometric} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="text-sm font-medium">{results.technical}%</span>
                  </div>
                  <Progress value={results.technical} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Overall WISCAR Score</span>
                    <span className="text-sm font-medium">{results.wiscar.overall}%</span>
                  </div>
                  <Progress value={results.wiscar.overall} className="h-2" />
                </div>
              </div>
            </Card>

            {/* WISCAR Breakdown */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                WISCAR Framework Analysis
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Will</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.will}%</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Interest</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.interest}%</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Skill</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.skill}%</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Cognitive</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.cognitive}%</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Ability</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.ability}%</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Real-World</div>
                  <div className="text-2xl font-bold text-primary">{results.wiscar.realworld}%</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Insights */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-primary" />
              Personalized Insights
            </h3>
            <div className="space-y-3">
              {results.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{insight}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Next Steps and Career Paths */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Recommended Next Steps
              </h3>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-primary-foreground font-bold">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Alternative Career Paths
              </h3>
              <div className="space-y-3">
                {results.alternatives.map((alt, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <p className="font-medium text-sm">{alt.split(' - ')[0]}</p>
                    <p className="text-xs text-muted-foreground">{alt.split(' - ')[1]}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Top Career Roles */}
          <Card className="p-6 mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              Top Roles This Path Unlocks
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Product Manager", desc: "Own product lifecycle, cross-functional alignment", match: results.wiscar.overall },
                { title: "Program Manager", desc: "Drive large, multi-team initiatives", match: results.wiscar.will },
                { title: "Business Operations Lead", desc: "Solve org-wide challenges", match: results.wiscar.cognitive },
                { title: "Agile Coach", desc: "Enable agile transformations", match: results.technical },
                { title: "Innovation Manager", desc: "Drive change across silos", match: results.psychometric },
                { title: "Strategy Consultant", desc: "Advise on cross-functional solutions", match: results.wiscar.overall }
              ].map((role, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{role.title}</h4>
                    <Badge variant={role.match >= 70 ? "default" : role.match >= 50 ? "secondary" : "outline"}>
                      {role.match}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="text-center">
            <Button onClick={() => navigate('/assessment')} className="mr-4">
              Retake Assessment
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Download Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;