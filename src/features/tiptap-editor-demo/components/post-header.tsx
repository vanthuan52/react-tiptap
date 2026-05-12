import { Link } from "react-router-dom";
import { LuCalendarDays, LuClock } from "react-icons/lu";

interface PostHeaderProps {
  title: string;
  cover: string;
  author: string;
  createdAt: string;
  readingTime: number;
}

export default function PostHeader({
  title,
  cover,
  author,
  createdAt,
  readingTime,
}: PostHeaderProps) {
  return (
    <div className="lg:max-w-180 mx-auto w-full">
      {/* Author + meta */}
      <div className="flex items-center mb-6 gap-4">
        <div className="size-10 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {author.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-sm mb-1">By {author}</div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 text-xs">
              <LuCalendarDays size={14} />
              <span>{createdAt}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-slate-400" />
            <div className="flex items-center gap-1.5 text-xs">
              <LuClock size={14} />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
        <Link
          to="/"
          className="ml-auto flex items-center gap-2 px-4 h-8 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium text-sm transition-colors"
        >
          ✏️ Edit
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
        {title}
      </h1>

      {/* Cover */}
      {/* img element */}
      <img
        src={cover}
        alt={title}
        className="w-full rounded-xl mb-10 aspect-video object-cover"
      />
    </div>
  );
}
