import React from "react";
import { AppContext } from "../../../_context/AppProvider";
import ListComment from "../ListComment";
import LayoutBlog from "../../../components/LayoutBlog";
import Content from "../../../components/Content";

interface Props {
  slug?: string;
}

const BlogPost: React.FC<Props> = ({ slug }) => {
  const { getPosts, posts, isLoadingGetPosts } = React.useContext(AppContext);

  React.useEffect(() => {
    getPosts({
      _field: [
        "title",
        "content",
        "slug",
        "date",
        "author",
        "featured_media",
        "id",
        "type",
        "comment_count",
        "format",
      ],
      slug: [slug || ""],
    });
  }, [slug]);

  return (
    <>
      <LayoutBlog>
        <div className="row">
          {isLoadingGetPosts && <div className="col-md-12">Loading</div>}

          {!isLoadingGetPosts &&
            posts.length > 0 &&
            posts.map((item, index) => (
              <React.Fragment key={index + 1}>
                <div className="col-md-12">
                  <Content item={item} />
                  {item.type === "post" && item.id && (
                    <>
                      <hr />
                      <p className="lead">
                        {item.comment_count || 0} response to &quot;
                        {item.title.rendered}
                        &quot;
                      </p>
                      <ListComment postId={item.id} />
                    </>
                  )}
                </div>
              </React.Fragment>
            ))}
        </div>
      </LayoutBlog>

      <div className="row">
        {!isLoadingGetPosts && posts.length === 0 && (
          <div className="col-md-12">Page Not Found</div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
