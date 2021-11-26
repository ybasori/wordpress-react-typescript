import moment from "moment";
import React from "react";
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

const ContentAside: React.FC<Props> = ({ postDate, author, content }) => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-md-12">
          <div className="card text-dark bg-light">
            <div className="card-body">
              <blockquote
                className="blockquote mb-0"
                dangerouslySetInnerHTML={{
                  __html: `<small>${author.name}@${moment(postDate).format(
                    "LLL"
                  )}</small>${content}`,
                }}
              ></blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentAside;
