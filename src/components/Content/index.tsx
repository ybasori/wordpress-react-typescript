import React from "react";
import { PostProps } from "../../_config/types";
import ContentAside from "./Aside";
import ContentGallery from "./Gallery";
import ContentPost from "./Post";

interface Props {
  item: PostProps;
}

const Content: React.FC<Props> = ({ item }) => {
  return (
    <React.Fragment>
      {item.format === "standard" && (
        <ContentPost
          slug={item.slug}
          title={item.title.rendered}
          postDate={item.date}
          author={item.author}
          featuredMedia={item.featured_media}
          content={item.content.rendered}
          excerpt={item.excerpt.rendered}
        />
      )}
      {item.format === "aside" && (
        <ContentAside
          slug={item.slug}
          title={item.title.rendered}
          postDate={item.date}
          author={item.author}
          featuredMedia={item.featured_media}
          content={item.content.rendered}
        />
      )}
      {item.format === "gallery" && (
        <ContentGallery
          slug={item.slug}
          title={item.title.rendered}
          postDate={item.date}
          author={item.author}
          featuredMedia={item.featured_media}
          content={item.content.rendered}
        />
      )}
    </React.Fragment>
  );
};

export default Content;
