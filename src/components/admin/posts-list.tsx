"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Clock,
  Trash2,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  status: string;
  rejectionReason: string | null;
  createdAt: string | Date;
  author: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  category: { id: string; name: string } | null;
}

export function AdminPostsList({ posts: initialPosts }: { posts: Post[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.author.name?.toLowerCase().includes(search.toLowerCase()) ||
      post.author.email.toLowerCase().includes(search.toLowerCase())
  );

  const pendingPosts = filteredPosts.filter((p) => p.status === "PENDING");
  const approvedPosts = filteredPosts.filter((p) => p.status === "APPROVED");
  const rejectedPosts = filteredPosts.filter((p) => p.status === "REJECTED");

  const handleApprove = async (postId: string) => {
    setLoading(true);
    const res = await fetch(`/api/posts/${postId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve" }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, status: "APPROVED" } : p))
      );
    }
    setLoading(false);
  };

  const handleReject = async () => {
    if (!selectedPost) return;
    setLoading(true);

    const res = await fetch(`/api/posts/${selectedPost.id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reject", reason: rejectReason }),
    });

    if (res.ok) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? { ...p, status: "REJECTED", rejectionReason: rejectReason }
            : p
        )
      );
      setRejectDialogOpen(false);
      setRejectReason("");
      setSelectedPost(null);
    }
    setLoading(false);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "APPROVED":
        return (
          <Badge variant="outline" className="text-green-600 border-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge variant="outline" className="text-red-600 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
    }
  };

  const PostRow = ({ post }: { post: Post }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.author.image || ""} />
          <AvatarFallback>
            {post.author.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="font-medium truncate">{post.title}</p>
          <p className="text-xs text-muted-foreground">
            {post.author.name} &middot;{" "}
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        {post.category && (
          <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
            {post.category.name}
          </Badge>
        )}
        {getStatusBadge(post.status)}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post);
              setPreviewOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {post.status === "PENDING" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleApprove(post.id)}
                disabled={loading}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => {
                  setSelectedPost(post);
                  setRejectDialogOpen(true);
                }}
                disabled={loading}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={() => handleDelete(post.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts by title or author..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-1">
            Pending
            <Badge variant="secondary" className="text-xs ml-1">
              {pendingPosts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved
            <Badge variant="secondary" className="text-xs ml-1">
              {approvedPosts.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            <Badge variant="secondary" className="text-xs ml-1">
              {rejectedPosts.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-2 mt-4">
          {pendingPosts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pending posts to review
              </CardContent>
            </Card>
          ) : (
            pendingPosts.map((post) => <PostRow key={post.id} post={post} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-2 mt-4">
          {approvedPosts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No approved posts
              </CardContent>
            </Card>
          ) : (
            approvedPosts.map((post) => <PostRow key={post.id} post={post} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-2 mt-4">
          {rejectedPosts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No rejected posts
              </CardContent>
            </Card>
          ) : (
            rejectedPosts.map((post) => <PostRow key={post.id} post={post} />)
          )}
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              By {selectedPost?.author.name} &middot;{" "}
              {selectedPost &&
                formatDistanceToNow(new Date(selectedPost.createdAt), {
                  addSuffix: true,
                })}
            </DialogDescription>
          </DialogHeader>
          <div
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{
              __html: selectedPost?.content || "",
            }}
          />
          {selectedPost?.status === "PENDING" && (
            <DialogFooter>
              <Button
                variant="outline"
                className="text-red-600"
                onClick={() => {
                  setPreviewOpen(false);
                  setRejectDialogOpen(true);
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  handleApprove(selectedPost.id);
                  setPreviewOpen(false);
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Post</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting &quot;{selectedPost?.title}&quot;
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection (will be shown to the author)..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={loading}
            >
              {loading ? "Rejecting..." : "Reject Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
