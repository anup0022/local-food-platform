"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import {
  Heart, MessageCircle, Share2, Bookmark, ArrowLeft, Play, MapPin, Clock,
  ChefHat, FlaskConical, Scale, CheckCircle2, XCircle, Leaf, Send, Calendar,
  IndianRupee, Timer, Utensils, TrendingUp, Download, ShieldCheck, AlertCircle,
  Eye, ThumbsUp, Phone, Star, Navigation, Store, Copy, Globe, MessageSquare,
  X, ChevronLeft, ChevronRight, Maximize2, Quote, Lightbulb, Users, FileText,
  BarChart3, Award, Zap, Camera, PlayCircle,
} from "lucide-react";
import {
  mockPosts, mockPostComments,
  type MockPost, type MockComment, type GalleryImage, type Testimonial, type RecipeStep,
} from "@/lib/mock-data";

/* ================================================================== */
/*  LIGHTBOX                                                           */
/* ================================================================== */
function Lightbox({ images, index, onClose, onNav }: {
  images: GalleryImage[]; index: number;
  onClose: () => void; onNav: (i: number) => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(Math.min(index + 1, images.length - 1));
      if (e.key === "ArrowLeft") onNav(Math.max(index - 1, 0));
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [index, images.length, onClose, onNav]);

  const img = images[index];
  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><X className="h-5 w-5" /></button>
      {index > 0 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(index - 1); }} className="absolute left-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><ChevronLeft className="h-6 w-6" /></button>
      )}
      {index < images.length - 1 && (
        <button onClick={(e) => { e.stopPropagation(); onNav(index + 1); }} className="absolute right-4 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"><ChevronRight className="h-6 w-6" /></button>
      )}
      <div className="max-w-5xl max-h-[85vh] px-16" onClick={(e) => e.stopPropagation()}>
        <img src={img.url} alt={img.caption || ""} className="max-w-full max-h-[75vh] object-contain rounded-lg" />
        {(img.caption || img.credit) && (
          <div className="text-center mt-4">
            {img.caption && <p className="text-white text-sm">{img.caption}</p>}
            {img.credit && <p className="text-white/50 text-xs mt-1">{img.credit}</p>}
          </div>
        )}
        <p className="text-white/40 text-xs text-center mt-2">{index + 1} / {images.length}</p>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SHARE MODAL                                                        */
/* ================================================================== */
function ShareModal({ open, onClose }: { open: boolean; onClose: () => void; title: string }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-semibold text-lg mb-4">Share this post</h3>
        <div className="grid grid-cols-4 gap-4 mb-5">
          {[{ icon: Globe, label: "Twitter", bg: "bg-blue-500" }, { icon: MessageSquare, label: "Facebook", bg: "bg-blue-700" }, { icon: Send, label: "WhatsApp", bg: "bg-green-600" }, { icon: Copy, label: "Copy", bg: "bg-muted" }].map(({ icon: Icon, label, bg }) => (
            <button key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl hover:bg-muted transition-colors">
              <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", bg)}><Icon className={cn("h-5 w-5", bg === "bg-muted" ? "" : "text-white")} /></div>
              <span className="text-[10px]">{label}</span>
            </button>
          ))}
        </div>
        <Button variant="outline" className="w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  HERO SECTION — full-bleed, dramatic                                */
/* ================================================================== */
function HeroSection({ post }: { post: MockPost }) {
  const heroUrl = post.media?.[0]?.url;
  const templateGradients: Record<string, string> = {
    "food-benefit": "from-emerald-950/90 via-emerald-950/60 to-transparent",
    "lab-report": "from-blue-950/90 via-blue-950/60 to-transparent",
    recipe: "from-orange-950/90 via-orange-950/60 to-transparent",
    "where-to-find": "from-purple-950/90 via-purple-950/60 to-transparent",
    comparison: "from-amber-950/90 via-amber-950/60 to-transparent",
    "video-story": "from-red-950/90 via-red-950/60 to-transparent",
    custom: "from-gray-950/90 via-gray-950/60 to-transparent",
  };

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {heroUrl ? (
        <img src={heroUrl} alt={post.title} className="absolute inset-0 w-full h-full object-cover scale-105" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-emerald-700" />
      )}
      {/* Gradient overlays */}
      <div className={cn("absolute inset-0 bg-gradient-to-t", templateGradients[post.template])} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-20">
        <div className="max-w-5xl">
          <Badge className="mb-4 bg-white/15 backdrop-blur-xl text-white border-white/20 px-4 py-1.5 text-xs tracking-wide uppercase">
            {post.template.replace("-", " ")}
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4 max-w-4xl tracking-tight">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-6 leading-relaxed">{post.subtitle}</p>
          )}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 ring-2 ring-white/30">
                <AvatarImage src={post.author.image} />
                <AvatarFallback className="bg-white/20 text-white">{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{post.author.name}</span>
                  {post.author.role === "ADMIN" && <Badge className="bg-amber-500/80 text-white border-0 text-[10px]">Official</Badge>}
                </div>
                <span className="text-white/50 text-sm">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" />{(post.likes * 3).toLocaleString()} views</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{Math.ceil(post.content.length / 200)} min</span>
              <span className="flex items-center gap-1.5"><Heart className="h-4 w-4" />{post.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-white/60 animate-[scroll_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  QUICK NAV BAR — sticky section jump bar                            */
/* ================================================================== */
function QuickNav({ sections }: { sections: { id: string; label: string; icon: React.ReactNode }[] }) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [sections]);

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b">
      <div className="max-w-6xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1 py-2 min-w-max">
          {sections.map(({ id, label, icon }) => (
            <a key={id} href={`#${id}`}
              className={cn("flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                active === id ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-muted"
              )}>
              {icon}<span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  INTRO — 2-col: text left, key facts right                         */
/* ================================================================== */
function IntroSection({ post }: { post: MockPost }) {
  return (
    <section id="overview" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left col — article text */}
        <div className="lg:col-span-3">
          <p className="text-xl leading-relaxed text-foreground/85 first-letter:text-6xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1">
            {post.content}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/explore?tag=${tag}`}>
                <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">#{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>
        {/* Right col — quick fact cards */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">Quick Facts</h3>
          {[
            { icon: <Leaf className="h-5 w-5 text-green-600" />, label: "Scientific Name", value: "Garcinia indica" },
            { icon: <MapPin className="h-5 w-5 text-purple-600" />, label: "Native Region", value: "Western Ghats, India" },
            { icon: <Calendar className="h-5 w-5 text-blue-600" />, label: "Season", value: "April — June" },
            { icon: <IndianRupee className="h-5 w-5 text-amber-600" />, label: "Market Price", value: "Rs 200-350/kg" },
            { icon: <Award className="h-5 w-5 text-red-600" />, label: "Key Compound", value: "Garcinol (Unique!)" },
            { icon: <Zap className="h-5 w-5 text-orange-600" />, label: "Calories", value: "Only 60/100g" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 border hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center shadow-sm">{f.icon}</div>
              <div><p className="text-xs text-muted-foreground">{f.label}</p><p className="font-bold text-sm">{f.value}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  GALLERY — masonry grid with lightbox                               */
/* ================================================================== */
function GallerySection({ gallery }: { gallery?: GalleryImage[] }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  if (!gallery || gallery.length === 0) return null;

  return (
    <section id="gallery" className="bg-muted/30 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-pink-100 flex items-center justify-center"><Camera className="h-5 w-5 text-pink-600" /></div>
          <div><h2 className="text-2xl font-black">Photo Gallery</h2><p className="text-sm text-muted-foreground">Click any image to view full size</p></div>
        </div>
        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {gallery.map((img, idx) => (
            <button key={idx} onClick={() => setLightboxIdx(idx)}
              className={cn("relative group overflow-hidden rounded-xl cursor-pointer",
                idx === 0 ? "col-span-2 row-span-2" : "", idx === 3 ? "col-span-2" : ""
              )}>
              <img src={img.url} alt={img.caption || ""} loading="lazy" decoding="async"
                className={cn("w-full object-cover transition-transform duration-500 group-hover:scale-110",
                idx === 0 ? "h-80 sm:h-full" : "h-40 sm:h-48")} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium">{img.caption}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      {lightboxIdx !== null && (
        <Lightbox images={gallery} index={lightboxIdx} onClose={() => setLightboxIdx(null)} onNav={setLightboxIdx} />
      )}
    </section>
  );
}

/* ================================================================== */
/*  BENEFITS — 2-col: image left, benefits list right                  */
/* ================================================================== */
function BenefitsSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  if (!data?.benefits) return null;
  const half = Math.ceil(data.benefits.length / 2);

  return (
    <section id="benefits" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-600" /></div>
          <div><h2 className="text-2xl font-black">Health Benefits</h2><p className="text-sm text-muted-foreground">Backed by Ayurveda & modern science</p></div>
        </div>
        {/* 2-column layout: image + benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — stacked image card */}
          <div className="relative">
            <div className="sticky top-24 space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src={post.media?.[0]?.url || ""} alt={post.title} loading="lazy" decoding="async" className="w-full h-72 object-cover" />
              </div>
              {data.source && (
                <blockquote className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                  <Quote className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-800 italic leading-relaxed">{data.source}</p>
                </blockquote>
              )}
            </div>
          </div>
          {/* Right — benefits in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.benefits.map((b, i) => (
              <div key={i} className={cn("group p-5 rounded-xl border-2 transition-all hover:shadow-lg hover:-translate-y-1",
                i < 4 ? "border-green-200 bg-green-50/50 hover:border-green-400" : "border-emerald-200 bg-emerald-50/50 hover:border-emerald-400"
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-black",
                    i < 4 ? "bg-green-600" : "bg-emerald-600")}>{i + 1}</span>
                </div>
                <p className="text-sm leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  NUTRITION — horizontal animated bars                               */
/* ================================================================== */
function NutritionSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  if (!data?.nutritionFacts) return null;
  const colors = ["bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500"];

  return (
    <section className="bg-gradient-to-br from-emerald-950 to-green-900 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center"><BarChart3 className="h-5 w-5 text-emerald-300" /></div>
          <div><h2 className="text-2xl font-black">Nutrition Breakdown</h2><p className="text-sm text-white/50">Per 100g serving</p></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
          {data.nutritionFacts.map((f, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-semibold">{f.label}</span>
                <span className="text-lg font-black">{f.value}</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000 ease-out", colors[i % colors.length])}
                  style={{ width: `${f.percent || 50}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  LAB REPORT — interactive visual bars + lab photos slider           */
/* ================================================================== */
function LabReportSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  if (!data?.labName && !data?.findings) return null;
  const [imgIdx, setImgIdx] = useState(0);
  const imgs = data?.labImages || [];

  return (
    <section id="lab-report" className="py-16 bg-gradient-to-b from-blue-50/50 to-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center"><FlaskConical className="h-5 w-5 text-blue-600" /></div>
          <div><h2 className="text-2xl font-black">Lab Analysis Report</h2><p className="text-sm text-muted-foreground">Scientific data you can trust</p></div>
        </div>

        {/* 2-col: lab info + image slider */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center"><FlaskConical className="h-7 w-7" /></div>
                <div>
                  <p className="font-black text-xl">{data.labName}</p>
                  <p className="text-white/70 flex items-center gap-1.5 text-sm"><Calendar className="h-4 w-4" />Tested: {data.testDate}</p>
                </div>
              </div>
              <Separator className="bg-white/20 my-4" />
              <div className="flex flex-wrap gap-3">
                {data.pdfUrl && (
                  <>
                    <Button className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline"><Download className="h-4 w-4" />Download PDF</Button>
                    <Button className="gap-2 bg-white/20 hover:bg-white/30 text-white border-white/30" variant="outline"><Eye className="h-4 w-4" />View Online</Button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Lab images slider */}
          {imgs.length > 0 && (
            <div className="lg:col-span-2 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl h-full min-h-[220px]">
                <img src={imgs[imgIdx]} alt="Lab analysis" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imgs.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={cn("h-2 rounded-full transition-all", i === imgIdx ? "w-6 bg-white" : "w-2 bg-white/50")} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Findings — visual comparison bars */}
        {data.findings && (
          <div className="space-y-5">
            <h3 className="text-lg font-bold flex items-center gap-2"><TrendingUp className="h-5 w-5 text-blue-600" />Key Findings — Visual Comparison</h3>
            {data.findings.map((f, i) => {
              const localNum = f.localNum || 50;
              const commNum = f.commercialNum || 50;
              const maxVal = Math.max(localNum, commNum, 1);
              return (
                <div key={i} className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm">{f.label}</span>
                    {f.unit && <span className="text-xs text-muted-foreground">{f.unit}</span>}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs w-20 text-right font-medium text-green-700 shrink-0">Kokum</span>
                      <div className="flex-1 h-7 bg-green-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: `${Math.max((localNum / maxVal) * 100, 8)}%` }}>
                          <span className="text-[10px] font-bold text-white">{f.localValue}</span>
                        </div>
                      </div>
                      {f.winner === "local" && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs w-20 text-right font-medium text-red-600 shrink-0">Other</span>
                      <div className="flex-1 h-7 bg-red-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-400 to-orange-400 rounded-full flex items-center justify-end pr-3 transition-all duration-1000"
                          style={{ width: `${Math.max((commNum / maxVal) * 100, 8)}%` }}>
                          <span className="text-[10px] font-bold text-white">{f.commercialValue}</span>
                        </div>
                      </div>
                      {f.winner === "commercial" && <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Verdict */}
        {data.verdict && (
          <div className="mt-10 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4"><Scale className="h-6 w-6 text-green-700" /><h3 className="font-black text-lg text-green-800">Verdict</h3></div>
            <p className="text-green-900 leading-relaxed text-lg">{data.verdict}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  RECIPE — hero video + side-by-side steps with images               */
/* ================================================================== */
function RecipeSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  if (!data?.ingredients && !data?.steps) return null;
  const steps = data.steps || [];

  return (
    <section id="recipe" className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center"><ChefHat className="h-5 w-5 text-orange-600" /></div>
          <div><h2 className="text-2xl font-black">Sol Kadhi Recipe</h2><p className="text-sm text-muted-foreground">Traditional Goan kokum-coconut drink</p></div>
        </div>

        {/* Recipe video embed */}
        {data.recipeVideoId && (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 aspect-video bg-black">
            <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${data.recipeVideoId}?rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}

        {/* Meta cards — 4-col */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { icon: <Timer className="h-6 w-6 text-orange-500" />, label: "Prep", value: data.prepTime, bg: "bg-orange-50 border-orange-200" },
            { icon: <Clock className="h-6 w-6 text-red-500" />, label: "Cook", value: data.cookTime, bg: "bg-red-50 border-red-200" },
            { icon: <Utensils className="h-6 w-6 text-blue-500" />, label: "Serves", value: data.servings, bg: "bg-blue-50 border-blue-200" },
            { icon: <ChefHat className="h-6 w-6 text-purple-500" />, label: "Level", value: data.difficulty, bg: "bg-purple-50 border-purple-200" },
          ].filter(m => m.value).map((m, i) => (
            <div key={i} className={cn("rounded-2xl border-2 p-5 text-center", m.bg)}>
              <div className="mx-auto mb-2 flex justify-center">{m.icon}</div>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-lg font-black">{m.value}</p>
            </div>
          ))}
        </div>

        {/* 2-col: ingredients left, steps right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Ingredients */}
          {data.ingredients && (
            <div>
              <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <Leaf className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-bold">Ingredients</h3>
                </div>
                <div className="bg-card border-2 rounded-2xl p-6 shadow-sm">
                  <ul className="space-y-3">
                    {data.ingredients.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <span className="h-5 w-5 mt-0.5 rounded border-2 border-primary/40 shrink-0 flex items-center justify-center hover:bg-primary hover:border-primary cursor-pointer transition-colors">
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Steps — each with image */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2 mb-2">
              <PlayCircle className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-bold">Step by Step</h3>
            </div>
            {steps.map((step, idx) => {
              const s = typeof step === "string" ? { text: step } : step;
              return (
                <div key={idx} className="group">
                  <div className={cn("grid gap-5", s.image ? "grid-cols-1 sm:grid-cols-5" : "grid-cols-1")}>
                    {/* Image */}
                    {s.image && (
                      <div className="sm:col-span-2">
                        <img src={s.image} alt={`Step ${idx + 1}`} loading="lazy" decoding="async"
                          className="w-full h-48 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow" />
                      </div>
                    )}
                    {/* Text */}
                    <div className={s.image ? "sm:col-span-3" : ""}>
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white font-black shadow-lg">{idx + 1}</span>
                        <div className="pt-1.5">
                          <p className="text-sm leading-relaxed">{s.text}</p>
                          {s.tip && (
                            <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                              <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                              <p className="text-xs text-amber-800 font-medium">{s.tip}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {idx < steps.length - 1 && <Separator className="mt-8" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  TESTIMONIALS — horizontal card slider                              */
/* ================================================================== */
function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  if (!testimonials || testimonials.length === 0) return null;

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center"><Users className="h-5 w-5 text-amber-600" /></div>
            <div><h2 className="text-2xl font-black">People&apos;s Stories</h2><p className="text-sm text-muted-foreground">Real voices from kokum country</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} className="h-10 w-10 rounded-full border-2 hover:bg-background flex items-center justify-center transition-colors"><ChevronLeft className="h-5 w-5" /></button>
            <button onClick={() => scroll(1)} className="h-10 w-10 rounded-full border-2 hover:bg-background flex items-center justify-center transition-colors"><ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
        {/* Horizontal scrolling cards */}
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none -mx-4 px-4">
          {testimonials.map((t, i) => (
            <div key={i} className="snap-start shrink-0 w-[340px] bg-card border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              {/* Video or image */}
              {t.youtubeId ? (
                <div className="relative aspect-video bg-black">
                  {playingIdx === i ? (
                    <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${t.youtubeId}?autoplay=1&rel=0`}
                      allow="autoplay; encrypted-media" allowFullScreen />
                  ) : (
                    <button onClick={() => setPlayingIdx(i)} className="w-full h-full relative group">
                      <img src={`https://img.youtube.com/vi/${t.youtubeId}/hqdefault.jpg`} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-all">
                        <div className="h-14 w-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              ) : t.image ? (
                <div className="h-32 bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                  <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg"><AvatarImage src={t.image} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                </div>
              ) : null}
              {/* Quote */}
              <div className="p-5">
                <Quote className="h-6 w-6 text-amber-300 mb-2" />
                <p className="text-sm leading-relaxed mb-4 line-clamp-4">{t.quote}</p>
                <div className="flex items-center gap-3 pt-3 border-t">
                  <Avatar className="h-8 w-8"><AvatarImage src={t.image} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                  <div><p className="text-sm font-bold">{t.name}</p><p className="text-xs text-muted-foreground">{t.location}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  COMPARISON                                                         */
/* ================================================================== */
function ComparisonSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  if (!data?.itemA || !data?.itemB) return null;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-center gap-3 mb-8"><div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center"><Scale className="h-5 w-5 text-amber-600" /></div><h2 className="text-2xl font-black">Comparison</h2></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border-2 border-green-300 rounded-2xl overflow-hidden"><div className="bg-green-600 text-white p-5 flex items-center gap-2"><CheckCircle2 className="h-5 w-5" /><h3 className="font-black text-lg">{data.itemA.name}</h3></div><ul className="p-5 space-y-3">{data.itemA.points.map((p, i) => (<li key={i} className="flex items-start gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-xs font-bold">+</span><span>{p}</span></li>))}</ul></div>
        <div className="border-2 border-red-300 rounded-2xl overflow-hidden"><div className="bg-red-500 text-white p-5 flex items-center gap-2"><XCircle className="h-5 w-5" /><h3 className="font-black text-lg">{data.itemB.name}</h3></div><ul className="p-5 space-y-3">{data.itemB.points.map((p, i) => (<li key={i} className="flex items-start gap-3 text-sm"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold">-</span><span>{p}</span></li>))}</ul></div>
      </div>
      {data.comparisonVerdict && (<div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6"><Scale className="h-5 w-5 text-amber-700 mb-2" /><p className="text-amber-900 leading-relaxed">{data.comparisonVerdict}</p></div>)}
    </section>
  );
}

/* ================================================================== */
/*  NEARBY STORES — map + 3-col cards                                  */
/* ================================================================== */
function NearbyStoresSection({ post }: { post: MockPost }) {
  const data = post.templateData;
  const stores = data?.nearbyStores;
  const loc = data?.location;
  if (!stores && !loc) return null;

  return (
    <section id="where-to-buy" className="bg-gradient-to-b from-purple-50/50 to-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center"><Store className="h-5 w-5 text-purple-600" /></div>
          <div><h2 className="text-2xl font-black">Where to Buy</h2><p className="text-sm text-muted-foreground">Find fresh kokum near you</p></div>
        </div>

        {/* Map + info — 2-col */}
        {loc && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border-2 shadow-lg">
              <iframe width="100%" height="350" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"}&q=${encodeURIComponent(loc.name + " " + loc.address)}&center=${loc.lat},${loc.lng}&zoom=12`}
                allowFullScreen />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border-2 border-purple-200 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-6 w-6 text-purple-600 shrink-0" />
                  <div><h3 className="font-bold text-lg">{loc.name}</h3><p className="text-sm text-muted-foreground">{loc.address}</p></div>
                </div>
                <Link href="/map" className="text-sm text-primary font-medium hover:underline flex items-center gap-1"><Navigation className="h-4 w-4" />Get Directions</Link>
              </div>
              {/* Price / availability / season */}
              {[
                { icon: <IndianRupee className="h-5 w-5 text-green-600" />, label: "Price", value: data?.price },
                { icon: <Calendar className="h-5 w-5 text-blue-600" />, label: "Available", value: data?.availability },
                { icon: <Leaf className="h-5 w-5 text-orange-600" />, label: "Season", value: data?.season },
              ].filter(x => x.value).map((x, i) => (
                <div key={i} className="bg-card border rounded-xl p-4 flex items-center gap-3">
                  {x.icon}<div><p className="text-xs text-muted-foreground">{x.label}</p><p className="font-semibold text-sm">{x.value}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store cards — 3-col grid */}
        {stores && stores.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stores.map((store) => (
              <div key={store.id} className={cn("bg-card border-2 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all", !store.available && "opacity-50")}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><Store className="h-5 w-5 text-primary" /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{store.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{store.address}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Navigation className="h-3 w-3" />{store.distance}</span>
                    <span className="text-xs text-amber-600 flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-500 text-amber-500" />{store.rating}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {store.available ? <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">In Stock</Badge> : <Badge variant="secondary" className="text-[10px]">Out</Badge>}
                  </div>
                </div>
                {store.phone && (
                  <div className="mt-3 pt-3 border-t flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs"><Phone className="h-3.5 w-3.5" />Call</Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs"><Navigation className="h-3.5 w-3.5" />Directions</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  COMMENTS PANEL                                                     */
/* ================================================================== */
function CommentsPanel({ open, onClose, comments, onSubmit }: {
  open: boolean; onClose: () => void; comments: MockComment[]; onSubmit: (t: string) => void;
}) {
  const [text, setText] = useState("");
  const approved = comments.filter(c => c.status === "approved");
  const pending = comments.filter(c => c.status === "pending");

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) { window.addEventListener("keydown", h); document.body.style.overflow = "hidden"; }
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <>
      <div className={cn("fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100" : "opacity-0 pointer-events-none")} onClick={onClose} />
      <div className={cn("fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl shadow-2xl transition-transform duration-400 ease-out flex flex-col", open ? "translate-y-0" : "translate-y-full")} style={{ maxHeight: "85vh" }}>
        <div className="sticky top-0 bg-card rounded-t-3xl z-10 border-b">
          <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-muted-foreground/30" /></div>
          <div className="flex items-center justify-between px-6 pb-4 pt-2">
            <div className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-primary" /><h2 className="text-lg font-bold">Comments ({approved.length})</h2></div>
            <button onClick={onClose} className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20"><X className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {pending.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3"><AlertCircle className="h-4 w-4 text-amber-500" /><span className="text-sm font-medium text-amber-700">Awaiting Approval ({pending.length})</span></div>
              {pending.map(c => (
                <div key={c.id} className="flex gap-3 opacity-70 mb-3">
                  <Avatar className="h-9 w-9 shrink-0"><AvatarImage src={c.user.image} /><AvatarFallback>{c.user.name[0]}</AvatarFallback></Avatar>
                  <div className="flex-1"><div className="bg-amber-50 border border-amber-200 rounded-2xl rounded-tl-sm px-4 py-3"><p className="text-sm font-semibold mb-1">{c.user.name} <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-[10px] ml-1">Pending</Badge></p><p className="text-sm">{c.text}</p></div><span className="text-xs text-muted-foreground mt-1 pl-4 block">{c.time}</span></div>
                </div>
              ))}
              <Separator />
            </div>
          )}
          {approved.length > 0 ? approved.map(c => (
            <div key={c.id} className="flex gap-3">
              <Avatar className="h-10 w-10 shrink-0"><AvatarImage src={c.user.image} /><AvatarFallback>{c.user.name[0]}</AvatarFallback></Avatar>
              <div className="flex-1">
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-5 py-4">
                  <p className="text-sm font-semibold mb-1">{c.user.name} <Badge className="bg-green-50 text-green-700 border-green-200 text-[10px] ml-1"><ShieldCheck className="h-3 w-3 mr-0.5 inline" />Verified</Badge></p>
                  <p className="text-sm leading-relaxed">{c.text}</p>
                </div>
                <div className="flex items-center gap-5 mt-2 pl-5">
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                  <button className="text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{c.likes}</button>
                  <button className="text-xs text-muted-foreground hover:text-foreground font-medium">Reply</button>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-10"><MessageCircle className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" /><p className="text-sm text-muted-foreground">No comments yet.</p></div>
          )}
        </div>
        <div className="sticky bottom-0 bg-card border-t px-6 py-4">
          <div className="flex gap-3 items-end">
            <Avatar className="h-9 w-9 shrink-0"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" /><AvatarFallback>U</AvatarFallback></Avatar>
            <div className="flex-1 relative">
              <Textarea placeholder="Write a comment..." value={text} onChange={(e) => setText(e.target.value)}
                className="min-h-[44px] max-h-[120px] resize-none pr-12 py-3"
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); if (text.trim()) { onSubmit(text); setText(""); } } }} />
              <button onClick={() => { if (text.trim()) { onSubmit(text); setText(""); } }} disabled={!text.trim()}
                className={cn("absolute right-3 bottom-3 h-7 w-7 rounded-full flex items-center justify-center transition-all", text.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1 pl-12"><ShieldCheck className="h-3 w-3" />Admin-reviewed before publishing</p>
        </div>
      </div>
    </>
  );
}

/* ================================================================== */
/*  BOTTOM ACTION BAR                                                  */
/* ================================================================== */
function BottomActionBar({ liked, likesCount, bookmarked, commentsCount, shares, onLike, onBookmark, onShare, onComments }: {
  liked: boolean; likesCount: number; bookmarked: boolean; commentsCount: number; shares: number;
  onLike: () => void; onBookmark: () => void; onShare: () => void; onComments: () => void;
}) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-card border-2 rounded-2xl p-6 shadow-sm text-center">
        <p className="text-sm text-muted-foreground mb-5">Did you find this helpful? Let the community know!</p>
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          {[
            { onClick: onLike, active: liked, icon: <Heart className={cn("h-6 w-6", liked && "fill-current")} />, label: likesCount.toLocaleString(), activeClass: "bg-red-50 text-red-500 border-red-200", hoverClass: "hover:bg-red-50 hover:text-red-500 hover:border-red-200" },
            { onClick: onComments, active: false, icon: <MessageCircle className="h-6 w-6" />, label: String(commentsCount), activeClass: "", hoverClass: "hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200" },
            { onClick: onShare, active: false, icon: <Share2 className="h-6 w-6" />, label: String(shares), activeClass: "", hoverClass: "hover:bg-green-50 hover:text-green-600 hover:border-green-200" },
            { onClick: onBookmark, active: bookmarked, icon: <Bookmark className={cn("h-6 w-6", bookmarked && "fill-current")} />, label: "Save", activeClass: "bg-primary/10 text-primary border-primary/20", hoverClass: "hover:bg-primary/10 hover:text-primary hover:border-primary/20" },
          ].map((btn, i) => (
            <button key={i} onClick={btn.onClick}
              className={cn("flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-4 sm:px-6 py-3 rounded-xl transition-all hover:scale-105 active:scale-95 border border-transparent",
                btn.active ? btn.activeClass : cn("bg-muted/50 text-muted-foreground", btn.hoverClass)
              )}>
              {btn.icon}<span className="text-sm font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  RELATED POSTS                                                      */
/* ================================================================== */
function RelatedPosts({ currentId }: { currentId: string }) {
  const related = mockPosts.filter(p => p.id !== currentId && p.status === "APPROVED").slice(0, 4);

  const templateColor: Record<string, string> = {
    "food-benefit": "from-emerald-600 to-green-500",
    "lab-report": "from-blue-600 to-cyan-500",
    recipe: "from-orange-600 to-red-500",
    "where-to-find": "from-purple-600 to-pink-500",
    comparison: "from-amber-600 to-yellow-500",
    "video-story": "from-red-600 to-rose-500",
    custom: "from-gray-600 to-slate-500",
  };

  return (
    <section className="bg-muted/30 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-black mb-8">More to Explore</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {related.map(rp => (
            <Link key={rp.id} href={`/post/${rp.id}`} className="group">
              <div className="rounded-xl overflow-hidden border bg-card hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col">
                {/* Fixed-height image container — never collapses */}
                <div className={cn("relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br", templateColor[rp.template] || "from-gray-400 to-gray-600")}>
                  {rp.media?.[0] ? (
                    <img
                      src={rp.media[0].thumbnail || rp.media[0].url}
                      alt={rp.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : null}
                  {/* Fallback overlay always present behind image */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                    <p className="text-white/80 text-xs font-semibold text-center line-clamp-3 drop-shadow-md">{rp.title}</p>
                  </div>
                  {/* Template badge */}
                  <Badge className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white border-0 text-[10px] z-10">
                    {rp.template.replace("-", " ")}
                  </Badge>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-bold line-clamp-2 mb-1.5">{rp.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span>{rp.author.name}</span>
                    <span>|</span>
                    <span className="flex items-center gap-0.5"><Heart className="h-3 w-3" />{rp.likes}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  VIDEO SECTION (for video posts)                                    */
/* ================================================================== */
function VideoSection({ post }: { post: MockPost }) {
  if (post.type !== "video" || !post.media?.[0]) return null;
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="relative rounded-2xl overflow-hidden bg-black shadow-2xl">
        <video className="w-full aspect-video" poster={post.media[0].thumbnail} controls playsInline>
          <source src={post.media[0].url} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  MAIN PAGE                                                          */
/* ================================================================== */
export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const post = mockPosts.find(p => p.id === postId);
  const comments = mockPostComments[postId] || [];

  const [liked, setLiked] = useState(post?.liked || false);
  const [likesCount, setLikesCount] = useState(post?.likes || 0);
  const [bookmarked, setBookmarked] = useState(post?.bookmarked || false);
  const [shareOpen, setShareOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Post not found</h2>
          <p className="text-muted-foreground mb-4">This post may have been removed.</p>
          <Link href="/"><Button>Back to Feed</Button></Link>
        </div>
      </div>
    );
  }

  const td = post.templateData;
  const approvedCount = comments.filter(c => c.status === "approved").length;

  // Build section nav dynamically
  const sections: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <FileText className="h-3.5 w-3.5" /> },
  ];
  if (td?.gallery?.length) sections.push({ id: "gallery", label: "Gallery", icon: <Camera className="h-3.5 w-3.5" /> });
  if (td?.benefits) sections.push({ id: "benefits", label: "Benefits", icon: <CheckCircle2 className="h-3.5 w-3.5" /> });
  if (td?.labName || td?.findings) sections.push({ id: "lab-report", label: "Lab Report", icon: <FlaskConical className="h-3.5 w-3.5" /> });
  if (td?.ingredients || td?.steps) sections.push({ id: "recipe", label: "Recipe", icon: <ChefHat className="h-3.5 w-3.5" /> });
  if (td?.testimonials?.length) sections.push({ id: "testimonials", label: "Stories", icon: <Users className="h-3.5 w-3.5" /> });
  if (td?.nearbyStores || td?.location) sections.push({ id: "where-to-buy", label: "Where to Buy", icon: <Store className="h-3.5 w-3.5" /> });

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/"><Button variant="secondary" size="sm" className="gap-1.5 bg-black/30 text-white backdrop-blur-md border-white/20 hover:bg-black/50 shadow-lg"><ArrowLeft className="h-4 w-4" />Back</Button></Link>
      </div>

      {/* Hero */}
      <HeroSection post={post} />

      {/* Sticky section nav */}
      {sections.length > 2 && <QuickNav sections={sections} />}

      {/* Intro — 2-col */}
      <IntroSection post={post} />

      {/* Gallery — full-width masonry */}
      <GallerySection gallery={td?.gallery} />

      {/* Benefits — 2-col with image */}
      <BenefitsSection post={post} />

      {/* Nutrition — dark full-width bar charts */}
      <NutritionSection post={post} />

      {/* Video (for video-type posts) */}
      <VideoSection post={post} />

      {/* Lab Report — 2-col header + visual bars */}
      <LabReportSection post={post} />

      {/* Recipe — video + 3-col with step images */}
      <RecipeSection post={post} />

      {/* Testimonials — horizontal slider */}
      <TestimonialsSection testimonials={td?.testimonials} />

      {/* Comparison */}
      <ComparisonSection post={post} />

      {/* Where to Buy — map + 3-col store cards */}
      <NearbyStoresSection post={post} />

      {/* Bottom Actions */}
      <BottomActionBar
        liked={liked} likesCount={likesCount} bookmarked={bookmarked}
        commentsCount={approvedCount} shares={post.shares}
        onLike={() => { setLiked(!liked); setLikesCount(p => liked ? p - 1 : p + 1); }}
        onBookmark={() => setBookmarked(!bookmarked)}
        onShare={() => setShareOpen(true)}
        onComments={() => setCommentsOpen(true)}
      />

      {/* Related */}
      <RelatedPosts currentId={postId} />

      {/* Overlays */}
      <CommentsPanel open={commentsOpen} onClose={() => setCommentsOpen(false)} comments={comments} onSubmit={t => console.log("Comment:", t)} />
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={post.title} />
    </div>
  );
}
