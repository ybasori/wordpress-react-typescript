import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { FeaturedMediaProps } from "../../../_config/types";

interface Props {
  slug: string;
  title: string;
  postDate: string;
  author: {
    name: string;
    slug: string;
  };
  featuredMedia?: FeaturedMediaProps;
  content: string;
}

const ContentGallery: React.FC<Props> = ({
  slug,
  title,
  postDate,
  author,
  featuredMedia: featured_media,
  content,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <h2 className="display-6">
              <Link to={`/${slug}/`}>{title}</Link>
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="lead text-muted">
              {moment(postDate).format("LLL")} by{" "}
              <Link to={`/author/${author.slug}/`}>{author.name}</Link>
            </p>
          </div>
        </div>
        {featured_media && (
          <div className="row mb-4">
            <div className="col-md-12">
              <img
                className="img-fluid"
                src={featured_media.media_details.sizes.full.source_url}
                alt={featured_media.title.rendered}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div
            className="col-md-12"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ContentGallery;
