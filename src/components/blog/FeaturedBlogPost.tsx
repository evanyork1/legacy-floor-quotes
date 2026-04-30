import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface FeaturedBlogPostProps {
  post: BlogPost;
}

export const FeaturedBlogPost = React.memo(({ post }: FeaturedBlogPostProps) => {
  return (
    <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 group">
      <div className="grid lg:grid-cols-2 gap-0">
        <Link to={`/blog/${post.slug}`} className="relative overflow-hidden block">
          <img
            src={post.featuredImage || post.image}
            alt={post.title}
            className="w-full h-48 sm:h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <Badge className="bg-blue-600 text-white text-xs sm:text-sm">Featured</Badge>
          </div>
        </Link>
        <CardContent className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <time dateTime={post.publishedDate}>{post.date}</time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                {post.readTime}
              </div>
            )}
            {post.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                {post.location}
              </div>
            )}
          </div>
          <Badge variant="outline" className="w-fit mb-4 text-xs sm:text-sm">{post.category}</Badge>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            <Link to={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
              {post.title}
            </Link>
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-fit"
          >
            <Link to={`/blog/${post.slug}`}>
              Read Article
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  );
});

FeaturedBlogPost.displayName = "FeaturedBlogPost";
