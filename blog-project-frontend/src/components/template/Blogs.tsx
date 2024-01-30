import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { getBlogsApi } from "../../api/blogs";
import { IBlog } from "../../type/types";
import styled from "styled-components";
import { getCommentsForBlogApi } from "../../api/comment";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

interface IProps {
  isFav?: boolean;
}

const Blogs: React.FC<IProps> = ({ isFav }) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [blogsWithCommentsIds, setBlogsWithCommentsIds] = useState<string[]>(
    [],
  );

  const navigate = useNavigate();

  const onClickNav = () => {
    navigate(isFav ? "/" : "/favorite-blogs");
  };

  const onReadMore = async (blogId: string) => {
    if (blogsWithCommentsIds.includes(blogId)) {
      setBlogsWithCommentsIds((prev) => prev.filter((id) => id !== blogId));
    } else {
      const blog = blogs.find((blog) => blog.id === blogId);
      if (!blog?.comments) {
        const { data } = await getCommentsForBlogApi(blogId);
        const updatedBLogs = blogs.map((myBlog) =>
          myBlog.id === blogId ? { ...myBlog, comments: data } : myBlog,
        );
        setBlogs(updatedBLogs);
        sessionStorage.setItem("blogs", JSON.stringify(updatedBLogs));
      }
      setBlogsWithCommentsIds((prev) => [...prev, blogId]);
    }
  };

  const isBlogsWitComments = (blogId: string) => {
    return blogsWithCommentsIds.includes(blogId);
  };

  const onClickFavorite = (blogId: string) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === blogId ? { ...blog, isFavorite: !blog.isFavorite } : blog,
    );
    sessionStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const myData = sessionStorage.getItem("blogs");
        if (myData) {
          const parsedData = JSON.parse(myData);
          if (parsedData?.length) {
            setBlogs(parsedData);
            return;
          }
        }

        const { data } = await getBlogsApi();
        sessionStorage.setItem("blogs", JSON.stringify(data));
        setBlogs(data);
      } catch (err) {
        //handle err
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div>
        <Button onClick={onClickNav}>{isFav ? "Home" : "Favorites"}</Button>
      </div>
      <MainContainer>
        {blogs.map(
          (blog) =>
            ((isFav && blog.isFavorite) || !isFav) && (
              <Card
                style={{ width: "30rem" }}
                title={
                  <div
                    onClick={() => onClickFavorite(blog.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <p>{blog.title}</p>{" "}
                    <Button
                      type="text"
                      icon={blog.isFavorite ? <StarFilled /> : <StarOutlined />}
                    />
                  </div>
                }
              >
                <BodyContainer>
                  {blog.body}
                  {isBlogsWitComments(blog.id) ? (
                    <div>
                      <h5>Comments</h5>
                      {blog.comments?.map((comment) => (
                        <div key={comment.id}>
                          <h4 style={{ margin: 0 }}>{comment.name}</h4>
                          <p style={{ margin: 0 }}>{comment.email}</p>
                          <p style={{ margin: ".5rem 0 0 1rem" }}>
                            {comment.body}
                          </p>
                          <hr />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="text" onClick={() => onReadMore(blog.id)}>
                      {isBlogsWitComments(blog.id) ? "read less" : "read more"}
                    </Button>
                  </div>
                </BodyContainer>
              </Card>
            ),
        )}
      </MainContainer>
    </div>
  );
};

export default Blogs;
