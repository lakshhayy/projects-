import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, {user?.name.split(' ')[0] || "Faculty"}</h1>
          <p className="text-muted-foreground mt-2">Here is an overview of the ongoing subject allotment process for the upcoming academic session.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">In Progress</div>
              <p className="text-xs text-muted-foreground mt-1">Deadline: Dec 25, 2025</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selection Limit</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 Subjects</div>
              <p className="text-xs text-muted-foreground mt-1">Maximum allotment per faculty</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52</div>
              <p className="text-xs text-muted-foreground mt-1">Available across 8 semesters</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-primary/5 rounded-xl p-8 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">Ready to choose your subjects?</h2>
            <p className="text-muted-foreground max-w-lg">
              Please select up to 3 subjects you would like to teach for the upcoming semester. Ensure you review the syllabus and credit requirements.
            </p>
          </div>
          <Link href="/allotment">
            <Button size="lg" className="shrink-0">
              Go to Allotment <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
