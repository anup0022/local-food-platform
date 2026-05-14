"use client";

import { useState } from "react";
import { mockTemplates, type TemplateName } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Image,
  Video,
  FileText,
  Sparkles,
  Upload,
  X,
  Check,
  Eye,
  Send,
  Plus,
  Palette,
  Type,
  LayoutGrid,
  Heart,
  FlaskConical,
  ChefHat,
  MapPin,
  Scale,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CreatePostPage() {
  const [step, setStep] = useState<"template" | "compose" | "preview">("template");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateName | null>(null);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    mediaFiles: [] as { type: string; name: string; url: string }[],
    tags: [] as string[],
    tagInput: "",
    // Template-specific fields
    benefits: [""] as string[],
    nutritionFacts: [{ label: "", value: "" }] as { label: string; value: string }[],
    source: "",
    labName: "",
    testDate: "",
    findings: [{ label: "", localValue: "", commercialValue: "" }] as { label: string; localValue: string; commercialValue: string }[],
    verdict: "",
    ingredients: [""] as string[],
    steps: [""] as string[],
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    locationName: "",
    locationAddress: "",
    price: "",
    availability: "",
    season: "",
    itemAName: "",
    itemAPoints: [""] as string[],
    itemBName: "",
    itemBPoints: [""] as string[],
    comparisonVerdict: "",
  });

  const handleTemplateSelect = (templateKey: TemplateName) => {
    setSelectedTemplate(templateKey);
    setStep("compose");
  };

  const handleAddTag = () => {
    if (postData.tagInput.trim() && !postData.tags.includes(postData.tagInput.trim())) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }));
    }
  };

  const handleRemoveTag = (tag: string) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // Dynamic list helpers
  const addToList = (field: "benefits" | "ingredients" | "steps" | "itemAPoints" | "itemBPoints") => {
    setPostData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const updateListItem = (field: "benefits" | "ingredients" | "steps" | "itemAPoints" | "itemBPoints", index: number, value: string) => {
    setPostData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeFromList = (field: "benefits" | "ingredients" | "steps" | "itemAPoints" | "itemBPoints", index: number) => {
    setPostData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addFinding = () => {
    setPostData((prev) => ({
      ...prev,
      findings: [...prev.findings, { label: "", localValue: "", commercialValue: "" }],
    }));
  };

  const updateFinding = (index: number, field: "label" | "localValue" | "commercialValue", value: string) => {
    setPostData((prev) => {
      const updated = [...prev.findings];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, findings: updated };
    });
  };

  const addNutritionFact = () => {
    setPostData((prev) => ({
      ...prev,
      nutritionFacts: [...prev.nutritionFacts, { label: "", value: "" }],
    }));
  };

  const updateNutritionFact = (index: number, field: "label" | "value", value: string) => {
    setPostData((prev) => {
      const updated = [...prev.nutritionFacts];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, nutritionFacts: updated };
    });
  };

  const templateInfo = mockTemplates.find((t) => t.templateKey === selectedTemplate);

  const templateIcons: Record<string, React.ReactNode> = {
    "food-benefit": <Heart className="h-4 w-4 text-green-600" />,
    "lab-report": <FlaskConical className="h-4 w-4 text-blue-600" />,
    "recipe": <ChefHat className="h-4 w-4 text-orange-600" />,
    "where-to-find": <MapPin className="h-4 w-4 text-purple-600" />,
    "comparison": <Scale className="h-4 w-4 text-amber-600" />,
    "video-story": <Video className="h-4 w-4 text-red-600" />,
    "custom": <Palette className="h-4 w-4 text-gray-600" />,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {step !== "template" ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full"
              onClick={() => setStep(step === "preview" ? "compose" : "template")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : (
            <Link href="/feed">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <div>
            <h1 className="text-xl font-bold">Create Post</h1>
            <p className="text-sm text-muted-foreground">
              {step === "template"
                ? "Choose a template to get started"
                : step === "compose"
                ? `Composing: ${templateInfo?.name || "Custom Post"}`
                : "Preview your post before submitting"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {step === "compose" && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep("preview")}
              className="gap-1.5"
            >
              <Eye className="h-4 w-4" />
              Preview
            </Button>
          )}
          {step === "preview" && (
            <Button size="sm" className="gap-1.5">
              <Send className="h-4 w-4" />
              Submit for Review
            </Button>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-6">
        {["template", "compose", "preview"].map((s, idx) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold",
                step === s
                  ? "bg-primary text-primary-foreground"
                  : idx < ["template", "compose", "preview"].indexOf(step)
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {idx + 1}
            </div>
            {idx < 2 && (
              <div className={cn("h-0.5 w-8 rounded", idx < ["template", "compose", "preview"].indexOf(step) ? "bg-primary" : "bg-muted")} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Template Selection */}
      {step === "template" && (
        <div>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
              <TabsTrigger value="recipe">Recipe</TabsTrigger>
              <TabsTrigger value="science">Science</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockTemplates.map((tpl) => (
                  <Card
                    key={tpl.id}
                    className={cn(
                      "cursor-pointer overflow-hidden transition-all hover:shadow-md hover:ring-2 hover:ring-primary/50",
                      selectedTemplate === tpl.templateKey && "ring-2 ring-primary"
                    )}
                    onClick={() => handleTemplateSelect(tpl.templateKey)}
                  >
                    <div className="relative aspect-[4/3]">
                      <img
                        src={tpl.preview}
                        alt={tpl.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={cn("absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent")} />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          {templateIcons[tpl.templateKey]}
                          <p className="text-white text-sm font-semibold">
                            {tpl.name}
                          </p>
                        </div>
                        <p className="text-white/80 text-xs">
                          {tpl.description}
                        </p>
                      </div>
                      <Badge className="absolute top-3 right-3 bg-white/90 text-foreground text-xs">
                        {tpl.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Category-filtered tabs */}
            {["health", "recipe", "science", "location", "education", "media"].map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTemplates
                    .filter((tpl) => tpl.category === cat)
                    .map((tpl) => (
                      <Card
                        key={tpl.id}
                        className="cursor-pointer overflow-hidden transition-all hover:shadow-md hover:ring-2 hover:ring-primary/50"
                        onClick={() => handleTemplateSelect(tpl.templateKey)}
                      >
                        <div className="relative aspect-[4/3]">
                          <img
                            src={tpl.preview}
                            alt={tpl.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <p className="text-white text-sm font-semibold">{tpl.name}</p>
                            <p className="text-white/80 text-xs mt-0.5">{tpl.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  {mockTemplates.filter((tpl) => tpl.category === cat).length === 0 && (
                    <p className="text-sm text-muted-foreground col-span-3 text-center py-8">
                      No templates in this category yet.
                    </p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Quick create */}
          <div className="mt-6 border-t pt-6">
            <p className="text-sm font-medium mb-3">Quick create:</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => handleTemplateSelect("custom")} className="gap-2">
                <Type className="h-4 w-4" />
                Text Post
              </Button>
              <Button variant="outline" onClick={() => handleTemplateSelect("custom")} className="gap-2">
                <Image className="h-4 w-4 text-green-600" />
                Photo Post
              </Button>
              <Button variant="outline" onClick={() => handleTemplateSelect("video-story")} className="gap-2">
                <Video className="h-4 w-4 text-blue-600" />
                Video Post
              </Button>
              <Button variant="outline" onClick={() => handleTemplateSelect("custom")} className="gap-2">
                <FileText className="h-4 w-4 text-red-600" />
                Document/PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Compose */}
      {step === "compose" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-3 space-y-5">
            {/* Common Fields: Title + Content */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold">Title</Label>
              <Input
                id="title"
                placeholder="Give your post a catchy title..."
                value={postData.title}
                onChange={(e) => setPostData((prev) => ({ ...prev, title: e.target.value }))}
                className="text-lg font-medium h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Description</Label>
              <Textarea
                placeholder="Write a brief description or introduction..."
                value={postData.content}
                onChange={(e) => setPostData((prev) => ({ ...prev, content: e.target.value }))}
                className="min-h-[120px] text-sm leading-relaxed resize-none"
              />
            </div>

            {/* Template-specific fields */}
            {selectedTemplate === "food-benefit" && (
              <div className="space-y-5 border-t pt-5">
                <div className="flex items-center gap-2 text-green-700">
                  <Heart className="h-5 w-5" />
                  <h3 className="font-semibold">Health Benefits</h3>
                </div>

                {/* Benefits list */}
                <div className="space-y-2">
                  <Label className="text-sm">Benefits (one per line)</Label>
                  {postData.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <Input
                        placeholder={`Benefit ${idx + 1}...`}
                        value={benefit}
                        onChange={(e) => updateListItem("benefits", idx, e.target.value)}
                      />
                      {postData.benefits.length > 1 && (
                        <Button variant="ghost" size="icon" className="shrink-0 text-red-500" onClick={() => removeFromList("benefits", idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addToList("benefits")} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Benefit
                  </Button>
                </div>

                {/* Nutrition Facts */}
                <div className="space-y-2">
                  <Label className="text-sm">Nutrition Facts</Label>
                  {postData.nutritionFacts.map((fact, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input placeholder="Nutrient (e.g. Iron)" value={fact.label} onChange={(e) => updateNutritionFact(idx, "label", e.target.value)} />
                      <Input placeholder="Value (e.g. 16% DV)" value={fact.value} onChange={(e) => updateNutritionFact(idx, "value", e.target.value)} />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addNutritionFact} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Nutrient
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Source / Reference</Label>
                  <Input placeholder="E.g. NCBI research paper, Ayurvedic text..." value={postData.source} onChange={(e) => setPostData((prev) => ({ ...prev, source: e.target.value }))} />
                </div>
              </div>
            )}

            {selectedTemplate === "lab-report" && (
              <div className="space-y-5 border-t pt-5">
                <div className="flex items-center gap-2 text-blue-700">
                  <FlaskConical className="h-5 w-5" />
                  <h3 className="font-semibold">Lab Report Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm">Lab Name</Label>
                    <Input placeholder="Testing laboratory name" value={postData.labName} onChange={(e) => setPostData((prev) => ({ ...prev, labName: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Test Date</Label>
                    <Input placeholder="E.g. April 2026" value={postData.testDate} onChange={(e) => setPostData((prev) => ({ ...prev, testDate: e.target.value }))} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Findings (Comparison Table)</Label>
                  <div className="text-xs text-muted-foreground grid grid-cols-3 gap-2 px-1 mb-1">
                    <span>Parameter</span>
                    <span>Local/Organic</span>
                    <span>Commercial</span>
                  </div>
                  {postData.findings.map((finding, idx) => (
                    <div key={idx} className="grid grid-cols-3 gap-2">
                      <Input placeholder="Parameter" value={finding.label} onChange={(e) => updateFinding(idx, "label", e.target.value)} className="text-xs" />
                      <Input placeholder="Local value" value={finding.localValue} onChange={(e) => updateFinding(idx, "localValue", e.target.value)} className="text-xs" />
                      <Input placeholder="Commercial" value={finding.commercialValue} onChange={(e) => updateFinding(idx, "commercialValue", e.target.value)} className="text-xs" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addFinding} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Finding
                  </Button>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm">Verdict / Conclusion</Label>
                  <Textarea placeholder="Summarize the lab findings..." value={postData.verdict} onChange={(e) => setPostData((prev) => ({ ...prev, verdict: e.target.value }))} className="min-h-[80px]" />
                </div>
              </div>
            )}

            {selectedTemplate === "recipe" && (
              <div className="space-y-5 border-t pt-5">
                <div className="flex items-center gap-2 text-orange-700">
                  <ChefHat className="h-5 w-5" />
                  <h3 className="font-semibold">Recipe Details</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Prep Time</Label>
                    <Input placeholder="20 mins" value={postData.prepTime} onChange={(e) => setPostData((prev) => ({ ...prev, prepTime: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Cook Time</Label>
                    <Input placeholder="30 mins" value={postData.cookTime} onChange={(e) => setPostData((prev) => ({ ...prev, cookTime: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Servings</Label>
                    <Input placeholder="4 servings" value={postData.servings} onChange={(e) => setPostData((prev) => ({ ...prev, servings: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Difficulty</Label>
                    <select
                      value={postData.difficulty}
                      onChange={(e) => setPostData((prev) => ({ ...prev, difficulty: e.target.value as "Easy" | "Medium" | "Hard" }))}
                      className="w-full h-9 rounded-md border bg-background px-3 text-sm"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Ingredients</Label>
                  {postData.ingredients.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="flex h-9 w-5 shrink-0 items-center justify-center text-xs text-muted-foreground">&#8226;</span>
                      <Input placeholder={`Ingredient ${idx + 1}`} value={item} onChange={(e) => updateListItem("ingredients", idx, e.target.value)} />
                      {postData.ingredients.length > 1 && (
                        <Button variant="ghost" size="icon" className="shrink-0 text-red-500" onClick={() => removeFromList("ingredients", idx)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addToList("ingredients")} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Ingredient
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Steps</Label>
                  {postData.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="flex h-9 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                        {idx + 1}
                      </span>
                      <Textarea placeholder={`Step ${idx + 1}...`} value={step} onChange={(e) => updateListItem("steps", idx, e.target.value)} className="min-h-[60px] resize-none" />
                      {postData.steps.length > 1 && (
                        <Button variant="ghost" size="icon" className="shrink-0 text-red-500" onClick={() => removeFromList("steps", idx)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={() => addToList("steps")} className="gap-1.5">
                    <Plus className="h-3.5 w-3.5" /> Add Step
                  </Button>
                </div>
              </div>
            )}

            {selectedTemplate === "where-to-find" && (
              <div className="space-y-5 border-t pt-5">
                <div className="flex items-center gap-2 text-purple-700">
                  <MapPin className="h-5 w-5" />
                  <h3 className="font-semibold">Location Details</h3>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-sm">Place Name</Label>
                    <Input placeholder="E.g. Desai Organic Farm" value={postData.locationName} onChange={(e) => setPostData((prev) => ({ ...prev, locationName: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm">Address</Label>
                    <Input placeholder="Full address or directions" value={postData.locationAddress} onChange={(e) => setPostData((prev) => ({ ...prev, locationAddress: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Price</Label>
                      <Input placeholder="Rs 80/kg" value={postData.price} onChange={(e) => setPostData((prev) => ({ ...prev, price: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Availability</Label>
                      <Input placeholder="Sept-Feb" value={postData.availability} onChange={(e) => setPostData((prev) => ({ ...prev, availability: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Season</Label>
                      <Input placeholder="Kharif" value={postData.season} onChange={(e) => setPostData((prev) => ({ ...prev, season: e.target.value }))} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTemplate === "comparison" && (
              <div className="space-y-5 border-t pt-5">
                <div className="flex items-center gap-2 text-amber-700">
                  <Scale className="h-5 w-5" />
                  <h3 className="font-semibold">Comparison Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item A */}
                  <div className="space-y-3 p-4 rounded-xl border-2 border-green-200 bg-green-50/30">
                    <div className="space-y-1">
                      <Label className="text-sm text-green-700 font-semibold">Item A (Winner)</Label>
                      <Input placeholder="E.g. Jaggery" value={postData.itemAName} onChange={(e) => setPostData((prev) => ({ ...prev, itemAName: e.target.value }))} />
                    </div>
                    {postData.itemAPoints.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input placeholder={`Pro ${idx + 1}`} value={point} onChange={(e) => updateListItem("itemAPoints", idx, e.target.value)} className="text-sm" />
                        {postData.itemAPoints.length > 1 && (
                          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => removeFromList("itemAPoints", idx)}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addToList("itemAPoints")} className="gap-1 text-xs w-full">
                      <Plus className="h-3 w-3" /> Add Point
                    </Button>
                  </div>

                  {/* Item B */}
                  <div className="space-y-3 p-4 rounded-xl border-2 border-red-200 bg-red-50/30">
                    <div className="space-y-1">
                      <Label className="text-sm text-red-700 font-semibold">Item B</Label>
                      <Input placeholder="E.g. White Sugar" value={postData.itemBName} onChange={(e) => setPostData((prev) => ({ ...prev, itemBName: e.target.value }))} />
                    </div>
                    {postData.itemBPoints.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input placeholder={`Con ${idx + 1}`} value={point} onChange={(e) => updateListItem("itemBPoints", idx, e.target.value)} className="text-sm" />
                        {postData.itemBPoints.length > 1 && (
                          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9" onClick={() => removeFromList("itemBPoints", idx)}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addToList("itemBPoints")} className="gap-1 text-xs w-full">
                      <Plus className="h-3 w-3" /> Add Point
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-sm">Verdict</Label>
                  <Textarea placeholder="Your conclusion..." value={postData.comparisonVerdict} onChange={(e) => setPostData((prev) => ({ ...prev, comparisonVerdict: e.target.value }))} className="min-h-[60px]" />
                </div>
              </div>
            )}

            {/* Media Upload - common to all templates */}
            <div className="space-y-2 border-t pt-5">
              <Label className="font-semibold">Media</Label>
              <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">Drop files here or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">Images, Videos, PDFs (max 50MB)</p>
                <div className="flex justify-center gap-2 mt-4">
                  <Badge variant="outline" className="text-xs gap-1">
                    <Image className="h-3 w-3" /> JPG, PNG
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <Video className="h-3 w-3" /> MP4
                  </Badge>
                  <Badge variant="outline" className="text-xs gap-1">
                    <FileText className="h-3 w-3" /> PDF
                  </Badge>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="font-semibold">Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag (e.g., turmeric, immunity)"
                  value={postData.tagInput}
                  onChange={(e) => setPostData((prev) => ({ ...prev, tagInput: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button variant="outline" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {postData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {postData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      #{tag}
                      <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Template
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg bg-muted/50 flex items-center gap-2">
                    {selectedTemplate && templateIcons[selectedTemplate]}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Selected</p>
                      <p className="text-sm font-semibold">{templateInfo?.name || "Custom"}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setStep("template")}>
                    Change Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Tips for {templateInfo?.name || "this template"}
                </h3>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {selectedTemplate === "food-benefit" && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />List specific health benefits with details</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Include nutrition facts for credibility</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Add a photo of the food item</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Cite sources for health claims</li>
                    </>
                  )}
                  {selectedTemplate === "lab-report" && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Name the lab and test date</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Compare local vs commercial clearly</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Upload the PDF report if available</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Write a clear verdict summary</li>
                    </>
                  )}
                  {selectedTemplate === "recipe" && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />List all ingredients with quantities</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Write clear step-by-step instructions</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Add photos or video of the process</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Include prep time and servings</li>
                    </>
                  )}
                  {selectedTemplate === "where-to-find" && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Provide exact location / address</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Mention pricing and availability</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Add photos of the place/product</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Note seasonal availability</li>
                    </>
                  )}
                  {selectedTemplate === "comparison" && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Be fair and objective in points</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Back claims with data if possible</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Write a clear verdict</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Add an image showing both items</li>
                    </>
                  )}
                  {(selectedTemplate === "video-story" || selectedTemplate === "custom") && (
                    <>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Use emojis to make content engaging</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Add images or video for better reach</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Include relevant tags for discovery</li>
                      <li className="flex gap-2"><Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />Posts are reviewed before publishing</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Save Draft</Button>
              <Button className="flex-1 gap-1.5" onClick={() => setStep("preview")}>
                <Eye className="h-4 w-4" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === "preview" && (
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            {/* Preview Header */}
            <div className="p-4 border-b bg-muted/30 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Post Preview</p>
                <p className="text-xs text-muted-foreground">
                  Template: {templateInfo?.name || "Custom"} | This is how it will appear
                </p>
              </div>
            </div>

            {/* Preview Content */}
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">{postData.title || "Untitled Post"}</h2>
              <p className="text-sm text-foreground/80 whitespace-pre-line">
                {postData.content || "No description yet..."}
              </p>

              {/* Template preview based on type */}
              {selectedTemplate === "food-benefit" && postData.benefits.filter(Boolean).length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-green-800">Benefits:</p>
                  <ul className="space-y-1">
                    {postData.benefits.filter(Boolean).map((b, idx) => (
                      <li key={idx} className="text-sm text-green-700 flex gap-2">
                        <Check className="h-4 w-4 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTemplate === "recipe" && postData.ingredients.filter(Boolean).length > 0 && (
                <div className="space-y-3">
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-orange-800 mb-2">Ingredients:</p>
                    <ul className="space-y-1">
                      {postData.ingredients.filter(Boolean).map((i, idx) => (
                        <li key={idx} className="text-sm">&#8226; {i}</li>
                      ))}
                    </ul>
                  </div>
                  {postData.steps.filter(Boolean).length > 0 && (
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-orange-800 mb-2">Steps:</p>
                      <ol className="space-y-1">
                        {postData.steps.filter(Boolean).map((s, idx) => (
                          <li key={idx} className="text-sm">{idx + 1}. {s}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {selectedTemplate === "comparison" && postData.itemAName && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-700">{postData.itemAName}</p>
                    <ul className="mt-2 space-y-1">
                      {postData.itemAPoints.filter(Boolean).map((p, idx) => (
                        <li key={idx} className="text-xs text-green-600">+ {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-700">{postData.itemBName}</p>
                    <ul className="mt-2 space-y-1">
                      {postData.itemBPoints.filter(Boolean).map((p, idx) => (
                        <li key={idx} className="text-xs text-red-600">- {p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {postData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {postData.tags.map((tag) => (
                    <span key={tag} className="text-xs text-primary">#{tag}</span>
                  ))}
                </div>
              )}
            </CardContent>

            {/* Submit */}
            <div className="border-t p-4 bg-muted/30 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Your post will be reviewed by an admin before publishing
              </p>
              <Button className="gap-1.5">
                <Send className="h-4 w-4" />
                Submit for Review
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
