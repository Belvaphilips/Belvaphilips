"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TabsComponent from "@/components/admin/blog/allPosts/TabsComponent";
import PostCard from "@/components/admin/blog/allPosts/PostCard";
import DeleteModal from "@/components/admin/blog/allPosts/DeleteModal";
import Pagination from "@/components/admin/blog/allPosts/Pagination";
import { getAllPosts, getAllDrafts, deletePost } from "@/lib/api";
import Spinner from "@/components/ui/Spinner";
import Cookies from "universal-cookie";
import setAuthToken from "@/lib/api/setAuthToken";
import { toast } from "react-hot-toast";

interface PostData {
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  status: string;
  id: string;
}

const AllPostsPage: React.FC = () => {
  const [publishedPosts, setPublishedPosts] = useState<PostData[]>([]);
  const [draftPosts, setDraftPosts] = useState<PostData[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "drafts">("posts");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalDrafts, setTotalDrafts] = useState(0);
  const [postToDelete, setPostToDelete] = useState<{
    id: string;
    title: string;
    created_at: string;
  } | null>(null);
  const router = useRouter();
  const cookies = new Cookies();

  const postsPerPage = 10;

  const fetchPublishedPosts = async (page: number) => {
    setIsFetchingPosts(true);
    try {
      const { data } = await getAllPosts(page, postsPerPage);
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

  const fetchDrafts = async (page: number) => {
    setIsFetchingPosts(true);
    const token = cookies.get("admin_token");

    if (token) {
      setAuthToken(token);
    }
    try {
      const { data } = await getAllDrafts(page, postsPerPage);
      if (data) {
        setDraftPosts(data.data.posts);

        if (page === 1) {
          setTotalDrafts(data.data.total);
        }
      }
    } catch (e) {
      console.log("Error fetching drafts:", e);
    } finally {
      setIsFetchingPosts(false);
    }
  };

  useEffect(() => {
    if (activeTab === "posts") {
      fetchPublishedPosts(currentPage);
    } else {
      fetchDrafts(currentPage);
    }
  }, [currentPage]);

  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    setCurrentPage(1);

    if (tab === "posts") {
      fetchPublishedPosts(1);
    } else {
      fetchDrafts(1);
    }
  };

  const getCurrentPosts = () => {
    return activeTab === "posts" ? publishedPosts : draftPosts;
  };

  const getCurrentTotal = () => {
    return activeTab === "posts" ? totalPosts : totalDrafts;
  };

  const currentPosts = getCurrentPosts();
  const totalPages = Math.max(1, Math.ceil(getCurrentTotal() / postsPerPage));

  const displayPosts = currentPosts;

  const handleEdit = (id: string) => {
    router.push(`/admin/blog/post/${id}`);
  };

  const handleDelete = async (
    id: string,
    title: string,
    created_at: string
  ) => {
    setPostToDelete({ id, title, created_at });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);

    try {
      await deletePost(postToDelete.id);

      toast.success("Deleted Successfully", {
        style: {
          border: "1px solid #1D1D1B",
          padding: "16px",
          color: "#1D1D1B",
          borderRadius: "6px",
        },
        iconTheme: {
          primary: "#008000",
          secondary: "#FFFAEE",
        },
      });

      if (activeTab === "posts") {
        fetchPublishedPosts(currentPage);
      } else {
        fetchDrafts(currentPage);
      }

      setPostToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

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
    <div className="container mx-auto py-[140px]  px-4">
      <TabsComponent activeTab={activeTab} setActiveTab={handleTabChange} />

      {currentPosts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          There are no {activeTab === "posts" ? "posts" : "drafts"} available.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
            {displayPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="pb-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {postToDelete && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title={postToDelete.title}
          date={postToDelete.created_at}
          postId={postToDelete.id}
          postType={activeTab === "posts" ? "published" : "draft"}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default AllPostsPage;
