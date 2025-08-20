import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Users, Target, TrendingUp, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-assessment.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <img 
          src={heroImage} 
          alt="Cross-functional leadership assessment" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Discover Your Leadership Potential
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Take our comprehensive assessment to determine if Cross-Functional Leadership is the right career path for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/assessment')}
                className="bg-white/90 text-primary hover:bg-white shadow-glow text-lg px-8 py-4"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Take This Assessment?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our scientifically-backed assessment evaluates your personality, skills, and career alignment across multiple dimensions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center bg-gradient-card shadow-card hover:shadow-elegant transition-smooth">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personality Match</h3>
              <p className="text-muted-foreground">
                Discover if your natural traits align with cross-functional leadership demands.
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-card shadow-card hover:shadow-elegant transition-smooth">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Assessment</h3>
              <p className="text-muted-foreground">
                Evaluate your current capabilities and identify areas for growth.
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-card shadow-card hover:shadow-elegant transition-smooth">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Guidance</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations and next steps for your career journey.
              </p>
            </Card>

            <Card className="p-6 text-center bg-gradient-card shadow-card hover:shadow-elegant transition-smooth">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">WISCAR Framework</h3>
              <p className="text-muted-foreground">
                Comprehensive analysis using proven psychological assessment methods.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What You'll Discover</h2>
              <p className="text-xl text-muted-foreground">
                Our comprehensive assessment provides deep insights into your leadership potential.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Your Leadership Style</h3>
                      <p className="text-muted-foreground">
                        Understand your natural leadership tendencies and how they align with cross-functional roles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Skill Gaps & Strengths</h3>
                      <p className="text-muted-foreground">
                        Identify what you're already great at and areas where focused development will accelerate your career.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Career Roadmap</h3>
                      <p className="text-muted-foreground">
                        Get specific next steps and alternative paths if cross-functional leadership isn't the perfect fit.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Role Matching</h3>
                      <p className="text-muted-foreground">
                        Discover which specific cross-functional roles (Product Manager, Program Manager, etc.) suit you best.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="p-8 bg-gradient-card shadow-elegant">
                <h3 className="text-2xl font-semibold mb-6 text-center">Ready to Get Started?</h3>
                <div className="text-center space-y-4">
                  <div className="text-muted-foreground">
                    <p className="mb-2">⏱️ Takes 25-30 minutes</p>
                    <p className="mb-2">📊 Scientifically validated</p>
                    <p className="mb-4">🎯 Personalized results</p>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={() => navigate('/assessment')}
                    className="w-full shadow-elegant"
                  >
                    Begin Your Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-semibold mb-4">Take the First Step</h3>
          <p className="mb-6 opacity-90">
            Join thousands of professionals who have discovered their ideal career path.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/assessment')}
            className="shadow-glow"
          >
            Start Assessment Now
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
