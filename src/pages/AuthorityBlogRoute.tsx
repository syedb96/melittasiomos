import { useParams } from "react-router-dom";
import AuthorityBlogPost from "@/components/AuthorityBlogPost";
import { AUTHORITY_POSTS } from "@/data/authority-posts";
import NotFound from "./NotFound";

const AuthorityBlogRoute = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = AUTHORITY_POSTS[slug];
  if (!post) return <NotFound />;
  return <AuthorityBlogPost {...post} />;
};

export default AuthorityBlogRoute;
