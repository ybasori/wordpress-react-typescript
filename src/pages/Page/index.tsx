import React from "react";
import { AppContext } from "../../_context/AppProvider";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import BlogPost from "./BlogPost";

const Page = () => {
  const { slug } = useParams();
  const { getPages, pages, isLoadingGetPages } = React.useContext(AppContext);

  React.useEffect(() => {
    getPages({
      _field: [
        "title",
        "content",
        "slug",
        "date",
        "author",
        "featured_media",
        "type",
      ],
      slug: [slug || ""],
    });
  }, [slug]);

  return (
    <>
      {isLoadingGetPages ? (
        <div className="container pt-5 mt-5">
          <div className="row">
            <div className="col-md-12">Loading</div>
          </div>
        </div>
      ) : pages.length > 0 ? (
        pages.map((obj, index) => (
          <div className="container pt-5 mt-5" key={index + 1}>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="display-6">{obj.title.rendered}</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p className="lead text-muted">
                      {moment(obj.date).format("LLL")} by{" "}
                      <Link to={`/author/${obj.author.slug}/`}>
                        {obj.author.name}
                      </Link>
                    </p>
                  </div>
                </div>
                {obj.featured_media && (
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <img
                        className="img-fluid"
                        src={obj.featured_media.guid.rendered}
                        alt={obj.featured_media.title.rendered}
                      />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div
                    className="col-md-12"
                    dangerouslySetInnerHTML={{
                      __html: obj.content?.rendered,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <BlogPost slug={slug} />
      )}
    </>
  );
};

export default Page;
