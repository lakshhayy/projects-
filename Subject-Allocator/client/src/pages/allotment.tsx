import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { SubjectCard } from "@/components/subject-card";
import { subjects, Subject } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Allotment() {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const { toast } = useToast();

  const toggleSubject = (subject: Subject) => {
    if (selectedSubjects.find((s) => s.id === subject.id)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s.id !== subject.id));
    } else {
      if (selectedSubjects.length >= 3) {
        toast({
          title: "Limit Reached",
          description: "You can only select up to 3 subjects.",
          variant: "destructive",
        });
        return;
      }
      setSelectedSubjects([...selectedSubjects, subject]);
      toast({
        title: "Subject Selected",
        description: `${subject.name} has been added to your list.`,
      });
    }
  };

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = 
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSemester = semesterFilter === "all" || subject.semester.toString() === semesterFilter;
      const matchesType = typeFilter === "all" || subject.type === typeFilter;

      return matchesSearch && matchesSemester && matchesType;
    });
  }, [searchQuery, semesterFilter, typeFilter]);

  const isSelectionDisabled = selectedSubjects.length >= 3;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Subject Allotment</h1>
            <p className="text-muted-foreground mt-1">
              Select your preferred subjects ({selectedSubjects.length}/3 selected)
            </p>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                View Selection
                {selectedSubjects.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {selectedSubjects.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Your Selection</SheetTitle>
                <SheetDescription>
                  You have selected {selectedSubjects.length} out of 3 subjects.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {selectedSubjects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                    No subjects selected yet
                  </div>
                ) : (
                  selectedSubjects.map((subject) => (
                    <div key={subject.id} className="flex items-start justify-between p-3 bg-muted rounded-lg group">
                      <div>
                        <p className="font-medium text-sm">{subject.name}</p>
                        <p className="text-xs text-muted-foreground">{subject.code} • Sem {subject.semester}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => toggleSubject(subject)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
                 <Button 
                  className="w-full" 
                  disabled={selectedSubjects.length === 0}
                  onClick={() => {
                    toast({
                      title: "Selection Submitted",
                      description: "Your subject preferences have been saved successfully.",
                    });
                  }}
                >
                  Confirm Selection
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by subject name or code..."
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Select value={semesterFilter} onValueChange={setSemesterFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Core">Core</SelectItem>
                <SelectItem value="Elective">Elective</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
              </SelectContent>
            </Select>
            
            {(semesterFilter !== "all" || typeFilter !== "all" || searchQuery) && (
              <Button variant="ghost" size="icon" onClick={() => {
                setSemesterFilter("all");
                setTypeFilter("all");
                setSearchQuery("");
              }}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No subjects found matching your criteria.
            </div>
          ) : (
            filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isSelected={!!selectedSubjects.find((s) => s.id === subject.id)}
                onToggle={toggleSubject}
                disabled={isSelectionDisabled}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
