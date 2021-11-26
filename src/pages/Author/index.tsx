import React from "react";
import { AppContext } from "../../_context/AppProvider";
import { useParams } from "react-router-dom";
import Content from "../../components/Content";
import LayoutBlog from "../../components/LayoutBlog";

const Home = () => {
  const { user } = useParams();
  const { getPosts, posts, isLoadingGetPosts } = React.useContext(AppContext);

  const [oneTimeEffect, setOneTimeEffect] = React.useState(true);

  React.useEffect(() => {
    if (oneTimeEffect) {
      getPosts({
        _fields: [
          "title",
          "excerpt",
          "slug",
          "date",
          "author",
          "featured_media",
          "format",
          "content",
        ],
        user: [user || ""],
      });
      setOneTimeEffect(false);
    }
  }, [oneTimeEffect]);
  return (
    <LayoutBlog>
      <div className="row">
        <div className="col-md-12">
          {isLoadingGetPosts
            ? "loading"
            : posts.length === 0
            ? "No Posts Found"
            : posts.map((item, index) => (
                <Content item={item} key={index + 1} />
              ))}
        </div>
      </div>
    </LayoutBlog>
  );
};

export default Home;
