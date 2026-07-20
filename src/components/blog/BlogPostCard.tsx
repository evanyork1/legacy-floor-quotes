import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogPostCardProps {
  post: BlogPost;
}

export const BlogPostCard = React.memo(({ post }: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={post.featuredImage || post.image}
            alt={post.title}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge variant="outline" className="bg-white/90 text-xs sm:text-sm">{post.category}</Badge>
          </div>
        </div>
      </Link>
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.publishedDate}>{post.date}</time>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          )}
          {post.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {post.location}
            </div>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <Button
          asChild
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full"
        >
          <Link to={`/blog/${post.slug}`}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
});

BlogPostCard.displayName = "BlogPostCard";
