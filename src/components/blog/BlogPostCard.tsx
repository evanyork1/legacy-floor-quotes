import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogPostCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
}

export const BlogPostCard = React.memo(({ post, onSelectPost }: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <Badge variant="outline" className="bg-white/90 text-xs sm:text-sm">{post.category}</Badge>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="hidden sm:inline">{post.date}</span>
            <span className="sm:hidden">{post.date.split(',')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {post.location}
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap gap-1 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full"
          onClick={() => onSelectPost(post)}
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
});

BlogPostCard.displayName = "BlogPostCard";