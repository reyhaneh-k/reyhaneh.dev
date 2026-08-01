import { PostProps } from "./index.type";

function Post({
  title,
  description,
  date,
  views,
}: PostProps) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{date}</p>
      <p>{views}</p>
    </div>
  );
}

export default Post;
