import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface FeaturedBlogPostProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
}

export const FeaturedBlogPost = React.memo(({ post, onSelectPost }: FeaturedBlogPostProps) => {
  return (
    <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-600 text-white">Featured</Badge>
          </div>
        </div>
        <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {post.location}
            </div>
          </div>
          <Badge variant="outline" className="w-fit mb-4">{post.category}</Badge>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-fit"
            onClick={() => onSelectPost(post)}
          >
            Read Article
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
});

FeaturedBlogPost.displayName = "FeaturedBlogPost";