"use client";
import { AnimatePresence, motion } from "framer-motion";
import { getAllPosts } from "@/lib/api";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import PostCard from "./PostCard";
import Pagination from "../admin/blog/allPosts/Pagination";

interface Post {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: string;
  id: string;
}

interface ApiResponse {
  data: {
    posts: Post[];
    total: number;
  };
}

export default function BlogContent() {
  const [posts, setPublishedPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));

  const fetchPublishedPosts = async (page: number) => {
    setIsFetchingPosts(true);
    try {
      const { data }: { data: ApiResponse } = await getAllPosts(
        page,
        postsPerPage
      );
      if (data) {
        setPublishedPosts(data.data.posts);

        if (page === 1) {
          setTotalPosts(data.data.total);
        }
      }
    } catch (e) {
      console.log("Error fetching published posts:", e);
    } finally {
      setIsFetchingPosts(false);
    }
  };

  useEffect(() => {
    fetchPublishedPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isFetchingPosts) {
    return (
      <div className="container mx-auto h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white md:pt-[100px] pt-9">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-[82.83px] uppercase text-[38px] md:font-semibold font-bold md:mb-[30px] mb-7 leading-[115%] md:tracking-[-3px] tracking-[-0.5px]"
        >
          Blog
        </motion.h1>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AnimatePresence mode="wait">
            {posts.map((post, index) => (
              <PostCard post={post} key={post.id} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
