import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../_context/AppProvider";
import { useParams } from "react-router-dom";

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
        ],
        user: [user || ""],
      });
      setOneTimeEffect(false);
    }
  }, [oneTimeEffect]);
  return (
    <div className="row">
      <div className="col-md-12">
        {isLoadingGetPosts
          ? "loading"
          : posts.length === 0
          ? "No Posts Found"
          : posts.map((item, index) => (
              <div className="row" key={index + 1}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-12">
                      <h2 className="display-6">
                        <Link to={`/${item.slug}/`}>{item.title.rendered}</Link>
                      </h2>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className="lead text-muted">
                        {moment(item.date).format("LLL")} by{" "}
                        <Link to={`/author/${item.author.slug}/`}>
                          {item.author.name}
                        </Link>
                      </p>
                    </div>
                  </div>
                  {item.featured_media && (
                    <div className="row mb-4">
                      <div className="col-md-12">
                        <img
                          className="img-fluid"
                          src={item.featured_media.guid.rendered}
                          alt={item.featured_media.title.rendered}
                        />
                      </div>
                    </div>
                  )}
                  <div className="row">
                    <div
                      className="col-md-12"
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
